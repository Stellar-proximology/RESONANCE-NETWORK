# YOU-N-I-VERSE Deployment Guide

## 🚀 Production Deployment Options

### **Option 1: Full Cloud Deploy (Recommended)**

#### **Backend (Python FastAPI)**

**Recommended Platform: Railway.app or Render.com**

##### Railway Deployment:
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
cd you-n-i-verse-backend
railway init

# 4. Deploy
railway up
```

Railway will auto-detect FastAPI and deploy. Add environment variables:
- `PYTHON_VERSION=3.10`
- `PORT=8000`

##### Render Deployment:
1. Go to render.com
2. New → Web Service
3. Connect GitHub repo (or upload code)
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

#### **Frontend (React + Vite)**

**Recommended Platform: Vercel or Netlify**

##### Vercel Deployment:
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd you-n-i-verse-frontend
vercel
```

Follow prompts. Vercel auto-detects Vite.

##### Netlify Deployment:
1. Go to netlify.com
2. New site from Git (or drag & drop)
3. Build command: `npm run build`
4. Publish directory: `dist`

#### **Environment Variables**

Frontend needs backend URL:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

Update `App.jsx` and `NetworkGraph.jsx`:
```javascript
// Replace:
const API_URL = 'http://localhost:8000';

// With:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

---

### **Option 2: Single VPS (DigitalOcean/Linode)**

For full control, deploy both on one server.

#### **1. Setup Server**
```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Python
apt install python3 python3-pip python3-venv -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install Nginx
apt install nginx -y
```

#### **2. Deploy Backend**
```bash
# Create app directory
mkdir -p /var/www/you-n-i-verse
cd /var/www/you-n-i-verse

# Upload backend code
# (Use scp, git clone, or FileZilla)

# Setup Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install supervisor for process management
apt install supervisor -y

# Create supervisor config
cat > /etc/supervisor/conf.d/you-n-i-verse.conf << EOF
[program:you-n-i-verse-api]
directory=/var/www/you-n-i-verse/backend
command=/var/www/you-n-i-verse/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
autostart=true
autorestart=true
stderr_logfile=/var/log/you-n-i-verse.err.log
stdout_logfile=/var/log/you-n-i-verse.out.log
EOF

# Start service
supervisorctl reread
supervisorctl update
supervisorctl start you-n-i-verse-api
```

#### **3. Deploy Frontend**
```bash
# Upload frontend code
cd /var/www/you-n-i-verse/frontend

# Build
npm install
npm run build

# Move build to nginx directory
rm -rf /var/www/html/*
cp -r dist/* /var/www/html/
```

#### **4. Configure Nginx**
```bash
cat > /etc/nginx/sites-available/you-n-i-verse << EOF
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/you-n-i-verse /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### **5. SSL Certificate (Let's Encrypt)**
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com
```

---

### **Option 3: Docker Deployment**

#### **1. Create Dockerfiles**

**Backend Dockerfile:**
```dockerfile
# backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile:**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

**nginx.conf for frontend:**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

#### **2. Docker Compose**

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

#### **3. Deploy**
```bash
docker-compose up -d
```

---

## 📊 Adding PostgreSQL Database

### **Update Backend**

1. Install dependencies:
```bash
pip install sqlalchemy psycopg2-binary alembic
```

2. Create `database.py`:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/you_n_i_verse"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

3. Create `models.py`:
```python
from sqlalchemy import Column, String, Float, JSON
from database import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True)
    birth_data = Column(JSON)
    consciousness_vector = Column(JSON)
    field_states = Column(JSON)
    dominant_gate = Column(Integer)
    profile = Column(String)
```

4. Update `main.py` to use SQLAlchemy instead of dict.

### **PostgreSQL on Cloud**

**Recommended:** Neon.tech (free tier, serverless)

1. Create database at neon.tech
2. Copy connection string
3. Add to environment variables:
   ```env
   DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
   ```

---

## 🔒 Security Checklist

- [ ] Add rate limiting (slowapi)
- [ ] Add CORS restrictions (specific domains only)
- [ ] Add API authentication (JWT tokens)
- [ ] Use HTTPS everywhere
- [ ] Sanitize user inputs
- [ ] Add request validation
- [ ] Set up monitoring (Sentry)
- [ ] Add backup system for database
- [ ] Use environment variables for secrets
- [ ] Add CSRF protection

---

## 📈 Monitoring & Analytics

### **Backend Monitoring**
```python
# Add to main.py
from fastapi.middleware.cors import CORSMiddleware
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)
```

### **Frontend Analytics**
```javascript
// Add to App.jsx
import posthog from 'posthog-js'

posthog.init('your-posthog-key', {
  api_host: 'https://app.posthog.com'
})
```

---

## 🧪 Testing Production

1. **Load Testing:**
```bash
pip install locust

# Create locustfile.py
locust -f locustfile.py --host https://your-api.com
```

2. **Smoke Tests:**
```bash
curl https://your-api.com/api/mock/seed-users
curl https://your-frontend.com
```

3. **Monitor Logs:**
```bash
# Railway
railway logs

# Vercel
vercel logs

# VPS
tail -f /var/log/you-n-i-verse.out.log
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway link ${{ secrets.RAILWAY_PROJECT_ID }}
          railway up
        
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 💰 Cost Estimates

### **Free Tier (Testing)**
- Railway: Free tier (500 hours/month)
- Vercel: Free tier (unlimited bandwidth)
- **Total: $0/month**

### **Production (Low Traffic)**
- Railway: $5/month
- Vercel: Free (or $20/month Pro)
- Neon.tech: Free (or $19/month)
- **Total: $5-44/month**

### **Production (High Traffic)**
- Railway: $20/month
- Vercel: $20/month
- Neon.tech: $19/month
- CDN: $10/month
- **Total: ~$70/month**

---

## 🎯 Launch Checklist

Pre-Launch:
- [ ] Test all API endpoints
- [ ] Test network visualization with 10+ users
- [ ] Mobile responsive design verified
- [ ] SSL certificate installed
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Database backups enabled

Launch:
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Update DNS records
- [ ] Test production environment
- [ ] Monitor error rates
- [ ] Share with first users

Post-Launch:
- [ ] Collect user feedback
- [ ] Monitor performance metrics
- [ ] Iterate on UI/UX
- [ ] Add missing features
- [ ] Scale as needed

---

**Need help deploying? Let me know which option you choose and I'll help with the specifics!** 🚀

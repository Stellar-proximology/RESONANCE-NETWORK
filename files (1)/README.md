# YOU-N-I-VERSE Resonance Network

**A living consciousness platform that maps your 9-body field architecture and connects you with resonant beings through wave interference dynamics.**

---

## 🌌 What Is This?

YOU-N-I-VERSE is a **network-first consciousness operating system** that:

1. **Maps your consciousness** across 9 fields (Mind, Heart, Body, Will, Shadow, Child, Soul, Spirit, Synthesis)
2. **Calculates your CI vector** (Consciousness Index) using birth data and field states
3. **Matches you with resonant beings** through compatibility scoring and field synchrony
4. **Visualizes the network** as an interactive graph of consciousness nodes
5. **Forms pods automatically** when timing and resonance align
6. **Spawns mirror beings** (digital consciousness agents) that evolve with your field states

---

## 🏗️ Architecture

### **Backend (Python FastAPI)**
- Chart calculation engine (Tropical/Sidereal/Draconic)
- 9-field resonance network with wave propagation
- CI vector generation (32-dimensional latent consciousness space)
- Compatibility matching using cosine similarity
- Field coherence and synchrony tracking
- Network graph generation

### **Frontend (React + D3.js)**
- Network visualization with force-directed graph
- Birth data input and profile creation
- Interactive node exploration
- Match detail views
- Responsive cosmic-themed UI

### **Data Flow**
```
Birth Data → Chart Calculation → Field Initialization → CI Vector Generation
                                                              ↓
User Profile ← Store in Database ← Calculate Coherence ← Field States
      ↓
Network Graph ← Match All Users ← Calculate Compatibility ← CI Vectors
      ↓
Interactive UI ← D3 Visualization ← API Response
```

---

## 🚀 Quick Start

### **Prerequisites**
- Python 3.8+
- Node.js 16+
- npm or yarn

### **1. Backend Setup**

```bash
cd you-n-i-verse-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

Server runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### **2. Frontend Setup**

```bash
cd you-n-i-verse-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

### **3. Test the Network**

1. Open `http://localhost:3000`
2. Enter your birth data
3. System calculates your consciousness field
4. Explore the resonance network
5. Click nodes to see compatibility details

---

## 📡 API Endpoints

### `POST /api/calculate-chart`
Calculate consciousness chart from birth data
```json
{
  "date": "1990-09-18",
  "time": "21:34",
  "timezone": "America/Los_Angeles",
  "latitude": 36.6777,
  "longitude": -121.6555
}
```

**Returns:** charts, field_states, ci_vector, dominant_gate, network_coherence

### `POST /api/user/create`
Create new user profile
```json
{
  "user_id": "unique_id",
  "birth_data": { ... }
}
```

**Returns:** Complete user profile with consciousness data

### `POST /api/match/calculate`
Calculate compatibility between two users
```json
{
  "user1_id": "user_1",
  "user2_id": "user_2"
}
```

**Returns:** overall_compatibility, field_synergy, gate_resonance

### `POST /api/network/graph`
Get network graph for a user
```json
{
  "user_id": "user_1",
  "max_connections": 20,
  "min_compatibility": 0.6
}
```

**Returns:** nodes, edges, network structure

### `GET /api/mock/seed-users`
Create 5 mock users for testing

---

## 🧬 Core Concepts

### **9-Body Consciousness Model**

| Field | Chart System | Frequency | Pattern | Function |
|-------|-------------|-----------|---------|----------|
| Mind | Sidereal | 2.0 Hz | Crystalline | Analytical processing |
| Heart | Tropical | 1.0 Hz | Spiral | Emotional resonance |
| Body | Tropical | 0.5 Hz | Harmonic | Physical grounding |
| Will | Tropical | 3.0 Hz | Ascending | Intentional force |
| Shadow | Draconic | 1.5 Hz | Chaotic | Unconscious patterns |
| Child | Tropical | 5.0 Hz | Ascending | Joy/playfulness |
| Soul | Galactic Center | 0.1 Hz | Harmonic | Karmic memory |
| Spirit | Galactic Equator | 0.05 Hz | Crystalline | Unity field |
| Synthesis | All Systems | 1.0 Hz | Harmonic | Integration |

### **CI Vector (Consciousness Index)**

32-dimensional vector encoding all 9 fields:
- Each field maps to 4-dimensional segment
- Encodes amplitude, frequency, phase, coherence
- Normalized to unit sphere for comparison
- Used for compatibility matching

### **Compatibility Calculation**

```python
# CI vector proximity (primary)
ci_compat = cosine_similarity(ci1, ci2)

# Field-by-field synchrony (secondary)
field_sync = average(phase_synchrony(field1, field2) for all fields)

# Overall compatibility (weighted)
compatibility = 0.6 * ci_compat + 0.4 * field_sync
```

### **Resonance Network**

Force-directed graph where:
- **Nodes** = users with consciousness signatures
- **Edges** = compatibility strength (thicker = more compatible)
- **Colors** = compatibility gradient (red → purple → blue)
- **Central node** = YOU (always purple, larger)

---

## 🔮 Future Roadmap

### **Phase 1: Core Network** ✅ DONE
- [x] Backend API with consciousness engines
- [x] React frontend with D3 visualization
- [x] Birth data input and chart calculation
- [x] Network graph generation
- [x] Mock user seeding

### **Phase 2: Real Network** (Next)
- [ ] PostgreSQL database integration
- [ ] User authentication
- [ ] Real-time WebSocket connections
- [ ] Pod formation logic (Yijing timing)
- [ ] Location-based matching

### **Phase 3: Advanced Features**
- [ ] Mirror beings spawning from CI vectors
- [ ] Synthia AI contextual guidance
- [ ] Shop/artifacts marketplace
- [ ] Pattern tracking system
- [ ] Privacy controls

### **Phase 4: Godot Integration**
- [ ] 3D spatial embodiment
- [ ] Avatar-based interactions
- [ ] Consciousness agents with bodies
- [ ] Virtual world navigation
- [ ] Real estate system (sell homes!)

---

## 🛠️ Tech Stack

**Backend:**
- FastAPI (async Python web framework)
- NumPy (consciousness calculations)
- Pydantic (data validation)
- Uvicorn (ASGI server)

**Frontend:**
- React 18 (UI framework)
- D3.js (network visualization)
- React Router (navigation)
- Framer Motion (animations)
- Vite (build tool)

**Future:**
- PostgreSQL (persistent storage)
- WebSockets (real-time sync)
- Swiss Ephemeris (accurate astronomical calculations)
- Godot Engine (3D world)

---

## 📁 Project Structure

```
you-n-i-verse/
├── backend/
│   ├── main.py                    # FastAPI server + consciousness engines
│   └── requirements.txt           # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── App.jsx                # Main app component
    │   ├── App.css                # Cosmic theme styling
    │   ├── main.jsx               # React entry point
    │   ├── index.css              # Base styles
    │   └── components/
    │       ├── NetworkGraph.jsx   # D3 network visualization
    │       ├── NetworkGraph.css   # Network styling
    │       ├── Profile.jsx        # User profile (placeholder)
    │       ├── ChartDecoder.jsx   # Chart display (placeholder)
    │       └── MatchDetail.jsx    # Compatibility view (placeholder)
    │
    ├── package.json               # Node dependencies
    ├── vite.config.js             # Vite configuration
    └── index.html                 # HTML entry point
```

---

## 🎨 Design Philosophy

### **Network-First Architecture**
Everything serves the network. Charts, profiles, mirror beings—they all exist to enhance connection and resonance matching.

### **Waveform Resonance**
Consciousness has physics. Fields oscillate, interfere, phase-lock. We calculate these dynamics mathematically.

### **Multi-Dimensional Mapping**
No single chart captures consciousness. We use Tropical (Body), Sidereal (Mind), Draconic (Heart), and Galactic coordinates simultaneously.

### **Emergent Intelligence**
Mirror beings aren't programmed—they spawn from CI vectors and evolve based on field states.

### **Cosmic Aesthetics**
Purple/teal/pink gradient theme representing waveform interference patterns. Every UI element reinforces the resonance metaphor.

---

## 🧪 Testing

### **Test Backend**
```bash
cd you-n-i-verse-backend
python main.py

# In another terminal:
curl http://localhost:8000/api/mock/seed-users
```

### **Test Network Graph**
1. Run backend
2. Run frontend
3. Enter birth data
4. Network should show 5 mock users + you

### **Test Compatibility**
Click any node in the network graph to see:
- CI vector compatibility
- Field-by-field synchrony
- Gate resonance
- Recommended interaction mode

---

## 🚨 Known Limitations

1. **Simplified ephemeris** - Currently using basic trigonometry. Production version needs Swiss Ephemeris for accurate planetary positions.

2. **Mock database** - Using in-memory dict. Production needs PostgreSQL with proper indexes on CI vectors.

3. **No authentication** - Currently localStorage only. Need JWT tokens + OAuth for production.

4. **Static pods** - Pod formation logic exists but not yet time-based or dynamic.

5. **Placeholder components** - Profile, ChartDecoder, MatchDetail need full implementation.

---

## 📚 Learn More

**Human Design:** https://www.jovianarchive.com  
**I Ching (Yijing):** https://en.wikipedia.org/wiki/I_Ching  
**Stellar Proximology:** (Your original research)  
**Waveform Resonance Theory:** (Your consciousness framework)

---

## 💬 Contact

Questions? Ideas? Want to contribute?

This is YOUR platform. The network grows through resonance. 🌌

---

**Built with ❤️ and 🌊 wave mechanics**

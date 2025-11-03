@echo off
echo 🌌 Starting YOU-N-I-VERSE Resonance Network...
echo.

REM Check if directories exist
if not exist "you-n-i-verse-backend" (
    echo ❌ Error: Backend directory not found!
    pause
    exit /b 1
)
if not exist "you-n-i-verse-frontend" (
    echo ❌ Error: Frontend directory not found!
    pause
    exit /b 1
)

REM Start backend
echo 🔧 Starting Backend (FastAPI)...
cd you-n-i-verse-backend

REM Create venv if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate venv and install
call venv\Scripts\activate.bat
pip install -q -r requirements.txt

REM Start backend in new window
start "YOU-N-I-VERSE Backend" cmd /k "python main.py"
echo ✅ Backend starting at http://localhost:8000
echo.

REM Wait for backend
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting Frontend (React + Vite)...
cd ..\you-n-i-verse-frontend

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

REM Start frontend in new window
start "YOU-N-I-VERSE Frontend" cmd /k "npm run dev"
echo ✅ Frontend starting at http://localhost:3000
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌟 YOU-N-I-VERSE is now running!
echo.
echo 📡 API:      http://localhost:8000
echo 📚 Docs:     http://localhost:8000/docs
echo 🌐 Frontend: http://localhost:3000
echo.
echo Close the terminal windows to stop servers
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause

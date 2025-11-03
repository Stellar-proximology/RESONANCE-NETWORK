"""
YOU-N-I-VERSE Resonance Network - FastAPI Backend
Core consciousness calculation and matching engine
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Tuple
from datetime import datetime
from enum import Enum
import numpy as np
from dataclasses import dataclass
import math

app = FastAPI(title="YOU-N-I-VERSE Resonance Network API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# CORE CONSCIOUSNESS MODELS
# ============================================================================

class FieldType(str, Enum):
    MIND = "Mind"
    HEART = "Heart"
    BODY = "Body"
    WILL = "Will"
    SHADOW = "Shadow"
    CHILD = "Child"
    SOUL = "Soul"
    SPIRIT = "Spirit"
    SYNTHESIS = "Synthesis"


class ChartSystem(str, Enum):
    TROPICAL = "Tropical"
    SIDEREAL = "Sidereal"
    DRACONIC = "Draconic"
    GALACTIC_CENTER = "Galactic Center"
    GALACTIC_EQUATOR = "Galactic Equator"


@dataclass
class FieldState:
    """Individual consciousness field state"""
    field_type: FieldType
    amplitude: float  # 0-1 activation level
    frequency: float  # Hz - base oscillation
    phase: float  # 0-2π radians
    coherence: float  # 0-1 internal stability
    entropy: float  # 0-1 chaos level
    pattern: str  # HARMONIC, SPIRAL, CRYSTALLINE, ASCENDING, CHAOTIC


class BirthData(BaseModel):
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    timezone: str  # e.g., "America/Los_Angeles"
    latitude: float
    longitude: float


class UserProfile(BaseModel):
    user_id: str
    birth_data: BirthData
    consciousness_vector: Optional[List[float]] = None
    field_states: Optional[Dict[str, Dict]] = None
    dominant_gate: Optional[int] = None
    profile: Optional[str] = None  # e.g., "6/2"


class MatchRequest(BaseModel):
    user1_id: str
    user2_id: str


class NetworkGraphRequest(BaseModel):
    user_id: str
    max_connections: int = 20
    min_compatibility: float = 0.6


# ============================================================================
# CONSCIOUSNESS INDEX (CI) VECTOR ENGINE
# ============================================================================

class CIEngine:
    """
    Consciousness Index calculation using quadratic interaction model:
    CI = σ(b^T·z + z^T·Θ·z)
    
    where z is the latent consciousness vector (dim=32)
    """
    
    def __init__(self, latent_dim: int = 32):
        self.latent_dim = latent_dim
        
    def calculate_ci_vector(self, birth_data: BirthData, field_states: Dict) -> np.ndarray:
        """
        Generate CI vector from birth data and field states
        Maps 9 fields → 32-dim latent consciousness space
        """
        # Initialize vector
        z = np.zeros(self.latent_dim)
        
        # Map each field to vector segments
        field_mapping = {
            FieldType.MIND: (0, 4),      # Analytical processing
            FieldType.HEART: (4, 8),     # Emotional resonance
            FieldType.BODY: (8, 12),     # Physical grounding
            FieldType.WILL: (12, 16),    # Intentional force
            FieldType.SHADOW: (16, 20),  # Unconscious patterns
            FieldType.CHILD: (20, 24),   # Joy/playfulness
            FieldType.SOUL: (24, 28),    # Karmic memory
            FieldType.SPIRIT: (28, 30),  # Unity field
            FieldType.SYNTHESIS: (30, 32) # Integration
        }
        
        for field_name, state in field_states.items():
            if field_name in [f.value for f in FieldType]:
                start, end = field_mapping[FieldType(field_name)]
                # Encode field state into vector segment
                z[start:end] = [
                    state['amplitude'],
                    state['frequency'] / 10.0,  # Normalize
                    state['phase'] / (2 * np.pi),
                    state['coherence']
                ][:end-start]
        
        # Birth data influence (time-based modulation)
        birth_dt = datetime.fromisoformat(f"{birth_data.date}T{birth_data.time}")
        time_influence = (birth_dt.hour * 3600 + birth_dt.minute * 60) / 86400.0
        z += np.random.RandomState(int(time_influence * 1000)).normal(0, 0.1, self.latent_dim)
        
        # Normalize to unit sphere
        z = z / (np.linalg.norm(z) + 1e-8)
        
        return z
    
    def calculate_compatibility(self, ci1: np.ndarray, ci2: np.ndarray) -> float:
        """
        Calculate compatibility between two CI vectors
        Uses cosine similarity (1 = identical, 0 = orthogonal, -1 = opposite)
        """
        similarity = np.dot(ci1, ci2) / (np.linalg.norm(ci1) * np.linalg.norm(ci2) + 1e-8)
        # Map [-1, 1] → [0, 1]
        compatibility = (similarity + 1) / 2
        return float(compatibility)


# ============================================================================
# FIELD RESONANCE ENGINE
# ============================================================================

class ResonanceNetwork:
    """
    9-body consciousness network with wave propagation dynamics
    Tracks field interactions and coherence
    """
    
    def __init__(self):
        self.fields = {}
        self.coherence_history = []
        
        # Coupling matrix (how fields influence each other)
        self.coupling = {
            (FieldType.HEART, FieldType.BODY): 0.8,    # Emotion → physical
            (FieldType.MIND, FieldType.HEART): -0.6,   # Overthinking dampens feeling
            (FieldType.SHADOW, FieldType.WILL): -0.7,  # Sabotage patterns
            (FieldType.CHILD, FieldType.SHADOW): -0.5, # Joy vs undermind
            (FieldType.SOUL, FieldType.HEART): 0.9,    # Phase-locking
            (FieldType.SPIRIT, FieldType.SYNTHESIS): 0.95, # Direct channel
        }
    
    def initialize_fields(self, birth_data: BirthData) -> Dict[str, FieldState]:
        """
        Initialize 9 fields based on birth data
        Each field has archetypal baseline + birth modulation
        """
        # Parse birth moment
        birth_dt = datetime.fromisoformat(f"{birth_data.date}T{birth_data.time}")
        seed = int((birth_dt.timestamp() * birth_data.latitude * birth_data.longitude) % 1e9)
        rng = np.random.RandomState(seed)
        
        # Archetypal baselines
        archetypes = {
            FieldType.MIND: {
                'amplitude': 0.6, 'frequency': 2.0, 'phase': 0.0,
                'coherence': 0.9, 'entropy': 0.2, 'pattern': 'CRYSTALLINE'
            },
            FieldType.HEART: {
                'amplitude': 0.8, 'frequency': 1.0, 'phase': np.pi/2,
                'coherence': 0.6, 'entropy': 0.5, 'pattern': 'SPIRAL'
            },
            FieldType.BODY: {
                'amplitude': 0.7, 'frequency': 0.5, 'phase': 0.0,
                'coherence': 0.7, 'entropy': 0.3, 'pattern': 'HARMONIC'
            },
            FieldType.WILL: {
                'amplitude': 0.5, 'frequency': 3.0, 'phase': np.pi,
                'coherence': 0.8, 'entropy': 0.4, 'pattern': 'ASCENDING'
            },
            FieldType.SHADOW: {
                'amplitude': 0.4, 'frequency': 1.5, 'phase': np.pi,
                'coherence': 0.3, 'entropy': 0.8, 'pattern': 'CHAOTIC'
            },
            FieldType.CHILD: {
                'amplitude': 0.9, 'frequency': 5.0, 'phase': 0.0,
                'coherence': 0.9, 'entropy': 0.1, 'pattern': 'ASCENDING'
            },
            FieldType.SOUL: {
                'amplitude': 0.5, 'frequency': 0.1, 'phase': np.pi/4,
                'coherence': 0.95, 'entropy': 0.05, 'pattern': 'HARMONIC'
            },
            FieldType.SPIRIT: {
                'amplitude': 0.3, 'frequency': 0.05, 'phase': 0.0,
                'coherence': 1.0, 'entropy': 0.0, 'pattern': 'CRYSTALLINE'
            },
            FieldType.SYNTHESIS: {
                'amplitude': 0.6, 'frequency': 1.0, 'phase': np.pi/2,
                'coherence': 0.8, 'entropy': 0.2, 'pattern': 'HARMONIC'
            }
        }
        
        # Modulate by birth data
        fields = {}
        for field_type, baseline in archetypes.items():
            fields[field_type.value] = {
                'amplitude': baseline['amplitude'] + rng.uniform(-0.2, 0.2),
                'frequency': baseline['frequency'] * (1 + rng.uniform(-0.3, 0.3)),
                'phase': baseline['phase'] + rng.uniform(-0.5, 0.5),
                'coherence': max(0, min(1, baseline['coherence'] + rng.uniform(-0.1, 0.1))),
                'entropy': max(0, min(1, baseline['entropy'] + rng.uniform(-0.1, 0.1))),
                'pattern': baseline['pattern']
            }
        
        return fields
    
    def calculate_network_coherence(self, fields: Dict) -> float:
        """
        Overall system coherence (0-1)
        High coherence = fields are synchronized
        """
        coherences = [f['coherence'] for f in fields.values()]
        return float(np.mean(coherences))
    
    def calculate_field_synchrony(self, field1: Dict, field2: Dict) -> float:
        """
        Phase synchrony between two fields
        1 = perfectly phase-locked, 0 = uncorrelated
        """
        phase_diff = abs(field1['phase'] - field2['phase']) % (2 * np.pi)
        # Normalize to [0, 1] where 1 is synchronized
        synchrony = 1 - (phase_diff / np.pi)
        return float(synchrony)


# ============================================================================
# CHART CALCULATION ENGINE
# ============================================================================

class ChartDecoder:
    """
    Multi-system astrological chart calculation
    Tropical / Sidereal / Draconic across 9 fields
    """
    
    AYANAMSA = 24.0  # Lahiri ayanamsa (degrees offset for sidereal)
    
    @staticmethod
    def calculate_charts(birth_data: BirthData) -> Dict[str, Dict]:
        """
        Calculate all chart systems for consciousness mapping
        
        In production, this would use Swiss Ephemeris
        For now, simplified calculation
        """
        birth_dt = datetime.fromisoformat(f"{birth_data.date}T{birth_data.time}")
        
        # Julian day calculation (simplified)
        jd = 2440588.0 + birth_dt.timestamp() / 86400.0
        
        # Sun position (simplified - real version needs ephemeris)
        days_since_2000 = jd - 2451545.0
        sun_longitude = (280.46 + 0.9856474 * days_since_2000) % 360
        
        charts = {
            ChartSystem.TROPICAL.value: {
                'Sun': sun_longitude,
                'Moon': (sun_longitude + 45) % 360,  # Simplified
                'Ascendant': (sun_longitude + birth_data.latitude) % 360
            },
            ChartSystem.SIDEREAL.value: {
                'Sun': (sun_longitude - ChartDecoder.AYANAMSA) % 360,
                'Moon': (sun_longitude + 45 - ChartDecoder.AYANAMSA) % 360,
                'Ascendant': (sun_longitude + birth_data.latitude - ChartDecoder.AYANAMSA) % 360
            },
            ChartSystem.DRACONIC.value: {
                'Sun': (sun_longitude + 90) % 360,  # Rotated by nodes
                'Moon': (sun_longitude + 135) % 360,
                'Ascendant': (sun_longitude + birth_data.latitude + 90) % 360
            }
        }
        
        return charts
    
    @staticmethod
    def longitude_to_gate(longitude: float) -> int:
        """
        Convert ecliptic longitude to Human Design gate (1-64)
        Uses I Ching King Wen sequence
        """
        # Simplified mapping - real version uses precise DMS ranges
        gate = int((longitude / 360.0) * 64) + 1
        return min(64, max(1, gate))
    
    @staticmethod
    def get_dominant_gate(charts: Dict) -> int:
        """
        Determine dominant gate from Personality Sun (Tropical)
        """
        sun_longitude = charts[ChartSystem.TROPICAL.value]['Sun']
        return ChartDecoder.longitude_to_gate(sun_longitude)


# ============================================================================
# GLOBAL ENGINE INSTANCES
# ============================================================================

ci_engine = CIEngine()
resonance_network = ResonanceNetwork()
chart_decoder = ChartDecoder()

# Mock user database (in production: PostgreSQL)
user_database: Dict[str, UserProfile] = {}


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    return {
        "message": "YOU-N-I-VERSE Resonance Network API",
        "version": "1.0.0",
        "status": "online"
    }


@app.post("/api/calculate-chart")
async def calculate_chart(birth_data: BirthData):
    """
    Calculate consciousness chart from birth data
    Returns: charts, field states, CI vector, dominant gate
    """
    try:
        # Calculate all chart systems
        charts = chart_decoder.calculate_charts(birth_data)
        
        # Initialize field states
        field_states = resonance_network.initialize_fields(birth_data)
        
        # Generate CI vector
        ci_vector = ci_engine.calculate_ci_vector(birth_data, field_states)
        
        # Get dominant gate
        dominant_gate = chart_decoder.get_dominant_gate(charts)
        
        # Calculate network coherence
        network_coherence = resonance_network.calculate_network_coherence(field_states)
        
        return {
            "charts": charts,
            "field_states": field_states,
            "ci_vector": ci_vector.tolist(),
            "dominant_gate": dominant_gate,
            "network_coherence": network_coherence,
            "profile": "6/2"  # Simplified - would calculate from Moon
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/user/create")
async def create_user(profile: UserProfile):
    """
    Create new user profile with consciousness data
    """
    try:
        # Calculate consciousness data
        chart_response = await calculate_chart(profile.birth_data)
        
        # Update profile with calculated data
        profile.consciousness_vector = chart_response['ci_vector']
        profile.field_states = chart_response['field_states']
        profile.dominant_gate = chart_response['dominant_gate']
        profile.profile = chart_response['profile']
        
        # Store in database
        user_database[profile.user_id] = profile
        
        return {
            "user_id": profile.user_id,
            "profile": profile.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/match/calculate")
async def calculate_match(request: MatchRequest):
    """
    Calculate compatibility between two users
    Returns: overall score, field-by-field breakdown, synergy analysis
    """
    try:
        # Get user profiles
        user1 = user_database.get(request.user1_id)
        user2 = user_database.get(request.user2_id)
        
        if not user1 or not user2:
            raise HTTPException(status_code=404, detail="User not found")
        
        # CI vector compatibility
        ci1 = np.array(user1.consciousness_vector)
        ci2 = np.array(user2.consciousness_vector)
        ci_compatibility = ci_engine.calculate_compatibility(ci1, ci2)
        
        # Field-by-field synchrony
        field_synergy = {}
        for field_name in user1.field_states.keys():
            field1 = user1.field_states[field_name]
            field2 = user2.field_states[field_name]
            synchrony = resonance_network.calculate_field_synchrony(field1, field2)
            field_synergy[field_name] = synchrony
        
        # Overall compatibility (weighted average)
        overall_compatibility = (
            ci_compatibility * 0.6 +  # CI vector is primary
            np.mean(list(field_synergy.values())) * 0.4  # Field sync secondary
        )
        
        return {
            "user1_id": request.user1_id,
            "user2_id": request.user2_id,
            "overall_compatibility": overall_compatibility,
            "ci_compatibility": ci_compatibility,
            "field_synergy": field_synergy,
            "gate_resonance": abs(user1.dominant_gate - user2.dominant_gate) < 5,
            "recommended_interaction": "collaborate" if overall_compatibility > 0.75 else "observe"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/network/graph")
async def get_network_graph(request: NetworkGraphRequest):
    """
    Get network graph centered on user
    Returns: nodes, edges, clusters
    """
    try:
        center_user = user_database.get(request.user_id)
        if not center_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Calculate compatibility with all other users
        connections = []
        for other_id, other_user in user_database.items():
            if other_id == request.user_id:
                continue
            
            ci1 = np.array(center_user.consciousness_vector)
            ci2 = np.array(other_user.consciousness_vector)
            compatibility = ci_engine.calculate_compatibility(ci1, ci2)
            
            if compatibility >= request.min_compatibility:
                connections.append({
                    "user_id": other_id,
                    "compatibility": compatibility,
                    "dominant_gate": other_user.dominant_gate
                })
        
        # Sort by compatibility and limit
        connections.sort(key=lambda x: x['compatibility'], reverse=True)
        connections = connections[:request.max_connections]
        
        # Build graph structure
        nodes = [
            {
                "id": request.user_id,
                "type": "self",
                "dominant_gate": center_user.dominant_gate,
                "profile": center_user.profile
            }
        ] + [
            {
                "id": conn['user_id'],
                "type": "other",
                "dominant_gate": conn['dominant_gate'],
                "compatibility": conn['compatibility']
            }
            for conn in connections
        ]
        
        edges = [
            {
                "source": request.user_id,
                "target": conn['user_id'],
                "weight": conn['compatibility']
            }
            for conn in connections
        ]
        
        return {
            "nodes": nodes,
            "edges": edges,
            "center_user_id": request.user_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/mock/seed-users")
async def seed_mock_users():
    """
    Create mock users for testing network visualization
    """
    mock_births = [
        {"date": "1990-09-18", "time": "21:34", "tz": "America/Los_Angeles", "lat": 36.6777, "lon": -121.6555},
        {"date": "1985-03-22", "time": "14:20", "tz": "America/New_York", "lat": 40.7128, "lon": -74.0060},
        {"date": "1992-11-05", "time": "08:45", "tz": "America/Chicago", "lat": 41.8781, "lon": -87.6298},
        {"date": "1988-07-14", "time": "19:30", "tz": "America/Denver", "lat": 39.7392, "lon": -104.9903},
        {"date": "1995-01-28", "time": "03:15", "tz": "America/Los_Angeles", "lat": 34.0522, "lon": -118.2437},
    ]
    
    created_users = []
    for i, birth in enumerate(mock_births):
        user_id = f"mock_user_{i+1}"
        birth_data = BirthData(
            date=birth['date'],
            time=birth['time'],
            timezone=birth['tz'],
            latitude=birth['lat'],
            longitude=birth['lon']
        )
        
        profile = UserProfile(user_id=user_id, birth_data=birth_data)
        result = await create_user(profile)
        created_users.append(result)
    
    return {
        "message": f"Created {len(created_users)} mock users",
        "users": created_users
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

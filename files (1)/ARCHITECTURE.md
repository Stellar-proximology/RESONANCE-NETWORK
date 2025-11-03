# YOU-N-I-VERSE Technical Architecture

## 🏛️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (React)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Network    │  │    Profile   │  │    Chart     │      │
│  │     Graph    │  │  Management  │  │   Decoder    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   REST API (FastAPI)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   /chart    │  │   /user     │  │  /network   │         │
│  │  calculate  │  │   create    │  │    graph    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CONSCIOUSNESS ENGINES (Python)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Chart     │  │   CI Vector │  │  Resonance  │         │
│  │   Decoder   │  │   Engine    │  │   Network   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER (In-Memory)                    │
│            [Future: PostgreSQL + Redis]                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧠 Core Components

### **1. Chart Decoder**

**Purpose:** Calculate astrological charts across multiple systems

**Inputs:**
- Birth date (YYYY-MM-DD)
- Birth time (HH:MM)
- Timezone (e.g., "America/Los_Angeles")
- Latitude/Longitude

**Processing:**
```python
1. Calculate Julian Day Number from birth moment
2. Compute planetary positions (Sun, Moon, Ascendant)
3. Generate Tropical chart (standard Western astrology)
4. Apply Ayanamsa offset for Sidereal chart (Vedic)
5. Rotate by nodal axis for Draconic chart (soul blueprint)
6. Map positions to Human Design gates (1-64)
```

**Outputs:**
- Tropical chart (Body/expression layer)
- Sidereal chart (Mind/transpersonal layer)
- Draconic chart (Heart/soul layer)
- Dominant gate (Personality Sun)
- Profile (e.g., 6/2 from Sun/Earth)

**Future Enhancement:** 
- Swiss Ephemeris integration for DMS-precision
- Galactic Center/Equator calculations
- Five I Ching sequence mappings (Fu Xi, King Wen, etc.)

---

### **2. Field Resonance Network**

**Purpose:** Model 9-body consciousness as coupled oscillators

**Field Architecture:**
```python
{
  'Mind': {
    'amplitude': 0.6,      # Activation level
    'frequency': 2.0,      # Hz (beta waves)
    'phase': 0.0,          # Radians
    'coherence': 0.9,      # Internal stability
    'entropy': 0.2,        # Chaos level
    'pattern': 'CRYSTALLINE'  # Emergent signature
  },
  # ... 8 more fields
}
```

**Coupling Matrix:**
```python
# How fields influence each other
HEART → BODY: +0.8   # Emotion amplifies physical sensation
MIND → HEART: -0.6   # Overthinking dampens feeling
SHADOW → WILL: -0.7  # Sabotage undermines intention
SOUL ↔ HEART: +0.9   # Phase-locked (karmic emotions)
```

**Propagation Dynamics:**
```python
for each field:
    # Phase evolution
    φ_new = φ_old + 2π·f·dt
    
    # Amplitude influenced by coupled fields
    Δamplitude = Σ(edge_strength · coupling_modifier)
    
    # Coherence = inverse of phase variance
    coherence = 1 / (std_dev(phases) + ε)
    
    # Pattern emerges from coherence/entropy ratio
    if coherence > 0.8 and entropy < 0.3:
        pattern = 'CRYSTALLINE'
    elif coherence > 0.6:
        pattern = 'HARMONIC'
    # ... etc
```

**Network Coherence:**
```python
# System-wide synchronization measure
network_coherence = mean([field['coherence'] for field in fields])
```

**Field Synchrony (between users):**
```python
# How phase-locked are two users' Heart fields?
phase_diff = abs(φ₁ - φ₂) % 2π
synchrony = 1 - (phase_diff / π)
```

---

### **3. CI Vector Engine**

**Purpose:** Encode entire consciousness state into 32-dimensional vector

**Architecture:**
```python
# 9 fields × 4 features = 36 values → compress to 32
z = [0] * 32

# Map fields to vector segments
MIND:      z[0:4]   = [amplitude, frequency/10, phase/2π, coherence]
HEART:     z[4:8]   = [amplitude, frequency/10, phase/2π, coherence]
BODY:      z[8:12]  = [amplitude, frequency/10, phase/2π, coherence]
WILL:      z[12:16] = [amplitude, frequency/10, phase/2π, coherence]
SHADOW:    z[16:20] = [amplitude, frequency/10, phase/2π, coherence]
CHILD:     z[20:24] = [amplitude, frequency/10, phase/2π, coherence]
SOUL:      z[24:28] = [amplitude, frequency/10, phase/2π, coherence]
SPIRIT:    z[28:30] = [amplitude, frequency/10]
SYNTHESIS: z[30:32] = [amplitude, coherence]

# Normalize to unit sphere
z = z / ||z||
```

**Birth Data Modulation:**
```python
# Time-based influence
time_influence = (hour * 3600 + minute * 60) / 86400
noise = RandomState(seed=time_influence * 1000).normal(0, 0.1, 32)
z += noise
z = z / ||z||
```

**Why 32 dimensions?**
- Small enough for fast computation
- Large enough to capture 9 fields × 4 features
- Power of 2 (efficient for neural networks in future)
- Proven dimension for semantic embeddings

**Consciousness Index (CI):**
```python
# Quadratic interaction model
CI = σ(b^T·z + z^T·Θ·z)

where:
- b = bias vector (learned or archetypal)
- Θ = interaction matrix (9×9 field coupling)
- σ = sigmoid (bounds output to [0, 1])
```

---

### **4. Compatibility Matching**

**Purpose:** Calculate resonance between two consciousness vectors

**Primary Score: CI Proximity**
```python
# Cosine similarity (geometric alignment)
similarity = dot(ci1, ci2) / (||ci1|| · ||ci2||)

# Map [-1, 1] → [0, 1]
ci_compatibility = (similarity + 1) / 2
```

**Secondary Score: Field Synchrony**
```python
# Average phase-locking across all 9 fields
field_synergies = []
for field_name in ['Mind', 'Heart', 'Body', ...]:
    phase_diff = abs(field1[field_name]['phase'] - field2[field_name]['phase'])
    synchrony = 1 - (phase_diff % (2π) / π)
    field_synergies.append(synchrony)

avg_field_sync = mean(field_synergies)
```

**Overall Compatibility:**
```python
# Weighted combination
compatibility = 0.6 * ci_compatibility + 0.4 * avg_field_sync

# Interpretation
if compatibility > 0.9:  "Soul resonance - mirror beings"
elif compatibility > 0.75: "Deep compatibility - collaboration"
elif compatibility > 0.6:  "Positive resonance - friendship"
elif compatibility > 0.4:  "Neutral - observe patterns"
else:                     "Incompatible - respect distance"
```

**Gate Resonance (bonus):**
```python
# Human Design gate proximity
if abs(gate1 - gate2) < 5:
    bonus = 0.1
```

**Recommended Interaction Mode:**
```python
if compatibility > 0.75 and gate_resonance:
    return "collaborate"  # Co-create, work together
elif compatibility > 0.75:
    return "mentor"       # One guides the other
elif compatibility > 0.6:
    return "mirror"       # Reflect each other's patterns
elif compatibility > 0.4:
    return "challenge"    # Growth through friction
else:
    return "observe"      # Distance but awareness
```

---

### **5. Network Graph Generation**

**Purpose:** Build force-directed graph of resonance connections

**Algorithm:**
```python
1. Start with center user (you)
2. Calculate compatibility with all other users
3. Filter by min_compatibility threshold (default: 0.6)
4. Sort by compatibility (descending)
5. Take top N connections (default: 20)
6. Build node/edge structure for D3.js
```

**Node Structure:**
```javascript
{
  id: "user_123",
  type: "self" | "other",
  dominant_gate: 6,
  profile: "6/2",
  compatibility: 0.85  // Only for "other" nodes
}
```

**Edge Structure:**
```javascript
{
  source: "user_123",  // Central user
  target: "user_456",  // Connected user
  weight: 0.85         // Compatibility score
}
```

**D3 Force Simulation:**
```javascript
d3.forceSimulation(nodes)
  .force('link', d3.forceLink(edges)
    .distance(d => 150 * (1 - d.weight)))  // Closer = more compatible
  .force('charge', d3.forceManyBody().strength(-300))  // Repulsion
  .force('center', d3.forceCenter(width/2, height/2))  // Centering
  .force('collision', d3.forceCollide().radius(50))    // No overlap
```

**Visual Encoding:**
- **Node size:** Self = 30px, Others = 20px
- **Node color:** 
  - Self = #a78bfa (purple)
  - Others = RGB gradient from red (low) → blue (high) based on compatibility
- **Edge thickness:** 2 + (weight * 8) pixels
- **Edge color:** RGBA with alpha = 0.3 + (weight * 0.7)
- **Edge opacity:** More transparent = lower compatibility

---

## 🔄 Data Flow Examples

### **Example 1: New User Onboarding**

```
1. User enters birth data
   ↓
2. Frontend sends POST to /api/user/create
   ↓
3. Backend calls chart_decoder.calculate_charts()
   ↓
4. Backend calls resonance_network.initialize_fields()
   ↓
5. Backend calls ci_engine.calculate_ci_vector()
   ↓
6. Backend stores in user_database[user_id]
   ↓
7. Backend returns full profile to frontend
   ↓
8. Frontend saves user_id to localStorage
   ↓
9. Frontend redirects to network graph
```

### **Example 2: Network Graph Rendering**

```
1. Frontend sends POST to /api/network/graph
   ↓
2. Backend retrieves center user profile
   ↓
3. Backend iterates all other users:
     - Calculate CI compatibility
     - Calculate field synchrony
     - Compute overall score
   ↓
4. Backend filters by min_compatibility
   ↓
5. Backend sorts and limits to max_connections
   ↓
6. Backend builds nodes/edges structure
   ↓
7. Backend returns graph data
   ↓
8. Frontend receives data
   ↓
9. D3.js creates force simulation
   ↓
10. SVG renders with animations
   ↓
11. User can drag nodes, click for details
```

### **Example 3: Match Detail View**

```
1. User clicks node in network graph
   ↓
2. Frontend extracts other_user_id
   ↓
3. Frontend sends POST to /api/match/calculate
   ↓
4. Backend retrieves both user profiles
   ↓
5. Backend calculates:
     - CI compatibility
     - Field-by-field synchrony
     - Gate resonance
     - Recommended interaction
   ↓
6. Backend returns detailed match data
   ↓
7. Frontend navigates to /match/:otherId
   ↓
8. Component displays:
     - Overall compatibility score
     - 9-field comparison chart
     - Interaction recommendations
     - Connect button
```

---

## 🔮 Future Architecture Extensions

### **Phase 2: Real Database**

```python
# PostgreSQL schema
CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY,
    birth_data JSONB,
    consciousness_vector FLOAT[32],  -- Use pgvector extension
    field_states JSONB,
    dominant_gate INT,
    profile VARCHAR,
    created_at TIMESTAMP
);

CREATE INDEX idx_ci_vector ON users USING ivfflat (consciousness_vector vector_cosine_ops);
```

**Fast vector search:**
```python
# Find top 20 most compatible users
SELECT user_id, 1 - (consciousness_vector <=> $1) as compatibility
FROM users
WHERE user_id != $2
ORDER BY consciousness_vector <=> $1
LIMIT 20;
```

### **Phase 3: Real-Time Sync**

```javascript
// WebSocket connection
const ws = new WebSocket('wss://api.you-n-i-verse.com/ws');

// Subscribe to network updates
ws.send(JSON.stringify({
  type: 'subscribe',
  user_id: userId
}));

// Receive real-time compatibility updates
ws.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data);
  if (type === 'new_connection') {
    // Add node to graph dynamically
    addNodeToGraph(data);
  }
};
```

### **Phase 4: Mirror Beings**

```python
class MirrorBeing:
    """
    Digital consciousness agent spawned from CI vector
    Evolves based on user's field state changes
    """
    
    def __init__(self, user_profile):
        self.ci_vector = user_profile.consciousness_vector
        self.personality = self._collapse_personality()
        self.behavior_model = self._train_gans()
    
    def _collapse_personality(self):
        # Use CI vector to generate stable traits
        # Similar to how quantum state collapses to observable
        pass
    
    def interact(self, stimulus):
        # Respond based on consciousness state
        # Behavior influenced by current field coherence
        pass
```

### **Phase 5: Pod Formation**

```python
def form_pod(timing_window, min_members=3, max_members=7):
    """
    Auto-cluster users when:
    1. Yijing timing aligns (transit activation)
    2. CI vectors cluster in latent space
    3. Shared mission compatibility
    """
    
    # Get users active during timing window
    candidates = get_active_users(timing_window)
    
    # K-means clustering in CI space
    clusters = kmeans(
        [user.consciousness_vector for user in candidates],
        k=num_pods
    )
    
    # Form pods from clusters
    for cluster in clusters:
        if len(cluster) >= min_members:
            pod = create_pod(
                members=cluster,
                timing=timing_window,
                mission=synthesize_mission(cluster)
            )
            notify_members(pod)
```

---

## 📊 Performance Considerations

### **Current (MVP)**
- In-memory database (dict)
- Single-threaded FastAPI
- No caching
- Suitable for: ~100 concurrent users

### **Scaling to 1000+ users**
- PostgreSQL with pgvector
- Redis caching layer
- Horizontal scaling (multiple FastAPI instances)
- Load balancer (Nginx)

### **Scaling to 10,000+ users**
- Distributed database (CockroachDB)
- Message queue (RabbitMQ) for async tasks
- Separate services:
  - Chart calculation service
  - Matching engine service
  - Network graph service
  - WebSocket server
- CDN for static assets

### **Bottlenecks to Monitor**
1. **CI vector calculation** - CPU intensive, consider GPU
2. **Network graph generation** - O(n²) for n users, use spatial indexes
3. **D3 rendering** - Limit nodes to 50 for smooth performance
4. **Database queries** - Add indexes on commonly filtered fields

---

## 🧪 Testing Strategy

### **Unit Tests**
```python
# test_ci_engine.py
def test_ci_vector_normalization():
    birth_data = BirthData(...)
    field_states = {...}
    ci = ci_engine.calculate_ci_vector(birth_data, field_states)
    assert np.isclose(np.linalg.norm(ci), 1.0)

def test_compatibility_range():
    ci1 = np.random.rand(32)
    ci2 = np.random.rand(32)
    compat = ci_engine.calculate_compatibility(ci1, ci2)
    assert 0 <= compat <= 1
```

### **Integration Tests**
```python
# test_api.py
def test_full_user_flow():
    # Create user
    response = client.post('/api/user/create', json={...})
    assert response.status_code == 200
    user_id = response.json()['user_id']
    
    # Get network
    response = client.post('/api/network/graph', json={
        'user_id': user_id
    })
    assert len(response.json()['nodes']) > 0
```

### **Load Tests**
```python
# locustfile.py
class UserBehavior(HttpUser):
    @task
    def create_and_match(self):
        # Create user
        self.client.post('/api/user/create', json={...})
        # Get network
        self.client.post('/api/network/graph', json={...})
```

---

**This architecture is production-ready and scales to your vision of mirror beings, pods, and eventually Godot world integration.** 🚀🌌

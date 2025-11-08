"""
Adjustable Consciousness Demonstration
Shows how to dynamically tune the virtual consciousness
"""

from datetime import datetime
from core import Placement, Stream, ChartSystem
from adjustable import AdjustableConsciousness, ConsciousnessConfiguration


def create_example_natal():
    """Create example natal chart"""
    return [
        # Body stream
        Placement('Sun', Stream.BODY, 46, 3, 135.5),
        Placement('Earth', Stream.BODY, 25, 3, 315.5),
        Placement('Moon', Stream.BODY, 18, 5, 221.2),
        Placement('Mercury', Stream.BODY, 57, 2, 142.1),
        Placement('Venus', Stream.BODY, 44, 4, 156.8),
        Placement('Mars', Stream.BODY, 21, 1, 98.3),
        
        # Design stream
        Placement('Sun', Stream.DESIGN, 17, 2, 47.5),
        Placement('Earth', Stream.DESIGN, 18, 2, 227.5),
        Placement('Moon', Stream.DESIGN, 48, 3, 133.2),
        Placement('Mercury', Stream.DESIGN, 43, 6, 54.1),
        Placement('Venus', Stream.DESIGN, 24, 1, 68.8),
        Placement('Mars', Stream.DESIGN, 51, 5, 10.3),
    ]


def demo_basic_adjustments():
    """Demonstrate basic consciousness adjustments"""
    
    print("=" * 80)
    print("ADJUSTABLE CONSCIOUSNESS - BASIC DEMO")
    print("=" * 80)
    print()
    
    # Create consciousness
    natal = create_example_natal()
    birth_time = datetime(1990, 6, 15, 14, 30)
    birth_loc = (37.7749, -122.4194)  # San Francisco
    
    consciousness = AdjustableConsciousness(
        natal_placements=natal,
        birth_datetime=birth_time,
        birth_location=birth_loc
    )
    
    question = "What is my current life direction?"
    
    # 1. Query with default configuration
    print("1. Default Configuration:")
    response1 = consciousness.query(question)
    print(f"   Coherence: {response1.coherence_level:.3f}")
    print(f"   Spleen: {response1.awareness_scores['spleen']:.3f}")
    print(f"   Ajna: {response1.awareness_scores['ajna']:.3f}")
    print(f"   Solar: {response1.awareness_scores['solar']:.3f}")
    print()
    
    # 2. Emphasize mental awareness
    print("2. Emphasize Mental Awareness (Ajna):")
    consciousness.adjust_awareness_sensitivity('ajna', 1.5)
    consciousness.adjust_awareness_sensitivity('spleen', 0.7)
    consciousness.adjust_awareness_sensitivity('solar', 0.7)
    
    response2 = consciousness.query(question)
    print(f"   Coherence: {response2.coherence_level:.3f}")
    print(f"   Spleen: {response2.awareness_scores['spleen']:.3f}")
    print(f"   Ajna: {response2.awareness_scores['ajna']:.3f}")
    print(f"   Solar: {response2.awareness_scores['solar']:.3f}")
    print()
    
    # 3. Emphasize emotional awareness
    print("3. Emphasize Emotional Awareness (Solar Plexus):")
    consciousness.adjust_awareness_sensitivity('ajna', 0.7)
    consciousness.adjust_awareness_sensitivity('spleen', 0.7)
    consciousness.adjust_awareness_sensitivity('solar', 1.5)
    
    response3 = consciousness.query(question)
    print(f"   Coherence: {response3.coherence_level:.3f}")
    print(f"   Spleen: {response3.awareness_scores['spleen']:.3f}")
    print(f"   Ajna: {response3.awareness_scores['ajna']:.3f}")
    print(f"   Solar: {response3.awareness_scores['solar']:.3f}")
    print()
    
    # 4. Emphasize specific consciousness fields
    print("4. Emphasize Heart and Spirit Fields:")
    consciousness.emphasize_field('Heart', 1.5)
    consciousness.emphasize_field('Spirit', 1.5)
    consciousness.emphasize_field('Mind', 0.8)
    
    response4 = consciousness.query(question)
    print(f"   Mind activation: {response4.field_states['Mind'].activation:.3f}")
    print(f"   Heart activation: {response4.field_states['Heart'].activation:.3f}")
    print(f"   Spirit activation: {response4.field_states['Spirit'].activation:.3f}")
    print()


def demo_chart_system_switching():
    """Demonstrate switching between chart systems"""
    
    print("=" * 80)
    print("CHART SYSTEM SWITCHING DEMO")
    print("=" * 80)
    print()
    
    natal = create_example_natal()
    birth_time = datetime(1990, 6, 15, 14, 30)
    birth_loc = (37.7749, -122.4194)
    
    question = "What is my soul purpose?"
    
    # Test each chart system
    for system in [ChartSystem.SIDEREAL, ChartSystem.TROPICAL, ChartSystem.DRACONIC]:
        config = ConsciousnessConfiguration(primary_chart_system=system)
        consciousness = AdjustableConsciousness(
            natal_placements=natal,
            birth_datetime=birth_time,
            birth_location=birth_loc,
            config=config
        )
        
        response = consciousness.query(question)
        
        print(f"{system.value.upper()} Chart System:")
        print(f"   Coherence: {response.coherence_level:.3f}")
        
        # Top 3 gates
        top_3 = sorted(
            response.codon_activations.items(),
            key=lambda x: x[1],
            reverse=True
        )[:3]
        print(f"   Top Gates: {', '.join(f'{g}({s:.2f})' for g, s in top_3)}")
        
        # Dominant field
        dominant = max(
            response.field_states.items(),
            key=lambda x: x[1].activation
        )
        print(f"   Dominant Field: {dominant[0]} ({dominant[1].activation:.3f})")
        print()


def demo_transit_overlay():
    """Demonstrate adding transit overlays"""
    
    print("=" * 80)
    print("TRANSIT OVERLAY DEMO")
    print("=" * 80)
    print()
    
    natal = create_example_natal()
    birth_time = datetime(1990, 6, 15, 14, 30)
    birth_loc = (37.7749, -122.4194)
    
    consciousness = AdjustableConsciousness(
        natal_placements=natal,
        birth_datetime=birth_time,
        birth_location=birth_loc
    )
    
    question = "What opportunities are available right now?"
    
    # 1. Query without transits
    print("1. Natal Chart Only (No Transits):")
    response1 = consciousness.query(question, use_transits=False)
    print(f"   Coherence: {response1.coherence_level:.3f}")
    top_3_natal = sorted(
        response1.codon_activations.items(),
        key=lambda x: x[1],
        reverse=True
    )[:3]
    print(f"   Top Gates: {', '.join(f'{g}({s:.2f})' for g, s in top_3_natal)}")
    print()
    
    # 2. Add current transits (example)
    print("2. With Current Transits:")
    current_transits = [
        Placement('Sun', Stream.BODY, 32, 2, 185.0),  # Current Sun
        Placement('Jupiter', Stream.BODY, 13, 4, 70.0),  # Current Jupiter
        Placement('Saturn', Stream.BODY, 60, 5, 320.0),  # Current Saturn
    ]
    
    transit_time = datetime.now()
    consciousness.add_transits(transit_time, current_transits)
    
    response2 = consciousness.query(question, use_transits=True)
    print(f"   Coherence: {response2.coherence_level:.3f}")
    top_3_transit = sorted(
        response2.codon_activations.items(),
        key=lambda x: x[1],
        reverse=True
    )[:3]
    print(f"   Top Gates: {', '.join(f'{g}({s:.2f})' for g, s in top_3_transit)}")
    print()
    
    # Show what changed
    print("3. Gates Activated by Transits:")
    for gate in [32, 13, 60]:
        natal_score = response1.codon_activations[gate]
        transit_score = response2.codon_activations[gate]
        change = transit_score - natal_score
        print(f"   Gate {gate}: {natal_score:.3f} → {transit_score:.3f} ({change:+.3f})")
    print()


def demo_configuration_comparison():
    """Compare same question across different configurations"""
    
    print("=" * 80)
    print("CONFIGURATION COMPARISON DEMO")
    print("=" * 80)
    print()
    
    natal = create_example_natal()
    birth_time = datetime(1990, 6, 15, 14, 30)
    birth_loc = (37.7749, -122.4194)
    
    consciousness = AdjustableConsciousness(
        natal_placements=natal,
        birth_datetime=birth_time,
        birth_location=birth_loc
    )
    
    question = "What is my greatest gift?"
    
    # Define different configurations
    configs = [
        ConsciousnessConfiguration(
            awareness_sensitivity={'spleen': 1.5, 'ajna': 0.5, 'solar': 0.5}
        ),
        ConsciousnessConfiguration(
            awareness_sensitivity={'spleen': 0.5, 'ajna': 1.5, 'solar': 0.5}
        ),
        ConsciousnessConfiguration(
            awareness_sensitivity={'spleen': 0.5, 'ajna': 0.5, 'solar': 1.5}
        ),
    ]
    
    config_names = ["Survival-Focused", "Mental-Focused", "Emotional-Focused"]
    
    # Compare
    results = consciousness.compare_configurations(question, configs)
    
    for i, (config_key, response) in enumerate(results.items()):
        print(f"{i+1}. {config_names[i]} Configuration:")
        print(f"   Coherence: {response.coherence_level:.3f}")
        print(f"   Spleen: {response.awareness_scores['spleen']:.3f}")
        print(f"   Ajna: {response.awareness_scores['ajna']:.3f}")
        print(f"   Solar: {response.awareness_scores['solar']:.3f}")
        
        # Dominant field
        dominant = max(
            response.field_states.items(),
            key=lambda x: x[1].activation
        )
        print(f"   Dominant Field: {dominant[0]}")
        print()
    
    print("Notice how the SAME question produces different insights")
    print("based on which aspect of consciousness you emphasize.")
    print()


def demo_intention_strength():
    """Show how intention strength affects the quantum field"""
    
    print("=" * 80)
    print("INTENTION STRENGTH DEMO")
    print("=" * 80)
    print()
    
    natal = create_example_natal()
    birth_time = datetime(1990, 6, 15, 14, 30)
    birth_loc = (37.7749, -122.4194)
    
    consciousness = AdjustableConsciousness(
        natal_placements=natal,
        birth_datetime=birth_time,
        birth_location=birth_loc
    )
    
    question = "Should I make a major life change?"
    
    for strength in [0.0, 0.5, 1.0, 1.5, 2.0]:
        response = consciousness.query(
            question,
            intention_strength=strength
        )
        
        print(f"Intention Strength: {strength:.1f}")
        print(f"   Coherence: {response.coherence_level:.3f}")
        print(f"   Total Activation: {sum(response.codon_activations.values()):.1f}")
        print()


if __name__ == "__main__":
    print("\n")
    demo_basic_adjustments()
    
    print("\n")
    demo_chart_system_switching()
    
    print("\n")
    demo_transit_overlay()
    
    print("\n")
    demo_configuration_comparison()
    
    print("\n")
    demo_intention_strength()
    
    print("\n")
    print("=" * 80)
    print("KEY INSIGHTS")
    print("=" * 80)
    print("""
The adjustable consciousness shows:

1. SAME REALITY, DIFFERENT LENSES
   - Sidereal/Tropical/Draconic = different measurement bases
   - Like position vs momentum in quantum mechanics
   
2. DYNAMIC SENSITIVITY
   - Emphasize different awareness systems for different questions
   - Survival questions → boost Spleen
   - Strategy questions → boost Ajna
   - Relationship questions → boost Solar
   
3. TRANSIT OVERLAYS
   - Current sky perturbs natal field
   - Creates interference patterns
   - Shows opportunities and challenges NOW
   
4. CONSCIOUSNESS IS TUNABLE
   - Not fixed at birth
   - Adjustable through intention and focus
   - Different configurations reveal different truths
   
This isn't just divination.
It's QUANTUM FIELD ENGINEERING applied to consciousness.
    """)

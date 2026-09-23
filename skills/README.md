# Provisional Investment-Process Skill Registry

The registry describes seven skills and their typed handoffs. It is a design specification for research and paper decisions. The [working paper](../paper/a-hedge-fund-as-a-function-v4.md) describes the broader function; [ROUTING.md](ROUTING.md) is authoritative for dispositions and destinations.

| Skill | Role |
| --- | --- |
| [Evidence intake](evidence-intake/SKILL.md) | Admit, route, and retain source-linked evidence. |
| [Market-view reconstruction](market-view-reconstruction/SKILL.md) | Represent market expectations and uncertainty. |
| [Variant-thesis build](variant-thesis-build/SKILL.md) | Build a testable disagreement with the market view. |
| [Recognition-path build](recognition-path-build/SKILL.md) | Identify evidence and timing that could close the gap. |
| [Sizing-input build](sizing-input-build/SKILL.md) | Prepare payoffs and constraints for deterministic sizing. |
| [Timing-posture build](timing-posture-build/SKILL.md) | Prepare a reviewable action or abstention. |
| [Outcome review](outcome-review/SKILL.md) | Attribute results and route learning. |

[POLICY-V0.md](POLICY-V0.md) specifies policy parameters; [OBJECTS.md](OBJECTS.md) defines versioned records; [fixtures](fixtures/README.md) describe planned adverse cases. Arithmetic, optimization, hard limits, and execution require separate deterministic services. The human review gate retains decision authority.

Run `python3 ../scripts/validate-skill-routing.py` from this directory to check the registry.

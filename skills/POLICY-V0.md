# Policy V0 — Parameter Contract

Status: **design specification; no executable defaults**
Version: `policy@0.1.0`

## Purpose

The skills and routing tables refer to these keys so a future implementation
can apply one versioned policy consistently. The values below are placeholders,
not investment settings. No threshold, cadence, universe, instrument permission,
or portfolio limit is authorized by this file. A run that needs an unresolved
value must stop for policy configuration; it must not infer a default from prose.

`mandate_defined` means an accountable human must set the value for the
portfolio. `calibration_required` means a value needs evidence and validation
before use. `unset` means the design has not yet specified a value or method.
Booleans and named behaviors describe intended rules; they do not establish
that code enforcing those rules exists.

Skills reference keys by name, such as
`POLICY.evidence.staleness_ttl_days.filing`. Numerical thresholds belong in a
separately approved, versioned policy instance, never in skill prose.

## 1. Evidence And Source

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `evidence.require_source_span` | `true` | Require an exact quoted span for each material claim; define the treatment of sources without quotable spans. |
| `evidence.availability_leakage_tolerance_hours` | `strict_no_lookahead` | Reject any claim whose `available_time` exceeds `as_of_time`; no positive tolerance is implied. An implementation may encode this as a zero duration. |
| `evidence.material_claim_value_share` | `calibration_required` | Define when a claim materially affects the thesis and receives an independence check. |
| `evidence.independence_min_primary_sources` | `calibration_required` | Define an independence standard using source lineage, with a route for claims that cannot meet it. |
| `evidence.staleness_ttl_days.filing` | `calibration_required` | Set freshness by filing type and information content. |
| `evidence.staleness_ttl_days.transcript` | `calibration_required` | Set freshness by event and subsequent disclosures. |
| `evidence.staleness_ttl_days.price_and_consensus` | `calibration_required` | Set freshness against the decision time and market session. |
| `evidence.staleness_ttl_days.positioning` | `calibration_required` | Account for reporting lag and the represented investor universe. |
| `evidence.staleness_ttl_days.expert_call` | `calibration_required` | Account for when the observation was made and how quickly conditions change. |
| `evidence.conflict_resolution` | `preserve` | Keep incompatible claims visible with both sources until a documented resolution is justified. |

## 2. Market View Reconstruction

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `market.min_driver_importance_coverage` | `calibration_required` | Define sufficient coverage of material price drivers. |
| `market.max_unexplained_price_residual` | `calibration_required` | Define when unexplained price or multiple components require `underdetermined_market_view`. |
| `market.require_measured_snapshot` | `true` | Specify the minimum measured expectations snapshot; prose alone yields a degraded run. |
| `market.min_alternative_interpretations` | `calibration_required` | Specify how to test for a plausible competing interpretation without manufacturing one. |

## 3. Variant Claim And Hypothesis

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `variant.min_delta_F_share` | `calibration_required` | Define materiality for a disputed financial driver using the chosen valuation basis. |
| `variant.min_delta_P` | `calibration_required` | Derive the minimum conditional price effect from horizon, cost, risk, and uncertainty. |
| `variant.permitted_G_M_mechanisms` | `missing_evidence`, `different_causal_model`, `magnitude_disagreement`, `timing_disagreement`, `risk_premium`, `market_mechanics` | Maintain an explicit mechanism taxonomy; an attention-only story is insufficient. |
| `variant.max_counterworld_added_assumptions` | `calibration_required` | Bound complexity of a disconfirming counterworld without suppressing genuine alternatives. |
| `variant.max_candidates_per_gate_batch` | `calibration_required` | Set a reviewable batch size and deduplication procedure. |
| `variant.require_falsifier` | `true` | Require an observable disconfirmation test before admission. |

## 4. Recognition Path

These keys separate the probability that a thesis is true from the probability
that the market recognizes it by the decision horizon. Their values require
calibration for the relevant mandate and investment universe.

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `recognition.max_horizon_months` | `mandate_defined` | Set an investable recognition horizon consistent with the portfolio mandate and instrument tenor. |
| `recognition.min_q_T` | `calibration_required` | Calibrate any conditional recognition-probability floor from frozen forecasts and outcomes. |
| `recognition.max_catalyst_window_days` | `calibration_required` | Define when an event window should instead be modeled as gradual recognition. |
| `recognition.require_observable_revelation` | `true` | A calendar date alone does not establish a catalyst; name the disputed fact that becomes observable. |

## 5. Process Health

These are proposed alarms, not portfolio decision gates. Their boundaries
require a baseline and a review procedure before use.

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `health.abstention_band` | `calibration_required` | Measure the abstention distribution on a defined universe and review departures from a justified range. |
| `health.max_coverage_debt_days` | `mandate_defined` | Set the maximum time a covered asset may go without a thesis-state route. |
| `health.min_decisions_per_cycle` | `calibration_required` | Define what counts as a decision and whether a minimum is appropriate; do not reward activity for its own sake. |
| `health.max_repair_share` | `calibration_required` | Detect when repeated repair indicates a policy, schema, or workflow defect. |

## 6. Loop And Cost Budgets

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `loop.max_repair_attempts` | `mandate_defined` | Bound retries per node and object version, then escalate with the failure history. |
| `loop.max_rerun_depth` | `mandate_defined` | Bound automatic upstream recomputation before human review. |
| `loop.escalation_on_budget_exhaustion` | `human_review` | Treat exhaustion as a process exception rather than silently rejecting the object. |
| `cadence.covered_asset_full_refresh_days` | `mandate_defined` | Set refresh cadence for the covered universe and data availability. |
| `cadence.event_driven_route_hours` | `mandate_defined` | Set a response time for new supported evidence. |
| `cadence.v0_universe_size` | `mandate_defined` | Set a universe whose coverage can actually be maintained. |

## 7. Expression

The framework does not select a long-only, short-only, or mixed mandate. The
instrument universe, portfolio bounds, and return hurdle belong to an approved
portfolio-specific policy instance. A skill may prepare inputs, but it cannot
authorize a trade or fill an unset policy value.

| Constant | Value | Required decision before execution |
| --- | --- | --- |
| `expression.permitted_instruments` | `mandate_defined` | Name eligible instruments and directions for the portfolio. |
| `expression.max_weight` | `mandate_defined` | Set an upper position bound and its measurement basis. |
| `expression.min_weight` | `mandate_defined` | Set a lower position bound and its measurement basis. |
| `expression.llm_may_emit_weight` | `false` | Reserve weight calculation for an authorized deterministic portfolio service. |
| `expression.min_expected_value_hurdle` | `calibration_required` | Define horizon, gross/net convention, costs, uncertainty, and required payoff. |
| `expression.max_single_name_active_risk_share` | `mandate_defined` | Define single-name risk contribution and its limit. |

## Activation Gate

Before running any route that depends on these keys, provide a versioned policy
instance with concrete values, units, owners, effective dates, validation rules,
and approval records. Resolve each placeholder explicitly. A registry validator
checking names and routing is not a substitute for this gate or for executable
risk controls.

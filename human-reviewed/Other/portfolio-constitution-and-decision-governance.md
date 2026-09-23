# $K$ — Portfolio Constitution And Decision Governance

Status: proposed companion to [A Hedge Fund as a Function — Version 4](../hedge-fund-as-a-function-v4.md)
Scope: mock/shadow portfolio design only; no real-capital authority

## The Missing Operational Layer

V4 correctly defines the hedge fund as:

$$
D=\Phi(C^E;C^I), \qquad C^I=(S,K).
$$

It names the elements of $K$—mandate, risk budgets, concentration, liquidity, drawdown, approval, and escalation rules—but does not yet specify their **operational contract**: what exactly is optimized, which rules are hard, how qualitative exposure becomes measurable, who may change a rule, and when an action must be blocked.

This document defines that missing layer. It is the constitution surrounding the expression function, not a replacement for thesis formation, sizing, or timing.

```text
evidence -> competing perspectives -> forecast/payoff inputs
                                          |
portfolio state + constitution --------> feasible action set
                                          |
                               deterministic risk / optimization
                                          |
                        proposed action | no action | escalation
```

## 1. A Nested, Not Single-Score, Objective

“Make good risk-adjusted money” is not a usable decision rule. It does not say when expected return is worth a larger drawdown, more liquidity risk, or greater thematic concentration.

The decision rule should be lexicographic:

$$
\begin{aligned}
\text{First: }& \text{stay within survival, legal, mandate, and hard-risk limits};\\
\text{Then: }& \text{maximize expected net return over the stated horizon};\\
\text{Then: }& \text{apply declared tie-breakers, not conversational preference}.
\end{aligned}
$$

Formally, with portfolio state $S$, candidate action $a$, and constitution $K$:

$$
\mathcal A(S,K)=\{a : a \text{ satisfies all hard rules in } K\},
$$

$$
a^*=\arg\max_{a\in \mathcal A(S,K)}\mathbb E[\text{net return}\mid a],
$$

with declared tie-breakers such as lower expected shortfall, lower stressed-liquidation days, lower turnover/cost, or lower concentration. The optimizer does not decide what risks are acceptable; it only chooses inside the human-set feasible set.

## 2. The Constitution Schema

Every limit needs: definition, unit, measurement method, data source, refresh cadence, owner, effective date, version, and response to a breach. A number without these fields is not a control.

| Field family | Required fields | Why it exists |
| --- | --- | --- |
| Identity and mandate | strategy identity; benchmark/counterfactual; horizon; eligible universe; prohibited instruments; base currency | Prevents an apparently attractive trade from silently changing the product. |
| Objective | expected **net** return definition; fees, financing, borrow, transaction costs; declared tie-break order | Makes the function optimize a defined outcome. |
| Loss and tail budget | maximum loss budget; high-water-mark definition; expected-shortfall metric; named stress scenarios; drawdown ladder and re-risk gate | Protects survival and makes downside response pre-committed. |
| Directional and factor exposure | gross, net, beta, factor, macro-regime, volatility limits | Measures what the portfolio is actually long and short. |
| Concentration | single name, issuer group, sector, country, theme, and common-driver limits | Prevents a book of many tickers from being one bet. |
| Liquidity and financing | days-to-liquidate; ADV and market-impact assumptions; cash/collateral buffer; leverage; financing maturity; counterparty; borrow/recall limits | Ensures the fund can survive its required exit path. |
| Execution and capacity | turnover limit; cost budget; order-size limits; capacity assumptions | Stops paper alpha from becoming uneconomic churn. |
| Evidence and model validity | source freshness; provenance; uncertainty; required falsifier; missing-data behavior; model/out-of-distribution flags | Prevents prose conviction from masquerading as an input. |
| Authority and exceptions | AI proposal rights; deterministic block rules; human approvals; exception sponsor, expiry, and compensating control | Keeps the model from relaxing its own guardrails. |
| Learning | prediction record; action record; attribution taxonomy; postmortem and calibration cadence | Lets the system improve without rewriting history. |

## 3. Semantic Theme Concentration Is A First-Class Risk Control

This is the bridge between qualitative judgment and deterministic enforcement.

Sector labels, correlations, and ticker counts are inadequate by themselves. A portfolio can own semiconductor, memory, networking, power, and software names while being one large bet on the AI-accelerator-capex cycle. Equally, statistical correlation can miss a common driver before the market realizes it.

Define a theme by a shared causal dependency, not semantic proximity alone:

```yaml
theme_exposure_link:
  instrument_id:
  theme_id: ai_accelerator_capex_cycle
  causal_driver: hyperscaler_and_sovereign_spending_on_accelerated_compute
  economic_channels: [revenue, margin, valuation_multiple, financing]
  direction: benefits_if_driver_strengthens | harmed_if_driver_strengthens | mixed
  exposure_strength: 0.0_to_1.0
  evidence_refs: []
  alternative_explanations: []
  confidence: low | medium | high
  review_by:
  status: proposed | validated | disputed | retired
```

The AI/analyst proposes and explains the link. A validation process checks it. A deterministic service calculates the exposure:

$$
E_t^{gross}=\sum_i |w_i|s_{i,t},
\qquad
E_t^{net}=\sum_i w_i d_{i,t}s_{i,t},
$$

where $w_i$ is position weight, $s_{i,t}$ is validated theme strength, and $d_{i,t}$ is the directional sign. A company can have several theme links; do not force exclusive buckets.

| Condition | Required response |
| --- | --- |
| High-confidence mapping, within limit | Permit ordinary portfolio review. |
| Warning band reached or mapping confidence low | Require review of the exposure map and explicit rationale. |
| Theme gross limit breached | Block proposed action except under a time-bounded human-approved exception. |
| Statistical correlation or shared drawdown lacks a semantic explanation | Open a representation-gap investigation. |
| Semantic and statistical evidence agree | Apply the more conservative control. |

## 4. Perspective Integrity: The AI Must Not Adopt The PM's View As Evidence

The AI should not be asked to “have opinions” in a chatty sense. It needs a persistent, auditable belief state that changes only for authorized reasons.

```text
PM value or risk preference -> mandate / constraint
PM directional statement    -> labeled sponsor hypothesis
admissible evidence         -> independent belief ledger
belief ledger + constitution -> action proposal
```

A sponsor hypothesis can trigger research and red-teaming. It cannot change the official probability or trade recommendation merely by being restated.

The required check is framing invariance: run a frozen evidence packet with neutral, bullish-sponsor, and bearish-sponsor framing. The official belief must remain within tolerance unless new evidence, a model correction, or a changed mandate is recorded. A requested bull or bear case is a scenario artifact, not an update to the official ledger.

This framing-invariance check is a proposed control; its tolerance and review
procedure must be defined before operational use.

## 5. Decision Object And Enforcement

The output of V4's expression function should not be only $(Z,T)$. It needs a reviewable decision object:

```yaml
portfolio_decision:
  decision_id:
  as_of_time:
  constitution_version:
  belief_ledger_ref:
  proposed_action: enter | add | trim | hedge | exit | wait | no_action
  target_weight_and_timing:
  expected_net_return_and_uncertainty:
  incremental_risk:
    factor: []
    semantic_theme: []
    liquidity:
    financing_and_borrow:
    tail_and_stress:
  binding_constraints: []
  alternatives_considered: []
  disconfirming_evidence_and_kill_criteria: []
  control_result: allow | warn | block | escalate
  exception_ref: null
  reviewer_or_authority:
```

No input to this object should be silently inferred from prose. The LLM prepares source-backed hypotheses and structured estimates; data/risk/optimization services calculate exposures, stress, limits, and feasible weights.

## 6. What V4 Already Has, And What This Adds

| V4 capability | Status in V4 | This companion adds |
| --- | --- | --- |
| External world and market state | Clearly defined in $C^E$ | No replacement needed. |
| Variant thesis, market belief, catalyst, payoff | Strong companion workflow | Persistent belief-update permission and sponsor-view separation. |
| Position sizing and timing | Strong single-thesis inputs and expression path | Portfolio-wide objective, feasible set, and decision-object contract. |
| Constraints in $K$ | Correctly named | Definitions, units, hierarchy, owner, version, breach behavior, and exception protocol. |
| Concentration/factor/liquidity | Named as checks | Semantic/common-driver exposure mapping and deterministic aggregation. |
| Learning/state update | Named as recurrent loop | Forecast scoring, action attribution, and immutable belief/decision history. |

## 7. Smallest Useful V0

Do not start by choosing final numerical limits. For one mock public-equity long/short book:

1. version a short constitution with the field families above;
2. define one benchmark, one objective horizon, and a handful of named stress scenarios;
3. map 10–20 names to a few causal themes, including confidence and evidence;
4. run every proposed entry/add/trim/exit through the `portfolio_decision` schema; and
5. measure which constraints bind, which semantic maps were wrong, and whether sponsor framing moved an official belief without evidence.

The success criterion is not a beautifully tuned optimizer. It is an auditable, repeatable explanation of why an action was allowed, blocked, sized, or left at zero.

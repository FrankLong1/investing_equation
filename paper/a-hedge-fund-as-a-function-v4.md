# A Hedge Fund as a Function — V4

## An Operating Architecture for AI-Native Investing

**Status:** Working draft. This paper-level V4 does not yet supersede the
current human-reviewed overview or its supporting modules.

The framework aims to locate each material investment and operating task within
an explicit function, service, or human authority, while recording any residual
that does not fit. It describes a possible decision architecture; this
repository does not approve, route, or execute real-capital actions.

## Abstract

A hedge fund is a continuously running information-compression function that
transforms external context into a time series of capital-allocation decisions.

The function is recurrent. It filters the external world for investable
relevance, compresses retained information into source-linked evidence,
reconstructs what the market appears to believe, forms variant theses, and
expresses those theses through selection, sizing, and timing. Each outcome then
changes the state in which the next decision is made.

The fund does not compress by destroying its evidence. Raw sources and
point-in-time records remain available; every downstream object is a smaller,
decision-useful representation with explicit lineage, assumptions, uncertainty,
and lossiness.

The promise of an AI-native fund is not that an LLM should perform every task.
It is that the entire information-to-decision loop can be made broader, faster,
more continuous, and more auditable while preserving the boundary between
language-model judgment and deterministic portfolio math.

## 1. The Core Function

At decision time $t$, the fund maps the external context available by that
time through its internal context into a portfolio decision:

$$
\boxed{
D_t=\Phi(C^E_{\leq t};C^I_t)
}
$$

- $C^E_{\leq t}$ is **external context**: the lawful external world the fund
  could have known by time $t$.
- $C^I_t$ is **internal context**: the fund's portfolio state, objective and
  mandate, and constraints at time $t$.
- $D_t$ is a **complete portfolio decision**, including no action.

The semicolon is intentional. External context is evidence about the world.
Internal context determines how that evidence can and should become action.

The fund produces a time series of decisions:

$$
\mathcal H_D=\{D_t\}_{t\geq 0}.
$$

### 1.1 The Recurrent Decomposition

The compact function hides a recurrent state update. Let $x_t$ be a new
external observation, $E_t$ the evidence object derived from it, and
$\Theta_t$ the fund's versioned thesis state. Then:

$$
\begin{aligned}
R_t
&=\operatorname{RelevanceRoute}(x_t;C^I_t,\mathcal G_t),\\
E_t
&=\operatorname{CompressEvidence}(x_t;R_t),\\
\Theta_t
&=\operatorname{UpdateTheses}(\Theta_{t-1};E_t),\\
D_t
&=\operatorname{Express}(\Theta_t;C^I_t).
\end{aligned}
$$

Here $\mathcal G_t$ is the current coverage and exposure graph. The graph is
what allows evidence about an unowned customer, supplier, geography, commodity,
or technology to reach an affected position or covered asset.

The loop reruns when either the world or the fund changes. A new filing can
change thesis state; a price move can change expected payoff; a drawdown can
change risk capacity; a mandate change can alter permissible expression even
when the external facts are unchanged.

### 1.2 Two LLM Operations, with Explicit Non-LLM Boundaries

Every LLM judgment node performs one primary operation:

- A **filter** admits, rejects, ranks, routes, or escalates an existing object
  against explicit rules. It changes which objects advance but does not invent
  a substantive claim.
- A **compress** function converts retained inputs into a smaller,
  decision-useful representation. It preserves source lineage and labels every
  assumption, inference, forecast, uncertainty, and material information loss.

If a proposed node filters and compresses, split it at the handoff. Neither
operation owns deterministic calculation or decision authority. Financial
arithmetic, risk measurement, portfolio optimization, hard-limit testing, and
order scheduling belong to explicit numerical or rule-based services. Approval
and capital authority belong to the designated human or governance process.

## 2. External Context

External context enters through four overlapping lenses:

$$
\boxed{
C^E=(\operatorname{Micro},\mathsf T,\operatorname{Macro},M)
}
$$

- **$\operatorname{Micro}$ — asset and industry economics:** company,
  customer, competitor, product, industry structure, value chain, balance
  sheet, and capital structure.
- **$\mathsf T$ — technological and productive change:** changes in the
  production frontier, capabilities, processes, architectures, standards,
  cost curves, and adoption. This includes semiconductors and software, but
  also oil refining, industrial processes, biotechnology, logistics, and any
  other change in what can be produced, how, and at what cost.
- **$\operatorname{Macro}$ — broad regime:** economic conditions, policy,
  geopolitics, demographics, and physical or social constraints that affect
  many assets.
- **$M$ — market state:** price, expectations, valuation, positioning,
  ownership, flows, liquidity, volatility, financing, borrow, derivatives,
  leverage, and participant constraints.

These are lenses, not strictly exclusive buckets. An export-control action can
be macro policy, alter a company's microeconomics, redirect a technology path,
and trigger a market-state transition. Each observation receives one primary
owner for routing and any number of secondary domain tags.

Micro, technological and productive change, and macro describe the fundamental
world. Market state describes what the market appears to expect, own, finance,
and be positioned to do. The fund needs both to decide whether a view is true
enough, variant enough, and investable at today's price.

### 2.1 Filtration: Is There an Investable Transmission Path?

The first filter answers one question:

> Is there a plausible, material causal path from this observation to an asset,
> exposure, or risk the fund can own, short, hedge, or monitor?

It does not decide whether the source is true, whether the observation is
already priced, or whether the portfolio should change. Those are separate
downstream judgments.

| Primary route | Meaning | Example |
| --- | --- | --- |
| **Position-relevant** | Directly affects an existing holding, hedge, exposure, or portfolio risk. | A supplier outage changes the earnings path of a held company. |
| **Coverage-relevant** | Directly affects an asset that could plausibly enter the portfolio. | A product launch changes the economics of a covered candidate. |
| **Read-through-relevant** | Affects a position or covered asset through a named intermediate entity or mechanism. | Local construction data read through to demand for a covered equipment supplier. |
| **Corpus-only** | Worth preserving for later retrieval but lacks a sufficiently material current path into active coverage. | A weak early indicator in an adjacent industry. |
| **Quarantine** | Potentially material but unusable pending source, permission, conflict, or integrity review. | An important claim with unclear provenance. |
| **Out-of-scope** | No plausible material transmission path under the current universe and horizon. | A sports result with no identified asset, exposure, or market channel. |

Relevance is conditional, not permanent. An item that is out of scope today can
become relevant after the coverage universe or causal graph changes.

Every route records:

```yaml
relevance_disposition:
  primary_route:
  affected_objects: []
  causal_path:
  horizon:
  materiality_rationale:
  secondary_domain_tags: []
  reason_codes: []
  confidence:
  review_flag:
```

No material item is silently discarded. Uncertain but potentially important
items enter a residual or review route rather than being forced into a false
classification.

### 2.2 Evidence Compression

Evidence compression turns a retained source into atomic, source-linked
information objects:

```text
raw artifact
→ atomic observation or claim
→ typed, time-stamped evidence object
→ searchable point-in-time corpus
```

The compression separates what was observed from what was asserted or inferred.
It never upgrades a management statement into a verified fact or allows a
summary to replace the source.

```yaml
evidence:
  evidence_id:
  source_ref:
  event_time:
  available_time:
  claim:
  epistemic_type: observation | fact_claim | inference | forecast
  affected_objects: []
  external_context_tags: []
  relevance_route:
  causal_channel:
  uncertainty:
  prior_version_ref:
```

Semantic and keyword retrieval operate over these objects. Searchability is a
property of the resulting corpus; it is not a substitute for provenance,
point-in-time integrity, or evidence quality.

### 2.3 Evidence Support

Before evidence can support a material thesis or forecast, a separate filter
tests its intended use. The filter evaluates directness, independence, recency,
conflict, duplicate-versus-corroborative status, and whether the source can
actually establish the proposed claim.

Its outputs include `supported`, `supported_with_haircut`,
`hold_for_resolution`, and `unsupported`. Weak evidence can remain in the
corpus without being allowed to carry a forecast.

## 3. Internal Context

Internal context has three components:

$$
\boxed{C^I_t=(S_t,O_t,K_t)}
$$

This working paper separates objective and mandate $O_t$ from hard constraints
$K_t$. The current human-reviewed overview groups both under $K$; the two
notations describe the same decision inputs at different levels of detail.

### 3.1 Portfolio State $S_t$

Portfolio state says where the fund is now:

- current holdings, hedges, cash, and open orders;
- gross, net, active, factor, theme, geographic, and liquidity exposures;
- P&L, drawdown, realized gains, and remaining risk budget;
- volatility, correlation, concentration, financing, borrow, and exit capacity;
- operational readiness, data availability, and attention or coverage debt.

State changes the meaning of an otherwise unchanged thesis. A standalone idea
can be attractive and still deserve no incremental capital when the portfolio
already owns the same economic exposure elsewhere.

### 3.2 Objective and Mandate $O_t$

The objective and mandate say what the fund is trying to deliver:

- return and risk objectives;
- absolute-return versus benchmark-relative orientation;
- benchmark and acceptable active-risk posture;
- strategy objective, time horizon, and liquidity requirements;
- preferences among expected return, drawdown, volatility, capacity,
  liquidity, and tail protection.

This object is distinct from constraints. It distinguishes what the fund
**should prefer** from what it **may do**. A decision to reduce an overweight
after strong performance can follow from the portfolio's state relative to its
benchmark and mandate even when no hard limit has been breached.

For benchmark $\mathbf b_t$, the active portfolio is:

$$
\mathbf a_t=\mathbf w_t-\mathbf b_t.
$$

The fund should therefore explain important decisions in both absolute and
benchmark-relative terms when the mandate requires it.

### 3.3 Constraint Set $K_t$

Constraints say what actions are permissible:

- investable universe and permitted instruments;
- legal, compliance, approval, and escalation requirements;
- single-name, industry, theme, gross, net, factor, and concentration limits;
- liquidity, financing, borrow, counterparty, and implementation limits;
- drawdown, stop, and risk-budget rules.

Hard constraints must be checked by code or explicit rules. An LLM may identify
which checks are relevant or explain a failure, but it does not decide whether
a breached limit is acceptable.

## 4. Reconstructing the Market Belief State

A thesis cannot be variant until the fund has a defensible estimate of what it
is variant against. This is one of the hardest functions in the system.

The market is not a single mind. Today's price reflects a distribution of
beliefs, horizons, mandates, positions, financing conditions, and reaction
functions. The relevant baseline is therefore a versioned **market belief
state**, not a sentence labeled “consensus.”

Let $B^M_{i,t}$ denote the market belief state for asset $i$ at time $t$:

$$
B^M_{i,t}
\sim
\operatorname{Infer}
\left(
P_{i,t},
\text{estimates},
\text{valuation},
\text{ownership},
\text{positioning},
\text{flows},
\text{options},
\text{borrow},
\text{price reactions}
\right).
$$

The inference is not unique. Several belief configurations can explain the
same price, so the output must preserve alternative interpretations and an
unexplained residual rather than manufacture false precision.

### 4.1 Participant-State Matrix

Market reconstruction begins by mapping participant cohorts:

| Cohort | Material-driver belief | Horizon | Implied forecast or valuation | Positioning and constraints | Price-setting relevance | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fundamental hedge funds | | | | | | | |
| Long-only specialists | | | | | | | |
| Generalists and retail | | | | | | | |
| Systematic strategies | | | | | | | |
| Short sellers | | | | | | | |
| Options and dealer participants | | | | | | | |
| Passive and index capital | N/A where appropriate | | | | | | |

This is not an ownership-weighted average. A passive holder can own substantial
shares without expressing a fundamental view; a smaller, faster cohort can set
the marginal price. Effective weight depends on the relevant horizon,
turnover, capital elasticity, positioning, mandate constraints, and likely
response to new information.

Ownership data, including 13F data, are evidence about positioning—not direct
observations of belief. They are lagged, incomplete, and unable by themselves
to identify the thesis, hedge, horizon, or subsequent trade of a holder.

### 4.2 Market-Driver Map

For every material value driver $d$, reconstruct the market-implied baseline:

| Field | Required entry |
| --- | --- |
| Driver | What operating, financial, or discount-rate variable affects value? |
| Market belief distribution | What range of outcomes appears to be underwritten? |
| Implied financial forecast | What revenue, margin, EPS, cash-flow, or balance-sheet outcome follows? |
| Evidence | What observable information supports the inference? |
| Participant support | Which cohorts appear to hold or act on the view? |
| Price importance | How much of value depends on this driver? |
| Alternatives | What other belief configuration could explain the same price? |
| Confidence and residual | How uncertain is the reconstruction, and what remains unexplained? |

The market belief state is underdetermined when the permitted evidence cannot
produce a coherent explanation of price within a declared uncertainty range.
`underdetermined_market_view` is a valid and important output.

## 5. Thesis Formation

An investable thesis is a falsifiable, evidence-backed disagreement with the
market's implied view of one or more material value drivers, together with its
economic consequence from today's price and a credible path to recognition.

A thesis has three central components:

1. **Disagreement:** the market view, the variant view, why the market can
   maintain its view, the probability the variant economics are right, and
   what would invalidate the variant.
2. **Economic and price impact:** the causal path from the disputed driver to
   financial outcomes, value, downside, and the payoff distribution from
   today's price.
3. **Recognition:** the barrier sustaining the market view, the catalyst or
   accumulating evidence that can break it, who changes behavior, and the
   expected clock.

A disagreement without material economic impact is an opinion. A value gap
without a credible disagreement is cheapness. A disagreement and payoff with
no plausible recognition path can remain a research view, but it is not yet an
investable thesis.

### 5.1 Atomic Variant Claims and the Asset Thesis

An asset can have several variant claims. Each claim should be atomic at the
driver level; the asset thesis is the coherent synthesis of those claims.

```yaml
asset_thesis:
  thesis_id:
  asset_id:
  as_of_time:
  market_belief_state_ref:
  variant_claims:
    - driver:
      market_belief:
      variant_belief:
      evidence_refs: []
      market_error_explanation:
      probability_variant_is_right:
      invalidation:
  joint_scenarios: []
  financial_and_valuation_map_ref:
  recognition_paths: []
  aggregate_payoff_distribution_ref:
  uncertainty:
  prior_version_ref:
```

The synthesis layer is necessary because claims can interact or overlap. The
fund must not add several independently estimated price deltas when they share
the same revenue, margin, multiple, or probability assumption.

### 5.2 Variant Economics and Conditional Value

For a material driver $d$:

$$
V_{M,d}
\longrightarrow
\widehat F_{M,d},
\qquad
V_{V,d}
\longrightarrow
\widehat F_{V,d}.
$$

The joint scenario model propagates all accepted driver claims through the
financial statements or relevant asset economics and then through an explicit
valuation model:

$$
\{V_{V,d}\}_{d\in\mathcal D}
\longrightarrow
\widehat F_V
\longrightarrow
P_V.
$$

With today's observed price $P_0$, the conditional price difference is:

$$
\Delta P=P_V-P_0.
$$

$P_V$ is not a promise or a standalone target. It is the conditional value
under a specified scenario. The thesis record must also include downside if
the variant is wrong, the adverse path if recognition is delayed, time to
realization, and the uncertainty around every material assumption.

### 5.3 Recognition Path and Catalyst

The market-error explanation $G_M$ states why the market can reasonably
maintain its current belief despite the fund's evidence. “The market is not
paying attention” is not sufficient.

A **catalyst** is a discrete event or datapoint that makes $G_M$ harder to
maintain. A **recognition path** is the more general mechanism: it can contain a
single catalyst, a sequence of datapoints, estimate revisions, a positioning
change, or a gradual rerating.

```text
current barrier G_M
→ new observable evidence
→ participant belief or behavior changes
→ financial expectations or valuation changes
→ marginal price changes
```

The record distinguishes:

- $p_V$: probability the variant economics are right;
- $p_C$: probability the catalyst or evidence sequence occurs;
- $q_T$: probability of sufficient recognition by horizon $T$, conditional
  on the variant being right and the relevant evidence becoming observable;
- the expected and adverse recognition clocks.

Keeping these probabilities separate prevents fundamental confidence from
silently substituting for catalyst probability or market reaction.

### 5.4 Thesis Readiness

The thesis-readiness filter returns one of:

- `expression_ready`;
- `research_only`;
- `no_material_variant`;
- `insufficient_evidence`;
- `underdetermined_market_view`;
- `no_credible_recognition_path`;
- `hold_for_repair`; or
- `escalate`.

No thesis advances merely because its narrative is persuasive. Its market
baseline, variant claim, evidence, materiality, conditional payoff,
invalidation, recognition path, freshness, and mandate eligibility must all be
explicit.

## 6. Expression: From Thesis to Portfolio Decision

Expression translates thesis state through internal context into a complete
portfolio decision:

$$
\boxed{
D_t=\operatorname{Express}(\Theta_t;S_t,O_t,K_t)
}
$$

Selection, sizing, and timing remain the human-readable decision tuple:

$$
D_t=(\boldsymbol\chi_t,\mathbf w_t^\star,\boldsymbol\pi_t).
$$

They should not be implemented as three unconstrained language-model opinions.

### 6.1 Selection and Instrument Expression

Selection is multi-hot, not one-hot: multiple assets and instruments can be
selected at the same time. It also means more than naming a company. A thesis
can be expressed through common equity, options, credit, a pair, a basket, or
another permitted instrument, each with different exposure, carry, convexity,
liquidity, borrow, and residual risks.

The thesis system therefore produces a feasible expression set. Portfolio
construction chooses among those expressions in the context of the whole book.
A valid variant thesis can receive zero capital because it is already expressed
elsewhere, duplicates an existing factor exposure, has inferior expected value,
cannot be implemented safely, or loses to a better use of risk budget.

Selection can be represented after construction as:

$$
\chi_{i,t}=\mathbf 1[w_{i,t}^\star\neq 0],
$$

but the instrument and direction mapping must be preserved in the decision
record. Portfolio hedges and mandate-required exposures should be labeled
separately from alpha expressions rather than forced to claim a standalone
variant thesis.

### 6.2 Sizing: The Ideal Target Portfolio

Sizing produces the ideal target-weight vector:

$$
\mathbf w_t^\star
=
\operatorname{Optimize}
\left(
\text{expected payoff distributions},
\text{risk model},
S_t,O_t,K_t
\right).
$$

The target weight is the exposure the fund would prefer at time $t$ before
investment-timing and execution frictions. It is not the maximum permitted
weight. Maximum long and short weights are constraints:

$$
-w_i^{\max,\mathrm{short}}
\leq
w_{i,t}^\star
\leq
w_i^{\max,\mathrm{long}}.
$$

LLM research functions supply structured inputs: scenario probabilities,
conditional upside and downside, horizon, recognition uncertainty, crowding,
liquidity, borrow, and evidence quality. Explicit portfolio math reconciles
those inputs with correlation, active risk, factor exposure, costs, and hard
constraints. The optimizer can legitimately return zero.

### 6.3 Timing: The Current-to-Target Exposure Path

Timing determines whether, when, and under what conditions the portfolio should
move from current exposure to the ideal target:

$$
\mathbf w_t
\xrightarrow{\boldsymbol\pi_t}
\mathbf w_t^\star.
$$

The path can initiate, add, hold, trim, pause, hedge, exit, or wait. It can be
immediate, staged, event-contingent, or conditional on further evidence.

The central question is:

> Given the ideal target, current exposure, evidence already revealed, price
> already paid, remaining payoff, next information window, and portfolio risk,
> what exposure should the fund carry now and what would cause it to change?

Timing does not invent a new thesis or catalyst. It consumes the existing
thesis and recognition record. It also remains distinct from execution:

- **Investment timing** chooses the desired exposure path.
- **Execution scheduling** chooses order type, participation, venue, and trading
  schedule subject to cost and impact models.

### 6.4 The Complete Decision Record

```yaml
portfolio_decision:
  decision_id:
  as_of_time:
  thesis_refs: []
  expression_refs: []
  current_weights: {}
  benchmark_weights: {}
  active_weights: {}
  ideal_target_weights: {}
  selected_instruments: []
  exposure_path:
  binding_objectives: []
  binding_constraints: []
  expected_payoff_and_risk:
  no_action_reason:
  next_review_trigger:
  model_and_policy_versions: []
  approval_status:
```

No action is a positive decision when it states why current exposure is
preferred to every permissible change and identifies the next event, state
change, or review date that will cause reconsideration.

## 7. State Update and Learning

Observed outcomes update the system, but outcomes do not interpret themselves.
The review must separate:

1. what happened in the fundamental world;
2. what happened to market beliefs, positioning, and price;
3. what happened to the portfolio;
4. whether the thesis, expression, selection, sizing, or timing was responsible;
5. what remains luck or unresolved attribution;
6. which upstream object or rule should change.

A good thesis can lose money because it was early, badly expressed, oversized,
or crowded. A bad thesis can make money because of beta, factor exposure,
liquidity, or luck. Learning therefore routes the narrowest justified update
back to evidence, market reconstruction, thesis state, portfolio inputs, or
policy rather than rewriting the entire history after the fact.

The function closes as:

```text
external observation or internal-state change
→ relevance route
→ evidence object
→ market and thesis update
→ expression-ready filter
→ candidate expressions and optimizer inputs
→ ideal target portfolio
→ exposure path
→ approved mock decision
→ observed outcome
→ attribution and narrow recomputation route
```

## 8. What AI Changes

The architecture does not depend on the premise that AI is infallible. It
depends on the opposite premise: judgment should be decomposed, versioned,
challenged, and calibrated because it will sometimes be wrong.

AI can expand the feasible breadth and continuity of the fund by:

- monitoring more sources, assets, causal links, and read-throughs;
- maintaining point-in-time research and thesis memory;
- reconstructing competing market-belief explanations rather than one static
  consensus narrative;
- updating scenario and recognition probabilities as evidence changes;
- generating consistent structured inputs for explicit financial and portfolio
  models;
- preserving the causal chain behind every selection, size, and timing change;
- attributing errors to the correct stage rather than rewarding outcomes alone.

The fund becomes AI-native when this entire loop is executable and auditable,
not when an LLM writes a better investment memo.

## 9. Conclusion

A hedge fund is a recurrent transformation from context into capital. It
filters the world for investable relevance, compresses retained evidence into
market and variant belief states, and expresses material disagreements as
portfolio targets and exposure paths under an explicit objective, current
state, and constraint set.

The irreducible investment act is not having an opinion. It is identifying a
material disagreement, understanding why the market can sustain it, tracing
its economic consequence, specifying how it can become recognized, and
allocating scarce risk better than the alternatives. Everything else in the
system exists to make that act broader, faster, more disciplined, and more
auditable through time.

---

## Appendix A. Draft Function Map

This is a proposed execution map, not a production-ready runtime. Schemas,
thresholds, fixtures, and evaluation bands must be frozen before any node is
treated as executable.

| Order | Function | Type | Launch trigger | Input | Output | Rule or target | Next consumer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `relevance_route` | Filter | New artifact, observation, or coverage sweep | Raw artifact + coverage/exposure graph + internal context | Relevance disposition | Name a material transmission path or residual route | `evidence_compress` or residual store |
| 2 | `evidence_compress` | Compress | Retained artifact | Artifact + route | Atomic evidence objects | Preserve lineage, timing, epistemic type, and uncertainty | `evidence_support` |
| 3 | `evidence_support` | Filter | Evidence seeks material use | Evidence + intended use + related evidence | Support disposition | Test directness, independence, recency, conflict, and duplication | `thesis_update_route` or corpus |
| 4 | `thesis_update_route` | Filter | Supported evidence or scheduled review | Evidence + coverage graph + thesis index | Per-asset update routes | Route every affected asset or representation gap | `market_belief_compress` |
| 5 | `market_belief_compress` | Compress | Expectations change or thesis review | Point-in-time market snapshot + evidence | Market belief state | Explain material drivers, participants, alternatives, confidence, and residual | `variant_thesis_compress` |
| 6 | `variant_thesis_compress` | Compress | Current market belief state and variant evidence | Market state + evidence + prior thesis | Candidate thesis | State atomic disagreements, market-error explanation, falsifiers, and uncertainty | Payoff and recognition functions |
| 7 | `payoff_input_compress` | Compress | Material candidate thesis | Thesis + model inputs | Scenario and valuation inputs | Separate sourced facts, assumptions, and requested calculations | Financial model service |
| 8 | `recognition_compress` | Compress | Material candidate thesis | Thesis + market belief state | Recognition-path record | State barrier, evidence, participant reaction, clock, and probabilities | `thesis_readiness` |
| 9 | `thesis_readiness` | Filter | Current thesis, payoff, and recognition records | Versioned thesis package + policy | Readiness disposition | Apply explicit materiality, evidence, freshness, and investability rules | `expression_compress` or research queue |
| 10 | `expression_compress` | Compress | Expression-ready thesis | Thesis + permitted instrument state | Feasible expression set | Map economics into instruments without setting final weights | `sizing_input_compress` |
| 11 | `sizing_input_compress` | Compress | Feasible expressions or material risk change | Thesis package + risk observations | Optimizer-ready input | Emit distributions and uncertainty, not final weights | Portfolio optimizer |
| 12 | `timing_posture_compress` | Compress | Optimizer target changes or evidence window opens | Target + current state + thesis/market state | Contingent exposure path | Specify current exposure and state-contingent changes | Admissibility check |
| 13 | `action_admissibility` | Filter | Proposed mock action | Decision packet + hard-limit result + authority state | Admit, defer, reject, or escalate | Require complete lineage, constraint pass, and authority | Approval or mock blotter |
| 14 | `outcome_review_compress` | Compress | Review date, catalyst, fill, or material outcome | Decision snapshot + realized facts | Outcome-review object | Separate observation, interpretation, attribution hypotheses, and repair target | `recompute_route` |
| 15 | `recompute_route` | Filter | Outcome review completes | Review + current state | Narrow rerun route | Recompute only affected upstream objects; no change needs a next trigger | Appropriate upstream function |

## Appendix B. Non-Agent Services and Authority Boundaries

| Service or authority | Input → output | Boundary |
| --- | --- | --- |
| Point-in-time source store | Artifact/version → immutable source reference | Prevents provenance loss and availability-time leakage. |
| Entity, coverage, and exposure graph | Evidence/entities → linked assets and causal routes | Must be queryable and reproducible. |
| Financial and valuation calculator | Scenario inputs → payoff distribution | Numerical propagation belongs to explicit models. |
| Risk, factor, liquidity, borrow, and cost calculators | Market/portfolio data → measured risk inputs | Measurement is not a language-model opinion. |
| Portfolio optimizer | Expected payoff, risk, objectives, constraints → target weights or infeasibility | Must identify binding assumptions and constraints. |
| Hard-limit engine | Proposed decision → pass/fail and breached rule | A model cannot waive a limit. |
| Approval controller | Complete decision packet → approve, revise, defer, or reject | Decision authority is explicit and consequence-dependent. |
| Execution scheduler | Approved exposure change + market state → orders and schedule | Execution optimization is separate from investment timing. |
| Blotter and reconciliation | Approved decision/outcome → immutable state transition | Prevents retrospective rewriting. |

## Appendix C. Provisional Prompt Outlines

These are function contracts, not production-ready prompts. Every function uses
only declared point-in-time inputs, returns schema-valid structured output,
preserves input references, labels inference and forecast, and abstains with a
reason code rather than filling a material gap.

### `relevance_route`

Given one raw artifact, the coverage/exposure graph, and current internal
context, return exactly one primary relevance route, affected objects, causal
path, horizon, materiality, secondary tags, confidence, and review flag. Do not
assess thesis truth, pricedness, or portfolio action.

### `evidence_compress`

Convert a retained artifact into atomic evidence objects with exact source
locations, event and availability times, epistemic type, entities, domains,
causal channel, and uncertainty. Do not elevate assertions or write a thesis.

### `evidence_support`

Given an evidence object, intended use, and related evidence, return
`supported`, `supported_with_haircut`, `hold_for_resolution`, or `unsupported`
with failed rules and the narrowest repair request. Do not edit the evidence.

### `thesis_update_route`

Route supported evidence across the coverage graph and thesis index. Return all
affected assets, the causal route, the exact thesis component to revisit, and
any representation gap. Do not select capital.

### `market_belief_compress`

Reconstruct the smallest market-driver and participant-state map that can
explain the current price from permitted evidence. Return alternative models,
confidence, and unexplained residual; return `underdetermined_market_view` when
the evidence cannot discriminate among material alternatives.

### `variant_thesis_compress`

Produce atomic variant claims against the current market belief state. For each
claim state the driver, market belief, variant belief, evidence, market-error
explanation, probability, falsifier, dependencies, and uncertainty. Do not
assign an instrument or size.

### `payoff_input_compress`

Translate accepted variant claims into explicit scenario-model inputs. Separate
sourced facts, analyst assumptions, and requested deterministic calculations.
Do not invent missing financial inputs or perform hidden arithmetic.

### `recognition_compress`

State the current barrier, observable catalyst or evidence sequence, affected
participant cohort, belief/behavior update, transmission to price, probability,
clock, and disconfirming path. Return `no_credible_recognition_path` when the
mechanism is only a calendar date or vague future attention.

### `thesis_readiness`

Apply versioned readiness rules to the market belief, variant claims, payoff,
recognition, invalidation, freshness, and mandate fields. Return one declared
disposition and failed-rule list. Do not set a direction, instrument, or weight.

### `expression_compress`

For an expression-ready thesis, enumerate feasible permitted instruments and
state exposure mechanism, direction, basis risk, convexity, carry, liquidity,
borrow, and residual risks. Do not choose the final portfolio weight.

### `sizing_input_compress`

Compile optimizer-ready expected-payoff distributions, horizon, uncertainty
haircuts, liquidity, crowding, borrow, tail risk, and missing inputs. Do not emit
a target weight.

### `timing_posture_compress`

Given an optimizer target, current exposure, thesis state, recognition record,
and market state, produce a contingent exposure path with current action,
confirmation and disconfirmation branches, next review trigger, and
`no_timing_edge` when appropriate. Do not schedule orders.

### `action_admissibility`

Given the complete decision packet, deterministic limit result, and authority
state, return admit, defer, reject, or escalate with reason codes. Never waive a
failed limit or infer approval.

### `outcome_review_compress`

Given the original point-in-time decision and realized facts, separate
observation, interpretation, attribution hypotheses, luck, unresolved items,
and the narrowest repair target. Do not rewrite the original thesis or prior.

### `recompute_route`

Route the outcome review to the narrowest affected upstream function or return
`no_change` with a next trigger. Preserve competing attribution hypotheses when
the outcome does not distinguish them.

## Appendix D. V0 Validation Slice

The first executable test should be one frozen, public-source mock decision on
one approved common-equity instrument—not a platform-wide build.

The fixture should include:

- a source packet with at least one irrelevant item, one direct item, one
  read-through, one duplicated claim, one conflicting claim, and one stale item;
- a point-in-time market snapshot with estimates, valuation, ownership,
  positioning, price reaction, liquidity, and borrow where relevant;
- a frozen portfolio, benchmark, objective, constraint set, and policy version;
- an existing candidate thesis that the evidence can strengthen, weaken, or
  invalidate;
- at least one forced abstention or escalation case.

Acceptance requires:

1. every material output traces to an input or is labeled an inference;
2. no material input disappears without a reason and residual route;
3. the market reconstruction carries alternatives and can fail as
   underdetermined;
4. the thesis distinguishes truth, payoff, recognition, and invalidation;
5. the LLM emits no final portfolio weight and waives no constraint;
6. the optimizer can return zero despite a positive standalone thesis;
7. the timing output specifies a current-to-target policy, not an order;
8. the outcome review can route a failure to thesis, expression, sizing, timing,
   or unresolved luck without retrospective rewriting.

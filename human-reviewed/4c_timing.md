# 4c. Timing

Status: working brainstorm for human review  
Parent: [A Hedge Fund as a Function — Version 4](./hedge-fund-as-a-function-v4.md) ·
[Form a Variant View](2c_form-a-variant-view.md) ·
[Position Sizing](./4b_sizing.md)

## Purpose

Timing determines the path from the current portfolio to the target-weight
vector set by sizing: whether, when, and in what sequence the fund should
initiate, add, hold, trim, hedge, exit, pause, or wait. It is not a selection
decision or a generic attempt to predict the next price move.

Thesis formation defines the `variant_view` and `catalyst`. Timing uses that
record; it does not invent a second catalyst. Its job is to decide whether the
fund should carry the desired risk before, through, or after the relevant
evidence window.

The central question is:

> Given the target weight, thesis path, evidence already revealed, price
> already paid, and next likely information, should the fund initiate, add,
> hold, trim, pause, exit, hedge, or wait?

Timing is distinct from execution. **Investment timing** decides when the fund
wants risk exposure. **Execution timing** decides how the approved change is
traded while managing liquidity, market impact, and transaction cost.

## Timing Principles

1. **There is no need to buy the bottom.** A position can be attractive after
   it has already risen if the remaining payoff still exceeds the remaining
   risk.
2. **Big trends can run longer than expected.** A secular tailwind can keep
   compounding as evidence, estimates, adoption, and market updates unfold.
3. **Wait for useful validation, but not until the opportunity is exhausted.**
   Confirmation can improve a decision while leaving substantial upside.
4. **A thesis needs a marginal price setter.** Be aware of the buyer, seller,
   or short who could change the price, what they currently believe or need to
   do, and what evidence could cause them to act.
5. **Being right is not the same as being paid.** The view must be recognized
   and transmitted into price within a horizon that makes the position worth
   carrying.
6. **The path must be survivable.** A position that exceeds financing,
   liquidity, drawdown, risk-budget, mandate, or patience constraints can fail
   even when the terminal thesis is right.
7. **Timing is a state-contingent exposure policy, not an entry date.** It
   specifies how much of the desired risk to carry now and what evidence should
   cause the fund to add, hold, reduce, exit, or continue waiting.
8. **Being first has a distinct payoff and failure mode.** It preserves the
   return that may disappear in a large confirmation move, but it also accepts
   the greatest risk of catching a falling knife before enough evidence exists.

## Brainstorm

### Core Principle

A position need not be bought before it moves. A confirming price move can be
evidence that a durable change is becoming real. The fund may buy or add after a
stock is up when the fundamental and market-implied evidence says that the
remaining opportunity is still attractive.

```text
fundamental tailwind strengthens
→ price confirms the change
→ market still underestimates duration, magnitude, breadth, or economic capture
→ remaining payoff justifies owning or increasing exposure
```

The relevant question is not “has the security gone up?” It is “has the price
move exceeded, matched, or lagged the change in likely economic outcomes and
market expectations?”

The practical version of “the market can stay irrational longer than the fund
can stay solvent” is broader than literal insolvency. The market may simply
require more evidence, operate on a different horizon, or be constrained from
acting. Timing must therefore ask whether the fund can carry the position until
the expected recognition mechanism has had a reasonable chance to work.

### Inputs

- **Thesis path:** the `variant_view`, scenario/payoff map, market belief,
  catalyst, invalidation conditions, and horizon.
- **Current evidence:** what has changed in the fundamental world and what
  remains unresolved.
- **Market state:** price path, valuation, estimates, positioning, flows,
  volatility, liquidity, and financing/borrow where relevant.
- **Internal context:** existing exposure, factor and theme overlap, remaining
  risk budget, liquidity capacity, and hard limits.

### Recognition-Horizon and Path-Survivability Risk

Fundamental conviction and timing conviction answer different questions:

- **Truth probability:** how likely is the variant view to be right?
- **Recognition probability:** conditional on the view being right, how likely
  is the market to update toward it by horizon $T$?
- **Path survivability:** can the position remain financeable, liquid,
  admissible, and behaviorally holdable until that recognition can occur?
- **Remaining payoff:** after waiting, confirmation, carry, and price movement,
  is enough return still available?

The recognition probability $q_T$ is supplied by the thesis record:

$$
q_T
=
\Pr(\text{the market recognizes the variant view by }T
\mid \text{the variant view is right}).
$$

If $p_{\mathrm{truth}}$ is the probability that the view is right, then the
following is a useful diagnostic:

$$
\Pr(\text{right and recognized by }T)
=
p_{\mathrm{truth}}q_T.
$$

This is not an expected-return formula. Deterministic scenario analysis must
also include the return and loss in every state, partial recognition, time,
carry, financing, liquidity, and the path before resolution. Its purpose is to
prevent a high truth probability from being mistaken for a high probability of
getting paid within the decision horizon.

Recognition moves through several gates:

```text
variant view is true
→ decision-relevant evidence appears
→ relevant participants notice and update
→ changed beliefs or constraints produce orders
→ orders transmit into price
→ the position survives long enough to realize the payoff
```

A failure at any gate can turn a correct view into a poor trade. Timing should
name the weakest gate and the observation that would show it is improving or
failing.

#### Three clocks

- **Business and capital clock:** when the underlying economics, capacity,
  balance sheet, or competitive position actually change.
- **Expectations clock:** when forecasts, valuation assumptions, and investor
  beliefs update.
- **Stock and positioning clock:** when buyers, sellers, short-coverers, or
  forced flows move the security.

The clocks can lead or lag one another. Timing chooses where across them the
fund is willing to carry risk; it must not assume that an improvement in the
business immediately creates an improvement in the stock.

#### Path-survivability check

Before carrying pre-recognition risk, ask:

- Can the fund finance and borrow the expression through the plausible delay?
- Can it tolerate the adverse mark-to-market path without breaching risk limits
  or being forced to exit?
- Will liquidity remain sufficient under stress?
- Is the expression's tenor compatible with the recognition horizon?
- What capital, carry, and opportunity cost accumulates while waiting?
- If the position is reduced or exited, what evidence would permit disciplined
  re-entry rather than permanent abandonment after an early loss?

A thesis can be selected and have a positive target size while the correct
current exposure is zero because its recognition horizon or path is not yet
investable.

### Value Of Waiting Versus Cost Of Waiting

The central timing comparison is not “up or down next?” It is whether the value
of additional information exceeds the deterioration in opportunity caused by
waiting.

**Value of waiting:**

- better evidence and a higher-quality posterior judgment;
- lower thesis, catalyst, or event uncertainty;
- observation of the market's reaction function and marginal participant;
- a more survivable path or a cleaner expression; and
- avoidance of carrying risk through an information-poor interval.

**Cost of waiting:**

- foregone return and a worse entry price;
- less remaining upside or asymmetry;
- loss of liquidity, borrow, capacity, or instrument availability;
- crowding after the view becomes more widely recognized; and
- opportunity decay as the catalyst approaches or the thesis becomes priced.

The default rule is:

```text
act now when the cost of waiting exceeds the value of more information
wait when the value of more information exceeds the cost of waiting
stage exposure when the comparison is close or highly uncertain
```

Paying a higher price after confirmation is rational when a modest amount of
foregone upside buys a much larger reduction in truth, recognition, and path
risk while sufficient payoff remains. Waiting is too expensive when the signal
arrives only after the opportunity is largely priced.

Let $w_i^*$ be the full target weight produced by sizing and let
$\pi_i(X_t)\in[0,1]$ be the timing fraction implied by the current evidence and
market state $X_t$. The requested exposure is:

$$
w_i^{\mathrm{requested}}(t)
=
\pi_i(X_t)w_i^*.
$$

Timing determines $\pi_i(X_t)$ and its state transitions. It does not create a
second sizing method, override hard limits, or decide how the approved exposure
change is executed.

### Being First: Owning Risk Before Recognition

“Being first” means carrying risk before the relevant marginal participants
have recognized and expressed the thesis. It does not require being literally
the first investor, and it does not mean buying merely because a security has
fallen. The timing advantage comes from entering before the recognition event
causes a discontinuous repricing.

This posture matters most when waiting for confirmation could consume a large
share of the payoff. If strong evidence is likely to cause a 20% upward gap,
owning before the evidence preserves that move; buying afterward pays away the
20% in exchange for much greater certainty. The decision is whether the
expected confirmation gap is worth the incremental truth, path, and tail risk
borne before confirmation.

#### Three ways to be first

| Posture | What is known at entry | Potential reward | Primary risk |
| --- | --- | --- | --- |
| **Pre-evidence** | The mechanism is plausible, but direct validating evidence has not yet appeared. | Captures nearly the entire move if the thesis inflects. | Highest risk that the thesis is wrong, premature, or missing a critical fact. |
| **Interpretation-first** | Public evidence exists, but the market has not connected it to the disputed driver, financials, or valuation. | Captures a large recognition move with more evidentiary support. | The interpretation may be wrong, already understood, or economically immaterial. |
| **Positioning-first** | Some participants are beginning to update, but broad forecasts, ownership, and price have not caught up. | Captures the broadening of recognition while avoiding the earliest uncertainty. | Less upside remains, and the apparent update may be noise or a temporary flow. |

Interpretation-first is generally the most attractive form: the fund is early
to the implication, not early to the existence of evidence. Pre-evidence
positions require the highest hurdle and the smallest initial fraction of full
risk.

#### Benefits of going first

- **Capture the confirmation gap:** retain returns that may disappear in one
  large move when the disputed fact becomes visible.
- **Maximum remaining asymmetry:** enter before estimates, valuation, and
  positioning reflect the thesis.
- **Better capacity and liquidity:** establish exposure before the trade becomes
  crowded, borrow tightens, or the instrument becomes expensive.
- **More ways to win:** benefit from both improving fundamentals and subsequent
  market recognition rather than only the remaining post-recognition move.
- **Ability to build deliberately:** use time before the catalyst to establish a
  controlled position rather than chase after a gap.

#### Costs and risks of going first

- **Falling-knife risk:** continued selling may reflect new information rather
  than temporary fear, forced flows, or slow recognition.
- **Adverse selection:** other participants may understand the business,
  balance sheet, capital structure, or event better than the fund does.
- **Prematurity:** the view may eventually be right but lie outside the
  investable recognition horizon.
- **Non-recognition:** the expected catalyst may not reveal the disputed fact or
  may not cause relevant participants to act.
- **Path damage:** drawdown, volatility, financing, borrow, liquidity, or risk
  limits may force an exit before the thesis resolves.
- **Opportunity cost:** capital is consumed while a cheaper discriminating test
  or better entry may still be ahead.
- **Behavioral damage:** an early loss can make the fund unwilling to re-enter
  precisely when confirmation finally arrives.

#### Falling-knife test

A lower price is not itself evidence of greater expected value. Before taking a
being-first posture in a falling security, answer:

- What adverse information could the price decline be revealing?
- Which sellers appear informed, forced, constrained, or purely price-driven?
- What evidence supports the claim that the selling is temporary or excessive?
- Can the company and the selected security survive the downside scenario and
  the expected recognition delay?
- What observation would distinguish “early but right” from “wrong”?
- What is the maximum pre-confirmation exposure and loss budget?
- What invalidates the entry, and what later evidence permits re-entry?

If these questions cannot be answered, the position is not a disciplined early
entry. It is an unbounded bet that recent selling will reverse.

#### Being-first admission rule

Going first should be admitted only when:

- the thesis has a complete causal bridge and a specific market-error
  explanation;
- the expected price paid away for confirmation is material relative to the
  total payoff;
- the incremental downside from acting early is bounded and survivable;
- a decision-relevant evidence window and recognition path are specified;
- the expression can survive the required tenor without unacceptable carry,
  financing, or liquidity risk;
- the falling-knife test finds no unresolved decision-critical adverse signal;
  and
- the policy includes explicit add, reduce, exit, and re-entry conditions.

Being first does not imply being fully sized. A common posture is:

```text
small pre-recognition position
→ add when the causal evidence strengthens
→ add when relevant participants begin to update
→ reach full intended exposure only while remaining payoff still clears the hurdle
```

The pre-recognition fraction should be small enough that adverse evidence can
be processed without a forced exit, but large enough that a discontinuous move
matters to portfolio returns. The target size still comes from sizing; timing
decides how much of that target to carry before each recognition gate.

### Marginal Price Setter and Catalyst Path

Timing requires a view of how the thesis reaches price. The relevant marginal
buyer, seller, or short-coverer is not necessarily an identifiable individual;
it is the type of market participant most likely to set the next meaningful
price at the relevant horizon.

For each timing decision, ask:

- Who appears to own, avoid, short, or finance the risk today?
- Who becomes the incremental buyer or seller if the disputed fact is
  confirmed?
- What changes their behavior: earnings revisions, a KPI, valuation, a policy
  decision, liquidity pressure, index flow, a mandate constraint, or short
  covering?
- Is the expected buyer likely to act before, at, or after the next evidence
  window?
- What observable proxies support this view: estimates, ownership, flows,
  borrow, options, volume, liquidity, or price reaction to information?

The fund does not need a story about a specific person. It needs a falsifiable
view of the market's reaction function. A correct fundamental thesis with no
credible route to a marginal buyer can remain a correct but poorly timed
investment.

### 1. Thesis-Path Archetype

Timing starts by classifying the path through which the thesis is expected to
resolve. The same entry rule should not govern an early inflection, a secular
compounder, an event, and a panic-driven dislocation.

| Archetype | What the fund believes | Appropriate timing posture |
| --- | --- | --- |
| **Early inflection** | A material change is beginning but remains weakly visible or disputed. | Enter selectively and size cautiously; require early evidence and a clear invalidation condition. |
| **Confirming secular tailwind** | A durable trend is visibly working, but its duration, magnitude, breadth, or profit capture remains underappreciated. | Enter or add on confirmation while the trend is strengthening and remaining payoff exceeds trend and valuation risk. |
| **Catalyst / event** | A defined event or evidence window can test a material `variant_view`. | Decide explicitly whether the payoff merits owning risk before the event, or whether post-event confirmation is superior. |
| **Dislocation / panic** | Forced selling, liquidity stress, or fear creates a price disconnected from plausible value. | Focus first on survival, liquidity, balance-sheet/capital-structure risk, and the mechanism that closes the gap. |
| **Mature or crowded thesis** | The thesis is increasingly reflected in price and the marginal surprise has diminished. | Raise the hurdle for new risk; trim, hedge, or hold only while remaining upside and trend persistence justify fragility risk. |
| **Broken thesis** | The central causal claim, payoff map, or catalyst path has failed. | Exit, pause, or reverse according to the thesis and risk rules; do not relabel invalidation as a timing problem. |

### Entry Decision

The entry decision specifies whether to own exposure now, wait for confirmation,
or decline the trade. It must be made against the **remaining** payoff, not the
historical return already earned by others.

For every candidate position, record:

```text
thesis-path archetype
current stage: early | confirming | mature | broken
next evidence window
remaining upside / downside by scenario
why entry now is preferable to waiting
what evidence would justify waiting instead
```

An entry can be justified by one or more of:

- a price that has not incorporated the anticipated evidence;
- fundamental confirmation that materially raises confidence or expected value;
- upward revisions to the duration, magnitude, or breadth of a tailwind;
- an improving market mechanism, such as estimate revisions or a new marginal
  buyer; or
- attractive asymmetry after a dislocation.

### 2. Confirmation and Trend-Persistence Timing

For a confirming secular tailwind, price momentum is admissible evidence, not
the thesis by itself. The fund should ask whether the trend is becoming more real
and more economically important faster than the market is repricing it.

Trying to buy the exact bottom can create a second failure: the fund can be
right eventually, suffer enough early pain to exit, and then lack a rule for
re-entering. Every early or reduced position should therefore have explicit
re-entry conditions. Renewed buying is useful evidence only when it can be
connected to new information, an anticipated participant response, and a still
attractive remaining payoff.

#### Evidence of persistence

- Fundamental indicators, demand, backlog, capacity use, margins, or cash flow
  continue to improve or accelerate.
- The trend spreads through an expected value chain or customer base rather than
  depending on one fragile observation.
- Earnings estimates or other measurable expectations still lag the revised
  economics.
- The company is demonstrably capturing the value pool rather than merely being
  adjacent to a popular narrative.
- Price confirmation is consistent with the evidence and does not exhaust the
  scenario-weighted upside.

#### Warnings of saturation or fragility

- Price appreciation is materially faster than improving economics, estimates,
  or the plausible valuation range.
- The evidence is narrowing, decelerating, or becoming dependent on a single
  customer, product, or event.
- Positioning, valuation, liquidity, or financing creates an asymmetric unwind
  risk.
- The market's prior skepticism has visibly disappeared without a correspondingly
  larger remaining payoff.

#### Default actions

| State | Default action |
| --- | --- |
| Evidence strengthens; remaining payoff remains attractive | Initiate or add, subject to sizing and portfolio constraints. |
| Evidence strengthens; price has caught up | Hold or wait; do not add merely because the trend is popular. |
| Evidence is unchanged; price falls without thesis impairment | Re-underwrite; add only if the scenario/payoff map improves and portfolio risk permits. |
| Evidence weakens or the market now prices the thesis | Trim, pause, hedge, or exit. |

### Staging and Execution

Investment timing may choose a one-time entry or a staged transition. Staging
is useful when uncertainty, event risk, liquidity, or portfolio constraints
make the desired final exposure inappropriate today.

The timing decision specifies the desired exposure path. Execution then selects
the trading schedule, order style, participation limit, and cost/risk tradeoff.
Execution cannot repair a weak investment-timing decision.

### Catalyst-Aware Exposure Path

The catalyst is defined in thesis formation as the mechanism that closes the
market-error explanation. Timing does not redefine it. For each relevant
evidence window, timing records the desired exposure before and after the
catalyst: what becomes observable, whose view may change, and the expected
effect on expectations, positioning, or price.

Typical choices are:

- own full, partial, or no exposure before the event;
- wait for the event to remove uncertainty and accept a potentially higher entry
  price;
- add only if the event confirms a specified condition; or
- reduce risk because the event could reveal a binary thesis failure.

### Add, Trim, Exit, Pause, and Hedge Rules

Timing rules should be contingent on evidence and market state, not only on a
mechanical price target.

- **Add:** confirmation improves expected value or confidence and remaining
  payoff still clears the risk hurdle.
- **Trim:** price incorporates more than the new evidence justifies, risk budget
  is breached, or crowding/liquidity fragility rises.
- **Exit:** the thesis invalidates, the catalyst/path fails, the payoff is
  realized, or a superior use of risk budget exists.
- **Pause:** evidence is insufficient or contradictory; preserve the research
  object but do not add risk.
- **Hedge:** retain the thesis while reducing a separable macro, factor, event,
  or portfolio risk.

### No-Action Decision

No action is a positive timing decision. It applies when a thesis is sound but
the expected value of owning risk today is inferior to waiting for a specified
evidence condition, a better price, a portfolio-risk release, or a more liquid
implementation window.

Every no-action decision must state its next review trigger. “Wait for a better
entry” is insufficient without a reason and a condition that resolves it.

### Minimum Decision Record

```yaml
timing_policy:
  thesis_ref:
  thesis_path_archetype:
  current_stage: early | confirming | mature | broken
  recognition_posture: first | staged | confirming | late
  firstness_type: pre_evidence | interpretation_first | positioning_first | not_applicable
  decision_horizon:
  truth_probability_ref:
  recognition_probability_by_horizon_ref:
  weakest_recognition_gate:
  expected_confirmation_gap:
  falling_knife_assessment:
    price_decline_driver:
    possible_informed_selling:
    evidence_of_forced_or_temporary_selling:
    survival_assessment:
    early_but_right_vs_wrong_test:
  path_survivability:
    financing_and_carry:
    drawdown_and_risk_budget:
    liquidity_under_stress:
    instrument_tenor:
    opportunity_cost:
  value_of_waiting:
  cost_of_waiting:
  full_target_weight_ref:
  pre_confirmation_max_fraction:
  current_fraction_of_full_risk:
  decision: initiate | add | hold | trim | exit | pause | hedge | no_action
  next_evidence_window:
  remaining_payoff_assessment:
  price_vs_evidence_assessment:
  entry_or_change_rationale:
  risk_if_wrong:
  add_if: []
  hold_if: []
  reduce_if: []
  exit_if: []
  reenter_if: []
  next_review_trigger:
  reason_codes: []
```

Useful reason codes include:

```text
recognition_horizon_too_long
path_not_survivable
value_of_waiting_exceeds_cost
being_first_not_justified
falling_knife_risk_unresolved
expected_confirmation_gap_material
scout_position_only
wait_for_validation
confirmation_too_expensive
remaining_payoff_insufficient
no_credible_marginal_buyer
thesis_invalidated
no_action
```

### Open Decisions

- Which evidence and market-state measures should define a confirming secular
  tailwind in V0?
- When should positive momentum justify an add versus merely prevent a trim?
- What event-risk and liquidity thresholds require staged entry or a no-action
  decision?
- What minimum $q_T$ and remaining annualized payoff justify carrying
  pre-recognition risk?
- How should path-survivability failures reduce the timing fraction versus
  forcing a different expression, smaller target size, or no selection?
- Which observations are strong enough to trigger re-entry after an early exit?
- How large must the expected confirmation gap be to justify going first?
- What maximum fraction of full intended exposure should be permitted before
  direct evidence or market confirmation?
- Which evidence best distinguishes informed selling from forced or temporary
  selling in a falling security?

# 4b. Position Sizing

Status: canonical sizing framework for human review
Parent: [A Hedge Fund as a Function — Version 4](./hedge-fund-as-a-function-v4.md)

## Purpose

Position sizing turns the candidate-thesis set for the investable universe into
target portfolio weights. It decides how much of the portfolio's scarce risk
budget each asset should receive. It is not a synonym for conviction, a reward
for a good story, or a mechanical translation of upside into capital.

For $\mathcal U=\mathcal U(C^I)$, the output is:

$$
Z=\{w_i\}_{i\in\mathcal U},
\qquad
w_i\in[\underline w_i(K),\overline w_i(K)].
$$

A nonzero $w_i$ allocates capital long or short. When $K$ permits a zero
weight, $w_i=0$ is a valid portfolio-construction result, not a rejection of
the candidate thesis or a separate selection decision.
The lower and upper bounds come from the applicable mandate and constraints
$K$; this framework does not prescribe numerical position limits.

The thesis system supplies structured judgments. Deterministic portfolio and
risk systems later reconcile those inputs with correlation, factor exposure,
liquidity, costs, and hard constraints. This document defines the core
single-thesis inputs to that decision.

[2E. Calculate Expected Returns](./2e_calculate_expected_returns.md)
supplies the optimizer's thesis-level return inputs: scenario probabilities,
horizon returns, summary statistics, and uncertainty. The 2A–2E series
already encompasses candidate selection. Sizing combines those outputs with
portfolio-level dependencies, risk, costs, and constraints to calculate target
weights, including zero. Do not apply an additional probability multiplier
for conviction or recognition already represented in 2E's scenario weights.

```text
candidate thesis set and payoff distributions
→ volatility-adjusted risk capacity
→ fundamental-side conviction
→ positioning and crowding adjustment
→ upside, downside, and asymmetry
→ proposed weights, including zero
→ portfolio-level optimization and constraints
→ target-weight vector
```

## 1. Market factors

Market factors determine the risk capacity and path vulnerability of an
otherwise attractive thesis. They are not evidence that the thesis is true;
they determine how much risk the portfolio can safely take while waiting for it
to resolve.

### 1.1 Volatility

Volatility determines how much capital produces a given amount of risk. All
else equal, a more volatile asset should receive less capital for the same risk
budget. But realized volatility is not the whole risk estimate: event risk,
gap risk, downside skew, correlation in stress, and liquidity deterioration can
matter more than a benign trailing-volatility number.

Ask:

- What is normal realized and implied volatility at the intended horizon?
- What is the expected move through the next known catalyst or event?
- What is the adverse path under the disconfirming perspective?
- Does volatility rise precisely when the rest of the portfolio is vulnerable?

The output is a risk-scaled capacity, not a final weight.

### 1.2 Positioning and crowding

Crowding changes the path and sometimes the payoff even when the fundamental
thesis is correct. It answers, **who already owns or is short this view, who
sets the marginal price, and what happens if they must change position?**

Crowding can cut both ways:

- A crowded long can amplify downside when the thesis disappoints or liquidity
  falls.
- A crowded short can create squeeze risk and make a correct bear thesis
  untradeable on the path.
- An underowned view may offer room for new buyers, but lack of ownership is not
  proof that it is unpriced.

Assess ownership, hedge-fund and long-only positioning, short interest and
borrow, options and dealer state, flows, liquidity, leverage, and concentration
of likely sellers or buyers. Apply a sizing haircut when the expected exit is
one crowded door, and record whether crowding is a risk, a catalyst amplifier,
or both.

## 2. Thesis inputs

Thesis inputs determine whether the fund should spend risk capacity on this
asset. Fundamental conviction is a probability distribution over what is true;
the payoff map is the numerical return distribution conditional on each
perspective.

### 2.1 Fundamental-side conviction

Fundamental conviction is confidence in the underlying truth distribution: the
causal model, the evidence, the scenario weights, and the conditional economics.
It answers, **how likely is the variant view to be right?**

It does not answer whether the view is already priced, whether the catalyst
will arrive, or whether the position is crowded. Those are separate inputs.

Increase fundamental-side conviction when the evidence is direct, independent,
diagnostic, current, and consistent with the causal model. Reduce it for sparse
or correlated evidence, unresolved model ambiguity, a weak market-belief
estimate, or an unclear invalidation test.

The output should be a probability distribution and uncertainty range—not a
single adjective such as "high conviction."

### 2.2 How much upside

Upside is the conditional return from today's price if the variant view is
recognized. It must be paired with downside, probability, and time—not
recorded as a standalone target-price percentage.

For each perspective, specify:

```text
probability
× target price / return from today's price
× time to realization
× adverse path and loss if wrong or delayed
```

The relevant question is not "how much upside exists?" It is:

> Is the probability-weighted payoff, after downside and time, large enough to
> justify consuming scarce portfolio risk?

An attractive-looking upside case should receive little size when it is already
priced, low probability, far-dated with no credible catalyst, or paired with
unbounded downside. Conversely, a modest expected return can deserve capital
when the downside is controlled, the catalyst is near, and the position
diversifies the book.

## Sizing synthesis

Sizing combines 2E's expected returns and supporting scenarios with portfolio
risk, costs, and constraints. Conviction and catalyst assessments already
encoded in scenario probabilities must not multiply expected return again.
Additional adjustments must identify a distinct risk or estimation uncertainty
and explain how it is represented.

## Minimum sizing input record

```yaml
sizing_input:
  thesis_ref:
  volatility_and_tail_risk:
  fundamental_probability_distribution:
  market_belief_and_pricedness_confidence:
  conditional_upside_downside_and_horizon:
  catalyst_confidence_and_path_risk:
  positioning_and_crowding_assessment:
  liquidity_and_exit_assessment:
  proposed_risk_allocation:
  uncertainty_haircuts: []
  portfolio_constraints_to_check: []
```

## Mean–Variance Optimizer: Starting Point

A mean–variance formulation chooses portfolio weights $w$ using expected
returns $\mu$ from 2E and a portfolio return covariance matrix $\Sigma$:

$$
\max_{w \in \mathcal W}\quad
w^\top\mu
- \frac{\lambda}{2} w^\top\Sigma w
- C(w-w_0).
$$

- **Expected Return:** $w^\top\mu$ is expected portfolio return. For this formulation, use asset returns in excess of the cash funding rate and account for cash consistently.
- **Risk:** $w^\top\Sigma w$ is portfolio variance, including cross-asset dependencies; $\lambda$ controls the penalty for variance. The covariance model is a separate estimate, not something supplied by independent bull/base/bear tables.
- **Costs:** $w_0$ is the current portfolio. $C$ represents trading costs; include holding, borrow, and financing costs consistently where applicable, without duplicating costs already in expected returns.
- **Constraints:** $\mathcal W$ contains the mandate's position, leverage, exposure, liquidity, and other applicable limits.
- **Consistent Inputs:** Align return and covariance horizons and units. A long-horizon thesis forecast cannot be paired mechanically with a daily risk estimate.

The optimizer consumes estimates; it does not infer which thesis is true or
validate 2E's probabilities. A full return distribution is unnecessary for
this objective, and solving it does not require assuming normally distributed
returns. It does measure risk through variance, so evaluate tail, liquidity,
and path risks separately. Scenario-based objectives need aligned joint
portfolio scenarios.

Treat this as a starting formulation, not an adopted final objective. Test
weight sensitivity to plausible forecast and risk-model changes before relying
on the allocation.

References: [Cvxportfolio return models](https://www.cvxportfolio.com/en/stable/returns.html),
[risk models](https://www.cvxportfolio.com/en/stable/risks.html), and
[MOSEK on estimation error](https://docs.mosek.com/portfolio-cookbook/estimationerror.html).

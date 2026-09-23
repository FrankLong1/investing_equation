# 2E. Calculate Expected Returns

[Core model v4](./hedge-fund-as-a-function-v4.md) ·
[Model Price Impact](./2d_model_price_impact.md) ·
[Position Sizing](./4b_sizing.md)

## Purpose

Calculate the expected total return from today's price over a specified
horizon, using the variant view from 2C and the conditional price model from
2D. Expected return is the probability-weighted average across plausible
outcomes, including being right, partly right, wrong, or right but too early.
It is not the upside to a single target price.

The central questions are: **what could we earn or lose, how likely is each
outcome, and how reliable is that estimate?** Scenarios and their probabilities
support that calculation and preserve its downside and uncertainty. Portfolio
weights and optimizer design belong in [4B sizing](./4b_sizing.md).

## The Bridge from Variant View to Expected Return

Start with the specific disagreement already established in 2B–2C. A large
business opportunity is not enough: the calculation must identify what is
missing from today's price and how that changes the prospective payoff.

| Input | Question | Owner / use in 2E |
|---|---|---|
| Market expectations | What operating outcome and valuation does today's price appear to embed? Distinguish inferred pricing from published consensus. | Bring forward 2B. |
| Variant view | What specifically do we expect to differ, by how much, and why? | Bring forward 2C and its evidence / disconfirmation tests. |
| Conditional price impact | If that view plays out, what changes in earnings, cash flow, and valuation, and what price follows? | Bring forward 2D; do not treat the business surprise as the same percentage stock return. |
| Likelihood | How likely are our view, partial success, and the competing outcomes? | Estimate scenario probabilities and explain the evidence. |
| Recognition and horizon | How much of the difference could be reflected in price by the measurement date? | Include delay or incomplete recognition in scenario prices and probabilities. |
| Payoff if wrong | What price and return follow if the market is right or outcomes are worse than either forecast? | Include failure and adverse cases in the same calculation. |

This combines two documented approaches: CFRA's public equity-research
methodology starts with expectations embedded in prices and identifies variant
perceptions; Damodaran's scenario-analysis framework calculates values under
alternative outcomes and a probability-weighted value where probabilities can
be estimated. The workflow here is our synthesis, not a claim that every fund
uses one standardized formula or explicitly calibrated scenario weights.

Sources: [CFRA equity research methodology](https://www.cfraresearch.com/insights/faq/what-is-cfra-equity-research-methodology/),
[Damodaran, Investment Valuation — scenario analysis](https://pages.stern.nyu.edu/~adamodar/pdfiles/DSV2/DSV2.pdf).

## 1. Define the Range of Outcomes

- **Scenarios:** What plausible combinations of operating outcomes, valuation, and market recognition could occur? Include partial success, failure, and material adverse outcomes.
- **Common Horizon:** At what date are we measuring every scenario's price and return?
- **Coherent Cases:** Make scenarios mutually exclusive and collectively exhaustive at the chosen level of detail. Split “right” into recognized and not-yet-recognized outcomes where necessary; do not count “right but late” twice.
- **Linked Drivers:** Which assumptions move together? Build consistent scenarios across affected debates rather than treating correlated outcomes as independent bets.

## 2. Assign Probabilities

- **Evidence and Base Rates:** What supports each probability, including relevant historical frequencies, current evidence, and competing explanations?
- **Truth and Recognition:** How likely is the business outcome, and how likely is recognition by the horizon conditional on that outcome? Preserve the distinction when constructing joint scenario probabilities.
- **Uncertainty:** How sensitive is the assessment to uncertain evidence, market expectations, or model assumptions? Use alternative probability sets where a precise estimate is not defensible.
- **Reconciliation:** Do probabilities sum to 100%, with material residual outcomes explicitly represented?
- **Updates:** What evidence would change the weights or require a new scenario?

## 3. Calculate Expected Return

- **Scenario Prices:** Run each scenario through the 2D model. Estimate the price at the common horizon, allowing for incomplete recognition, rather than assuming full convergence to modeled value.
- **Total Returns:** Calculate returns from a dated current price, including distributions where applicable. State the instrument and whether returns are gross or net of specified costs.
- **Expected Return:** Calculate the probability-weighted average of scenario total returns using an explicit spreadsheet or calculation model. Retain dispersion, probability of loss, and material downside scenarios alongside the mean; they answer different questions.
- **Path Risk:** Record interim drawdown, funding, or liquidity risks separately; an attractive terminal return does not describe the path needed to reach it.

For a cash equity, with scenario $s$, current price $P_0$, horizon price
$P_{T,s}$, and cash distributions $D_s$ received through the horizon (without
reinvestment), gross total return and expected return are:

$$
R_s = \frac{P_{T,s} + D_s - P_0}{P_0},
\qquad
\widehat{\mathbb{E}}[R_T] = \sum_s p_s R_s,
\qquad
\sum_s p_s = 1.
$$

Use instrument-specific payoff calculations for derivatives and reconcile
short-position cash flows and financing in sizing. State any costs already
included so 4B does not deduct them again.

### Illustrative Variant-View Calculation

All numbers below are invented. The stock is $100. Our reading of market
expectations is $5 of next-year EPS at 20× earnings. Our variant view is $6 of
EPS because margins improve more than expected. If the market recognizes that
outcome and assigns 22× earnings, the horizon price is $132: 32% upside. The
multiple increase needs its own justification; it is not automatic when EPS
beats expectations.

Suppose we assign 60% probability to the business thesis and, conditional on
that thesis, 75% probability to recognition by the one-year horizon:

| Joint outcome | Probability | Horizon price | Return from $100 |
|---|---:|---:|---:|
| Thesis right and recognized | 60% × 75% = 45% | $132 | +32% |
| Thesis right but recognition delayed | 60% × 25% = 15% | $110 | +10% |
| Thesis wrong / adverse outcome | 40% | $80 | −20% |

With no dividends or costs, expected one-year return is
**45% × 32% + 15% × 10% + 40% × (−20%) = 7.9%.**

The $110 delayed-case price and $80 failure-case price also require models;
they are not implied by the probabilities. The coarse failure case is grouped
for illustration and should be split when materially different outcomes matter.

The variant view explains the earnings disagreement; 2D explains its price
impact; 2E weighs that payoff against delay and failure. Neither 32% upside nor
60% × 32% is the expected return. Do not multiply the resulting 7.9% by
conviction or recognition probability again. It is a total-return forecast,
not automatically 7.9% alpha; benchmark-relative return requires a matching
benchmark forecast over the same horizon.

## 4. Assess How Reliable the Estimate Is

- **Estimation Method:** Are probabilities based on a relevant historical reference class, a statistical model tested on later unseen observations, or explicit analyst judgment? Record the method and its limitations; numerical precision does not establish accuracy.
- **Sensitivity:** Recalculate expected return under plausible alternative probability sets and price assumptions. Which changes erase or reverse the expected payoff?
- **Coverage:** Do coarse scenario prices omit material variation within each case or adverse outcomes outside the modeled range?
- **Calibration:** Preserve dated forecasts, their horizons, and realized outcomes. Across repeated forecasts, test whether probability assessments and expected returns were systematically optimistic or pessimistic.
- **Open Uncertainty:** If probabilities are not defensible, report provisional estimates and the range across alternative assumptions. Do not present a completed scenario table as a validated forecast.

## Output and Handoff to 4B Sizing

- **Expected Return Estimate:** Supply the probability-weighted total return, instrument, dated current price, common horizon, and gross/net cost convention. Label any benchmark-relative estimate separately.
- **Supporting Scenarios:** Preserve each outcome's probability, assumptions, horizon price, return, and evidence so the mean can be audited and recalculated.
- **Uncertainty and Downside:** Retain alternative estimates, material loss scenarios, path risks, sensitivities, shared risk drivers, and update triggers.

### Where the Mean–Variance Optimizer Fits

2E calculates expected returns. [4B's mean–variance starting point](./4b_sizing.md)
combines those estimates with a portfolio covariance model, costs, existing
positions, and constraints to calculate target weights, including zero. That
optimizer uses expected returns and covariance; a full return distribution is
not required as an input. Preserve the supporting scenarios for downside
analysis and alternative sizing methods.

Separate stock-level scenario tables do not specify how returns move together.
Their dispersion is not a complete portfolio risk model. 4B owns that
reconciliation and must not multiply expected returns by conviction or
recognition probabilities already included here.

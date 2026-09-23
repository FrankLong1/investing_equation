# Key Portfolio Metrics

This is a metric-design framework for a hypothetical portfolio process. It
reports no actual holdings, performance, or investor results.

## Starting point: P&L / exposure

**P&L / exposure is a key metric for measuring stock selection and timing. It
also measures relative sizing, because more weight remains assigned to the
positions in which the fund has more conviction. But it discards absolute
sizing—the decision to run more or less total exposure—which is a separate PM
skill.**

This makes P&L / exposure an unusually useful metric, but not a sufficient one.
It asks:

> How productive was the exposure we chose to deploy?

It does not ask:

> Did we deploy the right total amount of exposure given the opportunity set
> and risk?

Those questions should remain separate. A PM can be excellent at selecting
stocks and ranking sizes but too timid in a rich opportunity set. Another PM
can show mediocre exposure efficiency while generating strong NAV returns by
running large beta or gross exposure. The scorecard should identify both cases.

### Definition

For a period with daily observations, define gross exposure as:

$$
G_t = \sum_i |MV_{i,t}|
$$

and period P&L / exposure as:

$$
\text{P&L / exposure}
=
\frac{\sum_t \text{P&L}_t}
{\frac{1}{T}\sum_t G_{t-1}}.
$$

The denominator is average gross dollar exposure, not net exposure. Net
exposure becomes unstable or meaningless near market neutrality. For daily or
cross-period comparisons, also retain the exposure-dollar-day form before
annualization:

$$
\frac{\sum_t \text{P&L}_t}{\sum_t G_{t-1}}.
$$

Report at least four cuts:

- gross and net of borrow, financing, transaction costs, and fees;
- raw and factor-residual P&L;
- long book and short book separately;
- total portfolio and by theme, sector, analyst/agent, and thesis archetype.

The **factor-residual** version is essential. Raw P&L / exposure can reward
market beta, duration, momentum, sector, or another systematic exposure. It is
not clean evidence of stock-selection skill until those contributions are
shown separately.

### What it retains and discards

Assume all weights are scaled by the same multiplier $k$. In a linear,
frictionless portfolio, both P&L and gross exposure scale by $k$, so P&L /
exposure is unchanged. It therefore:

- retains name selection;
- retains entry, add, trim, and exit timing;
- retains relative sizing across positions;
- discards the common scale applied to the whole book.

In practice, scale can change borrow, market impact, financing, liquidity,
correlation, and drawdown behavior. Net P&L / exposure will correctly reveal
some of those nonlinear costs, but absolute sizing still needs a dedicated
counterfactual.

## P&L adjusted for volatility

**Volatility-adjusted P&L measures how much P&L the portfolio earned per unit
of price risk, rather than per dollar of exposure.** One dollar of a volatile
stock consumes more risk than one dollar of a stable stock, so this complements
P&L / exposure.

- At the portfolio level, net return divided by realized volatility is a
  Sharpe-like outcome measure; subtract the risk-free rate when material.
- For decision evaluation, prefer net P&L divided by **ex-ante forecast risk**
  recorded when the exposure was chosen. This asks whether the PM allocated
  capital efficiently given the risk known at the time.
- Report raw and factor-residual versions. Otherwise market beta or a volatile
  factor regime can masquerade as security-selection skill.
- Pair the metric with drawdown, expected shortfall, and stress loss. Volatility
  does not capture gap risk, skew, liquidity, or correlation spikes, and stale
  marks can make risk-adjusted results look artificially strong.

## The minimum metric stack

No single portfolio metric identifies PM skill. The minimum useful stack has
three layers: capital outcome, skill attribution, and survival/risk state.

| Metric | Question answered | Primary skill or failure mode |
| --- | --- | --- |
| **Net P&L / average gross exposure** | How productive was deployed exposure after costs? | Selection, timing, relative sizing, implementation |
| **Net P&L / ex-ante forecast risk** | How productive was the risk the fund expected to take? | Volatility-aware selection, timing, and sizing |
| **Net P&L / NAV** | How much did the fund actually make on its capital? | Absolute sizing plus all underlying skills |
| **Factor-residual P&L / exposure** | Did security-level decisions add value beyond systematic exposures? | Stock selection and idiosyncratic timing |
| **Selection value-add** | Were the chosen names better than the available alternatives? | Name and theme selection |
| **Relative-sizing value-add** | Did the ranking of weights improve results versus neutral weights? | Cross-sectional sizing |
| **Absolute-sizing value-add** | Did running more or less total risk improve results versus the predeclared scale policy? | Book-level aggression and restraint |
| **Timing value-add** | Did the actual exposure path beat a predeclared entry/exit path? | Entry, adds, trims, exits, and waiting |
| **Hit rate and payoff ratio** | How often were we right, and how much did wins earn relative to losses? | Error distribution and asymmetry |
| **Drawdown and expected shortfall** | What pain and tail loss did the process create? | Survival and loss containment |
| **Risk concentration** | How many independent economic bets actually drove risk and P&L? | Portfolio construction |
| **Cost and implementation shortfall** | How much gross edge leaked before reaching NAV? | Execution, borrow, financing, turnover |
| **Conviction calibration / IC** | Did stronger ex-ante views predict stronger subsequent residual returns? | Forecast calibration and ranking skill |

## Skill attribution metrics

### 1. Selection value-add

Compare the selected names with a point-in-time eligible opportunity set while
holding the weighting rule and evaluation window constant.

Useful counterfactuals, from easiest to hardest to beat:

1. equal-weight selected names versus equal-weight eligible names;
2. selected names versus the relevant theme or sector basket;
3. selected names versus randomized names drawn from the same eligible set;
4. selected names versus a risk-matched factor portfolio.

Measure both raw and residual return. Theme selection and name selection within
theme should be separate when the data permit.

### 2. Relative-sizing value-add

Keep the same names, directions, total gross exposure, and trade dates. Replace
the actual cross-sectional weights with a neutral rule such as equal weight or
equal risk.

$$
\text{Relative-sizing VA}
=
\sum_t \left(w_t^{actual}-w_t^{neutral}\right)'r_t.
$$

This measures whether the fund put relatively more capital behind its better
ideas. Report equal-weight and equal-risk baselines; either one alone can embed
an unintended style bet.

### 3. Absolute-sizing value-add

Preserve the actual names, relative weights, and timing, but rescale the whole
book to a predeclared exposure or risk policy:

$$
\tilde{w}_{i,t}
=
w_{i,t}^{actual}
\times
\frac{G_t^{baseline}}{G_t^{actual}}.
$$

Then:

$$
\text{Absolute-sizing VA}
=
\sum_t \left(w_t^{actual}-\tilde{w}_t\right)'r_t.
$$

Possible baselines are fixed gross exposure, fixed ex-ante volatility, or a
constitution-defined risk budget. The baseline must be chosen prospectively;
otherwise the comparison becomes a hindsight-optimal leverage exercise.

Report this on raw and factor-residual returns. Raw absolute-sizing value-add
answers whether the PM correctly chose total market and factor aggression.
Residual absolute-sizing value-add asks whether the PM scaled idiosyncratic
alpha up and down at the right times.

Also track **exposure calibration**: bucket days by risk-budget utilization and
compare the subsequent residual P&L / exposure across buckets. If high-exposure
days do not have higher subsequent opportunity quality, greater aggression is
not demonstrating sizing skill.

### 4. Timing value-add

Timing requires a decision-time counterfactual, not a prettier chart after the
fact. For each position, compare the actual exposure path with one or more
predeclared paths:

- enter the full target when the thesis first became investable;
- enter on a fixed schedule;
- hold until the original horizon or catalyst;
- rebalance only at a fixed weekly or monthly cadence;
- make no discretionary add, trim, or early-exit decisions.

Compute entry, add/trim, and exit value-add separately. Also track:

- **up capture:** realized gain relative to maximum favorable excursion;
- **down capture:** realized loss relative to maximum adverse excursion;
- **post-exit drift:** residual return after exit over the original horizon;
- **time to invalidate:** elapsed time from decisive disconfirming evidence to
  exposure reduction.

Excursion metrics are diagnostic, not targets. Maximizing favorable-excursion
capture with hindsight would reward impossible perfect timing.

### 5. Risk-management and hedge value-add

Compare actual P&L with a frozen no-hedge/no-discretionary-de-risking copy of
the same portfolio. Split the result into:

- explicit hedge carry and payoff;
- factor or beta neutralization;
- drawdown-triggered de-risking;
- position-limit and concentration overrides;
- liquidity- or borrow-driven reductions;
- opportunity cost during subsequent rebounds.

A hedge that loses money may still have done its job if it reduced a
constitution-defined tail loss or preserved the ability to hold alpha. Judge
risk management on both P&L impact and avoided loss relative to the ex-ante
mandate.

### 6. Execution and cost leakage

The bridge from gross idea P&L to investor P&L should be explicit:

```text
gross decision P&L
- spread and market impact
- timing slippage versus decision price
- borrow and financing
- hedge carry
- fees and other implementation costs
= net NAV P&L
```

Key metrics are implementation shortfall in dollars and basis points,
cost-to-gross-alpha, turnover, borrow surprises, and capacity-adjusted P&L /
exposure.

## Distribution and risk metrics

### Hit rate must be paired with payoff ratio

$$
\text{Hit rate}=\frac{\#\text{profitable resolved positions}}
{\#\text{resolved positions}}
$$

$$
\text{Payoff ratio}=\frac{\text{average winner}}
{|\text{average loser}|}.
$$

Neither is useful alone. Add profit factor—gross winning P&L divided by gross
losing P&L—and report all three by long/short, thesis archetype, conviction
tier, and market regime. Use decision episodes rather than broker tax lots so
staged trades are not counted as many independent wins.

### Drawdown and tail loss

Track:

- maximum peak-to-trough drawdown and time under water;
- worst day, week, and month;
- expected shortfall at the constitution-defined horizon and confidence level;
- realized and hypothetical stress losses;
- upside/downside capture and downside beta;
- loss concentration: share of total losses from the worst 1, 3, and 5
  decisions.

Sharpe, Sortino, and Calmar are useful summaries, but they should not outrank
the underlying P&L, exposure, drawdown, and tail observations—especially with a
short history.

### Concentration and effective breadth

Ticker count is not diversification. Report:

- effective number of positions by capital and by risk contribution;
- top 1, 5, and 10 positions as shares of gross exposure and forecast risk;
- theme, sector, factor, country, and causal-driver concentration;
- pairwise and cluster correlation in normal and stressed windows;
- share of P&L explained by the largest common factor and the largest single
  decision.

The portfolio can have many names and only one economic bet.

### Liquidity, financing, and capacity

Track normal and stressed days to liquidate, percentage of ADV, expected market
impact, borrow cost and recall risk, financing and counterparty concentration,
cash/collateral headroom, and P&L / exposure after a capacity-scaled cost model.
These are not operating footnotes: they determine whether measured alpha can
survive at the desired absolute size.

## Forecast and process calibration

Outcomes alone learn slowly. The portfolio should also measure whether its
inputs are becoming better calibrated.

| Metric | Definition |
| --- | --- |
| **Information coefficient** | Rank correlation between ex-ante conviction or expected residual return and subsequent residual return |
| **Conviction monotonicity** | Whether higher conviction buckets produce higher average residual return and/or hit rate |
| **Probability calibration** | Whether events assigned 60%, 70%, or 80% probabilities occur at roughly those frequencies |
| **Expected-return calibration** | Forecast return versus realized return, with bias and error by horizon and archetype |
| **Catalyst calibration** | Frequency, timing, and magnitude of anticipated evidence windows versus forecast |
| **Invalidation discipline** | P&L lost and time elapsed after a thesis crossed its predeclared invalidation condition |
| **Decision coverage** | Share of P&L and exposure backed by a valid, timestamped thesis and decision record |

These metrics should use the forecast available at the decision time. Never
overwrite an old forecast when a thesis changes.

## A practical V0 dashboard

Keep the top-level dashboard small. Start with:

1. net P&L / NAV;
2. net raw and residual P&L / average gross exposure and ex-ante forecast risk;
3. selection, relative-sizing, absolute-sizing, and timing value-add;
4. long, short, factor, hedge, cost, and residual P&L attribution;
5. hit rate, payoff ratio, and profit factor;
6. maximum drawdown, expected shortfall, and worst named stress loss;
7. gross, net, beta, and ex-ante risk-budget utilization;
8. top risk concentrations and effective number of independent bets;
9. stressed days to liquidate and cash/collateral headroom;
10. conviction IC/calibration and invalidation discipline.

Every metric should have:

```yaml
metric_contract:
  name:
  purpose:
  formula:
  numerator:
  denominator:
  unit:
  gross_or_net:
  raw_or_factor_residual:
  evaluation_window:
  annualization_rule:
  benchmark_or_counterfactual:
  data_sources: []
  calculation_frequency:
  confidence_interval_or_sample_size:
  known_failure_modes: []
  owner:
  version:
```

## Attribution discipline

Selection, sizing, and timing interact. A good selection never entered has no
realized P&L; an excellent entry with zero size has no capital outcome; a large
winner can dominate every summary. Therefore independently computed
counterfactual value-add figures will not necessarily sum to total P&L.

For an additive decomposition, predeclare either:

- a sequential order from baseline portfolio to selected names to relative
  weights to absolute scale to actual timing; or
- a Shapley-style attribution that averages each component's marginal
  contribution across orderings.

Always retain the interaction term. Do not force attribution to look more
precise than the counterfactuals warrant.

The governing principle is:

> Measure the portfolio's capital outcome, the efficiency of exposure, the
> skill of each decision layer, and the survival cost separately. A single
> ratio cannot do all four jobs.

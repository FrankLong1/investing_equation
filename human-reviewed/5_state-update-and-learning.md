# 5. State Update And Learning

Status: draft for human review
Parent: [A Hedge Fund as a Function — Version 4](./hedge-fund-as-a-function-v4.md)

## Core Function

$$
(C^E_{t+1},C^I_{t+1},\Theta_{t+1})
=
\operatorname{Update}(C^E_t,C^I_t,\Theta_t;O_{t+1}).
$$

- **$O_{t+1}$ — observations:** new evidence, actions, market changes, and
  outcomes.
- **$C^E_{t+1}$:** updated external context.
- **$C^I_{t+1}$:** updated portfolio state and constraint use.
- **$\Theta_{t+1}$:** updated thesis state produced by the same pipeline in maintenance mode.

## 1. Run the Exact Same Pipeline

**First run:** Run the pipeline to build the driver map, debates, market view,
variant view, model, return distribution, and portfolio decision.

**Maintenance:** Run the exact same pipeline with the existing state plus the
information that arrived or changed since the last successful update. Each
stage asks whether its prior output should change. Use the new information
alongside the full relevant context, including accumulated evidence.

**Existing state + information diff → same pipeline in maintenance mode →
updated state and decision, often “pass, do nothing.”**

The stages retain the same purpose and output. “No change” is a valid result
at each stage; reuse a valid prior output when its inputs are unchanged rather
than repeat research or calculations. Continue evaluating independently changed
inputs—for example, a new price can change expected returns even if the thesis
is unchanged. Maintenance is not a separate thesis-formation process.

## 2. First Run Versus Maintenance

| Pipeline stage              | First run                                                                                               | Maintenance                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0. Stock Drivers**        | Identify the financial and operating drivers and current pricing framework.                             | Are those drivers changing? Does new evidence reveal a missing driver or a shift in what the stock trades on?                                                                                |
| **1. External Context**     | Gather and filter the relevant evidence base.                                                           | Collect new or revised information, remove repetition, and link it to existing research. Retain evidence that challenges the current map.                                                    |
| **2A. Key Debates**         | Identify material questions and competing perspectives.                                                 | Does the evidence resolve, change, or introduce a debate? Retire resolved questions and preserve what resolved them.                                                                         |
| **2B. Market Expectations** | Establish the qualitative market view and key numbers using expectations, reverse valuation, and comps. | What changed in guidance, consensus, buy-side bogeys, shared checks, cohort views, or positioning? Refresh price-implied assumptions and comps; record the prior versus current market view. |
| **2C. Variant View**        | Identify what the market is missing or misjudging, map its implications, and test our disagreement.     | Does the evidence strengthen, weaken, invalidate, or eliminate our disagreement? Has the market caught up, or has the recognition path changed?                                              |
| **2D. Price Impact**        | Build the bridge from market and variant assumptions to metrics and conditional prices.                 | Reconcile new actuals, revise affected forward assumptions, and recalculate prices using the existing model. Rebuild the model where the business or pricing framework has changed.          |
| **2E. Return Distribution** | Define scenarios, assign probabilities, and calculate returns at a common horizon.                      | Revise scenarios and probabilities where justified; refresh returns from the current price and remaining horizon, including delays in recognition.                                           |
| **3. Internal Context**     | Establish portfolio state, operating capacity, mandate, and constraints.                                | Refresh positions, cash, orders, exposures, borrow, liquidity, and any authorized constraint changes.                                                                                        |
| **4B. Sizing**              | Combine 2E outputs with portfolio risk and constraints to calculate target weights.                     | Recalculate targets when returns, dependencies, portfolio state, or constraints change; compare with current exposure.                                                                       |
| **4C. Timing**              | Decide when and under what conditions to move toward target weights.                                    | Reassess whether to add, hold, trim, exit, or wait given the updated evidence, price, and next event.                                                                                        |

- **Same Questions, New Comparison:** At each stage, ask what changed versus the prior state, how material it is, and what follows—not merely whether another document appeared.
- **Cadence:** The loop could check every ten or thirty minutes. This is a proposed polling frequency, not a requirement to change beliefs or trade each time.
- **Processing State:** Track successful checks by source, include late arrivals and corrections, and save observations and dispositions before advancing checkpoints. A failed source check is not “nothing new.”
- **Accumulation:** Keep relevant observations even when they individually produce no change; a pattern may eventually warrant revision or targeted research.
- **Urgent Risk:** Financing, liquidity, or constraint problems go directly to the existing portfolio controls without waiting for a complete research pass.

## 3. Key Cases

- **Upcoming Earnings**

  - Freeze our forecast, consensus, buy-side bogeys, and the metrics that test the key debates before the release.
  - State what different outcomes would imply for the thesis and model.

- **New Earnings or Guidance**

  - Reconcile reported results and guidance with the preview. Explain surprises in volume, pricing, mix, costs, or timing.
  - Update the model and assess changes to the debates, market expectations, variant view, and scenario returns.

- **New Product Release**

  - Does it introduce a new driver or change adoption, pricing, competition, costs, or cannibalization assumptions?
  - Distinguish a product announcement from evidence of adoption and economic value; update the affected research or investigate what remains unknown.

- **Customer, Competitor, or Industry Datapoint**

  - What reads through to the company, and how comparable is the evidence? Account for differences in customers, products, periods, and definitions.
  - Assess whether it changes a driver forecast or adds to an accumulating pattern.

- **New Checks, Buy-Side Feedback, or Consensus Revisions**

  - Has the market's bogey changed even if our business forecast has not?
  - Refresh 2B, then reassess the size of our disagreement and remaining payoff.

- **Price, Valuation, or Positioning Move**

  - Has the remaining return distribution changed at the new price? Is the stock beginning to trade on a different driver?
  - Refresh the relevant valuation, return, sizing, and timing work without inventing a business-thesis change.

- **Macro, Financing, Liquidity, or Portfolio Change**

  - Which scenario assumptions, shared exposures, or constraints change?
  - Route urgent risk issues directly to internal context and portfolio controls; they do not wait for a full thesis review.

- **Missed Milestone or Periodic Model Review**

  - Has an expected event failed to happen, the recognition path slipped, or an assumption become stale?
  - Periodically re-underwrite the whole idea: would we form the same thesis today, and what have incremental updates overlooked?

## 4. Output and Learning

- **Change Record:** Source, observation and availability dates, prior assumption, revised assumption or no-change rationale, and affected drivers or debates.
- **Updated State:** Refreshed research, model, market expectations, scenarios, and return distribution where applicable, with prior versions retained.
- **Portfolio Handoff:** Send changes in payoff, risk, or recognition timing to [4B sizing](./4b_sizing.md) and [4C timing](./4c_timing.md).
- **Learning:** Compare outcomes with the forecasts recorded beforehand. Distinguish business-forecast, market-expectations, valuation, sizing, timing, and execution errors from luck; use resolved forecasts to assess probability calibration.
- **Next Review:** Record outstanding research, stale dependent outputs, processing checkpoints, and the next event, price, or scheduled trigger.

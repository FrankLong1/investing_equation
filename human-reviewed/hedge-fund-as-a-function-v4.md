# A Hedge Fund as a Function — Version 4

Status: current canonical overview  

## Executive Summary

- **A hedge fund is a continuously running information-compression function:**
  It transforms an unbounded, noisy external world into a small set of
  capital-allocation decisions.

- **The central design fallacy is thinking of AI as a tool for a human
  investor:** That framing begins with a human-centered workflow and asks where
  AI can assist. An AI first fund should instead be designed as a system of
  component functions i.e. *What is the best possible
  allocation of the fund's functions across AI, deterministic code, and
  humans?*

- **Every higher-level AI reasoning function in the investment process can be
  decomposed into a DAG built from four linked primitive function types:**
  1. **Gather** finds the plausible evidence universe for a specified object or
     question.
  2. **Filter** retains the relevant, reliable, feasible, and
     not-already-priced subset from a feed or gathered universe.
  3. **Compress** converts retained evidence into compact, decision-useful
     representations.
  4. **Hypothesize** proposes explicit, testable causal claims, forecasts, and
     payoff implications.

$$
\boxed{
f_v:\mathcal X_v\rightarrow\mathcal Y_v,
\qquad
\operatorname{type}(f_v)\in
\{\mathsf{Gather},\mathsf{Filter},\mathsf{Compress},\mathsf{Hypothesize}\}
}
$$

The four function types above provide the working grammar; each function must
also specify its inputs, outputs, validation rule, and owner.

## The Core Function

$$
\boxed{
D=
\left(
\underbrace{\mathrm{Sel}}_{\text{selection}},
\underbrace{Z}_{\text{sizing}},
\underbrace{T}_{\text{timing}}
\right)
=\Phi(C^E;C^I)
}
$$

- $C^E$: **external context** — the lawful external world relevant to
  investing;
- $C^I$: **internal context** — the fund's own state and rules for action;
- $D$: **decision** — a complete portfolio action, including no action;
- $\mathrm{Sel}$: **selection** — which assets or expressions merit
  portfolio exposure;
- $Z$: **sizing** — the target weight and risk allocation; and
- $T$: **timing** — the path from current exposure to the target exposure.

## Shared Research, Fund-Specific Decisions

The same research backbone can serve many funds. Stages 1–2 build a versioned,
source-linked account of the external world: causal drivers, competing
scenarios, probabilities, market expectations, and conditional payoffs. A
fund's objective, existing book, or preferred trade is not evidence that a
scenario is more likely. Distinct evidence or a corrected model can change a
research conclusion; a different mandate alone cannot.

Research outputs are reusable **for the same question, information set, as-of
time, instrument, and horizon**. A fund may request a different horizon or
payoff calculation without creating a different underlying truth. Its mandate
may also determine which questions receive attention; that prioritization
does not alter the answers. Preserve uncertainty and genuine disagreement in
the shared record rather than forcing a single unsupported point view.

Stage 3 supplies each fund's own state and constitution. Stage 4 uses the
research outputs with that fund's objective, eligible instruments, current
exposures, risk limits, costs, and execution capacity to choose selection,
sizing, and timing. Thus one research assessment can support different
portfolios, including a zero position or no action. In stage 5, new external
evidence updates research; fund-specific trades, capital flows, and rule
changes update the relevant fund's internal state. A position or P&L outcome
alone does not rewrite a research probability.

## [Who Does What](Other/executor-allocation.md)

$$
\operatorname{owner}(f_v)
\in
\{\mathsf{AI},\mathsf{Code},\mathsf{Human}\}.
$$

- **AI:** Perform as much of the research, reasoning, coordination, and
  decision loop as it can reliably handle, particularly work involving
  unstructured information and judgment under uncertainty.
- **Deterministic code:** Perform explicit calculations, optimization,
  numerical and structural validation, exposure measurement, and hard-rule
  enforcement.
- **Humans:** Define the fund's constitution and resolve exceptional cases that
  require human judgment, accountability, or a change to the rules.

## 1. Gather Relevant Information

Sections 1 and 2 form the **research loop**: our current understanding directs
information gathering, and new evidence revises the drivers, debates, and view.
Questions from any part of thesis formation can send us back to 1A or 1B.

### 1A. [Understand What Drives the Stock](1a_stock_drivers.md)

Defines the four price inputs and current or emerging drivers that determine
what external information is relevant.

### 1B. [Gather Relevant Context](1b_gather-relevant-context.md)

Filters external information for relevance to those price drivers, then refines
the retained context into source-linked information objects.

$$
C^E=(\operatorname{Micro},\mathsf T,\operatorname{Macro},M).
$$

- **$\operatorname{Micro}$:** company, asset, industry, value-chain, and
  capital-structure economics.
- **$\mathsf T$:** technological capability, cost curves, adoption,
  architectures, standards, and platforms.
- **$\operatorname{Macro}$:** broad economic regime, policy, geopolitics,
  and physical or social constraints.
- **$M$:** market state — expectations, valuation, positioning, flows,
  liquidity, financing, borrow, leverage, and participant constraints.

## 2. Thesis Formation

- **[2A. Identify the Key Debates](2a_identify-key-debates.md):** identifies
  material questions and competing answers.
- **[2B. Understand Market Pricing](2b_understand-market-pricing.md):** infers
  the market view, underlying assumptions, and what price appears to reflect.
- **[2C. Form a Variant View](2c_form-a-variant-view.md):** develops an
  evidence-backed disagreement and maps the affected debates and stock drivers.
- **[2D. Model Price Impact](2d_model_price_impact.md):** quantifies the changes
  in operating and financial metrics and the resulting conditional stock price.
- **[2E. Calculate Expected Returns](2e_calculate_expected_returns.md):** calculates probability-weighted expected returns and preserves the supporting scenarios, uncertainty, and dependencies for 4B sizing.

$$
\Theta
=\{\theta_i\}_{i\in\mathcal U}
=\operatorname{FormTheses}(C^E;\mathcal U).
$$

- **$\Theta$:** the candidate-thesis set for the research universe $\mathcal U$;
  eligible theses can be reused across funds. Each fund's permitted subset is
  determined in stage 3, not by changing the evidence or probabilities here.
- **$V_M$:** the market view embedded in expectations and price.
- **$V_V$:** the research assessment's evidence-backed variant view on a
  material driver; a fund can use it without owning the resulting trade.
- **$E_V$:** evidence supporting the variant view.
- **$G_M$:** why the market can maintain its current view.
- **$C$ and $\Delta P$:** the catalyst and conditional price difference.

## 3. [Internal Context](./3_internal-context.md)

$$
C^I=(S,K),
\qquad
\mathcal U_{\mathrm{fund}}=\mathcal U_{\mathrm{fund}}(C^I).
$$

- **$S$ — state:** positions, capital, orders, exposures, liquidity, P&L,
  financing, borrow, capacity, and readiness.
- **$K$ — constitution:** mandate, objectives, constraints, risk budgets,
  decision rights, approvals, and escalation rules.
- **$\mathcal U_{\mathrm{fund}}$ — investable universe:** the assets and
  instruments permitted by the current state and constitution; this is a
  fund-specific subset or expression of the research universe $\mathcal U$.

The operational contract for $K$ lives in
[Portfolio Constitution And Decision Governance](Other/portfolio-constitution-and-decision-governance.md).

## 4. Expression

$$
D
=\operatorname{Express}(\Theta;C^I)
=
\left(
\underbrace{\mathrm{Sel}}_{\text{what}},
\underbrace{Z}_{\text{how much}},
\underbrace{T}_{\text{when}}
\right).
$$

### 4a. [Selection](./4a_selection.md)

- **$\mathrm{Sel}$ — what:** 2A–2E identify research candidates; final
  portfolio selection follows from nonzero target weights in 4B for this fund.

### 4b. [Sizing](./4b_sizing.md)

- **$Z$ — how much:** the optimizer combines 2E return distributions with
  portfolio risk and constraints to determine target weights, including zero.

### 4c. [Timing](./4c_timing.md)

- **$T$ — when:** the conditions under which the portfolio should move from
  its current exposure to its target exposure.

Expression is the bridge from what the fund believes to what the portfolio
should own. It is complete only when selection, sizing, and timing are all
specified. No selection, zero size, and no action are valid outputs. Execution
then determines how an approved exposure change is traded.

## 5. [State Update And Learning](./5_state-update-and-learning.md)

$$
(C^E_{t+1},C^I_{t+1},\Theta_{t+1})
=
\operatorname{Update}(C^E_t,C^I_t,\Theta_t;O_{t+1}).
$$

- **$O_{t+1}$ — observations:** new evidence, actions, market changes, and
  outcomes.
- **$C^E_{t+1}$:** updated external context.
- **$C^I_{t+1}$:** updated portfolio state and constraint use.
- **$\Theta_{t+1}$:** updated thesis state produced by the same pipeline in
  maintenance mode, reusing valid outputs whose inputs remain unchanged.

# 3. Internal Context

Status: draft for human review
Parent: [A Hedge Fund as a Function — Version 4](./hedge-fund-as-a-function-v4.md)

## Core Function

$$
C^I=(S,K).
$$

- **$S$ — current state:** book and position state together with the capital,
  liquidity, financing, counterparties, and operational capacity available to
  act.
- **$K$ — mandate, objectives, and constraints:** what the fund is trying to
  achieve and the risk and governance boundaries within which it may act.

## Components

### 3.1 Book And Position State Within $S$

- Positions, cash, orders, fills, P&L, and current long, short, factor, theme,
  concentration, liquidity, and other portfolio exposures.

### 3.2 Operating Capacity Within $S$

- Available capital and collateral, financing and borrow capacity, fund-level
  liquidity needs, broker and counterparty relationships, custody, and
  operational readiness. These are observed or available resources, distinct
  from the permissions and limits in $K$.

### 3.3 Mandate, Objectives, And Constraints

- Strategy mandate, return objective, horizon, eligible instruments, risk
  budgets, hard limits, authority, approvals, exceptions, and escalation.
- Detailed companion: [Portfolio Constitution And Decision Governance](Other/portfolio-constitution-and-decision-governance.md).

## Boundary

- Together, $S$ and $K$ determine which portfolio actions are feasible
  and appropriate given the fund's external context and theses.
- Internal context changes what the fund may or should do without changing what
  the fund claims is externally true.
- External context describes market liquidity, financing, and borrow
  availability. Internal context describes the fund's existing usage, access,
  relationships, limits, and remaining capacity.

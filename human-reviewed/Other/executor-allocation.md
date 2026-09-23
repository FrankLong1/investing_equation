# Who Does What — Executor Allocation

Status: draft for human review
Parent: [A Hedge Fund as a Function — Version 4](../hedge-fund-as-a-function-v4.md)

## Purpose

Assign each investment function to the executor best suited to perform it
reliably, auditably, and within the fund's authority boundaries.

$$
\operatorname{owner}(f_v)
\in
\{\mathsf{AI},\mathsf{Code},\mathsf{Human}\}.
$$

## AI

AI performs as much of the research, reasoning, coordination, monitoring, and
decision loop as it can reliably handle, particularly work involving
unstructured information and judgment under uncertainty. Its outputs retain
sources, assumptions, uncertainty, and escalation conditions.

## Deterministic Code

Deterministic code performs explicit calculations, optimization, numerical
and structural validation, exposure measurement, reconciliation, and hard-rule
enforcement. An LLM may prepare inputs or explain outputs but may not
substitute for these services.

## Humans

Humans define the constitution, mandate, objectives, risk tolerance, and
authority boundaries. They resolve exceptional cases requiring accountable
judgment and explicitly approve any change to the governing rules.

## Function Contract

Every function records its owner, permitted inputs, permitted state reads and
writes, output object, validation rule, abstention behavior, escalation path,
and next consumer. A function cannot expand its own authority.

## Visualization Contract

When the investment system is rendered as a graph, preserve three distinct
dimensions:

- **Node identity:** the function instance performing a state transformation.
- **Object identity:** the canonical input and output types defined in
  [Object Store And Envelope](../../skills/OBJECTS.md); show these in node
  labels and on object-flow edges rather than inventing a second vocabulary.
- **Node color:** reserve color exclusively for the function's primary
  executor: **AI**, **deterministic code**, or **human**.

Function type—such as Gather, Filter, Compress, Hypothesize, Validate, Compute,
or Act—may be encoded by a text tag, glyph, or shape, but not by another color.
Give every function one accountable primary owner. Show supporting executors
with typed inbound edges or annotations rather than blended or gradient colors.
Raw external artifacts may appear as low-opacity context particles, but they
are not executor-owned nodes until a function admits them into a canonical
object.

The full graph should make the fund's many-to-one compression visible: broad
external and internal context enters at the top, canonical objects pass through
successively narrower functions, and one terminal decision object remains:
selection, sizing, and timing, including no action.

## Allocation Principle

Minimize recurring human execution without removing human accountability.
Subject to validation and governance, the allocation should produce broader
search, deeper checking, closer process adherence, higher-quality output,
continuous operation, and lower marginal cost.

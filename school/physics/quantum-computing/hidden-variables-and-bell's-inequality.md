---
tags:
  - quantummechanics
  - physics
class:
  - QuantumComputing
articles:
  - "[[../../../Personal/Books/The Outer Limits of Reason|The Outer Limits of Reason]]"
link:
  - https://www.scottaaronson.com/qclec.pdf
---
# Overview
Notes regarding the topic of Bell's inequality, which was shown to prove a lack of hidden variables, i.e that things don't have states before measurement
# Notes
## Hidden Variable Theories 
> [!definition] Hidden Variable Theory
> A hidden variable theory conjectures that behind any "collapse of quantum state", there are some hidden variables at play behind the scenes, that simply seem probabilistic to us. If we were to know how they worked, we could know for certain what our [[Semester 1/5.1 Quantum Teleportation#^9fbf0d]] states would collapse to.
### Bohmian Mechanics
> [!definition] Bohmian Mechanics
> Essentially a particle in superposition has some "real" location, which is simply guided by the behavior of the superposition. For this to work, we need a rule on how the "guiding" works. The rule must have the property that if anyone does measure the particle, they'll see what QM predicted for it. This theory is a Nonlocal Hidden Variable Theory
^23fe58

Given two wave-functions
$$
\begin{align}
\ket{\psi_{A}}  = \sum_{i=0}^{n-1}\alpha_{i}\ket{i} \\ 
\ket{\psi_{B}}  = \sum_{i=0}^{n-1}\beta_{i}\ket{i}
\end{align}
$$
Where there exists a unitary transformation
$$
\ket{\psi_{B}} = U\ket{\psi _{A}}  
$$
A hidden variable theory assumes that there is also a stochastic matrix such that we can find a linear transformation between the probabilities associated with $\ket{\psi_{A}}$, and the probabilities associated with $\ket{\psi_{B}}$
$$
\begin{bmatrix}
|\beta_{0}|^{2} \\
\vdots \\
|\beta_{n-1}|^{2}
\end{bmatrix}=\begin{bmatrix} 
  &   &    \\
  & S &   \\
  &   & 
\end{bmatrix}\begin{bmatrix}
|\alpha_{0}|^{2} \\
\vdots \\
|\alpha_{n-1}|^{2}
\end{bmatrix}
$$
> [!definition] Stochastic Matrix
>  Any such linear transformation that, unlike [[Semester 1/2.4 Quantum Observables#^500f42|The Unitary Matrix]], preserves the 1-norm over the 2-norm. The columns are probability vectors, so it describes transitions from one stte to another based on probabilities. 
^ff1d1b

The $\alpha$-born rule matrix represents your "real" state, the $S$ is the "rule", and $\beta$ probability vector is the measured state. There is an infinite amount of $S$ transformations which can satisfy the born rule. 

The above notation is written discretely, but if we take $S \in \mathcal{H}$, (which is an infinite dimensional space, a Hilbert space), then we can use this to describe a continuous differential equation.

This means you can extend this idea to describe the motion of the particle over time, while still satisfying [[Semester 1/4.1 Multi Qubit States#^1f115f|The Born Rule]].

One issue that was had with this, is that we still get the weird non-local behavior from entanglement. If we have two entangled quantum states, collapsing one collapses the other, regardless of distance. It is not useful for faster-than-light information transfer for the same reason regular entanglement isn't.

This isn't local variable, because there is an exact response from Bob, based on Alice's behavior. 
### Local Hidden Variable Theories
In a local hidden variable theory, all entanglement represents is some communication between two particles, where they both share rules on how they respond. 

Given qubit bob, and qubit Alice, let's say they high five (become entangled). Then when they high five, Bob morse-codes a random way for Alice to respond. The map between an interaction, and an output for both Alice and Bob, is random. But it only is decided at the beginning, so entanglement is just the fact they already communicated.

| Input entanglement | Bob's Map | Alice's Map |
| ------------------ | --------- | ----------- |
| $\ket{\Psi_{A}}$   | $\ket{0}$ | $\ket{1}$   |
| $\ket{\Psi_{B}}$   | $\ket{1}$ | $\ket{0}$   |
| $\ket{\Psi_{+}}$   | $\ket{1}$ | $\ket{1}$   |
| $\ket{\Psi_{-}}$   | $\ket{1}$ | $\ket{0}$   |

Notably, this isn't [[#^23fe58|Bohmian mechanics]], because the actual measurement itself isn't probabilistic. You'd have no way of knowing what the map was, but the map is fixed.
## Bell's Theorem

>[!definition] Bell's theorem
> Bell's theorem was written to prove that all hidden-variable theories *must be non-local*.
>Bell was the first to ask: *do local hidden variables have any empirical consequences that disagree with the predictions of* 
 *quantum mechanics? Is there an actual experiment that could*
*rule out the possibility of local hidden variables?*

^03b75f

### CHSH Game

> [!definition] CHSH Game
>  
>![[../../../../Supplemental Files/images/Pasted image 20240711142824.png]]
>Charlie gives a single digit 0 or 1 to Alice, represented by $x$, and another random digit $y$ to Bob. Alice picks some response from that $a$, and Bob picks $b$. To win the game
>$$
A\land B=x\oplus y
>$$
>$A$ AND $B$ should be equal to $x$ XOR $y$.
>or the same thing is 
> $$
(x+y)mod 2 = (xy)mod 2
>$$
^0f5bbd

If Alice and Bob are working with a local hidden variable theory, they agree on a strategy in advance. In this case, the strategy is

![[../../../../Supplemental Files/images/Pasted image 20240711143647.png]]

Given random $x,y$, Alice and Bob will 75% of the time at. (In red, they lose the game)
This describes local realism, because Alice and Bob's response is only ever probabilistic of each other. Alice having a zero in Strategy 2, doesn't necessarily mean Bob picks 1. They aren't influencing each other at non-local distances.

If we have a non-local hidden variable theory, and Alice and Bob have access to a pre-shared Bell pair $\frac{{\ket{00}+\ket{11}}}{\sqrt{ 2 }}$ , then they have an ability to win as
$$
P = \cos^{2}\left( \frac{\pi}{8} \right) \approx 85\%
$$
One bell inequality, is **this difference between the classical probability, and the quantum probability.** 


### *Analysis* of CHSH Quantum Strategy
First, Alice measures in $\left\{ \ket{0},\ket{1} \right\}$ and Bob measures in $\left\{ \ket{\frac{\pi}{8}},\ket{\frac{5\pi}{8}} \right\}$ .
- [0] The notation of $\ket{\theta}$ just implies a phase offset off the standard rotation
- Why $\ket{\frac{\pi}{8}}?$

#### **Rules of the Strategy**
 
Alice always goes first, then below this is what we do


| Input | Measurement on $\ket{\Psi^{+}}$                                              |
| ----- | ---------------------------------------------------------------------------- |
| x=0   | Alice measures in HV                                                         |
| x=1   | Alice Measures in DA                                                         |
| y=0   | Bob measures in $\left\{ \ket{\frac{\pi}{8}},\ket{\frac{5\pi}{8}} \right\}$  |
| y=1   | Bob measures in $\left\{ \ket{\frac{-\pi}{8}},\ket{\frac{3\pi}{8}} \right\}$ |
^CHSHstrategy

To then measure our win rate, we need to analyze 2 cases. ^cbf3c3
1. $xy=0$
	- To win this case, Alice and Bob should return $a=b=0$ or $a=b=1$
2. $xy=1$
	- To win this case Alice and Bob should return $a=0,b=1$ or $b=1,a=0$
It happens that when Bob is $\frac{\pi}{8}$ offset from the [[Definitions/Quantum Gates|$Z$ observable]], the probability on both these is $\cos^{2}\left( \frac{\pi}{8} \right)$

In general, we define the win rate as 
$$
P(win) = P(b=0|a')P(a')+P(b=1|a'')P(a'')
$$
	Which is to say, the sum of the product of the probability of getting $b$ given it's $a$, times the probability of $a$. Both $a,b$ are the combos needed to win the game at the win products.qyaA

If Bell's inequality is true, $P(win)\approx 85\%$

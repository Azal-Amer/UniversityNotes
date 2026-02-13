---
tags:
  - workshop
date: 2025-07-23
Location:
  - Princeton
source: "[[Princeton2025/README|README]]"
---
# Overview
We didn't just talk about the decided floating point standard here, but also talked about how floating point numbers can induce numerical instability. While preemptive strategies to avoid this are outlined, the reactive skills are much easier and how to diagnose it retroactively is outlined here.
# Notes

## Numbers for Humans vs Computers

![[../../../Math/Discrete Math/1.2 Sets of Numbers#^93ae61]] 


>[!quote] It's really fun to be in your 60's, assuming any of you make it that far

Scientific notation will often take some number, and represent it as a decimal value with it's order of a magnitude
$$
\text{Num} = \underbrace{ 9.8  }_{ \text{Significand} }\times \underbrace{ 10^{-2} }_{ \text{Radix} }
$$
This allows us to generalize any real number as 
$$
x = (-1)^{\text{sign}} \sum_{i=0}^{\textcolor{\yellow}{\boxed{\infty}}}d_{i}b^{-i}b^{\text{exp}}
$$

^d11695

- [0] Computers can't use the infinity though!
> [!exercise] AT HOME: Figure out how [[#^d11695]] works, because I'm a bit confused
## The Problem
With that program (In the repo's slides), you should get `5000` as the number of time passed. Instead, we get `4982.533`. **Why**?
This is because while .01 has no finite representation in base 2. 
The denominator includes a value which is relatively prime to the radix of binary numbers (5 to 2), so there's literally no way to make your way there. 
- [0] [This package](https://hackage.haskell.org/package/exact-real-0.12.5.1#readme) is always fun to look at

Lesson learned now, how do we go about fixing this problem? Floating point numbers aren't a closed set, so we should pick an increment which keeps us in there! Make `dt = 1/128` instead of `dt = 1/100`!

## The Standard
Computers use a normalized floating point number system, which fixes the first bit of the fraction as 1. That way between $1\times 2^{0},.1\times{2}^{1}$ we know which to pick
![](../../../../Supplemental%20Files/images/Pasted%20image%2020250723093255.png)
There are a few special values designated in IEEE 754, since it might not be possible with a finite precision to represent a small number with a leading bit of 1. See the lecture for that in particular. Interestingly, the IEEE spec defines $\pm \infty$ in the spec as well!
It's typically easier to write things down in hexadecimal!
> [!definition] Hexadecimal Number system
> A base 16 number system, used in computer science to act as a shorthand when working with binary. It's easier to visually convert to hex.

## Elementary Operations
### Addition
When you're adding floating point numbers, with different magnitudes we end up losing low order bits. If they're the same order, when we add we can just add together the mantissa and keep the exponent. When we can't, the low order bits end up having to be thrown out just to correct for the order of magnitude and preserve the finite information.

Arbitrary precision has NO loss of accuracy, but with floating point numbers, adding numbers of different sizes can lose low order bits. 

### Subtraction

> [!definition] Machine Epsilon
> For a given number system, $\epsilon$ is defined as the smallest number s.t $1+\epsilon>1$.

^672c62



Subtracting two numbers with similar size can cancel the higher order bits

### Rounding
IEEE 754 requires that basic arithmetic needs to be equal to the result for infinite-precision arithmetic when truncated.
I remember reading that banks actually have really wild rounding code which changes the direction it picks
A good rule of thumb to know if your code is numerically stable, is to see if the answer is approximately consistent when they are changed.  
 They are commutative, but NOT associative, and NOT distributive.

Here's an example of the lack of associativity in python. 
```run-python
a = 1e20
b = -1e20
c = 1.0
print((a+b)+c )
print(a+(b+c) )
```

Non-determinism is your friend, because it's a great flag for numerical instability.
 ![](../../../../Supplemental%20Files/images/Pasted%20image%2020250723100905.png)
 Another trick to track numerical instabilities, just perturb the input data and see if the result perturbs
Wait I need to know what the delta in the seating arrangement was
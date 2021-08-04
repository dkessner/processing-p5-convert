# Dandelin Spheres Demo - Implementation Notes

Dr. Darren Kessner  
Marlborough School  
December 2017  


## Overview

Dandelin spheres are a way of demonstrating that the intersection of a cone
with a plane is an ellipse.  The spheres are arranged in such way that each is
tangent to both the cone and the plane.  In this arrangement, to point where
either sphere is tangent to the plane is a focus of the ellipse.  The following
are some notes on the mathematics behind the implementation of this demo.

## Coordinate system and parameters

Before we do anything we need to define a 3D coordinate system for placing the
various objects (cone, spheres, etc.).  I chose to use a right-handed, y-up
coordinate system:  positive x-axis to the right, positive y-axis up, and
positive z-axis coming out of the screen toward the viewer.  In addition, I
scale the scene so that the y-axis range is [-100, 100].  

This choice has a couple of important consequences:  

1) The scaling means that we can think about the mathematical model without
worrying about the resolution of the screen we're viewing it on.

2) Flipping the y-axis means that positive rotations are measured
counter-clockwise, which is is standard in mathematics textbooks and also
consistent with many VR applications (e.g. Processing Android VR).  However, it
is important to note that by default Processing uses a left-handed coordinate
system, so in the Processing documentation, positive rotation angles are
measured clockwise.

Now for some notation (see figure "Coordinate system and parameters").  The
cone is centered at the origin, opening up in the direction of the positive
y-axis.  We denote the cone slant angle by $\theta_c$.  We parametrize the
plane by its slant angle with the x-axis $\theta_p$ and its y-intercept $y_c$.
The spheres are centered on the y-axis; we let $y_1$ and $y_2$ be the
y-intercepts, and $r_1$ and $r_2$ be the radii, respectively.

Here are a couple of initial observations.  First, the plane slants up to the
right, in the x direction with slope $\tan\theta_p$, but doesn't have any slope
in the z direction.  So the equation for the plane is: 
$$
y = (\tan\theta_p) x + y_p
$$

Also, the slope of the cone is $\tan \theta_c$, so the equation for the cone is:
$$
    y = (\tan \theta_c) r
$$
where $r = \sqrt{x^2 + z^2}$ is distance from the origin in the xz-plane.

![Coordinate system and parameters](dandelin0){width=100%}

\newpage


## Intersection of sphere and cone

Each sphere is sitting inside the cone; the sides of the cone are tangent to
the sphere.  The intersection of the sphere with the cone is a circle parallel
to the xz-plane.

Suppose we have a sphere inside the cone with y-intercept $y$ and radius $r$.
We observe that the relationship between $y$ and $r$ is given by the cone slant
height $\theta_c$:
$$
    \cos \theta_c = \frac{r}{y}
$$

As a consequence, we can let either $y$ or $r$ be a user-defined parameter, and
calculate the other based on the slant angle of the cone.

![Relation between sphere height and radius](dandelin1){width=70%}

\newpage

Using some more trigonometry we can calculate the intersection of the sphere
with the cone, which is a circle with radius $r\cos\theta_c$, in the plane
parallel to the xz-plane at y-intercept $y - r\sin\theta_c$, 

![Calculation of coordinates of upper and lower circles](dandelin2){width=70%}

\newpage


## Locating the plane

Given two spheres, you can imagine putting a plane between them, and then
tilting the plane until it just touches both spheres.  There is only one way to
do this (up to rotation around the axis between the spheres).  In other words,
the positions/sizes of the spheres determine the position of the plane.

Mathematically, this means we can calculate the plane parameters $\theta_p$ and
$y_p$ from the sphere parameters $y_1, r_1, y_2, \text{ and } r_2$.  From a
user interface perspective, this means that we can give the user 3 free
parameters: the cone slant height $\theta_c$, and the sphere radii $r_1$ and
$r_2$.  From these we can calculate $y_1$ and $y_2$ first, and then everything
else, including the location of the plane and ellipse.

Let $d$ be the distance between the plane intercept $y_p$ and the center of the
lower sphere $y_1$.  By considering similar triangles, we have:
$$
    \frac{d}{r_1} = \frac{(y_2-y_1)-d}{r_2}
$$
and solving for $d$ gives:
$$
    d = \frac{r_1 (y_2-y_1)}{r_1+r_2}
$$
Now we can calculate the plane parameters:
$$
    y_p = y_1 + d
$$
$$
    \theta_p = \cos^{-1} \left( \frac{r_1}{d} \right)
$$
Next, by considering the altitude on hypotenuse for each of the two similar
triangles we can figure out where the foci of the ellipses are:
$$
    (-r_1 \sin\theta_p, y_1 + r_2 \cos\theta_p)
$$
$$
    (r_2 \sin\theta_p, y_2 - r_2 \cos\theta_p)
$$
The vertices of the ellipse are the highest and lowest points (y values).  We
can find these by considering the xy-plane only.  Let $m_p = \tan\theta_p$ be
the slope of the plane, and $m_c = \tan\theta_c$ be the slope of the cone.  We
want to find the intersection of $y = m_p x + y_p$ with the cone boundary lines
$y = \pm m_c x$.  The solutions are:
$$
    (\frac{y_p}{m_c-m_p}, \frac{m_c y_p}{m_c-m_p})
$$
$$
    (\frac{-y_p}{m_c+m_p}, \frac{m_c y_p}{m_c+m_p})
$$
From the positions of the vertices and foci we can calculate the semi major
axis length $a$ and semi focal distance $c$, which gives us the semi minor axis
length $b$ via the Pythagorean relation for ellipses $c^2 = a^2 - b^2$.  We can
also calculate the center of the ellipse (midpoint between the foci, or the
vertices).  Given the center and axis lengths of the ellipse, we can draw it
with the Processing `ellipse()` function after rotating by the plane slant
angle.

![Calculation of plane and ellipse coordinates](dandelin3){width=100%}

\newpage


## Parametrization of ellipse orbit

For the orbit around the ellipse, parametrizing the end points on the upper
and lower circles is simple enough, using
$$
    (x, y) = (r \cos t, r \sin t)
$$
where $t$ represents the orbit angle from z axis, measured counter-clockwise in the
xz-plane.

However, it is not obvious how to calculate the coordinates of the the
corresponding point on the ellipse.  Observe that the point on the ellipse is
the intersection of one of the cone's straight lines with the slanted plane.
The plane is given by the equation:
$$
    y = m_p x + y_p
$$

If we let $r = \sqrt{x^2 + z^2}$ be the distance to our point from the y axis,
then we have $z=r\cos t$ and $x = r\sin t$ (and $\tan t = \frac{x}{z}$).  So we
can parametrize the cone line with $y$ and $z$ as functions of $x$:
$$
    y = m_c r = \frac{m_c x}{\sin t}
$$
$$
    z = \frac{x}{\tan t}
$$

We have two equations above for $y$ as a function of $x$, and solving for $x$
gives us: 
$$
    x = \frac{y_p}{\frac{m_c}{\sin t} - m_p}
$$

To summarize, given orbit angle $t$, we can first find $x$, and then $y$ and
$z$ for the point as it orbits around the ellipse.  



![Parametrization of ellipse orbit](dandelin4){width=100%}

---
geometry: margin=1in
---



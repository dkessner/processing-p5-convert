---
title: Dandelin Spheres
layout: default 
---

The code for this demo is written in Processing.  This demonstrates live
loading, conversion, and running of a sketch with multiple .pde files.

<hr/>

This is an interactive demo of [Dandelin
spheres](https://en.wikipedia.org/wiki/Dandelin_spheres), showing that the
cross section of a cone sliced by a plane is an ellipse.  Scroll down for a
mathematical explanation of the demo.

Click on graph to activate keyboard control.

* Camera navigation: mouse or arrow keys
* Cone angle: a/q
* Radius 1: s/w
* Radius 2: d/e

<!--
<canvas data-processing-sources="dandelin.pde 
                                 Cone.pde 
                                 CylinderNavigator.pde 
                                 DandelinSpheres.pde"></canvas>
                                 -->

<script src="{{ site.baseurl }}/p5/p5.min.js"></script>
<script src="{{ site.baseurl }}/js/processing-p5-convert-bundle.js"></script>
<script src="{{ site.baseurl }}/js/processing-p5-convert-bootstrap.js"></script>

<main id="ppconvert" src="dandelin.pde 
                          Cone.pde 
                          CylinderNavigator.pde 
                          DandelinSpheres.pde"></main>


## Mathematical Explanation

We learn in precalculus that the intersection of a plane with a cone can be an
ellipse, parabola, or hyperbola, depending on the angles of the cone and the
plane.  Think about the ellipse case:  how do we know that it's actually an
ellipse?  Recall the geometric definition of an ellipse:  the set of points in
a plane where the sum of the distances to two designated points (foci) is
constant.  How do we know that this condition is satisfied by the intersection
curve?

First notice that there are two spheres inside the cone.  Each one sits just
inside the cone, so that the surface of the cone is tangent to the surface of
the sphere at the points of contact, which form a circle (indicated in white).
These two spheres uniquely determine the angle of the plane that is tangent to
both.  The intersection of the plane with the cone is indicated by the green
ellipse.  The two points of tangency are the two foci of the ellipse.  

Watch the orbit of the green ball, and the blue/red line segment that it lies
on.  The length of this line segment is constant as it goes around the cone, as
it is the straight-line distance along the cone from one white circle to the
other.  In other words, the length of the blue segment plus the length of the
red segment is constant.  

Now look at the two red line segments.  The two segments share an endpoint and
they are both tangent to the same sphere, so they are congruent (Two Tangent
Theorem).  Similarly, the two blue line segments are congruent.

Finally, look at the red and blue line segments that are sitting in the plane
of the green ellipse.  They indicate the distances from the green ball to the
two foci of the ellipse.  As we observed earlier, the length of the blue
segment plus the length of the red segment is constant.   This is the geometric
definition of an ellipse.  

For those of you who are interested in the details, here is a mathematical
write up of the implementation [
[html](DandelinSpheres_ImplementationNotes/DandelinSpheres_ImplementationNotes.html)
[pdf](DandelinSpheres_ImplementationNotes/DandelinSpheres_ImplementationNotes.pdf) ].


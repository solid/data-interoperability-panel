# Use Cases for Data Validation

## Introduction

Server-side data validation is an essential factor to the seamless interoperability promised by Solid. Two applications that manipulate the same kind of data, developed with no knowledge of each other, should be able to write that data without breaking each other. Using common linked data vocabularies is not enough to satisfy this fundamental need. Data Shape languages like [ShEx](http://shex.io/shex-semantics) and [SHACL](https://www.w3.org/TR/shacl/) help us solve this.

Shapes allow us to define schemas with attributes from different linked data vocabularies. We can then test input data against those shapes and determine whether that input conforms to the shape or not. In other words, if we have a shape for a comment, and an application tries to write a comment, we can use our shape to validate whether that comment adheres to our expectation (the shape) of how a comment should be structured. Now we can use many different applications to safely read and write comments, just by adhering to the comment shape.

Unfortunately, we cannot trust that all clients will write conformant data on their own. Consequently, we must be able to enforce conformance to a given shape on-pod, as the client writes the data.

## Use Cases

The following use cases must be considered when designing a system for shape-based data validation in Solid.

## References

* [Linked Data Shapes, Forms, and Footprints](https://www.w3.org/DesignIssues/Footprints.html)

* [Shape Expressions](http://shex.io/shex-semantics)

* [Shapes Constraint Language](https://www.w3.org/TR/shacl/)

* [Shaping Linked Data](https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/)

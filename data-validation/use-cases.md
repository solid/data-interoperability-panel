# Use Cases for Data Validation

## Introduction

Server-side data validation is an essential factor to the seamless interoperability promised by Solid. Two applications that manipulate the same kind of data, developed with no knowledge of each other, should be able to write that data without breaking each other. Using common linked data vocabularies is not enough to satisfy this fundamental need. Data Shape languages like [ShEx](http://shex.io/shex-semantics) and [SHACL](https://www.w3.org/TR/shacl/) help us solve this.

Shapes allow us to define schema models with attributes from different linked data vocabularies. We can then test input data against those shape schemas and determine whether that input conforms to the shape or not. In other words, if we have a shape for a comment, and an application tries to write a comment, we can use that shape to validate whether that comment adheres to our expectation (the shape) of how a comment should be structured. Now we can use many different applications to safely read and write comments, just by adhering to the comment shape schema.

Unfortunately, we cannot trust that all clients will write conformant data on their own. Consequently, we must be able to enforce conformance to a given shape at the pod, as the client writes the data.

## Problem Cases

The following use cases detail some of the problems related to a Solid ecosystem without on-pod data validation.

__An application breaks interoperability around a common set of related data.__
- Alice and Mary use the FooChat application, because it has a native Mac application and they both have MacBooks. Bob uses BarChat because it runs on Linux.
- Bob decides to get the bleeding edge version of BarChat because it has a cool new feature he wants.
- Unfortunately, this version of BarChat has a bug, and writes messages in a format that FooChat cannot parse, and modifies the meta-data associated with the chatroom in a manner that breaks the linkages between the chat and the messages associated with it.
- Bob is no longer able to chat with Alice and Mary because FooChat can't parse or even see the new messages.
- Alice and Mary both see an error in FooChat because the chatroom metadata has been corrupted.
- Most importantly, they don't have much recourse. Fixing the problem involves manually editing linked data. They are savvy, but they aren't experts in RDF.

__An application *migrates* data, and creates breaking changes for other applications.__  
- Alice uses FooHealth to manage all of her personal health data, which is stored in her Solid pod.
- FooHealth has a major update. For that update to work, it needs to cycle through all of her existing data and make structural changes.
- FooHealth was already granted write access to Alice's health data because it is her primary tool for managing the data inside.
- Alice gets a prompt from FooHealth to migrate her data. She approves it because she doesn't realize that it could affect other important applications that rely on that data to be in a consistent format.
- The data is migrated, and Alice immediately realizes that two other important applications, TrueHealth and YouHealth, no longer work.

__An application prompts a user to make decisions about shape constraints__
- Bob has a brand new data pod, and has recently decided to use ExampleApp to manage the data he's collecting as part of research and development work that he's performing.
- ExampleApp works with a wide variety of new shapes that Bob hasn't stored before, and writes data to the pod that conforms to different combinations of these shapes depending on the workflows Bob uses.
- Before ExampleApp starts writing data, it prompts Bob and asks if he would like to enforce shape constraints on this data in his pod.
- Based on the shapes it will write data for, and the places it will store them, ExampleApp prompts Bob with a bunch of toggles to determine which ones he does and doesn't want to enforce.
- Bob has no idea what shapes are. He get intimidated and abandons ExampleApp and Solid.


## References

1. Shape Expressions - http://shex.io/shex-semantics

1. Shapes Constraint Language - https://www.w3.org/TR/shacl/

1. Linked Data Shapes, Forms, and Footprints - https://www.w3.org/DesignIssues/Footprints.html

1. Shaping Linked Data - https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/

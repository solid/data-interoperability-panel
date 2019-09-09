# Use Cases for Data Validation

## Introduction

Server-side data validation is an essential factor to the seamless interoperability promised by Solid. Multiple applications that manipulate the same kind of data, developed with no knowledge of each other, should be able to write that data without breaking each other. This requires all applications to conform to a common schema. Data Shape languages like [ShEx](http://shex.io/shex-semantics) and [SHACL](https://www.w3.org/TR/shacl/) help us solve this.

Shapes allow us to define schema models with attributes from different linked data vocabularies. We can then test input data against those shape schemas and determine whether that input conforms to the shape or not. In other words, if we have a shape for a comment, and an application tries to write a comment, we can use that shape to validate whether that comment adheres to our expectation (the shape) of how a comment should be structured. Now we can use many different applications to safely read and write comments, just by adhering to the comment shape schema.

Schema validators are an enormous aid to application developers, but we cannot trust that all clients will write conformant data all the time. Consequently, we must be able to enforce conformance to a given shape at the pod, as the client writes the data.

## Problem Cases

The following use cases detail some of the problems related to a Solid ecosystem without on-pod data validation.

__An application breaks interoperability around a common set of related data.__
- Alice and Mary use the FooChat application, because it has a native Mac application and they both have MacBooks. Bob uses BarChat because it runs on Linux.
- Bob decides to get the bleeding edge version of BarChat because it has a cool new feature he wants.
- Unfortunately, this version of BarChat has a bug, and writes messages in a format that FooChat cannot parse, and modifies the meta-data associated with the chatroom in a manner that breaks the linkages between the chat and the messages associated with it.
- Bob is no longer able to chat with Alice and Mary because FooChat can't parse or even see the new messages.
- Alice and Mary both see an error in FooChat because the chatroom metadata has been corrupted.
- Most importantly, they don't have much recourse. Fixing the problem involves manually editing linked data, possibly requiring information lost when BarChat wrote malformed data. They are savvy, but they aren't experts in RDF.

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

## Use Cases

### Enabling schema validation

These use cases are focused on *setting* or *enabling* schema validation for resources or containers.

#### Enabling shape validation on a resource

- Bob uses FooChat to communicate with his co-workers.
- Bob creates a chatroom where he can exchange messages with Alice and Mary.
- FooChat writes data conforming to a chat shape at `<https://bob.example/chats/maryalice.ttl>`, and turns on shape validation for `<https://bob.example/chats/maryalice.ttl>` to ensure that data in this resource conforms to the Chat shape.

#### Enabling shape validation on a container

- Bob uses FooChat to communicate with his co-workers.
- Bob has a chatroom where he can exchange messages with Alice and Mary.
- When Bob created the chatroom, FooChat setup a container to store messages.
- The container organizes messages into sub-containers by month and day
  - `<https://bob.example/chats/maryalice/2019/8/1.ttl>`
  - `<https://bob.example/chats/maryalice/2019/8/2.ttl>`
  - `<https://bob.example/chats/maryalice/2019/8/3.ttl>`
- __Scenario A - Setting blanket validation on a container__
  - FooChat turns on shape validation for `<https://bob.example/chats/maryalice/>` to ensure that all data written in that container, and in any containers within it, conforms to the Message shape.
- __Scenario B - Setting validation based on regular expression__
  - FooChat turns on shape validation for `<https://bob.example/chats/maryalice/%d*/%d*/%d.ttl>` to more narrowly ensure that data written in the month/day subordinate containers conform to the message shape.

#### Enabling shape validation as data is created

- Alice uses FooHealth to manage her Personal Health Data.
- FooHealth is able to consume an export of health data from the EHR system at her primary care provider.
- It transforms the export into shape-conformant linked data, which it then proceeds to write into her pod across a number of containers and resources.
- Different resources will have different shape constraints applied to them, which FooHealth will set as it goes.
- This doesn't require any special input from Alice.

### Validating data

These use cases are focused on *validating* data as it is written to resources or containers.

#### Validating data when a specific resource has associated validators

- Bob uses FooChat to communicate with his co-workers.
- Bob creates a chatroom where he can talk to his colleague Rob.
- FooChat writes data representing a chatroom at `<https://bob.example/chats/rob.ttl>`, which has a validator set for the ShEx chat shape at `<https://shapes.example/chat.shex>`.
- Because the chatroom data conformed to the shape constraints of `<https://shapes.example/chat.shex>`, it was written successfully.

#### Validating data when the resource's container has associated validators

- Alice uses FooHealth to manage her Personal Health Data.
- Alice's doctor uses an EHR system called BarEHR that is Solid compatible.
- BarEHR stores the results from Alice's most recent blood test in `<https://alice.example/phr/diagnostics/081203.ttl>`.
- The container at `<https://alice.example/phr/diagnostics/>` has a validator set that mandates all data within it conform to `<https://shapes.example/test-diagnostic.ttl>`.
- Because the data written in `<https://alice.example/phr/diagnostics/081203.ttl>` corresponds to the SHACL shape at `<https://shapes.example/test-diagnostic.ttl>`, it is written successfully.

#### Validating data when a resource has mixed data

- Mary uses ExampleTask to manage her projects and their associated tasks.
- She is working on a Supply Chain project. ExampleTask stores both the project metadata, and the associated tasks for it at `<https://alice.example/projects/supply-chain.ttl>`.
- There are multiple validators set on `<https://alice.example/projects/supply-chain.ttl>`. Specifically, data written to this resource must conform to both `<https://shapes.example/project.shex>` and `<https://shapes.example/task.shex>`.

#### Validating sets of data

- Rob uses PondStat to record the temperature of his pond.
- PondStat takes one thousand measurements per second and stores the result to Rob's pod, because Rob is serious about fluctuations in pond climate.
- This data is stored in a container in his pod at `<https://rob.example/pond/measurement/>`.
- Since it would be expensive to send 1000 requests per second, PondStat sends one request per second containing 1000 instances of data that conforms to the `<https://shapes.example/pond-measurement.ttl>` SHACL shape.
- Because each instance of data written conforms to the SHACL shape at `<https://shapes.example/pond-measurement.ttl>`, it is written successfully.

### Modifying shape validation

These use cases are focused on *modifying* validations that are already in place on resources or containers.

#### Adding additional shape validations to a resource

- Alice uses FooHealth to manage her Personal Health Data.
- Alice's doctor uses an EHR system called BarEHR that is Solid compatible.
- BarEHR maintains a care plan resource at `<https://alice.example/phr/care-plan.ttl>` that maps to a number of other resources such as prescribed diagnostics, prescriptions for medication, and other required activities.
- This care plan resource has a validator set that ensures it conforms to `<https://shapes.example/care-plan.shex>`.
- A new version of BarEHR allows it to canonicalize and sign the care plan data, then store the results in the same resource, conforming to the `<https://shapes.example/data-signature.shex>` shape.
- BarEHR adds `<https://shapes.example/data-signature.shex>` to the allowed validators for `<https://alice.example/phr/care-plan.ttl>`, such that both must be present (the care plan is always signed) to pass validation.

#### Adding additional shape validations to a container

- Bob uses FooChat to communicate with his co-workers.
- Bob creates a chatroom where he can talk to his colleague Rob.
- Rob uses WhoChat instead of FooChat.
- WhoChat is able to interpret the chat shape for the room at `<https://bob.example/chats/bobandrob.ttl>`.
- It is also able to read the the messages associated with it in `<https://bob.example/chats/bobandrob/>`. That container has one registered shape, `<https://shapes.example/message.shex#MessageContainerShape>`.
- Because `<#MessageContainerShape>` already permitted additional ldp:contains to non-messages, WhoChat is able to weave polls into chatroom streams by registering `<https://whochat.example/poll.shex#PollContainerShape>` for the same container.

#### Modifying shape validations

- Alice switches to a new care network which uses FooEHR instead of BarEHR to manage her Personal Health Record.
- This care plan resource has two registered validators that ensure that it conforms to both  `<https://shapes.example/care-plan.shex>` and `<https://shapes.example/data-signature.shex>`.
- FooEHR attempts to update her care plan at `<https://alice.example/phr/care-plan.ttl>`, but without including a signature.
- FooEHR is unable to write this update because it doesn't have support for signing the care plan data and storing it in `<https://shapes.example/data-signature.shex>`.
- FooEHR would like to remove this validator so that it can write updates to Alice's care plan. Static analysis reveals that this would break BarEHR.

#### Updating to a new version of a shape
- Rob uses PondStat to record the temperature of his pond.
- Rob has been recording temperature measurements in his pod at `<https://rob.example/pond/measurement/>`, by writing data that conforms to the SHACL shape at `<https://shapes.example/pond-measurement.ttl>`.
- PondStat decides to update to a new version of the shape at `<https://shapes.example/pond-measurement-v2.ttl>`, which supports measuring algae levels as well as temperature.
- PondStat needs to ensure that updating to the new version of the shape doesn't break compatibility with other applications reading or writing to the measurement data in `<https://rob.example/pond/measurement/>`.

## Misuse Cases

To be populated with *negative* use cases that must be considered when designing a system for shape-based data validation in Solid.

## Out of Scope

To be populated with use cases considered *out of the scope* of Data Validation.

## References

* [Linked Data Shapes, Forms, and Footprints](https://www.w3.org/DesignIssues/Footprints.html)

* [Shape Expressions](http://shex.io/shex-semantics)

* [Shapes Constraint Language](https://www.w3.org/TR/shacl/)

* [Shaping Linked Data](https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/)

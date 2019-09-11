# Use Cases for Data Validation

## Introduction

Server-side data validation is an essential factor of the seamless interoperability promised by Solid. Multiple applications that manipulate the same kind of data, developed with no knowledge of each other, should be able to write that data without breaking each other. This requires all applications to conform to a common schema. Data Shape languages like [ShEx](http://shex.io/shex-semantics) and [SHACL](https://www.w3.org/TR/shacl/) help us solve this.

Shapes allow us to define schema models with attributes from different linked data vocabularies. We can then test input data against those shape schemas and determine whether that input conforms to the shape or not. In other words, if we have a shape for a comment, and an application tries to write a comment, we can use that shape to validate whether that comment adheres to our expectation (the shape) of how a comment should be structured. Now we can use many different applications to safely read and write comments, just by adhering to the comment shape schema.

Schema validators are an enormous aid to application developers, but we cannot trust that all clients will write conformant data all the time. Consequently, we must be able to enforce conformance to a given shape at the pod, as the client writes the data.

## Problem Cases

The following use cases detail some of the problems related to a Solid ecosystem without on-pod data validation.

__An application breaks interoperability around a common set of related data.__
1. Alice and Mary use the FooChat application, because it has a native Mac application and they both have MacBooks. Bob uses BarChat because it runs on Linux.
1. Bob decides to get the bleeding edge version of BarChat because it has a cool new feature he wants.
1. Unfortunately, this version of BarChat has a bug, and writes messages in a format that FooChat cannot parse, and modifies the meta-data associated with the chatroom in a manner that breaks the linkages between the chat and the messages associated with it.
1. Bob is no longer able to chat with Alice and Mary because FooChat can't parse or even see the new messages.
1. Alice and Mary both see an error in FooChat because the chatroom metadata has been corrupted.
1. Most importantly, they don't have much recourse. Fixing the problem involves manually editing linked data, possibly requiring information lost when BarChat wrote malformed data. They are savvy, but they aren't experts in RDF.

__An application *migrates* data, and creates breaking changes for other applications.__
1. Alice uses FooHealth to manage all of her personal health data, which is stored in her Solid pod.
1. FooHealth has a major update. For that update to work, it needs to cycle through all of her existing data and make structural changes.
1. FooHealth was already granted write access to Alice's health data because it is her primary tool for managing the data inside.
1. Alice gets a prompt from FooHealth to migrate her data. She approves it because she doesn't realize that it could affect other important applications that rely on that data to be in a consistent format.
1. The data is migrated, and Alice immediately realizes that two other important applications, TrueHealth and YouHealth, no longer work.

__An application prompts a user to make decisions about shape constraints__
1. Bob has a brand new data pod, and has recently decided to use ExampleApp to manage the data he's collecting as part of research and development work that he's performing.
1. ExampleApp works with a wide variety of new shapes that Bob hasn't stored before, and writes data to the pod that conforms to different combinations of these shapes depending on the workflows Bob uses.
1. Before ExampleApp starts writing data, it prompts Bob and asks if he would like to enforce shape constraints on this data in his pod.
1. Based on the shapes it will write data for, and the places it will store them, ExampleApp prompts Bob with a bunch of toggles to determine which ones he does and doesn't want to enforce.
1. Bob has no idea what shapes are. He get intimidated and abandons ExampleApp and Solid.

## Use Cases

### Enabling schema validation

These use cases are focused on *setting* or *enabling* schema validation for resources or containers.

#### Enabling shape validation on a resource

1. Bob uses FooChat to communicate with his co-workers.
1. Bob creates a chatroom where he can exchange messages with Alice and Mary.
1. FooChat writes data conforming to a chat shape at `<https://bob.example/chats/maryalice.ttl>`, and turns on shape validation for `<https://bob.example/chats/maryalice.ttl>` to ensure that data in this resource conforms to the Chat shape.

#### Enabling shape validation on a container

1. Bob uses FooChat to communicate with his co-workers.
1. Bob has a chatroom where he can exchange messages with Alice and Mary.
1. When Bob created the chatroom, FooChat setup a container to store messages.
1. The container organizes messages into sub-containers by month and day
  - `<https://bob.example/chats/maryalice/2019/8/1.ttl>`
  - `<https://bob.example/chats/maryalice/2019/8/2.ttl>`
  - `<https://bob.example/chats/maryalice/2019/8/3.ttl>`
- __Scenario A - Setting blanket validation on a container__
  1. FooChat turns on shape validation for `<https://bob.example/chats/maryalice/>` to ensure that all data written in that container, and in any containers within it, conforms to the Message shape.
- __Scenario B - Setting validation based on regular expression__
  1. FooChat turns on shape validation for `<https://bob.example/chats/maryalice/%d*/%d*/%d.ttl>` to more narrowly ensure that data written in the month/day subordinate containers conform to the message shape.

#### Enabling shape validation as data is created

1. Alice uses FooHealth to manage her Personal Health Data.
1. FooHealth is able to consume an export of health data from the EHR system at her primary care provider.
1. It transforms the export into shape-conformant linked data, which it then proceeds to write into her pod across a number of containers and resources.
1. Different resources will have different shape constraints applied to them, which FooHealth will set as it goes.
1. This doesn't require any special input from Alice.

### Validating data

These use cases are focused on *validating* data as it is written to resources or containers.

#### Validating data when a specific resource has associated validators

1. Bob uses FooChat to communicate with his co-workers.
1. Bob creates a chatroom where he can talk to his colleague Rob.
1. FooChat writes data representing a chatroom at `<https://bob.example/chats/rob.ttl>`, which has a validator set for the ShEx chat shape at `<https://shapes.example/chat.shex>`.
1. Because the chatroom data conformed to the shape constraints of `<https://shapes.example/chat.shex>`, it was written successfully.

#### Validating data when the resource's container has associated validators

1. Alice uses FooHealth to manage her Personal Health Data.
1. Alice's doctor uses an EHR system called BarEHR that is Solid compatible.
1. BarEHR stores the results from Alice's most recent blood test in `<https://alice.example/phr/diagnostics/081203.ttl>`.
1. The container at `<https://alice.example/phr/diagnostics/>` has a validator set that mandates all data within it conform to `<https://shapes.example/test-diagnostic.ttl>`.
1. Because the data written in `<https://alice.example/phr/diagnostics/081203.ttl>` corresponds to the SHACL shape at `<https://shapes.example/test-diagnostic.ttl>`, it is written successfully.

#### Validating data when a resource has mixed data

1. Mary uses ExampleTask to manage her projects and their associated tasks.
1. She is working on a Supply Chain project. ExampleTask stores both the project metadata, and the associated tasks for it at `<https://alice.example/projects/supply-chain.ttl>`.
1. There are multiple validators set on `<https://alice.example/projects/supply-chain.ttl>`. Specifically, data written to this resource must conform to both `<https://shapes.example/project.shex>` and `<https://shapes.example/task.shex>`.

#### Validating sets of data

1. Rob uses PondStat to record the temperature of his pond.
1. PondStat takes one thousand measurements per second and stores the result to Rob's pod, because Rob is serious about fluctuations in pond climate.
1. This data is stored in a container in his pod at `<https://rob.example/pond/measurement/>`.
1. Since it would be expensive to send 1000 requests per second, PondStat sends one request per second containing 1000 instances of data that conforms to the `<https://shapes.example/pond-measurement.ttl>` SHACL shape.
1. Because each instance of data written conforms to the SHACL shape at `<https://shapes.example/pond-measurement.ttl>`, it is written successfully.

### Modifying shape validation

These use cases are focused on *modifying* validations that are already in place on resources or containers.

#### Adding additional shape validations to a resource

1. Alice uses FooHealth to manage her Personal Health Data.
1. Alice's doctor uses an EHR system called BarEHR that is Solid compatible.
1. BarEHR maintains a care plan resource at `<https://alice.example/phr/care-plan.ttl>` that maps to a number of other resources such as prescribed diagnostics, prescriptions for medication, and other required activities.
1. This care plan resource has a validator set that ensures it conforms to `<https://shapes.example/care-plan.shex>`.
1. A new version of BarEHR allows it to canonicalize and sign the care plan data, then store the results in the same resource, conforming to the `<https://shapes.example/data-signature.shex>` shape.
1. BarEHR adds `<https://shapes.example/data-signature.shex>` to the allowed validators for `<https://alice.example/phr/care-plan.ttl>`, such that both must be present (the care plan is always signed) to pass validation.

#### Adding additional shape validations to a container

1. Bob uses FooChat to communicate with his co-workers.
1. Bob creates a chatroom where he can talk to his colleague Rob.
1. Rob uses WhoChat instead of FooChat.
1. WhoChat is able to interpret the chat shape for the room at `<https://bob.example/chats/bobandrob.ttl>`.
1. It is also able to read the the messages associated with it in `<https://bob.example/chats/bobandrob/>`. That container has one registered shape, `<https://shapes.example/message.shex#MessageContainerShape>`.
1. Because `<#MessageContainerShape>` already permitted additional ldp:contains to non-messages, WhoChat is able to weave polls into chatroom streams by registering `<https://whochat.example/poll.shex#PollContainerShape>` for the same container.

#### Modifying shape validations

1. Alice switches to a new care network which uses FooEHR instead of BarEHR to manage her Personal Health Record.
1. This care plan resource has two registered validators that ensure that it conforms to both  `<https://shapes.example/care-plan.shex>` and `<https://shapes.example/data-signature.shex>`.
1. FooEHR attempts to update her care plan at `<https://alice.example/phr/care-plan.ttl>`, but without including a signature.
1. FooEHR is unable to write this update because it doesn't have support for signing the care plan data and storing it in `<https://shapes.example/data-signature.shex>`.
1. FooEHR would like to remove this validator so that it can write updates to Alice's care plan. Static analysis reveals that this would break BarEHR.

#### Updating to a new version of a shape
1. Rob uses PondStat to record the temperature of his pond.
1. Rob has been recording temperature measurements in his pod at `<https://rob.example/pond/measurement/>`, by writing data that conforms to the SHACL shape at `<https://shapes.example/pond-measurement.ttl>`.
1. PondStat decides to update to a new version of the shape at `<https://shapes.example/pond-measurement-v2.ttl>`, which supports measuring algae levels as well as temperature.
1. PondStat needs to ensure that updating to the new version of the shape doesn't break compatibility with other applications reading or writing to the measurement data in `<https://rob.example/pond/measurement/>`.

## Misuse Cases

To be populated with *negative* use cases that must be considered when designing a system for shape-based data validation in Solid.

## Out of Scope

To be populated with use cases considered *out of the scope* of Data Validation.

## References

1. Shape Expressions - http://shex.io/shex-semantics

1. Shapes Constraint Language - https://www.w3.org/TR/shacl/

1. Linked Data Shapes, Forms, and Footprints - https://www.w3.org/DesignIssues/Footprints.html

1. Shaping Linked Data - https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/

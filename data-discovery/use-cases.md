# Use Cases for Data Discovery

The following use cases must be considered when designing a mechanism for a data pod to define how its data is stored and indexed so that a given application can automatically find the data that it needs.

1.  Identification scheme

In order for data of a particular type to be created,
we need to tell an application what the prefered mechanism for creating
instance ids should be.

For example,

`namespace/type/uuid`

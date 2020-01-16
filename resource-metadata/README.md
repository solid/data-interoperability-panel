# Resource Metadata in Solid

A project undertaken by the [Data Interoperability Panel](https://github.com/solid/data-interoperability-panel).

## Goal

The aim of this project is to produce a candidate proposal to the [Solid Specification](https://github.com/solid/specification) that defines a mechanism for how metadata (such as access control or shape constraints) is associated and accessed for a given resource.

# Draft Resources

This section and the content inside it is meant to aid those contributing to or reviewing the [draft proposal](hypothesis.md).

## Additional References

[Solid Content Representation Spec](https://github.com/solid/solid-spec/blob/master/content-representation.md) - This is the original component specification document (circa 2016) that defined a metadata discovery mechanism using Link headers.

Notable issues:
- [Specify approach for resource metadata](https://github.com/solid/specification/issues/102)
- [Specify metadata mechanism for Containers, RDFResources, NonRDFResources](https://github.com/solid/specification/issues/63)
- [Clarify the lifecycle of an ACL resource](https://github.com/solid/specification/issues/58)
- [Proposal: server-protected metadata](https://github.com/solid/specification/issues/65)
- [Methods for ACL resource creation](https://github.com/solid/specification/issues/42)
- [How does the server determine whether a resource is an ACL resource](https://github.com/solid/specification/issues/31)
- [Atomicity of creating a resource and its ACL](https://github.com/solid/specification/issues/131)
- [ACL for meta resources](https://github.com/solid/solid/issues/130)
- [How should we handle metadata of non-RDF sources](https://github.com/solid/solid-spec/issues/197)
- [How to delete metadata file?](https://github.com/solid/solid-spec/issues/168)
- [When a resource is deleted, should the acl be deleted too?](https://github.com/solid/solid/issues/251)
- [When deleting a resources, should the corresponding ACL document be deleted?](https://github.com/solid/solid-spec/issues/187)
- [Explain the ACL inheritance algorithm for clients](https://github.com/solid/specification/issues/106)

Items/themes that are raised in the issues above and should be addressed in some form:

- Reconfirm use of describedby as a way to get to meta information (#63)
- Specify that metadata should be handled as regular RDF resources - probably should put this in the opening section.
- Specify the semantics of meta information for containers (#63)
  - Take a look at current NSS use of .meta for containers
- Clarify whether metadata for a container counts towards it being empty or not (#63)
- Specify semantics of meta for NonRDFResources (#63)
- Specify semantics of meta for RDFResources (#63)
- Clarify permissioning of .meta resources (#63)
  - Can a client always read metadata?
  - Can a client always know the metadata is there (e.g. link headers are advertised)
  - What if the user wants to provide access to the file but not the file metadata?
- Clarify the lifecycle of .meta resources (#63, #58)
  - [Consensus](https://github.com/solid/specification/issues/31) that deleting a resource must remove associated ACL resource
- Specify how .meta resources get serialized (#63)
- Differentiate user-writeable metadata from server-protected metadata (#63, #65)
  - For a given piece of metadata, it is
    - only readable and writeable by the server (e.g. internal indexing)
    - readable by any client subject to permissions on resource, but only written by the server (e.g. timestamps)
    - readable and writeable by any client subject to permissions on resource (i can set the shape constraint, or read/write the acl)
- Determine whether we should point out the actual ACL resource in use in a new link header (timbl suggestion, ruben created issue). Discussed in #31, proposed in #106
- Can you create an ACL resource in advance, or at the time of creation of the resource itself? (#131)

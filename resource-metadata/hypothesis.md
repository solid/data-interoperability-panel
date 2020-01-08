# Resource Metadata Model

## Background

*This section is non-normative*

This document introduces a mechanism for linking to metadata about resources in the Solid Ecosystem using HTTP Link headers. Examples of this linking mechanism include:

- A binary JPEG image with a Link header, pointing to a description that has an RDF representation.
- An LDP container with a Link header, pointing to an ACL resource that governs access controls for the contained resources.
- A resource whose shape is constrained by a ShEx document includes a Link header that points to that ShEx resource.
- A resource may keep an audit trail of modification events. A client could follow the URI in a Link header to access that audit trail.

A given resource might link to zero or more such related metadata representations. Having a unified model to describe how clients and servers interact with and process these resources will help clarify expectations, while also providing a shared pattern for extending the features of server implementations.

The metadata model described in this document makes it possible for clients to decorate resources with structured descriptive data. Those metadata may serve as supplementary descriptions or, when supported by a server implementation, they may influence the behavior of the resources.

Some examples include:

- An ACL resource controls how a server makes authorization decisions for a container and any child resources.
- A shape constraint resource may limit the RDF structures that can be added to a resource or container.
- A “configuration” resource may control how a resource is versioned, or which indexes are exposed for it.

Access to different categories of metadata may require different levels of privilege, which must be specified as part of the definition for a given metadata type.

## Metadata Discovery
Given the URL of a resource, a client can discover the metadata resources by issuing a `GET` (or `HEAD`) request and inspecting the `Link` headers in the response. The [`rel={attribute}`](https://tools.ietf.org/html/rfc8288) will define the relationship to the target URL.

For any defined metadata type available for a given resource, all representations of that resource MUST include a Link header pointing to the location of each metadata resource. For example, as defined by the Solid Web Access Control specification, a client can use this mechanism to discover the location of an ACL resource:

Link: <https://example.com/resource?acl>; rel="acl"

Metadata discovered through a Link header for a given resource is considered to be *directly associated* with that resource.

### Discovery of Annotated Resource

Certain metadata resource types MAY require the server to include a link back to the annotated resource using an appropriate link relation. For example, LDP defines a bidirectional discovery mechanism for RDF descriptions of NonRDF resources, via Link headers:

Link: <https://example.com/binary?description>; rel="description"

along with:

Link: <https://example.com/binary>; rel="describedby"

For cases where link relations are not defined by IANA, a URL can be used. For example:

Link: <https://example.com/resource?meta>;
        rel="https://example.org/ns#hasMetadata"

and:

Link: <https://example.com/resource>;
        rel="https://example.org/ns#isMetadataOf"

String-based link relations, such as in the examples above, must be registered with IANA. But it is also possible to use custom relation types by using a full IRI. The [Linked Data Platform](https://www.w3.org/TR/ldp/), the [Linked Data Notifications](https://www.w3.org/TR/ldn/), and the [Web Annotation Protocol](http://www.w3.org/TR/annotation-protocol/) specifications make use of full IRIs in the `rel` attribute.

## Metadata Characteristics

A given resource MAY Link to metadata on a different server.

Metadata resources on the same Solid server MUST adhere to the same interaction model used by standard Solid resources.

## Reserved Metadata Types

### Web Access Control

ACL resources as defined by [Web Access Control](https://github.com/solid/web-access-control-spec) MUST be supported as a resource metadata type by Solid servers.

ACL metadata resources are discoverable by the client via ```rel=acl```.

An ACL metadata resource MUST be deleted when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

To access or manage an ACL meta resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

A Solid server SHOULD sanity check ACL metadata resources upon creation or update to restrict invalid changes.

### Resource Description

Resource description is a general mechanism to provide descriptive metadata for a given resource. It MUST be supported as a resource metadata type by Solid servers.

The Descriptive metadata resource for a given resource is discovered via ```rel=describedby```. Conversely, the resource being described by a Descriptive metadata resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#resource```.

A Descriptive metadata resource MUST be deleted when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

Access or management of a Descriptive metadata resource by a given [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) is subject to the [modes of access](https://github.com/solid/web-access-control-spec#modes-of-access) granted per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

### Shape Validation

Shape Validation ensures that any data changes in a given resource conform to an associated [SHACL](https://www.w3.org/TR/shacl/) or [ShEx](https://shex.io/shex-semantics/index.html) data shape. It MUST be supported as a resource metadata type by Solid servers.

The Shape validation metadata resource for a given resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#shape```. Conversely, the resource being described by a Shape validation metadata resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#resource```.

A Shape validation metadata resource MUST be deleted when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

To access or manage a Shape validation metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

A Solid server SHOULD sanity check Shape validation metadata resources upon creation or update to restrict invalid changes.

### Server Managed

A Solid server stores information about a resource that clients can read but not change in Server Managed metadata. It MUST be supported as a resource metadata type by Solid servers.

A Server Managed metadata resource is Discovered via ```rel=http://www.w3.org/ns/solid/terms#server```. Conversely, the resource being described by a Server Managed metadata resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#resource```.

A Server Managed metadata resource MUST be deleted when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

To access a Server Managed metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Read](https://github.com/solid/web-access-control-spec#aclread) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

### Configuration

Configuration metadata is used to store configurable parameters for a given resource. It MUST be supported as a resource metadata type by Solid servers.

A configuration metadata resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#configuration```. Conversely, the resource being described by a Configuration metadata resource is discovered via ```rel=http://www.w3.org/ns/solid/terms#resource```.

A Configuration metadata resource MUST be deleted when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

To access or manage a Configuration metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

## Non-Reserved Types

A server may support other metadata types.

## Implementation Patterns

*This section is non-normative.*

There are many ways a server could implement these features. A file-based server could have a special naming scheme reserved for these metadata resources. Alternatively, a server could represent every resource internally as a dataset, storing each separate type of metadata in its own named graph.

A server needs to maintain a working knowledge of which resources are metadata, because it tells the clients where to find them. This means that it can similarly apply this knowledge to know when someone is writing to a known metadata resource, such as an ACL, and can apply the appropriate validation and sanity checks to ensure the changes are valid.

# Draft Resources

This section and the content inside it is meant to aid in the drafting process, and will not be included in the candidate proposal submitted to the specification. The purpose of this section is to aid those contributing to or reviewing this document.

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
- Specify whether or not metadata should be handled as regular rdf resources (it should be) - probably should put this in the opening section.
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

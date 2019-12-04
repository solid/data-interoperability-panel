# Resource Metadata Model

## Background

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

Access to different categories of metadata may require different levels of privilege, which must be specified as part of the definition of a given metadata type.

## Discovery
Given the URL of a resource, a client can discover the metadata resources by issuing a GET (or HEAD) request and inspecting the Link headers in the response. The rel= attribute will define the relationship to the target URL. [https://tools.ietf.org/html/rfc8288]

For any defined metadata type available for a given resource, all representations of that resource MUST include a Link header pointing to the location of each metadata resource. For example, as defined by the Solid Web Access Control specification, a client can use this mechanism to discover the location of an ACL resource:

Link: <https://example.com/resource?acl>; rel="acl"

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

String-based link relations, such as in the examples above, must be registered with IANA. But it is also possible to use custom relation types by using a full IRI. The Linked Data Platform, the Linked Data Notification and the Web Annotation specifications make use of full IRIs in the rel attribute.

## Reserved resource metadata types

### Web Access Control

Related Issues:  
https://github.com/solid/specification/issues/58
https://github.com/solid/specification/issues/42
https://github.com/solid/specification/issues/31
https://github.com/solid/specification/issues/131

ACL resources as defined by [Web Access Control](https://github.com/solid/web-access-control-spec) MUST be supported.

MUST be deleted when resource is deleted.

Authorization Model:

Discovered via ```rel=acl``` and ```rel=http://www.w3.org/ns/solid/terms#resource```

### Resource Description

Resource description provides a general mechanism for resource annotation, such as for providing descriptive metadata for a binary file. MUST be supported. MUST be deleted when resource is deleted.

Authorization Model:

Discovered via ```rel=describedby``` and ```rel=describes```

### Shape Constraint

Enforces conformance of the resource to an associated SHACL or ShEx data shape. MUST be supported. MUST be deleted when resource is deleted.

Authorization Model:

Discovered via ```rel=http://www.w3.org/ns/solid/terms#shape``` and ```rel=http://www.w3.org/ns/solid/terms#resource```

### Server Managed

Server-managed metadata not otherwise included in HTTP headers. MUST be supported.

__Note: This may be too broad to be able to properly determine what the authorization rule, or lifecycle should be. May need to consider breaking this up into specific types.__

Discovered via ```rel=http://www.w3.org/ns/solid/terms#metadata``` and ```rel=http://www.w3.org/ns/solid/terms#resource```

### Configuration

Configuration metadata, e.g. settings for memento creation. MUST be supported. MUST be deleted when resource is deleted.

Authorization Model:

Discovered via ```rel=http://www.w3.org/ns/solid/terms#configuration```

## Non-Reserved Types

A server may support other metadata types.

## Implementation Patterns

There are many ways a server could implement these features. A file-based server could have a special naming scheme reserved for these metadata resources. Alternatively, a server could represent every resource internally as a dataset, storing each separate type of metadata in its own named graph.

[ Include example of file based ]

[ Include example of graph based ]

## Open Questions

* Should we stipulate whether metadata resources MUST or SHOULD be RDF?
* Can all clients see links to all metadata associated with a given document as a general rule, or should this be something defined for each individual type of metadata?
* Should anchor= be used rather than rel= for the discovery of an annotated resource (see [RFC 5988](https://tools.ietf.org/html/rfc5988))
* Should there be portability requirements for certain metadata types? For example, acls should be portable so that if a given user moves their data from once implementation to another, their acl should go along, but certain implementation specific metadata may not.
* How do you connect the resource with an ACL when you create it

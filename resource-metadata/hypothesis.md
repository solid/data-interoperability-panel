# Resource Metadata Model

## Background

*This section is non-normative*

This document introduces a mechanism for linking to metadata about resources in the Solid Ecosystem using HTTP Link headers. The metadata may serve as supplementary descriptions or, when supported by a Solid server implementation, may influence the behavior of the resources. It is not meant to supplant the ability for the directly associated resource to self-describe.

Examples of this mechanism in use include:

- A binary JPEG image with a Link header, pointing to a description that has an RDF representation.
- A container with a Link header, pointing to an ACL resource that governs access controls for the contained resources.
- A resource whose shape is constrained by a ShEx schema includes a Link header that points to a metadata resource defining that constraint.
- A resource with an associated set of configurable parameters includes a Link header that points to a resource where those configurable parameters reside.

A given resource might link to zero or more such related metadata representations.

Access to different types of metadata may require varying levels of privilege, which must be specified as part of the definition for a given metadata type.

## Metadata Discovery

Given the URL of a resource, a client can discover the metadata resources by issuing a `GET`, `HEAD`, or `OPTIONS` request and inspecting the `Link` headers in the response. The [`rel={relation-type}`](https://tools.ietf.org/html/rfc8288) will define the relationship to the target URL. Refer to [RFC8288](https://tools.ietf.org/html/rfc8288) for allowed [link relation types](https://tools.ietf.org/html/rfc8288#section-2.1).

For any defined metadata type available for a given resource, all representations of that resource MUST include a Link header pointing to the location of each metadata resource. For example, as defined by the Solid [Web Access Control specification](https://github.com/solid/web-access-control-spec), a client can use this mechanism to discover the location of an ACL resource:

Link: <https://server.example/acls/resource.acl>; rel="acl"

Metadata discovered through a Link header for a given resource is considered to be *directly associated* with that resource.

The following are [reserved metadata types](#reserved-metadata-types) and the associated link relation URIs that are used for discovery. Other metadata types and relations may also be used, and may be added to the reserved set in the future.

| Metadata Type | Link Relation |
| :------------- |:-------------|
| [Web Access Control](#web-access-control) | ```acl``` or ```http://www.w3.org/ns/solid/terms#acl``` |
| [Resource Description](#resource-description) | ```describedby``` or ```https://www.w3.org/ns/iana/link-relations/relation#describedby``` |
| [Shape Validation](#shape-validation) | ```http://www.w3.org/ns/solid/terms#shape``` |
| [Server Managed](#server-managed) | ```http://www.w3.org/ns/solid/terms#servermanaged``` |
| [Configuration](#configuration) | ```http://www.w3.org/ns/solid/terms#configuration``` |

### Discovery of Annotated Resource

Certain metadata resource types require the Solid server to link back to the annotated resource that the metadata is directly associated with, via Link headers. In these instances, the link relation ```rel=describes``` MUST be used.

For example, a metadata resource ```<https://server.example/metadata/resource.meta>``` directly associated with ```<https://server.example/resource.ttl>``` whose type requires linking back to the annotated resource MUST have the following included in its Link headers:

Link: <https://server.example/resource.ttl>; rel="describes"

## Metadata Characteristics

A given resource MAY Link to metadata on a different server.

Metadata resources on the same Solid server MUST adhere to the same interaction model used by standard Solid resources.

A metadata resource MUST be deleted by the Solid server when the resource it is directly associated with is also deleted and the Solid server is authoritative for both resources.

## Reserved Metadata Types

### Web Access Control

ACL resources as defined by [Web Access Control](https://github.com/solid/web-access-control-spec) MUST be supported as a resource metadata type by Solid servers.

The ACL metadata resource directly associated with a given resource is discovered by the client via ```rel=acl```.

A given Solid resource MUST NOT be directly associated with more than one ACL metadata resource.

To access or manage an ACL metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

A Solid server SHOULD sanity check ACL metadata resources upon creation or update to restrict invalid changes.

### Resource Description

Resource description is a general mechanism to provide descriptive metadata for a given resource. It MUST be supported as a resource metadata type by Solid servers.

The Descriptive metadata resource directly associated with a given resource is discovered by the client via ```rel=describedby```. Conversely, the resource being described by a Descriptive metadata resource is discovered by the client via ```rel=describes```.

A given Solid resource MUST NOT be directly associated with more than one Descriptive metadata resource.

Access or management of a Descriptive metadata resource by a given [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) is subject to the [modes of access](https://github.com/solid/web-access-control-spec#modes-of-access) granted per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

### Shape Validation

Shape Validation ensures that any data changes in a given resource conform to an associated [SHACL](https://www.w3.org/TR/shacl/) or [ShEx](https://shex.io/shex-semantics/index.html) data shape. It MUST be supported as a resource metadata type by Solid servers.

The Shape validation metadata resource directly associated with a given resource is discovered by the client via ```rel=http://www.w3.org/ns/solid/terms#shape```. Conversely, the resource being described by a Shape validation metadata resource is discovered by the client via ```rel=describes```.

A given Solid resource MUST NOT be directly associated with more than one Descriptive metadata resource.

To access or manage a Shape validation metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

A Solid server SHOULD sanity check Shape validation metadata resources upon creation or update to restrict invalid changes.

### Server Managed

A Solid server stores information about a resource that clients can read but not change in Server Managed metadata. It MUST be supported as a resource metadata type by Solid servers.

A Server Managed metadata resource directly associated with a given resource is discovered by the client via ```rel=http://www.w3.org/ns/solid/terms#servermanaged```. Conversely, the resource being described by a Server Managed metadata resource is discovered by the client via ```rel=describes```.

A given Solid resource MUST NOT be directly associated with more than one Server Managed metadata resource.

To access a Server Managed metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Read](https://github.com/solid/web-access-control-spec#aclread) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

### Configuration

Configuration metadata is used to store configurable parameters for a given resource. It MUST be supported as a resource metadata type by Solid servers.

A configuration metadata resource directly associated with a given resource is discovered by the client via ```rel=http://www.w3.org/ns/solid/terms#configuration```. Conversely, the resource being described by a Configuration metadata resource is discovered by the client via ```rel=describes```.

A given Solid resource MUST NOT be directly associated with more than one Configuration metadata resource.

To access or manage a Configuration metadata resource, an [acl:agent](https://github.com/solid/web-access-control-spec#describing-agents) MUST have [acl:Control](https://github.com/solid/web-access-control-spec#aclcontrol) privileges per the [ACL inheritance algorithm](https://github.com/solid/web-access-control-spec#acl-inheritance-algorithm) on the resource directly associated with it.

## Non-Reserved Types

A Solid server may support other metadata types.

## Implementation Patterns

*This section is non-normative.*

There are many ways a Solid server could implement these features. A file-based Solid server could have a special naming scheme reserved for these metadata resources. Alternatively, a Solid server could represent every resource internally as a dataset, storing each separate type of metadata in its own named graph.

A Solid server needs to maintain a working knowledge of which resources are metadata, because it tells the clients where to find them. This means that it can similarly apply this knowledge to know when someone is writing to a known metadata resource, such as an ACL, and can apply the appropriate validation and sanity checks to ensure the changes are valid.

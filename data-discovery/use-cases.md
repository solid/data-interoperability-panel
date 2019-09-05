# Use Cases for Data Discovery

The following use cases must be considered when designing a mechanism for a data pod to define how its data is stored and indexed so that a given application can automatically find the data that it needs.

## New application

Alice used `AncientBookmarks` application from `OldBookmarks.example`, to record a number of bookmarks which are stored on her POD.  Recently Alice's friend Bob recommended that she upgrade to the application `MyThoughtsOnIt` from `WebAnnontaions.example`.

`MyThouhgtsOnIt` uses the [web annotations ontology](https://www.w3.org/TR/annotation-vocab/#motivation) as its ontology, 
whereas `AncientBookmarks` used a proprietary ontology to define its data.

### Actors

#### Alice

Alice needs to authorise `MyThoughtsOnIt` to upgrade and possibly move the bookmarks created by `AncientBookmarks`.

#### WebAnnotations.exmaple

**WebAnnotations.example** needs to locate Alice's data; reconcile the bespoke ontology to its own; 
convert the data; (possibly) move the data to new location; 
provide cool functionality to create and mange web annotations.

#### Example approach

1. Set-up:

- [Bookmarks](https://anvil1.inrupt.net/public/bookmarks.ttl)
- [Original Bookmark Shape](https://storage.googleapis.com/anvil_apps_support_data/BookmarkShape.ttl)
- [New Bookmark Shape](https://storage.googleapis.com/anvil_apps_support_data/WebAnnotationShape.ttl)

# Hypothesis for Implementing Data Discovery

This document details a hypothesis for a data pod to define how its data is stored and indexed, so that a given application can automatically find the data that it needs. It takes into account the stated [use cases](use-cases.md).

This hypothesis will be validated and refined through critical review and prototyping, with the end result being input into a candidate proposal to the [Solid Specification](https://github.com/solid/specification).

## Hypothesis: A mechanism for a new app to convert the data found on a users pod to the shape that it requires

### Assumptions:

- The owner of the POD has given permission for the app to convert the data found into the shape required by the new application
- The application has knowledge of the data shape in both `oldApp` and `newApp`
- A suitable mapping exists between them

### Set up:

The example used to illustrate the hypothesised approach relies on the following `.ttl` files.

- [Bookmarks](https://anvil1.inrupt.net/public/bookmarks.ttl)
- [Original Bookmark Shape](https://storage.googleapis.com/anvil_apps_support_data/BookmarkShape.ttl)
- [New Bookmark Shape](https://storage.googleapis.com/anvil_apps_support_data/WebAnnotationShape.ttl)

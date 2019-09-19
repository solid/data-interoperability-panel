# Use Cases for the User Profile

The following use cases must be considered when designing the data model for the Solid User Profile.
## Solid Data Interoperability Panel Use Case: Semantic Interoperability
### Purpose: To demonstrate how a shared ontology will enable: 
1) A standard Solid User Profile to be specified, which app developers can understand and read data from.
2) App developers to understand and reuse pre-existing data from a user’s pod.
3) App developers to leverage a standard set of shapes to validate both the structure and meaning of data being inserted into a user’s pod.
4) New terms to be created as extensions of the shared ontology to enable interoperability and semantic consistency with the higher (i.e. parent) level.
Preconditions: SolidUser has a Solid Pod with their User Profile data entered.

### Use Case-1:
1) SolidDeveloper-1 begins work on a new application to enable a user to easily obtain quotes for multiple auto insurance vendors.
2) The standard Solid User Profile already includes some of the needed data elements.
3) A Solid standard shape is selected for ‘Method of Payment.’
4) SolidDeveloper-1 creates a new ontology extension for Vehicle-Data (which is not currently in the Solid User Profile), which inherits from the shared ontology. SolidDeveloper-1 creates a shape that can be used to validate the data. This Shape is posted to a repository for other developers to use.
5) SolidUser uses SolidDeveloper-1’s app to enter new data in their Solid pod that conforms to the shapes from steps 3 and 4, above. SolidUser shares limited access to this data with multiple insurance companies to obtain quotes.
### Use Case-2:
1) SolidDeveloper-2 develops a new app for users to post and sell vehicles.
2) SolidDeveloper-2 reuses the Vehicle-Data extension ontology, but extends it further to include new terms representing data such as advertised price and bargaining range.
3) SolidUser uses SolidDeveloper-1’s and SolidDeveloper-2’s apps, which leverage a common set of standard and vehicle information, and only needs to add a few new pieces of data to post their vehicle for resale.
### Shared Ontology:

To demonstrate this use case, the U.S. Army Avatar Team will use the Common Core Ontologies (CCO)<sup>1</sup> , which are a suite of logically consistent mid-level ontologies that extend from Basic Formal Ontology (BFO)<sup>2</sup> .   BFO is in final committee balloting as ISO/IEC JTC1 21838-2 Top Level Ontology.  Note: Solid extension ontologies will extend from CCO, not directly from BFO.


## References
<sup>1</sup> https://github.com/CommonCoreOntology/CommonCoreOntologies<br>
<sup>2</sup> https://github.com/BFO-ontology/BFO

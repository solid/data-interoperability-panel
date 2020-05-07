# Problems and Goals for Interoperability, Collaboration, and Security in a Solid Pod

**Main Contributors:**  
Justin Bingham - [@justinwb](https://github.com/justinwb)   
Eric Prud'hommeaux - [@ericprud](https://github.com/ericprud)  
Jamie Fiedler - [@jamiefiedler](https://github.com/jamiefiedler)  
Josh Collins - [@joshdcollins](https://github.com/joshdcollins)  

for the [Solid Interoperability Panel](https://github.com/solid/interoperability-panel)

## Problem Areas

The principle of universality allows the Web to work no matter what hardware, software, network connection or language you use, to handle information of all types and qualities. We now have the technologies and the opportunity to extend this spirit of universality to our data on the web, and the applications and services we use to access and manipulate that data.

Solid allows information and media of all types to be stored, connected, and accessed over the Web by authorized entities and applications. Linked Data allows this information to be self-identifying, which makes it understandable with confidence by any application that knows how to interpret the Linked Data vocabularies and relationships in use.

This relatively simple foundation establishes a basis for us to decouple data from applications. Solid affords us the opportunity to create a valuable and powerful ecosystem where people and organizations retain control of their data, but are also able to put it to work and use it to its full potential. The fundamentals of Solid make this possible, but further definition of standard methods and mechanisms must be established to make it practical, intuitive, and secure.

## Problem #1 - Disparate applications cannot practically interoperate over the same data safely and effectively

An individual who stores data in their Pod needs the ability to use different applications to manipulate some or all of the same information, even if those applications were developed without any knowledge of each other.

Consider the operating system on your personal computer. You have a diverse set of data stored on your local drive, from spreadsheets and documents to libraries of media. We have well-established cases where applications developed by completely different entities can interoperate over the same files, based on conformance with agreed upon file formats. These widely used examples of interoperability pop up in common workflows, but generally these cases are few and far between. Data interoperability has always been an afterthought in our personal computing ecosystem, and we’ve been left to deal with incompatibilities and silos of information as a result. In Solid, our interoperability needs are even more challenging, but the end result can also be much more exciting. Solid allows us to work with much richer datasets, and the Web lets us interconnect them.

While Solid is the perfect foundation to facilitate this decentralized web-scale interoperability, to date the recipe has been missing a small but important assortment of ingredients to get it right.

### Goal #1 - Seamless data interoperability across disparate applications

Decoupling data from applications and making it fully interoperable across any of them is a core goal of Solid, not an afterthought. Our aim is for nearly all of the data to be interoperable and reusable. Our Linked Data model is extremely expressive. We can store all kinds of information about real-world entities and digital artifacts, including the relationships between them. Interoperability across applications means they must be able understand and manipulate these complex representations of things in concert with other applications that are reading and writing them at the same time.

Applications must be able to find and understand the data pertinent to them, then modify it without corruption, while subsequently evolving alongside it.

__Applications must have a shared understanding of data.__ Interoperability only works when disparate applications can look at the same data set and confidently understand that information in a consistent way. We believe this understanding is shared at three levels. RDF, the basis of Solid’s Linked Data model provides the first level through shared vocabularies. Data shapes provide the second level by allowing us to define and share schemas that validate combinations of RDF triples. Shape Trees let us marry constellations of resources validated by these shape schemas into complex things to provide the third and final level.

__Data must be discoverable.__ Applications must know where to write the data they generate, and other applications need to know how to find it and use it. In a decentralized data infrastructure, you cannot rely on data being in the same location from one store to another. Clients need reliable mechanisms to discover where to read and write data so they can interoperate over it.

__Data must be durable.__ One application cannot break or corrupt the data being used by others. The hippocratic oath swears doctors to “first, do no harm”, and in similar fashion we must incorporate mechanics to prevent data corruption, either through accident or malicious intent. We must also have ready mechanisms in place to recover from data loss or corruption when it inevitably happens, despite our best efforts. Some of the same schemas and shape trees used to facilitate a shared understanding of data should be employed to validate the same for durability.

__Data and applications may evolve.__ Data and Applications must have room to evolve independently without negatively affecting the other key elements of interoperability, hampering the end user experience, or violating secure data boundaries already in place.

## Problem #2 - People must be able to understand what data they have to effectively use it or share it safely.

Machine to machine interoperability between applications is essential, but human to machine interoperability over that data is equally crucial. For people to be able to control their data, or even use it effectively, they must be able to understand what their data actually is.

Linked Data affords us the capability to store anything, with data ranging from the extremely simple to the highly complex. Yet while developers, engineers, and data scientists may be comfortable working with hierarchies of resources decorated with rich metadata, or graphs of information, regular users are not. People think in terms of concrete things they understand. Photo albums, medical records, notebooks, and chat rooms have meaning to people. Files and folders do not. When people are working with their data, or making decisions about it, they must do so based on intuitive data boundaries that they fully comprehend. Solid has struggled up to this point to represent people’s data in an intuitive way that makes sense to them. As a consequence, it’s difficult for them to manage that data or use it effectively.

### Goal #2 - Use intuitive data boundaries to provide human to machine interoperability

Our first goal from Problem #1  is to support machine to machine interoperability so that applications can consistently interoperate. Solving that problem and this one (#2) requires us to support human to machine interoperability at the same time. This means that people must consistently understand the data they have, so they can use it and share it effectively across their collection of preferred applications. To do so requires us to find one way to express information that both people and machines understand.

RDF lets us describe relationships between things, attributes of a thing, in a way that machines and (some) people understand. However, often when people are thinking about their data, they tend towards less granular representations.

Shapes come closer by providing schemas that map these relationships and/or attributes into models that are much more useful for machines, and often understandable to (some) people. Still they don’t always correspond 1:1 with a “thing” in the real world that your average user understands, like a photo album, a medical record, or a shopping cart, which are often much more complex than a single shape can represent.

Shape trees marry RDF vocabularies, shapes, and resources into “things” that provide very detailed blueprints for machine to machine interoperability, while at the same time allow us to model and represent things that people can easily comprehend, like a chat room, a calendar of appointments, or the event stream from a medical device. Consequently, we can use shape trees to provide data boundaries that machines can interoperate with and humans can understand.

## Problem #3 - Disparate entities using different applications must be able to safely and effectively interoperate within their scope of authorization

Making data interoperable when one person is using multiple applications is challenging. We compound that problem in Solid by addressing collaborative use cases. This means that the same data will be manipulated not only by different applications, but also by different people or automated agents.

These disparate entities may only be authorized to access or manipulate specific subsets of data. They’re also likely to have different needs based on different patterns of use. Because Solid uses a hierarchical resource model, this means that **any organizing scheme that we use for data in Solid must be designed with authorization as the common denominator**. The controller of data must authorize who and what can access that data, and we fail if they cannot do that in a way that provides rational compartmentalization through an intuitive experience.

Take a common use case, where a Solid Pod is *controlled* by one person; i.e. Alice. The data stored inside of that Pod is Alice’s. As a controller of the Pod, Alice needs the ability to authorize other people, applications, and/or agents to access some or all of the data inside it.

When deciding whether to authorize another entity or application, to access data in her Pod, Alice is faced with five considerations:

1. Is this entity (person or agent) credible and trustworthy?
1. What client(s) do I trust them to use to access my data?
1. What data should they be authorized to access?
1. What level of access should they have?
1. What will they use the data for?

This is a complex decision-set that must be made by Alice continuously over time, across a diverse spectrum of data and application workflows. We are challenged to ensure Alice is making secure and informed choices, while maintaining an optimal user experience.

### Goal #3 - Secure collaboration over intuitive data boundaries

Sharing magnifies the importance of Problem #2, which states that people must understand their data to use it effectively. Without a firm understanding of what they have, people are ill-equipped to make smart and secure decisions about what data should be shared and who it should be shared with. Consequently, the goal to use intuitive data boundaries to provide human to machine interoperability through shape trees is the key to solving this problem.

Comprehension of data boundaries that are defined by shape trees aids collaboration, because it allows users to readily determine what things they want to share with other people or applications. Applications can communicate the things they need access to in a language that people understand. People make access decisions based on data boundaries that make sense to them. This makes the experience intuitive and the data boundaries secure. Absent that, this picture quickly gets confusing and proportionally more unusable and/or insecure.

#### Determining trustworthiness of entities

Determining whether an entity is credible or trustworthy is a complex and multi-faceted problem. It can require assurances as to the integrity of an individual, organization, or application at multiple levels, a problem which demands rigorous and dedicated focus. Rather than propose a specific method to determine trustworthiness, it is important to identify a framework through which different and/or complementary measures for trustworthiness can be employed.

#### Determining what clients can be used

Determining which clients the data controller trusts to access their data is critical. They may trust a given entity, but that entity may be unknowingly using an application that is insecure or deliberately malicious. The data controller must have the ability to exert control (if they desire) to ensure that only trustworthy applications can interface with their data.

#### Determining what data can be shared with entities and clients

Alice must be equipped with the right amount of information, presented in an intuitive manner, to make safe decisions when she grants access to her data. She must prevent undue exposure to her data by giving out too much access, but at the same time she needs to provide enough to support the workflows that led her to share her data in the first place.

Authorization must be intuitive. Applications and services must be able to communicate the data they need access to in ways people understand, that map to their understanding of the data they have. People’s intuitive data boundaries are logical units of sharing and/or collaboration. Intuitive means that people understand what they are sharing, the ramifications of what they are sharing, and how the data will be used. We must avoid inadvertent access, where someone doesn’t realize what they’re giving access to and exposes private details.

#### Determining what level of access to provide entities and clients

Should entities and clients be able to read vs. write? Should they have control access that allows them to change permissions? That should be reserved only for a minority of applications that are supremely trusted. The application should be able to stipulate what modes of access it needs when expressing the kind of things it requires access to. This should allow requests to be presented to the user in an intuitive way, and limit the ability for an application or entity to gain more access than it needs to operate.

## Problem #4 - People shouldn’t need to think about how to physically organize their data to use Solid.

People struggle to choose organizational models for even the simplest types of data, especially when it falls into multiple contexts, which happens often. Regular users will not invest the time to maintain a complex hierarchy of resources, and the similarly complex set of access control rules associated with it. They shouldn’t need to worry about where a particular type of data needs to be stored, nor should they have to hunt around to find the data they want. Data must be organized in such a way that people can work with their things in an intuitive and natural way, or they may abandon Solid for more convenient alternatives.

### Goal #4 - Standard and flexible organizing model for data

People shouldn’t need to think about how things are stored if they don’t want to. They should have as much freedom as they like to make and modify how they categorize their data, but shouldn’t be required to move it around to do so. Things change and evolve, and they need a way to do this easily and safely over the lifetime of their data without needing to worry about reorganizing trees and breaking links.

## Problem #5 - When data is stored and secure, it should be queryable using any mechanism, and able to be requested in different representations.

Users must be able to query across their data, unencumbered by anything but lack of authorization. This includes the ability to ask for any kind of things, including new representations of data they already have, which may have been stored and organized using different base models and data boundaries.

### Goal #5 - Flexibility and support for different and evolving query mechanisms

Any organizing model must ensure that data is available for simple lookups and complex queries alike. Organized correctly, we can facilitate rich lookups while maintaining strong and logical authorization boundaries.

The ability to support various query engines (i.e. SPARQL) and techniques (i.e. Guided-Link-Traversal-Based Query Processing) over time without needing to alter or change the underlying data or their associated authorization boundaries is crucial to fostering the evolution of data and applications.

Queries should be able to ask for different representations of data, and have that data furnished based on what’s available, even if it was stored in a different representation.

The scope of this effort will not be to design such a query infrastructure, but simply to ensure that such a query infrastructure can be supported by this design, without requiring data people have stored and accumulated to change.

## Problem #6 - These problems must be solvable using the fundamentals of Solid as it exists today.

Solid’s versatility and power come from the inherent simplicity of its design. It is easy to make a complex system that can do a few things very well. It is hard to make a simple system that can do many things well. Like the web, the fundamental simplicity of Solid’s design is a strength, and should be protected. While it should be acceptable to extend and optimize Solid, it should not be acceptable to change any of the fundamentals core to its operation.

### Goal #6 - Optimize and extend, but do not change Solid fundamentals

Any proposal to solve the stated problem areas must not do so at the expense of changing fundamental attributes of the Solid specification. In general, a fundamental change would mean that any MUST requirements of the Solid specification should not be altered. Some optimizations can be proposed, but none that would negate any of the base Solid requirements without extremely legitimate reasons and overwhelming community support.

## Problem Summary

We must be able to support data interoperability across applications while enabling secure collaboration and query using intuitive data boundaries.

Diversity in how the same data will be accessed and manipulated by different entities and applications exacerbates the need for reliable mechanisms that protect against data corruption, data leakage, or broken workflows

Standard methods and mechanisms for interoperability, collaboration, and security of data in a Solid Pod must realize these needs, and it must be done without changing the fundamentals of Solid.

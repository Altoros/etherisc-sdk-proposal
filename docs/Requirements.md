### High Level Business, Functional and Technical Requirements
SDK

FDD is a standalone, you don’t need back-end. They (the Java platform) would build a business application (i.e. flight selling application), and integrate FDD into this application (deploy SDK) via npm.

If you have a travel portal, you don’t want users to use metamask, then you need back-end integration because you will need the transaction in the contract in your back-end. 

Metamask is a pure browser extension, no back-end. 

#### Scenarios:

1. Use case scenario #1 - User has Ethereum account - then user uses Metamask, uPort, Mist etc.

2. Use case scenario #2 - User does not have Ethereum account and will not have one. Back-end integration provides means to ended
- quote the policy 
- buy the policy with user paying via PayPal
- create the transaction 
- query status of a policy 
3. Use case scenario #3 - User does not have Ethereum account but its not the user pays via PayPal, its the website operator pays, and then the operator includes the price into the bill to the customer. 

#### DETAILS OF Use case scenario #2
- Guest node (via Infura for example, or any other specialized service providers)
- Web3 implementations exist for Java etc.
- Our SDK in this example = an integration layer + Web 3, and includes all FDD specific stuff - contract address, calling address resolver, calling Google QPX service for searching flights. In this integration layer we will have interface to paypal, so that the SDK can call PayPal, let customer pay, and upon receiving the PayPal confirmation for the payment, we trigger transaction and send a call to Ethereum net via Web3 library (buy a policy)
 
We probably need this integration with different layers:
- JavaScript 3rd party embed
- Java 
- Ruby
- React and/or Meteor (they have their separate package system, and have far more integration between front-end and back-end)
- iOS? There you have an in-app purchase. You can buy an extension/product by using the Apple Payment system. You get an invoice from Apple then. With Status/uPort you can make pure Ethereum payments, this can be done. Ralf Pichler from Vienna is working on a Status.im integration. We want to know his skills. If you have Status integration, its not an issue to make an Leth (chat and competitor to status ethereum wallet and competition of ) integration because it has a wallet integration. 
- Use cases applicable - #2 and #3 only (no use case #1 until we will need to integrate with Jaxx or similar, or have our own mobile app Etherisc that has a wallet embedded on it )
- Android?
- From the start, we would integrate the payment layer. This way you have three calls (1. give me flights 2. Insure for $5 this flight #30 3. give me list of policies with status/status of the policy #)
- Where/who does payment comes from? Etherisc has a PayPal account, and if $5 arrived, PayPal sends Etherisc a web hook, we get a push notification that $5 has arrived, then we get a transaction hash from smart contract (the customer needs the transaction hash to track the policy), and we give this transaction hash back to PayPal transaction which then communicated to customer. Transaction hash stored in the database inside of the travel provider back-end. 

SDK has a 3rd function - "give me status of the policy”. FDD contract has a table with a list of all policies (active/expired).  We don’t have it yet, but we will implement in FDD - “give me active policies”, it is still unsolved problem nobody has good solution for when you have mass production like 1M or 5M policies - nobody knows how the system will react. Every policy is on blockchain, every node has a full copy of the database, all 7k nodes have a full copy. Sharding (coming up to Ethereum end of 2017), will provide Ethereum blockchain consist of shards, which is a database of its own, it will be very easy for a contract to interact inside of the shard, We can interact inside of the shard, and if we want to communicate to outside of the shard, but will come at a slightly higher cost. In our vision, Etherisc will have a shard of our own, perhaps on 100 nodes (50 ran by ourselves, and 50 by other parties). This way our database is not replicated 5000 times but only 100 times (which is a good enough redundancy for security), this way we can guarantee transaction processing time. 

In which form are the money stored while we don’t have a policy write, but we have $1000? Every day or week we FDD contract pays exchange to buy Ether.

Next deliverables:
- Low-level architecture 
- Estimate of implementation
- If a go - Engineer/Team to
implement
develop documentation (in v.1)
security guideline / review / disclosure of known risks
address business flow/3rd party aspect/cross implementation technical 
address technical security risks related to each sub-implementation
support/maintain/enhance 
assist customers with deployment and perform product management functions (talk to customers, attend meetings, solicit feedback for improvements/new features, create/update requirement documents/specifications, create/update documentation, create tasks for the team responsible for SDK and communicate to the rest of the Etherisc team the status of work, and request help needed to make new customers, and keep existing customers happy, and selling policies. 

Considerations (possible To-Do):

Exmaple - operator retains the money, and does NOT send it to the contract until 24 hours before the flight, and 25 hours before the flight the operator actually submits the payment and the policy becomes active, while customer does not know it was not really active between the point he/she “bought" the policy and the time the policy actually was bought via payment to Ethereum contract. 
Add a way to add a revocation function to revoke the policy (cancel), within X time before the flight and get a refund. This adds complexity, requirements for more security review considerations. 
Its important to do a good user interface design, work with an operator and/or end-user (if possible),  to determine the best UI/UX (from end-users), and the best integration/business model/business rules that fit the operator the best. 

![](/img/scheme.png)

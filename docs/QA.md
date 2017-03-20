## Questions:
- Ideas how to notify external system from contract about payout.
- What data should be written in transaction, which would fit the end user.
- What API we can use to convert USD-ETH / ETH-USD.

## Discussion: 
- How “apply for policy flow” could works under the hood and get feedback - for cases with PayPal payments, when Etherisk gets USD and create transaction with ETC, is it works for them.
- Suggest 2 versions of SDK: a) as 3th party javascript (just copy/paste and make a little changes) b) as javascript module for integration with modern js apps (react, angular, vuejs..). 
- Suggestion to move all web3 specific communications from SDK to back-end API and duplicate transactions to back-end database for back-office analytics.
- Suggestion to use Stripe as PayPal competitor which is automatically PCI compliant for use cases with a standalone order form
- Suggestion to create webhooks API to integrate Etherisc into any operator’s checkout flow, not only with PayPal checkout flow.

# Requirements:
Prioritizing preparation of a simple presentation showing mockups of the UI + JavaScript code <UI page 1, 2, 3 before> <add this code> <UI page 1, 2, 3 after> - to be able to demonstrate to prospective sales channel partners how the demo works.  

https://renatco.github.io/etherisc-admin/ as a “base” layer for mockups UI color scheme, nav menu and then later to build sample apps.

3rd party javascript.

## CASES:

1. __Standalone payment, online payment through payment system (PayPal/Stripe).__  
  
    _Flow:_
    - Any relevant travel operator website
    - copy/paste the code in any place on the page (https only) where you want to render this widget
    - customer pays with his debit or credit card (through PayPal/Stripe)
    - customer gets policy after successful payment

2. __Standalone payment, partial integration to checkout page, final payment through payment system (Paypal/Stripe)__  

    _Flow:_
    - Airline tickets, appartment booking
    - On the checkout page: copy/paste the code in the place you want to render policy options table
    - Customer selects premium
    - Customer pays for host's bill
    - On the "Thank you" page: copy/paste the code to render component with payment form to apply for policy

3. __Integration to host's checkout flow. Limitations: host uses PayPal/Stripe to proceed checkout__  

    _Flow:_ 
    - Airline tickets, appartment booking
    - Payment for policy includes to the common PayPal/Stripe bill
    - Host during the checkout creates a payout to Etherisc (PayPal/Stripe)
    - PayPal/Stripe after successful payment calls the webhook, this webhook creates a policy
    - Host requests policy from Etherisc to display for customer

4. __Integration to host's checkout flow. Limitations: host website must have Stripe/PayPal account to make payouts to Etherisc.__  

    _Flow:_
    - Airline tickets, appartment booking
    - Custom checkout flow
    - Host during the checkout creates a payout to Etherisc (PayPal/Stripe)
    - PayPal/Stripe after successful payment calls the webhook, this webhook creates a policy
    - Host requests policy from Etherisc to display for customer

5. __Integration to host's checkout flow.__   

    _Flow:_
    - Airline tickets, appartment booking
    - Custom checkout flow
    - Host calls Etherisc API to create smart contract for postponed payment
    - Host gets transaction hash
    - Once a week operator make a payout to Etherisc

6. __Back-office administrator panel for travel agencies__

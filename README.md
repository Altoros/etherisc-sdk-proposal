# Etherisc-SDK

## Installation
```
npm install https://github.com/Altoros/etherisc-sdk-proposal
```

## Usage
```
import Etheris from 'Etherisc-SDK'

const etherisc = new Etherisc();
```

### connect()
Web3 connection with current provider
```
etherisc.connect()
  .then(web3 => console.log(web3))
  .catch(err => console.error('Error:', err))
```

### getNetwork()
```
etherisc.connect()
  .then(() => etherisc.getNetwork())
  .then(network => console.log(network))
  .catch(err => console.error('Error:', err))
```

### getBalance()
```
etherisc.connect()
  .then(() => etherisc.getBalance())
  .then(balance => console.log(balance))
  .catch(err => console.error('Error:', err))
```

### getFlightContractAddress()
```
etherisc.connect()
  .then(() => etherisc.getFlightContractAddress())
  .then(contractAddress => console.log(contractAddress))
  .catch(err => console.error('Error:', err))
```

### getPolicies()
```
etherisc.connect()
  .then(() => etherisc.getPolicies())
  .then(policies => console.log(policies))
  .catch(err => console.error('Error:', err))
```

### applyForPolicy(premium, flight)
```
etherisc.connect()
  .then(() => etherisc.applyForPolicy(premium, flight))
  .then(transactionHash => console.log(transactionHash))
  .catch(err => console.error('Error:', err))
```

### validatePremium(premium)
```
etherisc.validatePremium(premium)
```

### calculatePayout(premium)
```
etherisc.calculatePayout(premium)
```

### getRatingTable(ratings)
```
etherisc.getRatingTable()
```

### searchFlights(origin, destination, date)
```
etherisc.searchFlights(origin, destination, date)
  .then(flights => console.log(flights))
  .catch(err => console.log('Error:', err))
```

## High-level architecture
![high-level architecture](/img/high-level.png)

## Security risks / advisory when using etherisc-SDK as 3rd party javascript module
1. Risk to lose control over changes to the application performed by 3rd party javascript. Advisory: use in-house script mirroring, sub-resource integrity (see below).
2. Execution of unknown code, so this grants the 3rd party the same privileges that were granted to the client. Advisory: to be secure the host company must review the code for any vulnerabilities like XSS or malicious actions such as sending sensitive data from the DOM, use in-house script mirroring, sub-resource integrity, sandboxing (see below).
3. Leakage of sensitive information to 3rd parties. The request includes all regular HTTP headers and 3rd party can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. Advisory: review the code, etherisc SDK doesn’t send credentials and sensitive information with its cross-origin requests.

####Sub-resource integrity:
Generate integrity metadata for the etherisc-SDK and add it to the script element like this:
```
<script src="https://path-to-etherisc-skd.js" 
   integrity="sha384-MBO5IDfYaE6c6Aao94oZrIOiC7CGiSNE64QUbHNPhzk8Xhm0djE6QqTpL0HzTUxk"
   crossorigin="anonymous"></script>
```   

####Sandboxing:
Put etherisc SDK into an iframe like this:
```
 <html>
   <head></head>
     <body>
       ...    
       <!-- Iframe with etherisc SDK script -->
       <iframe src="https://domain/etherisc-sdk-page.html" sandbox="allow-same-origin allow-scripts"></iframe>
   </body>
 </html>
```

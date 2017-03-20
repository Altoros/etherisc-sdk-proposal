## Etherisc-SDK 0
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

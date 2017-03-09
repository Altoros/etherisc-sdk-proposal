# Etherisk-SDK

## Installation
```
npm install https://github.com/kandrianov/Etherisk-SDK
```

## Usage
```
import Etheris from 'Etherisk-SDK'

const etherisk = new Etherisk();
```

### connect()
Web3 connection with current provider
```
etherisk.connect()
  .then(web3 => console.log(web3))
  .catch(err => console.error('Error:', err))
```

### getNetwork()
```
etherisk.connect()
  .then(() => etherisk.getNetwork())
  .then(network => console.log(network))
  .catch(err => console.error('Error:', err))
```

### getBalance()
```
etherisk.connect()
  .then(() => etherisk.getBalance())
  .then(balance => console.log(balance))
  .catch(err => console.error('Error:', err))
```

### getFlightContractAddress()
```
etherisk.connect()
  .then(() => etherisk.getFlightContractAddress())
  .then(contractAddress => console.log(contractAddress))
  .catch(err => console.error('Error:', err))
```

### getPolicies()
```
etherisk.connect()
  .then(() => etherisk.getPolicies())
  .then(policies => console.log(policies))
  .catch(err => console.error('Error:', err))
```

### applyForPolicy(premium, flight)
```
etherisk.connect()
  .then(() => etherisk.applyForPolicy(premium, flight))
  .then(transactionHash => console.log(transactionHash))
  .catch(err => console.error('Error:', err))
```

### validatePremium(premium)
```
etherisk.validatePremium(premium)
```

### calculatePayout(premium)
```
etherisk.calculatePayout(premium)
```

### getRatingTable(ratings)
```
etherisk.getRatingTable()
```

### searchFlights(origin, destination, date)
```
etherisk.searchFlights(origin, destination, date)
  .then(flights => console.log(flights))
  .catch(err => console.log('Error:', err))
```

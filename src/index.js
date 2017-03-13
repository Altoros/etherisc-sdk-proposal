/* global web3, Web3, gapi */
import abi from './abi';
import airports from './airports';

// todo: inject web3, if metamask is not installed

// google apis for flights search
// todo: only in browser env
(function inject(document, tag) {
  const scriptTag = document.createElement(tag);
  const firstScriptTag = document.getElementsByTagName(tag)[0];
  scriptTag.src = 'https://apis.google.com/js/api.js';
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
}(document, 'script'));

function log(message) {
  console.debug(message);
}

export default class Etherisc {
  constructor({qpxApikey} = {}) {
    this.policies = [];
    this.contractAddress = '';
    this.qpx = {
      qpxApikey: qpxApikey || 'AIzaSyCfYPmq_eOR8fOvix8mDhyDksJWlm8f8Gc',
    };
    this.airports = airports;
    this.abi = abi;
    this.log = log;
    this.fdiAddrresolverAddr = '';
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (typeof window.web3 !== 'undefined' && typeof window.Web3 === 'function') {
        this.web3 = new window.Web3(window.web3.currentProvider);
        this.log('Connected');
        resolve(this.web3);
      } else {
        this.log('No connection');
        reject({error: 'Install MetaMask plugin'});
      }
    });
  }

  getNetwork() {
    return new Promise((resolve, reject) => {
      this.web3.version.getNetwork((error, result) => {
        if (result === '3') {
          this.network = result;
          this.log(`Network: ${this.network}`);
          resolve(this.network);
        } else {
          this.log('Unknown network');
          reject({error});
        }
      });
    });
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      this.account = this.web3.eth.accounts[0];
      this.web3.eth.getBalance(this.account, (error, result) => {
        if (error) {
          this.log(`getBalance Error: ${error}`);
          reject({error});
        } else {
          this.ethBalance = Number(this.web3.fromWei(result.toNumber())).toFixed(2);
          this.log(`Account balance: ${this.ethBalance}`);
          resolve(this.ethBalance);
        }
      });
    });
  }

  getFlightContractAddress() {
    return new Promise((resolve, reject) => {
      if (this.network && this.network === '3') {
        this.fdiAddrresolverAddr = '0x370fc54dac87872ec84d20e404c00705f5bb894f';

        this.log(`fdiAddrresolverAddr: ${this.fdiAddrresolverAddr}`);

        const fdiAddrresolverAbi = [{
          constant: true,
          inputs: [],
          name: 'addr',
          outputs: [{
            name: '',
            type: 'address',
          }],
          type: 'function',
        }];

        const processContract = (error, result) => {
          if (error) {
            this.log(error);
            reject({error});
          } else {
            this.contractAddress = result;
            this.log(`Contract address: ${this.contractAddress}`);
            resolve(this.contractAddress);
          }
        };

        this.web3.eth.contract(fdiAddrresolverAbi)
          .at(this.fdiAddrresolverAddr)
          .addr(processContract);
      }
    });
  }

  getPolicy(contract, account, i) {
    return new Promise((resolve, reject) => {
      contract.customerPolicies(account, i, (error, result) => {
        if (error) {
          reject({error});
        }
        const policyId = result.toNumber();
        contract.policies(policyId, (error1, result1) => {
          contract.risks(result1[2], (error2, result2) => {                                                                                        // 80
            const policy = {
              id: i,
              status: this.__statusToString(result1[6].toNumber()),
              flightId: result2[0],
              departure: result2[1].slice(5),
              premium: this.web3.fromWei(result1[1]).toFixed(2),
            };
            resolve(policy);
          });
        });
      });
    });
  }

  getPolicies() {
    return new Promise((resolve, reject) => {
      const contract = this.web3.eth
        .contract(abi.FlightDelay_Abi)
        .at(this.contractAddress);

      try {
        contract.getCustomerPolicyCount(this.account, (error, result) => {
          if (error) {
            this.log(error);
            reject({error});
          } else {
            this.log(`Count policies: ${result}`);

            const policies = [];

            for (let i = 0; i < result; i += 1) {
              policies.push(this.getPolicy(contract, this.account, i));
            }

            Promise.all(policies)
              .then(data => {
                this.log(JSON.stringify(data));
                this.policies = data;
                resolve(data);
              })
              .catch(err => reject({error: err}));
          }
        });
      } catch (error) {
        this.log(error);
        reject({error});
      }
    });
  }

  applyForPolicy(premium, flight) {
    return new Promise((resolve, reject) => {
      this.premium = this.web3.toWei(Number(premium), 'ether');
      this.flight = flight;

      const tx = {
        from: this.web3.eth.accounts[0],
        to: this.contractAddress,
        value: this.premium,
        gas: 1000000,
      };
      const contract = this.web3.eth
        .contract(this.abi.FlightDelay_Abi)
        .at(this.contractAddress);

      try {
        contract.newPolicy(
          this.flight.carrier + '/' + this.flight.flightNumber,
          this.flight.departureYearMonthDay,
          new Date(this.flight.departureTime).valueOf() / 1000,
          new Date(this.flight.arrivalTime).valueOf() / 1000,
          tx,
          (error, result) => {
            if (error) {
              reject({error});
            } else {
              this.transactionReceipt = result;
              this.log(`New policy created: ${JSON.stringify({txHash: result, network: this.network})}`)
              resolve(this.transactionReceipt);
            }
          },
        );
      } catch (error) {
        this.log(error);
        reject({error});
      }
    });
  }



  validatePremium(premium) {
    let message = '';
    const balance = Number(this.ethBalance);

    if (!balance) {
      return {valid: false};
    }

    if (!premium) {
      return {valid: false};
    }

    if (premium !== '' && (premium > 5.0 || premium < 0.5 || balance < 0.501 || balance < premium)) {
      if (this.ethBalance < 0.501) {
        message = 'Minimum Balance is 0.501 ETH';
      } else if (premium > 5.0) {
        message = 'Maximum Premium is 5.0 ETH';
      } else if (premium < 0.5) {
        message = 'Minimum Premium is 0.5 ETH';
      } else if (balance < premium) {
        message = 'Balance too low';
      } else {
        message = 'Invalid Premium';
      }
      return {valid: false, message};
    }

    return {valid: true};
  }

  calculatePayout(sum) {
    let premium = sum;
    const maxPayout = 150;

    if (premium < 0.01) {
      premium = 0.0;
    }

    if (premium > 5.0) {
      premium = 5.0;
    }

    this.ratingTable.payout_15m = Math.min(Number(premium * 0.97 * 10 / this.ratingTable.weight), maxPayout).toFixed(2);
    this.ratingTable.payout_30m = Math.min(Number(premium * 0.97 * 15 / this.ratingTable.weight), maxPayout).toFixed(2);
    this.ratingTable.payout_45m = Math.min(Number(premium * 0.97 * 30 / this.ratingTable.weight), maxPayout).toFixed(2);
    this.ratingTable.payout_can = Math.min(Number(premium * 0.97 * 50 / this.ratingTable.weight), maxPayout).toFixed(2);
    this.ratingTable.payout_div = Math.min(Number(premium * 0.97 * 50 / this.ratingTable.weight), maxPayout).toFixed(2);

    return this.ratingTable;
  }

  __statusToString(status) {
    const sts = {
      0: 'Applied',
      1: 'Accepted',
      2: 'Revoked',
      3: 'Paid Out',
      4: 'Expired',
      5: 'Declined',
    };
    return sts[status];
  }

  getRating() {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    return new Promise((resolve) => {
      // hardcoded
      const rating = {
        late15: getRandomInt(5, 10),
        late30: getRandomInt(9, 15),
        late45: getRandomInt(10, 13),
        cancelled: 0,
        diverted: 0,
        observations: getRandomInt(55, 65),
      };

      this.rating = rating;
      resolve(rating);
    });
  }

  getRatingTable(ratings) {
    const ratingTable = {
      delay_15m: ratings.late15 / ratings.observations,
      delay_30m: ratings.late30 / ratings.observations,
      delay_45m: ratings.late45 / ratings.observations,
      delay_can: ratings.cancelled / ratings.observations,
      delay_div: ratings.diverted / ratings.observations,

      payout_15m: '0.00',
      payout_30m: '0.00',
      payout_45m: '0.00',
      payout_can: '0.00',
      payout_div: '0.00',

      text_15m: Number(ratings.late15 / ratings.observations * 100).toFixed(2),
      text_30m: Number(ratings.late30 / ratings.observations * 100).toFixed(2),
      text_45m: Number(ratings.late45 / ratings.observations * 100).toFixed(2),
      text_can: Number(ratings.cancelled / ratings.observations * 100).toFixed(2),
      text_div: Number(ratings.diverted / ratings.observations * 100).toFixed(2),
    };

    ratingTable.weight = ratingTable.delay_15m * 10 + ratingTable.delay_30m * 15 + ratingTable.delay_45m * 30 + ratingTable.delay_can * 50 + ratingTable.delay_div * 50;

    this.ratingTable = ratingTable;

    return this.ratingTable;
  }

  searchFlights(origin, destination, date) {
    return new Promise((resolve, reject) => {
      this.getFlightList(origin, destination, date, (error, result) => {
        if (error) {
          reject({error});
        } else {
          this.flights = result;
          this.log(JSON.stringify(this.flights));
          resolve(this.flights);
        }
      });
    });
  }

  getFlightList(origin, destination, date, callback) {
    const qpxRequest = {
      fields: 'kind,\
            trips(\
              kind,\
              requestId,\
              tripOption(\
                id,\
                kind,\
                slice(\
                  duration,\
                  kind,\
                  segment(\
                    bookingCode,\
                    bookingCodeCount,\
                    connectionDuration,\
                    duration,\
                    flight,\
                    id,\
                    kind,\
                    leg(\
                    arrivalTime,\
                    changePlane,\
                    connectionDuration,\
                    departureTime,\
                    destination,\
                    duration,\
                    id,\
                    kind,\
                    origin,\
                    originTerminal\
                    )\
                  )\
                )\
              )\
            )\
          ',
      request: {
        passengers: {
          kind: 'qpxexpress#passengerCounts',
          adultCount: 1,
        },
        slice: [{
          kind: 'qpxexpress#sliceInput',
          maxStops: 0,
          origin,
          destination,
          date,
        }],
        solutions: 10,
      },
    };

    gapi.load('client', () => {
      gapi.client.setApiKey(this.qpx.qpxApikey);
      gapi.client.load('qpxExpress', 'v1').then(() => {
        const request = gapi.client.qpxExpress.trips.search(qpxRequest);
        request.then((response) => {
          callback(false, this.parseFlights(response));
        }, (reason) => {
          callback(`Error: ${reason.result.error.message}`, false);
        });
      });
    });
  }

  parseFlights(response) {
    let flights = [];
    if (typeof response.result.trips.tripOption !== 'undefined') {
      const tripOption = response.result.trips.tripOption;
      for (let id = 0; id < tripOption.length; id += 1) {
        if (tripOption[id].slice[0].segment.length > 1) {
          continue;
        }
        const segment = tripOption[id].slice[0].segment[0];
        const leg = segment.leg[0];
        const depT = new Date(leg.departureTime);
        const tomorrow = new Date(Date.now()).valueOf();
        if (depT.valueOf() > tomorrow) {
          flights.push({
            id: 'F' + id,
            carrier: segment.flight.carrier,
            flightNumber: segment.flight.number,
            flightId: segment.flight.carrier + '-' + segment.flight.number,
            text: segment.flight.carrier + segment.flight.number + ' : ' + leg.origin + "-" + leg.destination + '; Dep.: ' + leg.departureTime + '; Arr.: ' + leg.arrivalTime,
            origin: leg.origin,
            destination: leg.destination,
            arrivalTime: leg.arrivalTime,
            departureTime: leg.departureTime,
            departureYearMonthDay: '/dep/' + depT.getUTCFullYear() + '/' + ('0' + (depT.getUTCMonth() + 1)).slice(-2) + '/' + ('0' + depT.getUTCDate()).slice(-2),
            duration: leg.duration,
          });
        }
      }
    }
    if (flights.length > 0) {
      flights.sort((a, b) => {
        if (a.id == '-') return 0;
        const dep_a = new Date(a.departureTime).valueOf();
        const dep_b = new Date(b.departureTime).valueOf();
        if (dep_a == dep_b) return 0;
        if (dep_a < dep_b) return -1;
        return 1;
      });
    }
    return flights;
  }
}

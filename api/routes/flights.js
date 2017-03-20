import QPXClient from '../modules/qpx';
import airports from '../data/airports';
import config from '../config';

export const getAirports = (ctx, next) => {
  ctx.body = airports;
}

export const getRating = (ctx, next) => {
  ctx.body = {"flight":{"id":"F0","carrier":"AS","flightNumber":"1922","flightId":"AS-1922","text":"AS1922 : SFO-LAX; Dep.: 2017-03-28T06:40-07:00; Arr.: 2017-03-28T08:00-07:00","origin":"SFO","destination":"LAX","arrivalTime":"2017-03-28T08:00-07:00","departureTime":"2017-03-28T06:40-07:00","departureYearMonthDay":"/dep/2017/03/28","duration":80},"rating":{"late15":9,"late30":14,"late45":11,"cancelled":0,"diverted":0,"observations":62}}
}

export const getFlightsOnDate = async function getFlightsOnDate(ctx, next) {
  const options = {
    key: config.qpx.apiKey,
    timeout: 15000
  };

    const qpxRequest = {
      body: {
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
          origin: 'SFO',
          destination: 'LAX',
          date: '2017-03-28'
        }],
        solutions: 10,
      },
    }
    }

    const qpxClient = new QPXClient(options);

    const flightsRequest = await qpxClient.search(qpxRequest);

    const flights = parseFlights(flightsRequest);

    const flightsRatings = [];

    for (let i = 0; i < flights.length; i += 1) {
        flightsRatings.push(getFlightRating(flights[i]));
    }

    const xx = await Promise.all(flightsRatings)


    ctx.body = xx;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getFlightRating(flight) {
  return new Promise((resolve) => {
    // HARDCODED FOR NOW
    const rating = {
      late15: getRandomInt(5, 10),
      late30: getRandomInt(9, 15),
      late45: getRandomInt(10, 13),
      cancelled: 0,
      diverted: 0,
      observations: getRandomInt(55, 65),
    };

    resolve({flight, rating});
  });
}


function parseFlights(response) {
    let flights = [];
    if (typeof response.trips.tripOption !== 'undefined') {
      const tripOption = response.trips.tripOption;
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

import {
  create,
  insertAfter,
  append,
  text
} from './helpers';

import {
  host,
  parentHead,
  bind
} from './utils';

const css = require('./styles.css');

export default class UI {
  constructor(scriptEl) {
    this.scriptEl = scriptEl;
    this.document = this.scriptEl.ownerDocument;
    this.host = host(this.scriptEl.src);

    this.full = this.scriptEl.getAttribute('data-full');
    this.onlyPremium = this.scriptEl.getAttribute('data-only-premium');
    this.onlyPayment = this.scriptEl.getAttribute('data-only-payment');
    this.withoutPayment = this.scriptEl.getAttribute('data-without-payment');
    this.userId = this.scriptEl.getAttribute('data-userId-payment');
    this.dataFlightId = this.scriptEl.getAttribute('data-flight-id');

    this.$wrapper = create('div');
    this.$wrapper.className = css.wrapper;

    this.$searchBox = create('div');
    this.$searchBox.className = css.searchBox;

    this.$ratingsBox = create('div');
    this.$ratingsBox.className = css.ratingsBox;

    this.$policyBox = create('div');
    this.$policyBox.className = css.policyBox;

    this.state = {
      origin: null,
      destination: null,
      onDate: null,
      net: 'https://testnet.etherscan.io'
    }

    if(this.full !== null) {
      this.getAirports()
        .then(airports => this.state.airports = airports)
        .then(() => {
          this.render()
          this.append();
        });
    }

    if(this.onlyPremium !== null) {
      if (this.dataFlightId === null) {
        this.getAirports()
          .then(airports => this.state.airports = airports)
          .then(() => {
            this.render()
            this.append();
          });
      }
    }

    if(this.dataFlightId !== null) {
      this.getFlightRating(this.dataFlightId)
        .then(flight => {
           this.state.flights = [flight];
           this.state.selectedFlight = 0;
        })
        .then(() => {
          this.selectFlight(0, this.state.flights[0])();
          this.append();
        });
    }


    if(this.onlyPayment !== null) {
      const state = JSON.parse(localStorage.getItem('etherisc'));
      this.state = state;
      this.selectFlight(state.selectFlight, state.flights[state.selectedFlight])();
      this.append();
    }




  }

  onFieldChange(field) {
    return (e) => {
      const value = e.target.value;
      this.state[field] = value;
      if (this.validate()) {
        this.searchFlights()
          .then(flights => this.state.flights = flights)
          .then(() => this.showFlights());
      }
    }
  }

  showFlights() {
    text(this.$searchBox, '');
    const flights = this.state.flights;
    const _len = flights.length;

    for (let _i = 0; _i < _len; _i++) {
      const flight = create('div');
      flight.className = css.flight;
      text(flight, flights[_i].flight.text);
      bind(flight, 'click', this.selectFlight(_i, flight));
      append(this.$searchBox, flight);
    }
  }

  selectFlight(id, flight) {
    return () => {
      let flightId = id;

      if(id) {
        this.state.selectedFlight = id;
      }

      if (id === undefined) {
        flightId = this.state.selectedFlight;
      }

      if (flight) {
        flight.className = css.active;
      }

      text(this.$ratingsBox, '');

      if(this.onlyPayment !== null) {
        const info = create('div');
        text(info, this.state.flights[flightId].flight.text);
        console.log(this.state);
        append(this.$ratingsBox, info);
      }

      if(this.dataFlightId !== null) {
        const info = create('div');
        text(info, this.state.flights[flightId].flight.text);
        append(this.$ratingsBox, info);
      }


      const p = create('h4');
      text(p, 'Delay in minutes');

      const table = create('table');
      table.className = css.ratingsTable;

      // head
      const thead = create('tr');

      const col1 = create('th');
      text(col1, '15 - 29');

      const col2 = create('th');
      text(col2, '30 - 44');

      const col3 = create('th');
      text(col3, '45+');

      const col4 = create('th');
      text(col4, 'Cancelled');

      const col5 = create('th');
      text(col5, 'Diverted');

      append(thead, col1);
      append(thead, col2);
      append(thead, col3);
      append(thead, col4);
      append(thead, col5);
      append(table, thead);

      const ratings = this.getRatings(this.state.flights[flightId].rating);

      this.state.ratings = ratings;

      // ratings
      const ratingsRow = create('tr');

      const col1_r = create('td');
      text(col1_r, ratings.text_15m);

      const col2_r = create('td');
      text(col2_r, ratings.text_30m);

      const col3_r = create('td');
      text(col3_r, ratings.text_45m);

      const col4_r = create('td');
      text(col4_r, ratings.text_can);

      const col5_r = create('td');
      text(col5_r, ratings.text_div);

      append(ratingsRow, col1_r);
      append(ratingsRow, col2_r);
      append(ratingsRow, col3_r);
      append(ratingsRow, col4_r);
      append(ratingsRow, col5_r);
      append(table, ratingsRow);

      // payout
      const payoutRow = create('tr');

      this.$col1_p = create('td');
      text(this.$col1_p, ratings.payout_15m);

      this.$col2_p = create('td');
      text(this.$col2_p, ratings.payout_30m);

      this.$col3_p = create('td');
      text(this.$col3_p, ratings.payout_45m);

      this.$col4_p = create('td');
      text(this.$col4_p, ratings.payout_can);

      this.$col5_p = create('td');
      text(this.$col5_p, ratings.payout_div);

      append(payoutRow, this.$col1_p);
      append(payoutRow, this.$col2_p);
      append(payoutRow, this.$col3_p);
      append(payoutRow, this.$col4_p);
      append(payoutRow, this.$col5_p);
      append(table, payoutRow);

      append(this.$ratingsBox, p);
      append(this.$ratingsBox, table);


      const premium = create('div');
      premium.className = css.premium;
      this.$premiumInput = create('input');
      this.$premiumInput.setAttribute('type', 'text');
      this.$premiumInput.setAttribute('id', 'cardholder-amount');
      this.$premiumInput.setAttribute('placeholder', 'Premium');
      bind(this.$premiumInput, 'keyup', this.calculatePayouts.bind(this));

      append(premium, this.$premiumInput);
      append(this.$ratingsBox, premium);

      if (this.onlyPremium === null) {
        this.paymentForm();
      }
    }
  }

  paymentForm() {
    const script = create('script')
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', '//js.stripe.com/v3/');
    append(this.$ratingsBox, script);

    const paymentForm = create('form');
    paymentForm.setAttribute('action', `${this.host}/charge`);
    paymentForm.setAttribute('method', 'post');
    paymentForm.setAttribute('id', 'payment-form');

    const formRow = create('div');
    formRow.className = 'form-row';

    const label = create('label');
    label.className = css.caption;
    label.setAttribute('for', 'card-element');
    text(label, 'Credit or debit card');

    const email = create('div');
    const emailLabel = create('label');
    const emailSpan = create('span');
    text(emailSpan, 'E-mail');
    const emailInput = create('input');
    emailInput.setAttribute('name', 'cardholder-email');
    emailInput.setAttribute('id', 'cardholder-email');
    emailInput.className = 'field';
    emailInput.setAttribute('placeholder', 'E-mail');
    append(emailLabel, emailSpan);
    append(emailLabel, emailInput);
    append(email, emailLabel);

    const cardElement = create('div');
    cardElement.setAttribute('id', 'card-element');

    const cardErrors = create('div');
    cardErrors.setAttribute('id', 'card-errors');

    append(formRow, label);
    append(formRow, email);
    append(formRow, cardElement);
    append(formRow, cardErrors);

    const button = create('button')
    button.className = css.apply;
    text(button, 'Apply for policy');

    append(paymentForm, formRow);
    append(paymentForm, button);

    append(this.$ratingsBox, paymentForm);

    script.onload = () => {
      const stripe = Stripe('pk_test_mmv514u7btfloA1rIyp8xLNX');
      const elements = stripe.elements();

      const style = {
        base: {
          color: '#32325d',
          lineHeight: '24px',
          fontFamily: 'Helvetica Neue',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      const card = elements.create('card', {style: style, hidePostalCode: true});
      card.mount('#card-element');

      card.addEventListener('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });

      const form = document.getElementById('payment-form');
      form.className = css.card;
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const extraDetails = {
          email: document.getElementById('cardholder-email').value,
          amount: document.getElementById('cardholder-amount').value
        };

        stripe.createToken(card, extraDetails).then((result) => {
          if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to server
            this.checkout(result.token)
              .then(result => this.showPolicy(result))
              .catch(err => console.error(err));
          }
        });
      });

    }
  }


  calculatePayouts(e) {
    let premium = e.target.value;
    this.state.premium = premium;
    this.state.maxPayout = 150;

    if (premium < 0.01) {
      premium = 0.0;
    }

    if (premium > 5.0) {
      premium = 5.0;
    }

    text(this.$col1_p, this.__getPayout(premium, 10));
    text(this.$col2_p, this.__getPayout(premium, 15));
    text(this.$col3_p, this.__getPayout(premium, 30));
    text(this.$col4_p, this.__getPayout(premium, 50));
    text(this.$col5_p, this.__getPayout(premium, 50));

    window.localStorage.setItem('etherisc', JSON.stringify(this.state))
  }

  __getPayout(premium, rate) {
    return Math.min(Number(premium * 0.97 * rate / this.state.ratings.weight), this.state.maxPayout).toFixed(2)
  }

  getRatings(ratings) {
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

    ratingTable.weight = ratingTable.delay_15m * 10
      + ratingTable.delay_30m * 15
      + ratingTable.delay_45m * 30
      + ratingTable.delay_can * 50
      + ratingTable.delay_div * 50;

    return ratingTable;
  }

  showPolicy(result) {
    text(this.$policyBox, '');
    const p = create('p');
    text(p, 'Your policy: ')

    const link = create('a');
    link.setAttribute('href', `${this.state.net}/tx/${result.txhash}`);
    link.setAttribute('target', '_blank');
    text(link, result.txhash);

    append(this.$policyBox, p);
    append(this.$policyBox, link);
  }

  checkout(token) {
    console.log(token);
    return new Promise((resolve, reject) => {
      fetch(`${this.host}/charge`, {
        method: 'POST',
        body: JSON.stringify(token)
      })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject({err}));
    });
  }

  getAirports() {
    return new Promise((resolve, reject) => {
      fetch(`${this.host}/airports`)
        .then(response => response.json())
        .then(airports => resolve(airports))
        .catch(err => reject({err}))
    })
  }

  getFlightRating() {
    return new Promise((resolve, reject) => {
      fetch(`${this.host}/flight-rating`, {
        method: 'POST',
        body: JSON.stringify({})
      })
        .then(response => response.json())
        .then(airports => resolve(airports))
        .catch(err => reject({err}))
    })
  }

  searchFlights() {
    return new Promise((resolve, reject) => {
      text(this.$searchBox, 'Searching...');
      fetch(`${this.host}/flights-on-date`)
        .then(response => response.json())
        .then(flights => {
           text(this.$searchBox, '');
           resolve(flights);
        })
        .catch(err => reject({err}))
    })
  }

  validate() {
    return this.state.origin && this.state.destination && this.state.onDate;
  }

  render() {
    this.$wrapper.innerHTMl = "";

    const title = create('h3')
    title.className = css.title;
    text(title, 'Insure your flight');

    this.$form = create('form');
    this.$form.className = css.selectionBox;

    const originWrapper = create('div');
    originWrapper.className = css.part;
    this.$origin = create('select');
    const originFirstOption = create('option');
    originFirstOption.setAttribute('value', '-');
    text(originFirstOption, 'Select origin');
    append(this.$origin, originFirstOption);
    for (let _i = 0; _i < this.state.airports.length; _i++ ){
      const option = create('option');
      option.setAttribute('value', this.state.airports[_i].id);
      text(option, this.state.airports[_i].text);
      append(this.$origin, option);
    }
    bind(this.$origin, 'change', this.onFieldChange('origin'));
    append(originWrapper, this.$origin)
    append(this.$form, originWrapper);

    const destinationWrapper = create('div');
    destinationWrapper.className = css.part;
    this.$destination = create('select');
    const destinationFirstOption = create('option');
    destinationFirstOption.setAttribute('value', '-');
    text(destinationFirstOption, 'Select destination');
    append(this.$destination, destinationFirstOption);
    for (let _i = 0; _i < this.state.airports.length; _i++ ){
      const option = create('option');
      option.setAttribute('value', this.state.airports[_i].id);
      text(option, this.state.airports[_i].text);
      append(this.$destination, option);
    }
    bind(this.$destination, 'change', this.onFieldChange('destination'));
    append(destinationWrapper, this.$destination)
    append(this.$form, destinationWrapper);

    const onDateWrapper = create('div');
    onDateWrapper.className = css.part;
    this.$onDate = create('input');
    this.$onDate.setAttribute('type', 'text');
    this.$onDate.setAttribute('placeholder', 'yyyy-mm-dd');
    this.$onDate.className = 'etherisc-date-field';

    bind(this.$onDate, 'change', this.onFieldChange('onDate'));
    append(onDateWrapper, this.$onDate);
    append(this.$form, onDateWrapper);

    append(this.$wrapper, title);
    append(this.$wrapper, this.$form);
    append(this.$wrapper, this.$searchBox);
    append(this.$wrapper, this.$ratingsBox);
    append(this.$wrapper, this.$policyBox);
  }

  append() {
    if (this.scriptEl) {
      insertAfter(this.scriptEl, this.$wrapper);
    }

    if (this.onlyPayment || this.dataFlightId) {
      append(this.$wrapper, this.$ratingsBox);
    }

    if (window.jQuery) {
      $(".etherisc-date-field").flatpickr();
    }

    // append styles to head
    // const head = parentHead(this.document);
    // if (head) {
    //   append(head, this.$style);
    // }
  }


}

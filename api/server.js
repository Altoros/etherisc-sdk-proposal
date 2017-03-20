import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import cors from 'kcors';
import koaBody from 'koa-body';
import Stripe from 'stripe';
import serve from './middlewares/static';
import config from './config';

import dashboard from './routes/dashboard';
import {
  getAirports,
  getFlightsOnDate,
  getFlightRates,
  getRating
} from './routes/flights';

const app = new Koa();
const router = new Router();
const body = koaBody();
const stripe = Stripe(config.stripe.testSecretKey);

new Pug({
  viewPath: './views',
  debug: false,
  pretty: true,
  noCache: true,
  compileDebug: false,
  locals: {},
  app
});

router
  .get('/', dashboard)
  .get('/airports', getAirports)
  .get('/flights-on-date', getFlightsOnDate)
  .post('/flight-rating', getRating)
  .post('/charge', body, async function(ctx, next) {
    const amount = 1500;
    const payment = JSON.parse(ctx.request.body);

    const customer = await stripe.customers.create({
      email: payment.email,
      source: payment.id
    });

    const charge = await stripe.charges.create({
      amount,
      description: "Apply for policy",
         currency: "usd",
         customer: customer.id
    });

    // web3 flow

    ctx.body = {txhash: '0xba45653ae896bebfd8c48ab7c636472dafa72eb5874d8f47fcae3f08de5c63ea'};
  })
  .post('/apply', (ctx, next) => {

    // web3 flow
    ctx.body = {txhash: '0xba45653ae896bebfd8c48ab7c636472dafa72eb5874d8f47fcae3f08de5c63ea'};
  })

app
  .use(serve(__dirname + '/sdk-build'))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3333, console.log('http://localhost:3333'));

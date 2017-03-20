import Koa from 'koa';
import Router from 'koa-router';
import render from 'koa-ejs';
import path from 'path';
import serve from './middlewares/static';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const url = `http://localhost:${port}`;

  const app = new Koa();
  const router = new Router();

  render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    cache: false
  });

  router
    // examples overview
    .get('/', async function(ctx, next) {
      await ctx.render('index');
    })


    // flight tickets
    .get('/flight-tickets', async function(ctx, next) {
      await ctx.render('/flight-tickets/index');
    })
    .get('/flight-tickets/review', async function(ctx, next) {
      await ctx.render('/flight-tickets/review');
    })
    .get('/flight-tickets/payment', async function(ctx, next) {
      await ctx.render('/flight-tickets/payment');
    })
    .post('/flight-tickets/success', async function(ctx, next) {
      await ctx.render('/flight-tickets/success');
    })

    // apartment booking
    .get('/apartment-booking', async function(ctx, next) {
      await ctx.render('/apartment-booking/index');
    })
    .get('/apartment-booking/review', async function(ctx, next) {
      await ctx.render('/apartment-booking/review');
    })
    .get('/apartment-booking/payment', async function(ctx, next) {
      await ctx.render('/apartment-booking/payment');
    })
    .post('/apartment-booking/success', async function(ctx, next) {
      await ctx.render('/apartment-booking/success');
    })

    // cruise booking
    .get('/cruise-booking', async function(ctx, next) {
      await ctx.render('/cruise-booking/index');
    })
    .get('/cruise-booking/review', async function(ctx, next) {
      await ctx.render('/cruise-booking/review');
    })
    .get('/cruise-booking/payment', async function(ctx, next) {
      await ctx.render('/cruise-booking/payment');
    })
    .post('/cruise-booking/success', async function(ctx, next) {
      await ctx.render('/cruise-booking/success');
    })


    // car rental
    .get('/car-rental', async function(ctx, next) {
      await ctx.render('/car-rental/index');
    })
    .get('/car-rental/review', async function(ctx, next) {
      await ctx.render('/car-rental/review');
    })
    .get('/car-rental/payment', async function(ctx, next) {
      await ctx.render('/car-rental/payment');
    })
    .post('/car-rental/success', async function(ctx, next) {
      await ctx.render('/car-rental/success');
    })



    // travel booking
    .get('/travel-booking', async function(ctx, next) {
      await ctx.render('/travel-booking/index');
    })
    .get('/travel-booking/review', async function(ctx, next) {
      await ctx.render('/travel-booking/review');
    })
    .get('/travel-booking/payment', async function(ctx, next) {
      await ctx.render('/travel-booking/payment');
    })
    .post('/travel-booking/success', async function(ctx, next) {

      // Payment to Etherisc

      // Request & display transaction hash : /apply

      await ctx.render('/travel-booking/success');
    })

  app
    .use(serve(__dirname + '/public'))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, () => {
      console.log(`Server: ${url}`);
    });
};

bootstrap();

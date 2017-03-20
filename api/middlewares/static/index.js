import {resolve} from 'path';
import assert from 'assert';
import send from 'koa-send';
// import log from '../../modules/log';

const log = {
  trace: message => console.log(message)
};

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

export default function serve(root, options = {}) {
  assert(root, 'root directory is required to serve files');
  const opts = options;
  opts.root = resolve(root);
  if (opts.index !== false) opts.index = opts.index || 'index.html';

  if (!opts.defer) {
    return (ctx, next) => {
      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        return send(ctx, ctx.path, opts).then(done => {
          if (!done) {
            return next();
          }
          return log.trace(`--> ${ctx.path} sended`);
        });
      }
      return next();
    };
  }

  return (ctx, next) => {
    next().then(() => {
      if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return;
      // response is already handled
      if (ctx.body != null || ctx.status !== 404) return;

      send(ctx, ctx.path, opts);
    });
  };
}



// export function init(app) {
//   app.use(serve('../build/public'));
// }

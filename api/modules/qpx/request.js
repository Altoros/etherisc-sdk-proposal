import request from 'request';

export default function qpxRequest(api, options) {
  return new Promise((resolve, reject) => {
    const baseUrl = `https://www.googleapis.com${api}`;

    const config = {
      uri: baseUrl + '?key=' + options.key,
      method: 'POST',
      json: true,
      timeout: options.timeout,
      body : options.body
    };

    let err;

    if (options.key) {
        request.post(config, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                err = 'request.post: ' + error;
                if (res && res.statusCode) {
                    err += ' (code: ' + res.statusCode + ')';
                    err += '\n' + JSON.stringify(body);
                }
                reject(err);
            }
        })
    } else {
        err = 'You must provide a valid API key';
        reject(err);
    }



  });
}

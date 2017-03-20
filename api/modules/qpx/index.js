import qpxRequest from './request';

class QPXClient {
  constructor({key, timeout}) {
    this.key = key || null;
    this.timeout = timeout || 10000;
  }

  search(config) {
    const api = '/qpxExpress/v1/trips/search';
    const options = {
      key: this.key,
      timeout: this.timeout,
      body: config.body
    }

    return qpxRequest(api, options);
  }
}

export default QPXClient;

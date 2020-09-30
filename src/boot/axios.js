import Vue from "vue";
import axios from "axios";

const instance = axios.create({});

instance.defaults.baseURL = process.env.API_BASEURL;
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.patch["Content-Type"] = "application/json";

instance.interceptors.request.use(
   function(config) {
      //Vue.$log.debug('axios', 'request', config.method.toUpperCase() + ' ' + config.url)
      return config;
   },
   function(error) {
      //Vue.$log.error('axios', 'request', 'error', error)
      return error;
   }
);

instance.interceptors.response.use(
   function(response) {
      //Vue.$log.debug('axios', 'response', response.status + ' ' + response.statusText)
      return response;
   },
   function(error) {
      //Vue.$log.error('axios', 'response', 'error', error)
      return error;
   }
);

export { instance };

import axios from 'axios';

const config = require('./config.json');

export function getPostcodeData(postcode, callback) {

  let url = config.postcode_api + postcode.replace(/\s/g, '');

  axios.get(url)
    .then(response => {
      if (response && response.data) {
        callback(response.data);
      } else {
        callback(null);
      }
    })
    .catch(err => callback(null));

}
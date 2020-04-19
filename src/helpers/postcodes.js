import axios from 'axios';

const config = require('./config.json');

export async function getPostcodeData(postcode) {
  let url = config.postcode_api + postcode.replace(/\s/g, '');
  let response = await axios.get(url);
  if (response && response.data) return response.data;
  return {};
}

export async function getServiceDataFromPostcode(postcode, services) {
  let postcode_data = await getPostcodeData(postcode);
  let services_filtered = services.filter(s => s.Code === postcode_data.library_service);
  if (services_filtered.length > 0) return services_filtered[0];
  return {};
}
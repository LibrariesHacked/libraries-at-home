import axios from 'axios'

const config = require('./config.json')

export async function getPostcodeData (postcode) {
  const url = config.postcode_api + postcode.replace(/\s/g, '')
  const response = await axios.get(url)
  if (response && response.data) return response.data
  return {}
}

export async function getServiceDataFromPostcode (postcode, services) {
  const postcodeData = await getPostcodeData(postcode)
  const servicesFiltered = services.filter(s => s.Code === postcodeData.library_service)
  if (servicesFiltered.length > 0) return servicesFiltered[0]
  return {}
}

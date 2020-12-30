const config = require('./helpers/config.json')
const axios = require('axios')

require('babel-register')({
  presets: ['es2015', 'react']
})

const router = require('./sitemap-routes').default
const Sitemap = require('react-router-sitemap').default

async function generateSitemap () {
  const services = []
  const url = config.servicesApi
  const response = await axios.get(url)
  response.data.forEach(service => {
    const systemName = service.Name.split(', ').reverse().join(' ').replace(/[. ,:-]+/g, '-').toLowerCase()
    services.push({ service: '/?service=' + systemName })
  })

  const paramsConfig = {
    '/:service': services
  }
  return (
    new Sitemap(router)
      .applyParams(paramsConfig)
      .build('https://www.librariesathome.co.uk')
      .save('./public/sitemap.xml')
  )
}

generateSitemap()

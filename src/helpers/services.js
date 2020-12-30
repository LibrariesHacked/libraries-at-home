import axios from 'axios'

const config = require('./config.json')

export const getServices = async () => {
  const url = config.servicesApi
  const response = await axios.get(url)
  if (response && response.data) {
    response.data.forEach(service => {
      service.systemName = getServiceSystemName(service.Name)
    })
    return response.data
  }
  return []
}

export const getServiceYouTubeDataFromId = (id) => {
  const youtubeUrl = config.youTubeUrl
  const idTypes = {
    UC: ['channel/', 'Channel'],
    PL: ['playlist/', 'Playlist']
  }
  const type = idTypes[id.substring(0, 2)]
  return {
    url: youtubeUrl + (type ? type[0] : 'user/') + id,
    type: (type ? type[1] : 'Account')
  }
}

export const getServicesYouTubeVideos = async () => {
  const url = config.videoApi
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

export const getServicesBlogs = async () => {
  const url = config.blogsApi
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

export const getServiceSystemName = (name) => {
  return name.split(', ').reverse().join(' ').replace(/[. ,:-]+/g, '-').toLowerCase()
}

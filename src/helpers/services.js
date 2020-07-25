import axios from 'axios'

const config = require('./config.json')

export async function getServices () {
  const url = config.servicesApi
  const response = await axios.get(url)
  if (response && response.data) return response.data
  return []
}

export function getServiceYouTubeDataFromId (id) {
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

export async function getServicesYouTubeVideos () {
  const url = config.videoApi
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

export async function getServicesBlogs () {
  const url = config.blogsApi
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

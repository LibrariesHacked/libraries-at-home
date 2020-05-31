import axios from 'axios'

const config = require('./config.json')

export async function getServices () {
  const url = config.services_api
  const response = await axios.get(url)
  if (response && response.data) return response.data
  return []
}

export function getServiceYouTubeDataFromId (id) {
  const youtube_url = config.youtube_url
  const id_types = {
    UC: ['channel/', 'Channel'],
    PL: ['playlist/', 'Playlist']
  }
  const type = id_types[id.substring(0, 2)]
  return {
    url: youtube_url + (type ? type[0] : 'user/') + id,
    type: (type ? type[1] : 'Account')
  }
}

export async function getServicesYouTubeVideos () {
  const url = config.video_api
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

export async function getServicesBlogs () {
  const url = config.blogs_api
  const response = await axios.get(url)
  if (response && response.data) return response.data.items
  return []
}

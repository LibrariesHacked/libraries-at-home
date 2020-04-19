import axios from 'axios';

const config = require('./config.json');

export async function getServices() {
  let url = config.services_api;
  let response = await axios.get(url);
  if (response && response.data) return response.data;
  return [];
}

export function getServiceYouTubeDataFromId(id) {
  const youtube_url = config.youtube_url;
  const id_types = {
    'UC': ['channel/', 'Channel'],
    'PL': ['playlist/', 'Playlist']
  };
  const type = id_types[id.substring(0, 2)];
  return {
    url: youtube_url + (type ? type[0] : 'user/') + id,
    type: (type ? type[1] : 'Account')
  };
}

export async function getServicesYouTubeVideos() {
  let url = config.video_api;
  let response = await axios.get(url);
  if (response && response.data) return response.data.items;
  return [];
}

export async function getServicesBlogs() {
  let url = config.blogs_api;
  let response = await axios.get(url);
  if (response && response.data) return response.data.items;
  return [];
}
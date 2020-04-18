import axios from 'axios';

const config = require('./config.json');

export async function getServicesYouTubeVideos(postcode) {
  let url = config.video_api;
  let response = await axios.get(url);
  if (response && response.data) return response.data.items;
  return [];
}
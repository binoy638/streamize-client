import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export const TorrentScrapper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TORRENT_SCRAPPER_URL
});

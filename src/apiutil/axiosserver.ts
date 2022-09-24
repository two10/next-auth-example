import axios from "axios"



export const axiosserver =  axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { 'any': 'any' },
  timeout: 1000,
});

axiosserver.defaults.withCredentials = true;

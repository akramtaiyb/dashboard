import axiosLib from 'axios'

const axios = axiosLib.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axios

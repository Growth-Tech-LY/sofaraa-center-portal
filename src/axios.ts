import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://sofaraa-portal-backend.growthtech.ly/api/',
  //  baseURL: 'http://localhost:5127/api/',

  headers: {
    accept: '*/*',
    // 'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

export default apiClient

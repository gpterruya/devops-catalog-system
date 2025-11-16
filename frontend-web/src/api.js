import axios from 'axios'

export const apiCatalog = axios.create({
  baseURL: 'http://localhost:8000'
})

export const apiOrders = axios.create({
  baseURL: 'http://localhost:8001'
})

import axios from 'axios'

export const apiCatalog = axios.create({
  baseURL: 'http://localhost:8080/catalog'
})

export const apiOrders = axios.create({
  baseURL: 'http://localhost:8080/orders'
})

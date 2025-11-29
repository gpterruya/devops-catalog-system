import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export const apiCatalog = axios.create({
  baseURL: `${API_BASE_URL}/catalog`,
})

export const apiOrders = axios.create({
  baseURL: `${API_BASE_URL}/orders`,
})

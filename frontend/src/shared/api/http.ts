import axios from 'axios'
import { getSessionId } from './session'

export const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  config.headers.set('X-Session-Id', getSessionId())
  return config
})

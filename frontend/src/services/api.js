import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

export const getDevelopers = async () => {
  const response = await api.get('/developers')
  return response.data
}

export const addDeveloper = async (developerData) => {
  const response = await api.post('/developers', developerData)
  return response.data
}

export const updateDeveloper = async (id, developerData) => {
  const response = await api.put(`/developers/${id}`, developerData)
  return response.data
}

export const deleteDeveloper = async (id) => {
  const response = await api.delete(`/developers/${id}`)
  return response.data
}


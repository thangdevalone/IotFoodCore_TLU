import axios from "axios"
import { AI_URL } from "../constants/common"

const axiosClientAI = axios.create({
  baseURL: `${AI_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
})
// Add a request interceptor
axiosClientAI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosClientAI.interceptors.response.use(
  function (response: { data: any }) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error: { response: { data: any } }) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data)
  },
)

export default axiosClientAI

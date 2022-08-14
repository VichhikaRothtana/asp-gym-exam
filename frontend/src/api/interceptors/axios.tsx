import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:7133/'

let refresh = false

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        JSON.parse(localStorage.getItem('data')!).accessToken
      }`

      return axios(error.config)
    }
    refresh = false
    return error
  }
)

import { axiosPrivate } from '../api/interceptors/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth() as any

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        console.log('config')
        console.log(config)
        return config
      },
      (error) => {
        console.log('error here')
        Promise.reject(error)
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        console.log('error prevRequest')
        console.log(error)
        console.log(prevRequest)
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()

          console.log('newAccessToken')
          console.log(newAccessToken)

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate

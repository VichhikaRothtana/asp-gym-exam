import axios from '../api/interceptors/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth() as any
  const person = JSON.parse(localStorage.getItem('person') as any)
  console.log('from local')
  console.log(person)
  console.log(person.accessToken)
  console.log(person.refreshToken)
  const refresh = async () => {
    console.log('in refresh')
    console.log(
      JSON.stringify({
        accessToken: person.accessToken,
        refreshToken: person.refreshToken,
      })
    )
    const response = await axios.post(
      '/api/authentication/refreshToken',
      JSON.stringify({
        accessToken: person.accessToken,
        refreshToken: person.refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    console.log(response)
    setAuth((prev: any) => {
      console.log('iin set auth')
      console.log(JSON.stringify(prev))
      console.log(response.data.accessToken)
      return {
        ...prev,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
    })

    console.log('---auth---')
    console.log('auth ')
    localStorage.setItem('person', JSON.stringify(auth))
    return response
  }
  return refresh
}

export default useRefreshToken

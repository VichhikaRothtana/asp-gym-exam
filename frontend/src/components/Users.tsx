import { useState, useEffect, Key } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/interceptors/axios'

const Users = () => {
  const [roles, setRoles] = useState() as any
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const person = JSON.parse(localStorage.getItem('person') as any)
    const getUsers = async () => {
      try {
        // const response = await axiosPrivate.get('/api/role')
        // const response = await axiosPrivate.get('/api/role')
        console.log(JSON.stringify({ Authorization: person.accessToken }))
        const response = await axios.post('/api/role', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: person.accessToken,
          },
          withCredentials: true,
        })

        console.log('response.data')

        console.log(response.data)
        isMounted && setRoles(response.data)
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      <a href="/">Home</a>
      {roles?.length ? (
        <ul>
          {roles.map((role: any, i: Key | null | undefined) => (
            <li key={i}>{role?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  )
}

export default Users

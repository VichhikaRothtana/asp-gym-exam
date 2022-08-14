import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }: any) => {
  // const { auth } = useAuth() as any
  const data = JSON.parse(localStorage.getItem('data')!)
  const location = useLocation()
  console.log('RequireAuth')
  console.log(data)
  return data.user.roles?.find((role: any) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : data?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth

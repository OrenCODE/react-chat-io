import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  if (userInfo) {
    return <Outlet />
  }
  return <Navigate to='/' replace />
}

export default PrivateRoute

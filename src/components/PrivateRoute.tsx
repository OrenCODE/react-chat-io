import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from "../hooks/useAppSelector.ts";

const PrivateRoute = () => {
    const userInfo = useAppSelector(state => state.auth.userInfo)

    if (userInfo) {
        return <Outlet/>
    }
    return <Navigate to='/' replace/>
}

export default PrivateRoute

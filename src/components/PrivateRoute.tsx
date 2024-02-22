import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {UserRole} from "../utils/sliceHelpers.ts";

const PrivateRoute = ({allowedRoles}: { allowedRoles: UserRole[] }) => {
    const userInfo = useAppSelector(state => state.auth.userInfo);

    if (!userInfo) {
        return <Navigate to="/" replace/>;
    }

    if (allowedRoles.includes(userInfo.role)) {
        return <Outlet/>;
    }

    return <Navigate to="/" replace/>;
};

export default PrivateRoute;

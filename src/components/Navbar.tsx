import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {useLogoutMutation} from "../store/endpoints/authEndpoints.ts";
import {removeCredentials} from "../store/slices/authSlice.ts";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
        } catch (err) {
            console.error('server logout failed');
        }
        dispatch(removeCredentials());
        navigate('/');
    }

    const renderAuthLinks = () => {
        if (userInfo) return <li className="nav-item" onClick={handleLogout}>Log Out</li>
        return (
            <>
                <li className="nav-item"><Link className="nav-link" to={'/'}>Sign In</Link></li>
                <li className="nav-item"><Link className="nav-link" to={'/register'}>Sign Up</Link></li>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={'/login'}>Chat App</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        {renderAuthLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

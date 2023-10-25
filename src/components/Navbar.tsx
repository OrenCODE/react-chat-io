import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLogoutMutation} from "../store/endpoints/authEndpoints.ts";
import {removeCredentials} from "../store/slices/authSlice.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {io, Socket} from "socket.io-client";

const socket: Socket = io('http://localhost:8080');

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();
    const userInfo = useAppSelector(state => state.auth.userInfo);

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
            socket.emit('user disconnect', userInfo);
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
                <li className="nav-item"><Link className="nav-link" to={'/login'}>Sign In</Link></li>
                <li className="nav-item"><Link className="nav-link" to={'/register'}>Sign Up</Link></li>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to={'/'}>Chat App</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    {renderAuthLinks()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

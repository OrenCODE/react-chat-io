import './styles/HomeScreen.css';
import {Link} from "react-router-dom";

const HomeScreen = () => {

    return (
        <div className="home-screen">
            <div className="hero">
                <h1>Welcome to ChatApp</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget felis in eros varius viverra.</p>
                <Link to="/login">
                    <button className="start-button">Start Chatting</button>
                </Link>
            </div>
        </div>
    );
}

export default HomeScreen;

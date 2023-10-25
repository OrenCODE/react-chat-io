import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import './App.css';

const App = () => {
    return (
        <>
            <div className="header">
                <Navbar/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </>
    );
}

export default App;

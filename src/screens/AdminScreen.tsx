import Sidebar from '../components/Sidebar';
import {Outlet} from 'react-router-dom';
import './styles/AdminScreen.css';

const AdminScreen = () => {
    return (
        <div className="dashboard">
            <Sidebar/>
            <div className="main-content">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminScreen;

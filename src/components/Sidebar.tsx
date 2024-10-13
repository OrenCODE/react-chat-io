import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="users">Users</Link>
      <Link to="payments">Payments</Link>
    </div>
  );
};

export default Sidebar;

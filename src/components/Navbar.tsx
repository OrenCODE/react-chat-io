import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {useDispatch} from 'react-redux';
import {useLogoutMutation} from '../store/endpoints/authEndpoints';
import {removeCredentials} from '../store/slices/authSlice';
import {useAppSelector} from '../hooks/useAppSelector';
import {io, Socket} from 'socket.io-client';

import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {AppBarTitleStyles, UserButton, UserButtonIconStyles} from "../screens/styles/Layout.style.ts";

const socket: Socket = io('http://localhost:8080');

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const [open, setOpenMenu] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenMenu(true)
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleLogout = async () => {
    setOpenMenu(false);

    try {
      await logout({}).unwrap();
      socket.emit('user disconnect', userInfo);
    } catch (err) {
      console.error('server logout failed');
    }
    dispatch(removeCredentials());
    navigate('/');
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem to="/home" component={Link} sx={AppBarTitleStyles}>
            MY APP
          </MenuItem>
          {userInfo ? (
            <>
              <UserButton
                endIcon={<AccountCircle style={UserButtonIconStyles} />}
                onClick={handleOpen}
                color="inherit">
                {userInfo.name}
              </UserButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/chat')}>Chat</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="signin">Sign In</MenuItem>
              <MenuItem component={Link} to="signup">Sign Up</MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../features/auth/authSlice';
import Button from '../common/Button';
import './Header.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          MERN Todo
        </Link>
        <nav className="header-nav">
          {token ? (
            <>
              <Link to="/" className="header-nav-link">
                Home
              </Link>
              <Button variant="secondary" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-nav-link">
                Login
              </Link>
              <Link to="/register" className="header-nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
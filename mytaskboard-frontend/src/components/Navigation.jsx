import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  cursor: pointer;
  
  &:hover {
    color: #3498db;
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary && `
    background-color: #3498db;
    color: white;
    
    &:hover {
      background-color: #2980b9;
    }
  `}
  
  ${props => props.secondary && `
    background-color: transparent;
    color: #3498db;
    border: 1px solid #3498db;
    
    &:hover {
      background-color: #3498db;
      color: white;
    }
  `}
`;

const UserInfo = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <NavbarWrapper>
      <NavContainer>
        <Logo onClick={() => navigate('/')}>MyTaskBoard</Logo>
        <NavActions>
          {isAuthenticated ? (
            <>
              <UserInfo>Welcome, {user?.username}!</UserInfo>
              <Button primary onClick={() => navigate('/boards')}>My Boards</Button>
              <Button secondary onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button primary onClick={() => navigate('/login')}>Login</Button>
              <Button secondary onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </NavActions>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navigation; 
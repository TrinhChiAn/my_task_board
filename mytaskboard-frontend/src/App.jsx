import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
`;

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Application Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Something went wrong.</h2>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return children;
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ErrorBoundary>
      <Router>
        <AppWrapper>
          <Navigation />
          <MainContent>
            <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
              <Routes>
                <Route 
                  path="/login" 
                  element={isAuthenticated ? <Navigate to="/boards" /> : <Login />} 
                />
                <Route 
                  path="/signup" 
                  element={isAuthenticated ? <Navigate to="/boards" /> : <Signup />} 
                />
                <Route
                  path="/boards"
                  element={
                    <PrivateRoute>
                      <BoardList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/boards/:boardId"
                  element={
                    <PrivateRoute>
                      <BoardDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/boards" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </Suspense>
          </MainContent>
        </AppWrapper>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

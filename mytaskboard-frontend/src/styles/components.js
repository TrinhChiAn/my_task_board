import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.danger ? '#dc3545' : props.secondary ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  padding: ${props => props.small ? '5px 10px' : '10px 20px'};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${props => props.small ? '12px' : '16px'};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.danger ? '#c82333' : props.secondary ? '#5a6268' : '#0056b3'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
  padding: 10px;
  background-color: #f8d7da;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
`;

export const Navbar = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    background: linear-gradient(45deg, #007bff, #00ff88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  gap: ${props => props.gap || '10px'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};

  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileStack ? 'column' : 'row'};
  }
`;

export const Badge = styled.span`
  background-color: ${props => {
    switch (props.status) {
      case 'TODO': return '#007bff';
      case 'IN_PROGRESS': return '#ffc107';
      case 'DONE': return '#28a745';
      default: return '#6c757d';
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const TaskColumn = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  min-height: 400px;

  h2 {
    color: #495057;
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`; 
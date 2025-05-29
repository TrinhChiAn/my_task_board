import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 2rem;
  font-weight: 600;

  &::after {
    content: '✏️';
  }
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TaskCard = styled.div`
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#FFF3DC';
      case 'DONE':
        return '#E8FFE9';
      case 'WONT_DO':
        return '#FFE5E5';
      default:
        return '#F0F4F8';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#FFB74D';
      case 'DONE':
        return '#4CAF50';
      case 'WONT_DO':
        return '#FF5252';
      default:
        return '#E0E0E0';
    }
  }};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const TaskIcon = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

export const TaskContent = styled.div`
  flex: 1;
`;

export const TaskTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

export const TaskDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 4px 0 0 0;
`;

export const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#FFB74D';
      case 'DONE':
        return '#66BB6A';
      case 'CANCELLED':
        return '#EF5350';
      default:
        return '#90A4AE';
    }
  }};
  color: white;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #FFF3E0;
  border: none;
  border-radius: 16px;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  &:hover {
    background: #FFE0B2;
  }

  &::before {
    content: '+';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #FFB74D;
    border-radius: 6px;
    color: white;
    font-size: 1.2rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  color: #666;

  &:hover {
    color: #000;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FFB74D;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #FFB74D;
  }
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
`;

export const IconButton = styled.button`
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid ${props => props.selected ? '#FFB74D' : '#eee'};
  border-radius: 8px;
  background: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #FFB74D;
  }
`;

export const StatusGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const StatusButton = styled.button`
  padding: 12px;
  border: 2px solid ${props => props.selected ? '#FFB74D' : '#eee'};
  border-radius: 12px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: #FFB74D;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;

  ${props => props.primary && `
    background: #2196F3;
    color: white;

    &:hover {
      background: #1976D2;
    }
  `}

  ${props => props.secondary && `
    background: #E0E0E0;
    color: #666;

    &:hover {
      background: #BDBDBD;
    }
  `}
`; 
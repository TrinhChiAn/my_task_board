import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, FlexContainer } from '../styles/components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EditBoardModal = ({ board, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: board.title,
    description: board.description
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(board.id, formData);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px',
          fontSize: '24px'
        }}>
          Edit Board
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              color: '#495057', 
              marginBottom: '8px', 
              display: 'block' 
            }}>
              Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              color: '#495057', 
              marginBottom: '8px', 
              display: 'block' 
            }}>
              Description
            </label>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <FlexContainer gap="10px" justify="flex-end">
            <Button type="button" secondary onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </FlexContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditBoardModal; 
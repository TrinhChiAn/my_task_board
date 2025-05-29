import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards, createBoard, deleteBoard, updateBoard } from '../services/api';
import styled from 'styled-components';
import EditBoardModal from './EditBoardModal';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 16px;
  font-weight: 700;
  background: linear-gradient(120deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const CreateBoardCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  padding: ${props => props.small ? '8px 16px' : '12px 24px'};
  border-radius: 8px;
  font-weight: 600;
  font-size: ${props => props.small ? '0.875rem' : '1rem'};
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${props => {
    if (props.primary) {
      return `
        background: linear-gradient(to right, #2563eb, #3b82f6);
        color: white;
        border: none;
        
        &:hover {
          background: linear-gradient(to right, #1d4ed8, #2563eb);
          transform: translateY(-1px);
        }
      `;
    }
    if (props.secondary) {
      return `
        background: #f3f4f6;
        color: #4b5563;
        border: 1px solid #e5e7eb;
        
        &:hover {
          background: #e5e7eb;
        }
      `;
    }
    if (props.danger) {
      return `
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fecaca;
        
        &:hover {
          background: #fecaca;
        }
      `;
    }
  }}
`;

const BoardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const BoardCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

const BoardTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
`;

const BoardDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const TaskCount = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  border-radius: 8px;
  padding: 16px;
  color: #dc2626;
  margin-bottom: 24px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '⚠️';
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  background: #f9fafb;
  border-radius: 16px;
  border: 2px dashed #e5e7eb;

  h3 {
    color: #4b5563;
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  p {
    color: #9ca3af;
  }
`;

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [editingBoard, setEditingBoard] = useState(null);
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const response = await getBoards();
      setBoards(response.data);
    } catch (err) {
      setError('Failed to fetch boards');
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      const response = await createBoard(newBoard);
      setBoards([...boards, response.data]);
      setNewBoard({ title: '', description: '' });
    } catch (err) {
      setError('Failed to create board');
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setBoards(boards.filter(board => board.id !== boardId));
    } catch (err) {
      setError('Failed to delete board');
    }
  };

  const handleUpdateBoard = async (boardId, updatedData) => {
    try {
      const response = await updateBoard(boardId, updatedData);
      setBoards(boards.map(board => 
        board.id === boardId ? response.data : board
      ));
      setEditingBoard(null);
    } catch (err) {
      setError('Failed to update board');
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>My Task Boards</Title>
        <Subtitle>Organize your tasks and boost your productivity</Subtitle>
      </Header>

      <CreateBoardCard>
        <Form onSubmit={handleCreateBoard}>
          <Input
            type="text"
            placeholder="Enter board title"
            value={newBoard.title}
            onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Enter board description"
            value={newBoard.description}
            onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
          />
          <Button primary type="submit">
            Create Board
          </Button>
        </Form>
      </CreateBoardCard>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <BoardsGrid>
        {boards.map((board) => (
          <BoardCard key={board.id}>
            <div>
              <BoardTitle>{board.title}</BoardTitle>
              <BoardDescription>{board.description}</BoardDescription>
            </div>
            <div>
              <TaskCount style={{ marginBottom: '16px' }}>
                {board.tasks?.length || 0} Tasks
              </TaskCount>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button primary small onClick={() => navigate(`/boards/${board.id}`)}>
                  View Board
                </Button>
                <Button secondary small onClick={() => setEditingBoard(board)}>
                  Edit
                </Button>
                <Button danger small onClick={() => handleDeleteBoard(board.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </BoardCard>
        ))}
      </BoardsGrid>

      {boards.length === 0 && (
        <EmptyState>
          <h3>No boards yet</h3>
          <p>Create your first board to get started!</p>
        </EmptyState>
      )}

      {editingBoard && (
        <EditBoardModal
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
          onUpdate={handleUpdateBoard}
        />
      )}
    </PageContainer>
  );
};

export default BoardList;
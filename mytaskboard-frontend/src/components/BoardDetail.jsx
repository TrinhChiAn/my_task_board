import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardById, createTask, updateTask, deleteTask, getTaskById } from '../services/api';
import {
  PageContainer,
  Header,
  Logo,
  Subtitle,
  TaskList,
  TaskCard,
  TaskIcon,
  TaskContent,
  TaskTitle,
  TaskDescription,
  StatusIcon,
  AddButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  IconGrid,
  IconButton,
  StatusGroup,
  StatusButton,
  ButtonGroup,
  Button
} from './styles/BoardDetailStyles';

const TASK_ICONS = {
  'USER': '👨‍💻',
  'CHAT': '💬',
  'COFFEE': '☕',
  'TROPHY': '🏋️',
  'BOOK': '📚',
  'CLOCK': '⏰'
};

const TASK_STATUSES = [
  { id: 'IN_PROGRESS', label: 'In Progress', icon: '🔄' },
  { id: 'DONE', label: 'Completed', icon: '✓' },
  { id: 'WONT_DO', label: "Won't do", icon: '×' }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'IN_PROGRESS':
      return '🔄';
    case 'DONE':
      return '✓';
    case 'WONT_DO':
      return '×';
    default:
      return '📝';
  }
};

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState({
    title: '',
    description: '',
    status: 'IN_PROGRESS',
    icon: 'BOOK'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const response = await getBoardById(boardId);
      setBoard(response.data);
    } catch (err) {
      console.error('Failed to fetch board:', err);
    }
  };

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await getTaskById(taskId);
      setSelectedTask(response.data);
      setEditingTask(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch task details:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask(boardId, editingTask);
      setBoard({
        ...board,
        tasks: [...board.tasks, response.data]
      });
      handleCloseModal();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(selectedTask.id, editingTask);
      setBoard({
        ...board,
        tasks: board.tasks.map(task =>
          task.id === selectedTask.id ? response.data : task
        )
      });
      handleCloseModal();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setEditingTask({
      title: '',
      description: '',
      status: 'IN_PROGRESS',
      icon: 'BOOK'
    });
    setIsEditing(false);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    
    try {
      await deleteTask(selectedTask.id);
      setBoard({
        ...board,
        tasks: board.tasks.filter(task => task.id !== selectedTask.id)
      });
      handleCloseModal();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (!board) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <Header>
        <Logo>My Task Board</Logo>
        <Subtitle>Tasks to keep organised</Subtitle>
      </Header>

      <AddButton onClick={() => setShowModal(true)}>
        Add new task
      </AddButton>

      <TaskList>
        {board.tasks?.map(task => (
          <TaskCard 
            key={task.id} 
            status={task.status}
            onClick={() => fetchTaskDetails(task.id)}
            style={{ cursor: 'pointer' }}
          >
            <TaskIcon>{TASK_ICONS[task.icon] || '📝'}</TaskIcon>
            <TaskContent>
              <TaskTitle>{task.title}</TaskTitle>
              {task.description && (
                <TaskDescription>{task.description}</TaskDescription>
              )}
            </TaskContent>
            <StatusIcon status={task.status}>
              {task.status === 'IN_PROGRESS' ? '🔄' : 
               task.status === 'DONE' ? '✓' : 
               task.status === 'WONT_DO' ? '×' : '📝'}
            </StatusIcon>
          </TaskCard>
        ))}
      </TaskList>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Task details</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <Form onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}>
              <FormGroup>
                <Label>Task name</Label>
                <Input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Enter task name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Enter a short description"
                />
              </FormGroup>
              <FormGroup>
                <Label>Icon</Label>
                <IconGrid>
                  {Object.entries(TASK_ICONS).map(([key, emoji]) => (
                    <IconButton
                      key={key}
                      selected={editingTask.icon === key}
                      onClick={() => setEditingTask({ ...editingTask, icon: key })}
                      type="button"
                    >
                      {emoji}
                    </IconButton>
                  ))}
                </IconGrid>
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <StatusGroup>
                  {TASK_STATUSES.map(status => (
                    <StatusButton
                      key={status.id}
                      selected={editingTask.status === status.id}
                      onClick={() => setEditingTask({ ...editingTask, status: status.id })}
                      type="button"
                    >
                      {status.icon} {status.label}
                    </StatusButton>
                  ))}
                </StatusGroup>
              </FormGroup>
              <ButtonGroup>
                {selectedTask ? (
                  <>
                    <Button type="button" secondary onClick={handleDeleteTask}>
                      Delete
                    </Button>
                    <Button type="submit" primary>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="button" secondary onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button type="submit" primary>
                      Create Task
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default BoardDetail;
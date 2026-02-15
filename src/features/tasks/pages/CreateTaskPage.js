import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskService } from '../../dashboard/services/taskService';
import './CreateTaskPage.css';

const CreateTaskPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await taskService.createTask(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-page">
      <div className="page-header">
        <h1>Create New Task</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <TaskForm onSubmit={handleSubmit} loading={loading} />

      <button
        onClick={() => navigate('/tasks')}
        className="back-link"
      >
        ← Back to Tasks
      </button>
    </div>
  );
};

export default CreateTaskPage;

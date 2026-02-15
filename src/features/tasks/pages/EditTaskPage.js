import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskService } from '../../dashboard/services/taskService';
import './EditTaskPage.css';

const EditTaskPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch (err) {
      setError('Failed to load task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await taskService.editTask(id, formData);
      navigate('/tasks');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-task-page">
      <div className="page-header">
        <h1>Edit Task</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading && !task ? (
        <div className="loading">Loading task...</div>
      ) : task ? (
        <TaskForm initialData={task} onSubmit={handleSubmit} loading={loading} />
      ) : null}

      <button
        onClick={() => navigate('/tasks')}
        className="back-link"
      >
        ← Back to Tasks
      </button>
    </div>
  );
};

export default EditTaskPage;

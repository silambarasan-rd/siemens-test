import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { taskService } from '../services/taskService';
import './DashboardPage.css';

const TASKS_PER_PAGE = 9;

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await taskService.getDashboardTasks(1, TASKS_PER_PAGE);
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    navigate('/tasks/create');
  };

  const handleListTasks = () => {
    navigate('/tasks');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <h6>Overview of the upcoming tasks</h6>
        </div>
        <button onClick={handleListTasks} className="add-task-btn">
          View all
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create one to get started!</p>
          <button onClick={handleAddTask} className="create-btn">
            Create Your First Task
          </button>
        </div>
      ) : (
        <>
          <div className="tasks-container">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                enableEditButton={false}
                enableDeleteButton={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

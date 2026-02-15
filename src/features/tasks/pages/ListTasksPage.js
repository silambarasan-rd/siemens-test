import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../../dashboard/services/taskService';
import './ListTasksPage.css';
import TaskCard from '../../dashboard/components/TaskCard';
import Pagination from '../../dashboard/components/Pagination';

const TASKS_PER_PAGE = 10;

const ListTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getAllTasks(currentPage, TASKS_PER_PAGE);
      setTasks(Array.isArray(data) ? data : []);
      // Calculate total pages (assume 15 tasks total from mock data)
      setTotalPages(Math.ceil(15 / TASKS_PER_PAGE));
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    navigate('/tasks/create');
  };

  const handleEditTask = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        await fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateTask(id, { status });
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  return (
    <div className="list-task-page">
      <div className="list-task-header">
        <div>
          <h1>Tasks Management</h1>
          <h6>Manage all the tasks, add or edit tasks</h6>
        </div>
        <button onClick={handleAddTask} className="add-task-btn">
          + Add New Task
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
          <div className="tasks-list-container">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                enableEditButton={true}
                enableDeleteButton={true}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ListTasksPage;

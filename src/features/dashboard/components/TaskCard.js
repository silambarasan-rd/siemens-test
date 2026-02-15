import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, enableEditButton, enableDeleteButton, onEdit, onDelete, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(task.status);

  const handleStatusSubmit = async () => {
    await onStatusChange(task.id, status);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
          {status}
        </span>
      </div>
      <span className="due-date">
        📅 {new Date(task.dueDate).toLocaleDateString()}
      </span>
      <p className="task-description" title={task.description}>
        {task.description}
      </p>

      {isEditing ? (
        <div className="status-edit">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleStatusSubmit} className="save-btn">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      ) : (
        <div className="task-actions">
          {
            enableEditButton && (
              <>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Change Status
                </button>
                <button onClick={() => onEdit(task.id)} className="edit-btn">
                  Edit
                </button>
              </>
            )
          }
          {
            enableDeleteButton && (
              <button onClick={() => onDelete(task.id)} className="delete-btn">
                Delete
              </button>
            )
          }
        </div>
      )}
    </div>
  );
};

export default TaskCard;

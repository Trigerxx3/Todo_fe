
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleTaskCompletion, removeTask, startEditing }) {
  // Helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="task-list-container">
      <h2>Tasks ({tasks.length})</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task._id)}
                />
                <div className="task-details">
                  <span className="task-text">{task.data}</span>
                  <span className="task-date">
                    📅 Due: {formatDate(task.dueDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => startEditing(task)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={() => removeTask(task._id)}>
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

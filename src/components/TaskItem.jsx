import React, { useState } from 'react';
import './TaskItem.css'; // Importing the CSS for TaskItem

const TaskItem = ({ task, toggleTaskCompletion, removeTask, startEditing }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(removeTask, 300); // Delay removal to allow slide-out animation
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${!isVisible ? 'slide-out' : ''}`}>
      <span onClick={toggleTaskCompletion}>{task.text}</span>
      <div>
        <button onClick={() => startEditing(task)}>Edit</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
};

export default TaskItem;

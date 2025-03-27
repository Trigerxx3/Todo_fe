import React, { useState } from 'react';
import './TaskEdit.css'; // Importing the CSS for TaskEdit

const TaskEdit = ({ task, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    onSave(editedText);
  };

  return (
    <div className="task-edit">
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TaskEdit;

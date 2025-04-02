import React, { useState } from 'react';
import './TaskEdit.css'; // Importing the CSS for TaskEdit

const TaskEdit = ({ task, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(task.data);
  const [editedDate, setEditedDate] = useState(task.dueDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      text: editedText,
      dueDate: editedDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-edit">
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        required
      />
      <input
        type="date"
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default TaskEdit;

import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleTaskCompletion, removeTask, startEditing }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem 
          key={index} 
          task={task} 
          toggleTaskCompletion={() => toggleTaskCompletion(index)} 
          removeTask={() => removeTask(index)} 
          startEditing={() => startEditing(task)} // Pass startEditing function
        />
      ))}
    </ul>
  );
};

export default TaskList;

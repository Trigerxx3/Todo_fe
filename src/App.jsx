import { useState } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskEdit from './components/TaskEdit';
import Navbar from './components/Navbar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = (taskText) => {
    setTasks([...tasks, { text: taskText, completed: false, fadeIn: true }]);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (task) => {
    const index = tasks.indexOf(task);
    setEditingTaskIndex(index);
  };

  const saveEditedTask = (editedText) => {
    const newTasks = [...tasks];
    newTasks[editingTaskIndex].text = editedText;
    setTasks(newTasks);
    setEditingTaskIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // 'all'
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <h1>Advanced To-Do List</h1>
      <div className="todo-container">
        <TaskInput addTask={addTask} />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList 
          tasks={filteredTasks} 
          toggleTaskCompletion={toggleTaskCompletion} 
          removeTask={removeTask} 
          startEditing={startEditing} 
        />
        {editingTaskIndex !== null && (
          <TaskEdit 
            task={tasks[editingTaskIndex]} 
            onSave={saveEditedTask} 
            onCancel={() => setEditingTaskIndex(null)} 
          />
        )}
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import Navbar from "./components/Navbar";

const API_URL = "http://localhost:3000/api/items"; // Ensure correct API URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [showTasks, setShowTasks] = useState(false); // New state to control task visibility
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    console.log("🟡 Fetching tasks from backend...");
    try {
      const response = await axios.get(API_URL);
      console.log("✅ Tasks fetched:", response.data); // Debugging log
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    
    fetchTasks();
  }, []);

  // Updated addTask function to include date
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, {
        data: taskData.text,
        dueDate: taskData.dueDate // Add due date to the request
      });
      console.log("✅ Task added:", response.data);
      fetchTasks(); // Refresh tasks after adding
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };

  // Remove a task
  const removeTask = async (id) => {
    console.log(`🟡 Attempting to delete task with ID: ${id}`);
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log("✅ Task deleted successfully");
      setTasks(tasks.filter((task) => task._id !== id)); // Ensure correct state update
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    const index = tasks.findIndex((t) => t._id === task._id);
    setEditingTaskIndex(index);
  };

  // Updated saveEditedTask function to handle date
  const saveEditedTask = async (editedData) => {
    const taskToUpdate = tasks[editingTaskIndex];

    try {
      const response = await axios.put(`${API_URL}/edit/${taskToUpdate._id}`, {
        data: editedData.text,
        dueDate: editedData.dueDate
      });
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = response.data;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } catch (error) {
      console.error("❌ Error editing task:", error);
    }
  };

  // Sort tasks by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <h1>Advanced To-Do List</h1>
      <button onClick={() => { fetchTasks(); setShowTasks(true); }}>🔄 List All Tasks</button>
      <div className="todo-container">
        <TaskInput addTask={addTask} />
        {showTasks && (
          <TaskList 
            tasks={sortedTasks} 
            toggleTaskCompletion={toggleTaskCompletion} 
            removeTask={removeTask} 
            startEditing={startEditing}
          />
        )}
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

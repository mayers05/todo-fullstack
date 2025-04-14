// TodoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // Add a new task (POST request)
  const addTask = async (task) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/", task);
      fetchTasks(); // Refresh task list after adding
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // Toggle task completion (PUT request)
  const toggleTodo = async (id) => {
    try {
      const taskToToggle = todos.find((todo) => todo.id === id);
      if (taskToToggle) {
        await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
          ...taskToToggle,
          completed: !taskToToggle.completed,
        });
        fetchTasks(); // Refresh task list after update
      }
    } catch (error) {
      console.error("Error toggling task", error);
    }
  };

  // Delete a task (DELETE request)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  return (
    <div>
      <TodoForm addTask={addTask} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

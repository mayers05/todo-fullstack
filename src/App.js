import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: Date.now(), title: todo.title, completed: todo.completed },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredTodos = todos.filter((todo) => {
    if (isDarkMode) return todo.completed;
    return !todo.completed;
  });

  return (
    <div style={{ background: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;

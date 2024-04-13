import React, { useState } from "react";
import './App.css';

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEidtId] = useState(0);
  
  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updatedTodo = todos.map((item) => item.id === editTodo.id ? (item = {id: item.id, todo: todo}) : {id: item.id, todo: item.todo});
      setTodos(updatedTodo);
      setEidtId(0);
      setTodo("");
      return;
    }
    if (todo.trim() !== "") {
      setTodos([{id: `${todo}-${Date.now()}`, todo: todo}, ...todos]);
      setTodo("");
    }
  }
  
  function handleDelete(id) {
    setTodos(todos.filter((item) => item.id !== id));
  }
  
  function handleEdit(id) {
    const updateTodo = todos.find((item) => item.id === id);
    setTodo(updateTodo.todo);
    setEidtId(id);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" onChange={e => setTodo(e.target.value)} value={todo} />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((item) => (
      <li className="singleTodo" key={item.id}>
        <span className="todoText">
          {item.todo}
        </span>
        <button onClick={() => handleEdit(item.id)}>Edit</button>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
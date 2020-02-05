import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const nameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAdd(e) {
    const name = nameRef.current.value;
    if (name === "") return;
    setTodos(prevTodos => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false }
    ]);
    nameRef.current.value = null;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <form action="" method="get">
        <input ref={nameRef} type="text"></input>
        <button onClick={handleAdd}>Add Todo</button>
        <button>Clear Todo</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </form>
    </>
  );
}

export default App;
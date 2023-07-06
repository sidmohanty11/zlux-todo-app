import React, { useEffect } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const App = ({
    resources
}) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = React.useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTodoClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo.trim() !== "") {
      const newTodo = {
        id: Math.random().toString(36).substring(2, 9),
        text: todo,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Todo App</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Enter a todo"
      />
      <button
        onClick={() => {
          const newTodo = {
            id: Math.random().toString(36).substring(2, 9),
            text: todo,
            completed: false,
          };
          setTodos([...todos, newTodo]);
          setTodo("");
        }}
        style={{
          marginTop: "16px",
        }}
      >
        Add Todo
      </button>
      <ul style={{ marginTop: "16px", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              listStyle: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleTodoClick(todo.id)}
          >
            {todo.completed ? (
              <span style={{ marginRight: "8px" }}>✓</span>
            ) : (
              <span style={{ marginRight: "8px" }}>⬜</span>
            )}
            {todo.text}
            <button
              onClick={() => handleTodoDelete(todo.id)}
              style={{
                marginLeft: "8px",
                border: "none",
                background: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

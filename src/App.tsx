import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import API_URL from "./api";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  uid: string;
  createdAt?: any;
};

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const provider = new GoogleAuthProvider();

  // Auth + Load Todos from EC2
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserId(null);
        setTodos([]);
        return;
      }

      setUserId(user.uid);

      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();

      setTodos(data);
    });

    return () => unsubscribeAuth();
  }, []);

  // Auth actions
  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.trim(),
        completed: false,
      }),
    });

    setText("");

    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    setTodos(data);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    setTodos(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">🔥 Todo</h1>

          {!userId ? (
            <button
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Input */}
        {userId && (
          <div className="flex gap-2 mb-5">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={addTodo}
              className="bg-green-600 hover:bg-green-700 px-4 rounded-lg transition"
            >
              Add
            </button>
          </div>
        )}

        {/* Empty state */}
        {userId && todos.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-4">
            No tasks yet. Add one 🚀
          </p>
        )}

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-750 transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                className="accent-green-500 w-4 h-4 cursor-pointer"
              />

              <span
                className={`flex-1 text-sm ${
                  todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-400 text-sm transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        {!userId && (
          <p className="text-gray-400 text-sm text-center mt-6">
            Login to start managing your tasks
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

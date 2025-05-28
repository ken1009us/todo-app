import { useEffect, useState, useRef } from 'react';

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: string;
  dueDate?: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const dueDateRef = useRef<HTMLInputElement>(null);

  const addTodo = async () => {
    if (!title.trim()) {
      alert('⚠️ Please enter a task name');
      return;
    }

    if (dueDateRef.current && !dueDateRef.current.checkValidity()) {
      alert('⚠️ Date format is incorrect');
      return;
    }

    const dueDate = dueDateRef.current?.value;

    if (dueDate) {
      const now = new Date();
      const maxDate = new Date('2100-12-31');
      const [yyyy, mm, dd] = dueDate.split('-').map(Number);
      const parsed = new Date(dueDate);

      if (
        isNaN(parsed.getTime()) ||
        parsed.getFullYear() !== yyyy ||
        parsed.getMonth() + 1 !== mm ||
        parsed.getDate() !== dd
      ) {
        alert('⚠️ Date is invalid');
        return;
      }

      if (parsed < new Date(now.toDateString())) {
        alert('⚠️ Cannot select past dates');
        return;
      }

      if (parsed > maxDate) {
        alert('⚠️ Date cannot be later than 2100');
        return;
      }
    }

    const res = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, dueDate: dueDateRef.current?.value }),
    });

    const newTodo = await res.json();

    setTitle('');
    setTodos((prev) => [newTodo, ...prev]);

    if (dueDateRef.current) {
      dueDateRef.current.value = '';
    }
  };

  const toggleDone = async (id: string, isDone: boolean) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: !isDone }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-green-300">[ TODO TERMINAL ]</h1>

      <div className="flex gap-2 w-full max-w-xl mb-4">
        <input
          className="flex-1 px-4 py-2 bg-black text-green-300 border border-green-700 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="> add task..."
        />
        <input
          ref={dueDateRef}
          type="date"
          className="bg-black text-green-300 border border-green-700 rounded px-2"
          min={new Date().toISOString().split('T')[0]}
          max="2100-12-31"
        />
        <button
          className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded"
          onClick={addTodo}
        >
          ADD
        </button>
      </div>
      <ul className="w-full max-w-xl space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-black border border-green-700 rounded px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDone(todo.id, todo.isDone)}
                className="accent-green-500"
              />
              <div className={todo.isDone ? 'line-through text-green-700' : ''}>
                <span className="font-semibold">{todo.title}</span>
                <div className="text-xs text-green-600 mt-1">
                  {new Date(todo.createdAt).toLocaleString()}
                </div>
                {todo.dueDate && (
                  <div className="text-xs text-yellow-400">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={() => deleteTodo(todo.id)}
            >
              DEL
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

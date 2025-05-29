const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchTodos() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/api/todos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return await res.json();
}

export async function addTodo(title: string, dueDate?: string) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, dueDate }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to add todo');
  }

  return await res.json();
}

const API_URL = import.meta.env.VITE_API_URL || '';

export async function fetchTodos() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/todos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!res.ok) throw new Error('Failed to fetch todos');

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

  if (!res.ok) throw new Error('Failed to add todo');

  return await res.json();
}

export async function updateTodo(id: string, isDone: boolean) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ isDone }),
  });

  if (!res.ok) throw new Error('Failed to update todo');
}

export async function deleteTodo(id: string) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete todo');
}

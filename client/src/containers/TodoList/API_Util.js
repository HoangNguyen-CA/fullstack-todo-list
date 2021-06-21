export const getTodos = async () => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

export const addTodo = async (todo) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  if (data == null) throw new Error('Failed to add todo.');

  return data;
};

export const editTodo = async (id, todo) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  if (data == null) throw new Error('Failed to edit todo.');
  return data;
};

export const deleteTodo = async (id) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  if (data == null) throw new Error('Failed to delete todo.');
};

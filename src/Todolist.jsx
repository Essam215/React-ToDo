
const initialTodos = [
  {id: 1, text: "walk the dog", completed: false},
  {id: 3, text: "walk the cat", completed: false},
  {id: 6, text: "walk the human", completed: true},
  {id: 5, text: "walk the fish", completed: false},
];

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Todolist() {
  const [todos, setTodos] = React.useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (id) => () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ textAlign: 'center' }}>To-Do List</h2>
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 600 }}>
          Add
        </button>
      </form>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {todos.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', padding: 16 }}>No tasks yet!</div>
        )}
        {todos.map((todo) => {
          const labelId = `checkbox-list-label-${todo.id}`;
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(todo.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={<span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#888' : undefined }}>{todo.text}</span>}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <span>{todos.filter(t => !t.completed).length} left</span>
        <button onClick={handleClearCompleted} style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

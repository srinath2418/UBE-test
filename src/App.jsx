import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>My Todo List</h1>
        <p>Keep track of your daily tasks and stay organized. Add new tasks below and mark them as complete when done.</p>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Enter a new task..."
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
          <button onClick={addTodo} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Add Task
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <p><strong>Total Tasks:</strong> {todos.length} | <strong>Completed:</strong> {todos.filter(t => t.done).length}</p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ padding: '15px', marginBottom: '10px', background: '#f5f5f5', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#888' : '#000' }}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} style={{ padding: '5px 15px', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '3px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No tasks yet. Add your first task above!</p>
        )}

        {todos.length > 0 && (
          <button onClick={() => setTodos([])} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#666', color: 'white', border: 'none', borderRadius: '3px' }}>
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

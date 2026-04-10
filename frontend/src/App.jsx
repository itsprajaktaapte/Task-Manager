import { useState } from 'react';
import useTasks from './hooks/useTasks';
import TaskList from './components/TaskList';

const App = () => {
  const [input, setInput] = useState('');
  const { tasks, addTask, deleteTask, loading, error } = useTasks();

  const handleAdd = () => {
    addTask(input);
    setInput('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Management App</h1>
      <p>React Front-end Calling Node Back-end</p>
     

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          data-testid="task-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
          style={{ marginRight: '8px', padding: '6px 10px' }}
        />
        <button data-testid="add-btn" onClick={handleAdd}>
          Add Task
        </button>
      </div>

      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} onDelete={deleteTask} />}
    </div>
  );
};

export default App;

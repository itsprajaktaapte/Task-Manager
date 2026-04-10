const TaskList = ({ tasks, onDelete }) => (
  <ul data-testid="task-list">
    {tasks.map(task => (
      <li key={task.id} style={{ marginBottom: '8px' }}>
        <span>{task.title}</span>
        <button
          onClick={() => onDelete(task.id)}
          style={{ marginLeft: '12px' }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default TaskList;

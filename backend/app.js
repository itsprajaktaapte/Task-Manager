const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const task = { 
    id: tasks.length + 1, // Uses current list size to pick the next number
    title,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(200).json({ message: 'Deleted' });
});

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy' }));

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Backend running on port 3000'));
}

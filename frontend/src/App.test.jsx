import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const mockTasks = [
  { id: '1', title: 'Setup AWS pipeline', done: false },
  { id: '2', title: 'Write unit tests', done: false },
];

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!options || options.method === 'GET' || !options.method) {
      return Promise.resolve({
        json: () => Promise.resolve(mockTasks),
      });
    }
    if (options.method === 'POST') {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        json: () => Promise.resolve({ id: '99', title: body.title, done: false }),
      });
    }
    if (options.method === 'DELETE') {
      return Promise.resolve({ ok: true });
    }
  });
});

afterEach(() => jest.resetAllMocks());

describe('Task Manager UI', () => {

  test('renders app heading', async () => {
    render(<App />);
    expect(screen.getByText(/Task Management App/i)).toBeInTheDocument();
  });

  test('shows tasks loaded from backend', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Setup AWS pipeline/i)).toBeInTheDocument();
    });
  });

  test('adds a new task when Add is clicked', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('task-input'));
    fireEvent.change(screen.getByTestId('task-input'), {
      target: { value: 'My new task' }
    });
    fireEvent.click(screen.getByTestId('add-btn'));
    await waitFor(() => {
      expect(screen.getByText(/My new task/i)).toBeInTheDocument();
    });
  });

  test('does not add empty task', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('task-list'));
    const before = screen.getByTestId('task-list').children.length;
    fireEvent.click(screen.getByTestId('add-btn'));
    expect(screen.getByTestId('task-list').children.length).toBe(before);
  });

  test('deletes a task when Delete is clicked', async () => {
    render(<App />);
    await waitFor(() => screen.getByText(/Setup AWS pipeline/i));
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.queryByText(/Setup AWS pipeline/i)).not.toBeInTheDocument();
    });
  });

});

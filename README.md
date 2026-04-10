# DCE03 Task Manager — Full Stack App

## Project Structure
```
dce03-codepipeline-demo/
├── backend/          # Node.js + Express API
│   ├── app.js
│   ├── app.test.js   # Jest + Supertest
│   └── package.json
├── frontend/         # React app
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.test.jsx       # Jest + React Testing Library
│       ├── hooks/useTasks.js
│       └── components/TaskList.jsx
└── buildspec.yml     # AWS CodeBuild instructions
```

---

## Quick Setup Commands

### 1. Clone your repo and enter it
```bash
git clone https://github.com/YOUR_USERNAME/dce03-codepipeline-demo.git
cd dce03-codepipeline-demo
```

### 2. Install and test backend
```bash
cd backend
npm install
npm test
cd ..
```

### 3. Install and test frontend
```bash
cd frontend
npm install
npm test
cd ..
```

---

## Run the apps locally

### Backend (port 3000)
```bash
cd backend
npm start
# Visit: http://localhost:3000/tasks
```

### Frontend (port 3001 or 3000)
```bash
cd frontend
npm start
# Visit: http://localhost:3000
```

---

## Trigger pipeline fail (Screenshot 1)
In `backend/app.test.js` change:
```js
expect(res.statusCode).toBe(200);
// to:
expect(res.statusCode).toBe(999);
```
Commit and push → CodePipeline fails → take screenshot.

## Fix and succeed (Screenshot 2)
Revert back:
```js
expect(res.statusCode).toBe(200);
```
Commit and push → CodePipeline succeeds → take screenshot.

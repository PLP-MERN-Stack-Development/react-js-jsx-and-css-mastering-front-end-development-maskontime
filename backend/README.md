# Backend (Express + MongoDB)

This folder contains a simple Express backend using Mongoose for MongoDB.

Environment
- Create a `.env` file in `backend/` with at least the following:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/dbname
PORT=5000
```

Install & run
```powershell
cd backend
npm install
# in dev, you can use nodemon (dev script)
npm run dev
# or start
npm start
```

API endpoints
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

Notes
- This server expects a running MongoDB instance. If you don't want to use MongoDB, we can switch the controllers to use `data/tasks.json` file persistence instead.

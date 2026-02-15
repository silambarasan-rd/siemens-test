🚀 Problem Statement: Task Manager UI

🎯 Objective

Design and implement a simple yet scalable UI for managing tasks, integrating with a predefined JSON API. Your goal is to demonstrate not only functional correctness but also maintainability, responsiveness, and user experience.

🔗 Backend API (Predefined - No Backend Work Needed)

Use a mock server (e.g., json-server) or any public API matching this format:

Endpoints

POST /login → Simulate user login (return a fake token).
GET /tasks → Fetch all tasks.
POST /tasks → Add a new task.
PUT /tasks/:id → Update task status.
DELETE /tasks/:id → Delete a task.
Sample Task JSON:

 

JSON

JSON

{[{"id": 1,"title": "Complete UI Design","description": "Create a task manager UI","status": "In Progress","dueDate": "2025-03-30"} ] }

 

✅ Functional Requirements

1. Login Screen

Form with Username and Password.
On successful login, store a fake token and navigate to the dashboard.
2. Task Dashboard

List tasks using cards or a table.
Each task must show: Title, Description, Status, and Due Date.
3. Task Management (CRUD)

Add Task: A form to input task details.
Edit Task: Allow changing task status (To-Do, In Progress, Completed).
Delete Task: With a confirmation prompt.
4. API Integration

Use fetch or axios with async/await.
Gracefully handle loading, success, and error states.
5. Basic UI Styling

Clean, minimalistic layout using TailwindCSS or Bootstrap.
Responsive design (mobile-friendly).
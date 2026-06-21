# React Dashboard Project

## Live Demo

[View Project Live](https://dazzling-manatee-872d47.netlify.app/)

A practical React dashboard project built with React and Vite.
The project contains a public website and an admin dashboard with authentication, protected routes, role-based access control, CRUD operations, API integration, and server state management using TanStack Query.

## Features

* Public website pages
* Admin dashboard layout
* Nested routes with React Router
* Protected routes
* Role-based access control
* Authentication using Context API
* Posts CRUD operations
* Users listing and user details page
* Search and filtering
* Data tables
* Loading, error, and empty states
* Toast notifications
* API integration with MockAPI
* Server state management with TanStack Query
* React Query Devtools
* Dynamic About page content managed from the admin dashboard

## Tech Stack

* React
* Vite
* React Router DOM
* Context API
* TanStack Query
* React Toastify
* React Data Table Component
* MockAPI

## Demo Accounts

Use these accounts to test the dashboard.

### Admin

```txt
Email: admin@example.com
Password: 123456
Role: admin
```

### Editor

```txt
Email: editor@example.com
Password: 123456
Role: editor
```

## Permissions

| Role   | Access                                     |
| ------ | ------------------------------------------ |
| Admin  | Dashboard, Posts, Users, Settings, Profile |
| Editor | Posts, Profile                             |

## Main Routes

### Public Routes

```txt
/
 /blog
 /blog/:id
 /login
```

### Admin Routes

```txt
/admin
/admin/posts
/admin/posts/create
/admin/posts/:id
/admin/posts/:id/edit
/admin/users
/admin/users/:id
/admin/profile
/admin/settings
```

## API

The project uses MockAPI as a backend service.

Main resources:

```txt
/posts
/users
```

The API base URL is stored in:

```txt
src/config/apiConfig.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```txt
src
├── api
│   ├── postsService.js
│   ├── usersService.js
│   └── queryKeys.js
├── components
├── config
│   └── apiConfig.js
├── context
│   └── AuthContext.jsx
├── layouts
├── pages
├── routes
├── styles
└── App.jsx
```

## What I Learned

Through this project, I practiced:

* Building reusable React components
* Managing routes and nested layouts
* Protecting routes based on authentication
* Handling user roles and permissions
* Connecting React with external APIs
* Managing server state with TanStack Query
* Handling loading, error, and empty states
* Building real CRUD functionality
* Improving user experience in dashboard pages

## Status

The project is functional and ready for portfolio presentation.

Future improvements may include:

* Advanced form validation
* Pagination
* Deployment
* Unit testing
* Better UI polish
* Custom hooks based on TanStack Query

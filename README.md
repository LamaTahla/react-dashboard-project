# React Dashboard Project

## Live Demo

[View Project Live](https://dazzling-manatee-872d47.netlify.app/)

## Overview

React Dashboard Project is a practical React application built with React and Vite.

The project combines a public website with an admin dashboard. It includes authentication, protected routes, role-based access control, CRUD operations, dynamic website pages, API integration, and server state management using TanStack Query.

The public website and dashboard both support dark and light themes, and the selected theme is saved in `localStorage`.

## Features

* Public website with Home, Blog, Blog Details, About, and Contact pages
* Admin dashboard with protected routes
* Nested routes using React Router DOM
* Authentication using Context API
* Role-based access control for admin and editor users
* Posts CRUD operations
* Users listing and user details page
* Dynamic About page managed from the admin dashboard
* Dynamic Contact page managed from the admin dashboard
* Dashboard statistics based on API data
* Latest posts section in dashboard home
* Quick actions for common dashboard tasks
* Improved sidebar navigation with grouped menu sections
* React Icons integration across sidebar, dashboard cards, and actions
* Enhanced topbar with user avatar
* Dark and light mode with saved user preference
* Demo login buttons for admin and editor accounts
* Show / hide password in login page
* Custom 404 Not Found page
* Search, sorting, filtering, and pagination
* Data tables using React Data Table Component
* Loading, error, and empty states
* Toast notifications for success and error messages
* API integration with MockAPI
* Server state management with TanStack Query
* React Query Devtools
* Responsive design for website and dashboard
* Deployment-ready Vite React app on Netlify

## Tech Stack

* React
* Vite
* React Router DOM
* Context API
* TanStack Query
* React Query Devtools
* React Toastify
* React Data Table Component
* React Icons
* MockAPI
* Netlify

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

The login page includes demo account buttons to quickly fill the credentials.

## Permissions

| Role   | Access                                                                       |
| ------ | ---------------------------------------------------------------------------- |
| Admin  | Dashboard, Posts, Users, About Settings, Contact Settings, Settings, Profile |
| Editor | Posts, Contact Settings, Profile                                             |

## Main Routes

### Public Routes

```txt
/
 /blog
 /blog/:id
 /about
 /contact
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
/admin/about-settings
/admin/contact-settings
/admin/profile
/admin/settings
```

## Dynamic Website Pages

Because the free MockAPI plan may limit the number of resources, the project stores website pages inside the `posts` resource.

Website pages are separated from normal blog posts using:

```js
type: "page"
slug: "about"
```

or:

```js
type: "page"
slug: "contact"
```

Normal blog posts are filtered so dynamic pages do not appear in the public Blog page or in Admin Posts.

## Theme Support

The project supports both dark and light modes.

The selected theme is saved in `localStorage`, so the user preference remains after refreshing the page.

Theme implementation includes:

* `ThemeContext`
* `ThemeProvider`
* `ThemeToggle` component
* CSS variables
* Dark and light colors for website and dashboard layouts

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

Important API services:

```txt
src/api/postsService.js
src/api/usersService.js
src/api/queryKeys.js
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

## Deployment

The project is deployed on Netlify.

To support React Router refresh on nested routes, Netlify redirects should be configured using either `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

or a `_redirects` file:

```txt
/* /index.html 200
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
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── layouts
├── pages
│   ├── dashboard
│   └── website
├── routes
├── styles
│   ├── dashboard.css
│   ├── theme.css
│   └── website.css
└── App.jsx
```

## Screenshots

Add project screenshots here:

```md
![Home Page](./screenshots/home.png)
![Blog Page](./screenshots/blog.png)
![About Page](./screenshots/about.png)
![Contact Page](./screenshots/contact.png)
![Login Page](./screenshots/login.png)
![Dashboard](./screenshots/dashboard.png)
![About Settings](./screenshots/about-settings.png)
![Contact Settings](./screenshots/contact-settings.png)
![Dark Mode](./screenshots/dark-mode.png)
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
* Creating dynamic website pages from dashboard data
* Building a theme system using Context API and CSS variables
* Improving dashboard UI with icons, grouped navigation, and quick actions
* Enhancing user experience with demo login buttons and custom 404 page
* Preparing a React project for deployment and portfolio presentation

## Status

The project is functional and ready for portfolio presentation.

## Future Improvements

Possible future improvements:

* Advanced form validation using React Hook Form and Zod
* Unit testing with Vitest and React Testing Library
* More dashboard charts using Recharts
* Better mobile sidebar experience
* More custom hooks based on TanStack Query
* Image upload support
* Improved user management actions
* More advanced CMS-like page management

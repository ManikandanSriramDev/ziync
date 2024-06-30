```
# Ziync

Ziync is a comprehensive web application tailored for firms, NGOs, and individuals to streamline management and communication. It integrates a variety of modules and functionalities, including a vision board, chat system, employee/members maintenance, and more, aimed at enhancing organizational efficiency.

## Overview

Ziync is built as a traditional web application following a monolithic architecture for simplicity and rapid development. The backend leverages Node.js and Express for server operations and API endpoints, with MongoDB as the database for storing various data types. The frontend utilizes Bootstrap for responsive design, and the application adheres to the MVC design pattern to separate concerns, improve manageability, and ensure scalability. Security is a priority, with hashed passwords, JWT for session management, and role-based access control to protect sensitive information and ensure data isolation.

## Features

Ziync offers a wide range of features designed to facilitate efficient management and communication within organizations:

- **Vision Board**: Exclusive to admins to create and manage organizational goals.
- **Employee/Members Maintenance**: A tab for managing members or employees and their reports.
- **Chat System**: Includes group chat and in-person chat functionalities.
- **Team Addition**: Admins can add team members via email invitations.
- **Super User**: A single super user role to define the organization type.
- **Subscription/Payment Module**: For managing subscription plans and payments.
- **Token System**: For transactions and activities within the app.
- **Grievance and Ideas**: Allows users to submit feedback.
- **Profile and Logout**: For managing user profiles and logout functionality.
- **Email Login System**: A secure email-based login system with admin confirmation.
- **Data Isolation**: Ensures data separation between different organizations.

## Getting started

### Requirements

To run Ziync, you need the following technologies and setup on your computer:
- Node.js
- MongoDB (local installation or MongoDB Atlas for cloud-based service)
- npm (Node package manager)

### Quickstart

1. Clone the repository to your local machine.
2. Install MongoDB if you're using a local database or set up an account on MongoDB Atlas.
3. Navigate to the project directory in your terminal.
4. Copy `.env.example` to `.env` and fill in the environment variables including your MongoDB connection string and session secret.
5. Run `npm install` to install the project dependencies.
6. Start the application by running `npm start`. The server should start, and you can access the application at `http://localhost:3000`.

### License

Copyright (c) 2024.

This project is proprietary and not open source.
```
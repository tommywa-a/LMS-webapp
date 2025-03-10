# LMS Web Application


A web-based **Learning Management System (LMS)** that allows educators to create courses, manage student enrollments, and deliver content efficiently.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration for students and instructors.
- **Course Management**: Create, update, and delete courses.
- **Student Enrollment**: Enroll students in courses and manage their progress.
- **Content Delivery**: Upload and manage course materials.
- **Interactive Dashboard**: Track student performance and engagement.

## Technologies Used

- **Frontend**: Next.js (React framework)
- **Backend**: Next.js API Routes (Node.js)
- **Database**: Prisma ORM (PostgreSQL, MySQL, or SQLite)
- **Styling**: Tailwind CSS

## Installation

### Prerequisites

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **Package Manager**: npm, yarn, or pnpm
- **Database**: PostgreSQL, MySQL, or SQLite

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/tommywa-a/LMS-webapp.git
   cd LMS-webapp
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install or pnpm install
   ```
3. Set up the database and environment variables (see below).
4. Run database migrations (if applicable):
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev  # or yarn dev or pnpm dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Sign up** as an instructor or student.
- **Create courses** (Instructor only).
- **Enroll in courses** (Student only).
- **Manage learning materials and track progress.**

## Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

## API Documentation

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/api/courses` | Fetch all courses   |
| POST   | `/api/courses` | Create a new course |
| GET    | `/api/users`   | Fetch user data     |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit changes with clear messages.
4. Submit a pull request.

## License

This project is licensed under the **MIT License**.

## Contact

For any inquiries, reach out via email: **[tomiwa.aderibigbe1@gmail.com](mailto:tomiwa.aderibigbe1@gmail.com)**

---

Happy Coding! 🚀

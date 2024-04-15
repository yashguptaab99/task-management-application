# Task Management Application

This simple Task Management Application is designed to help users efficiently manage their daily tasks. Built with ease of use in mind, it provides a straightforward interface for tracking tasks, and deadlines.

## Features

- **Add Tasks**: Users can add new tasks with a title, description, and due date.
- **View Tasks**: Display all tasks in a list with their status and due dates.
- **Edit Tasks**: Update the details of tasks as required.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Mark Tasks as Complete**: Check off tasks that have been completed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed:
- Git
- Node.js (version 20 or higher)
- PNPM
- MongoDB running locally

### Installing

Follow these steps to get your development environment running:

#### Clone the Repository
Start by cloning the repository to your local machine:
```
git clone https://github.com/yashguptaab99/task-management-application.git
cd task-management-application
```

#### Set Up the Backend
To get the backend running:

1. Navigate to the backend directory:
```
cd backend
```
2. Copy the sample environment file to create a main `.env` file:
```
cp .env.sample .env
```
3. Install the required packages:
```
pnpm install
```
4. Start the backend server in development mode:
```
pnpm run start:dev
```

This command will start the backend server, typically running on `http://localhost:3000` or another specified port.

#### Set Up the Frontend
Setting up the frontend involves similar steps:

1. Navigate to the frontend directory:
```
cd frontend
```
2. Copy the sample environment file to create a main `.env` file:
```
cp .env.sample .env
```
3. Install the required packages:
```
pnpm install
```
4. Start the frontend server in development mode:
```
pnpm run dev
```

This command will launch the frontend, typically accessible at `http://localhost:5173`. Open this URL in your web browser to view the application.

## Usage

Once the application is running, you can start adding tasks using the interface provided. Each task can be edited, deleted, or marked as complete directly from the main interface.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

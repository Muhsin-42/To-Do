# Todo With Redis & Elastic Search

This is a TodoList website built using the MERN stack (MongoDB, Express, React, Node.js), with Redis for caching data and ElasticSearch for searching todos.

## Project Structure

- Client: `http://localhost:5173/`
- Server: `http://localhost:8000/`

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js
- MongoDB
- Redis Server
- ElasticSearch

## Installation and Setup

1. Clone the repository: `git clone https://github.com/Muhsin-42/To-Do.git`
2. Change to the project directory: `cd <project-directory>`

### Server

1. Install server dependencies: `npm install` in the root directory.
2. Create a `.env` file in the root directory and add the following environment variables:
   - `MONGODB_URI`: MongoDB connection URL
   - `PORT`: Port on which the server will run
   - `CLOUD_ID`: ElasticSearch cloud ID
   - `ELASTIC_USERNAME`: ElasticSearch username
   - `ELASTIC_PASSWORD`: ElasticSearch password
3. Start the server: `npm run dev`

### Client

1. Change to the client directory: `cd client`
2. Install client dependencies: `npm install`
3. Create a `.env` file in the client directory and add the following environment variable:
   - `VITE_SERVER_BASE_URL`: Base URL of the server (e.g., `http://localhost:8000`)
4. Start the client: `npm run dev`

### Running the Application

1. Start the Redis server.
2. Run the server as per the instructions above.
3. Run the client as per the instructions above.

## Features

The TodoList website offers the following features:

- Add a todo
- Delete a todo
- Search todos

## APIs

The following APIs are available:

- `POST /`: Add a new todo
- `GET /`: Get all todos
- `DELETE /:id`: Delete a todo by ID
- `GET /search/:query?`: Search todos with an optional query parameter

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.


## Contact

If you have any questions or suggestions, please feel free to reach out to us at [muhsinofficial21@gmail.com](mailto:muhsinofficial21@gmail.com).
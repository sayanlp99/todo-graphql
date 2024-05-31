# Todo App GraphQL API

This project implements a GraphQL API for a Todo application. It allows users to register, login, manage their todos, and perform other CRUD operations.

## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express**: A web application framework for Node.js.
- **Apollo Server Express**: An integration of Apollo Server with Express for serving GraphQL APIs.
- **GraphQL**: A query language for your API, and a runtime for executing those queries.
- **Sequelize**: An ORM for Node.js that supports PostgreSQL among other databases.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Redis**: A source-available, in-memory storage, used as a distributed, in-memory key–value database, cache, with durability.
- **JWT (JSON Web Tokens)**: A standard for securely transmitting information between parties as a JSON object.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- PostgreSQL
- Redis

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sayanlp99/todo-graphql.git
   ```

2. Navigate to the project directory:
   ```bash
   cd todo-graphql
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project with the following environment variables:
   ```plaintext
   DB_HOST=localhost
   DB_DATABASE=tododb
   DB_USERNAME=username
   DB_PASSWORD=password
   DB_PORT=5432
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USER=username
   REDIS_PASSWORD=password
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. The GraphQL API will be available at `http://localhost:3000/graphql`. You can use a tool like [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/) to interact with the API.

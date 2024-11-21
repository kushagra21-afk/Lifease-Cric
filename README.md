Cricket Scoring Application

This project allows you to manage and update cricket scoring data using RESTful APIs. It supports both local execution and containerized deployment via Docker, and includes optional Redis support for queue management.

Run the Project Locally

Build the Project:
npm run build    # Or use npx tsc to compile TypeScript to JavaScript
Start the Application:
npm start        # Or use node dist/app.js
Available Routes

GET /api/scoring/match/:id
Fetch match details for a specific match ID.

POST /api/scoring/delivery
Submit a new delivery update.

Refer to payload.json for dummy data examples for POST requests.
Run the Project with Docker

Build the Docker Image:
docker build -t my-cric-app .
Run the Docker Container:
docker run --name cricket-app -d -p 5000:5000 my-cric-app
Run the Project with Redis

Start a Redis Container:
docker pull redis
docker run --name redis-container -d -p 6379:6379 redis
Start the Application with Redis Support:
npm run start1    # Or use node dist/app1.js
Included Files

Dockerfile: For containerizing the application.
payload.json: Dummy data for testing the API.
Notes
Ensure your .env file is properly configured with the necessary environment variables (e.g., MONGO_URL, REDIS_HOST, etc.).
For Redis integration, make sure your Redis server is running and accessible.

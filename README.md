
# **My Cric App**

My Cric App is a cricket scoring API designed to handle match scoring and delivery operations. It provides RESTful endpoints to retrieve match details and submit delivery data, with optional Redis integration for enhanced performance.

---

## **Table of Contents**

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Run Locally](#run-locally)
  - [Run with Docker](#run-with-docker)
  - [Redis Integration](#redis-integration)
- [Available Routes](#available-routes)
  - [GET /api/scoring/match/:id](#get-apiscoringmatchid)
  - [POST /api/scoring/delivery](#post-apiscoringdelivery)
- [Testing](#testing)
- [Default Ports](#default-ports)


---

## **Features**

- Retrieve match scoring details by match ID.
- Submit delivery data for scoring purposes.
- Flexible setup options: run locally, in Docker, or with Redis integration.
- Modular architecture for easy scalability and future enhancements.

---

## **Prerequisites**

Before you set up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)  
  Used to run the application and install dependencies.
- [npm](https://www.npmjs.com/) (v6 or later)  
  Comes with Node.js for managing packages.
- [Docker](https://www.docker.com/) (if running the application in a container)  
  Optional but recommended for ease of deployment.
- [Redis](https://redis.io/) (optional)  
  For caching and improved performance if enabled.

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/my-cric-app.git
   cd my-cric-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```
   or
   ```bash
   npx tsc
   ```

4. Ensure the build is successful, and the `dist/` directory is generated with compiled files.

---

## **Usage**

### **Run Locally**

1. Start the application:
   ```bash
   npm start
   ```
   or
   ```bash
   node dist/app.js
   ```

2. Access the API at:
   ```
   http://localhost:5000
   ```

---

### **Run with Docker**

1. Build the Docker image:
   ```bash
   docker build -t my-cric-app .
   ```

2. Start the Docker container:
   ```bash
   docker run --name cricket-app -d -p 5000:5000 my-cric-app
   ```

3. Verify the container is running by accessing:
   ```
   http://localhost:5000
   ```

---

### **Redis Integration**

1. Pull the Redis image:
   ```bash
   docker pull redis
   ```

2. Start the Redis container:
   ```bash
   docker run --name redis-container -d -p 6379:6379 redis
   ```

3. Start the application with Redis integration:
   ```bash
   npm run start1
   ```
   or
   ```bash
   node dist/app1.js
   ```

4. Verify both the application and Redis are working:
   ```
   http://localhost:5000
   ```

---

## **Available Routes**

### **GET /api/scoring/match/:id**

- **Description**: Retrieves match scoring details for the given `id`.
- **Request Example**:
  
  ```bash
  curl http://localhost:5000/api/scoring/match/123
  ```
---

### **POST /api/scoring/delivery**

- **Description**: Submits delivery data for scoring purposes.
- **Request Example**:
  ```bash
  curl -X POST http://localhost:5000/api/scoring/delivery \
  -H "Content-Type: application/json" \
  -d @payload.json
  ```
- **Response Example**:
  ```json
  {
    "status": "success",
    "message": "Delivery recorded successfully"
  }
  ```

- **Note**: Refer to `payload.json` for an example of delivery data.

---

## **Testing**

1. Use the provided `payload.json` file to test the `/api/scoring/delivery` endpoint.

2. Example `payload.json`:
   ```json
   {
     "matchId": 123,
     "delivery": {
       "batsman": "Player A",
       "bowler": "Player B",
       "runs": 4,
       "extras": 0,
       "wicket": false
     }
   }
   ```

3. Send a POST request to the application:
   ```bash
   curl -X POST http://localhost:5000/api/scoring/delivery \
   -H "Content-Type: application/json" \
   -d @payload.json
   ```

---

## **Default Ports**

- **Application**: `5000`
- **Redis**: `6379`

---

For any queries or issues, please contact the project maintainer.

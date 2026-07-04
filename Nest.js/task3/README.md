# Task3 - ITi NestJS Lab 3

This project implements the database schema, migrations, relations, and JWT Passport Authentication for **Lab 3**.

## Technology Stack & Libraries Used
- **Framework:** NestJS
- **ORM:** TypeORM
- **Database:** PostgreSQL (`pg`)
- **Authentication:** Passport.js (`@nestjs/passport`, `passport-jwt`)
- **Validation:** `class-validator`, `class-transformer`
- **Documentation:** Swagger (OpenAPI)

---

## 1. Prerequisites & Database Setup
1. Make sure you have **PostgreSQL** running on your local machine.
2. The database configurations in `.env` default to:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **User:** `postgres`
   - **Password:** `1111`
   - **Database Name:** `tasks-management`
3. Create the database `tasks-management` in your PostgreSQL server (e.g., using pgAdmin or psql shell):
   ```sql
   CREATE DATABASE "tasks-management";
   ```

---

## 2. Running the Application

### Step 1: Install Dependencies
Open a terminal in the `task3` directory and run:
```bash
npm install
```

### Step 2: Run Database Migrations
To apply the database schema (tables, keys, and many-to-many relationship) to your database, execute:
```bash
# Compile project first so ts-node / dist can read configurations
npm run build

# Run the migrations
npm run migration:run
```

### Step 3: Start the Server
Start the application in development watch mode:
```bash
npm run start:dev
```
The application will run on **http://localhost:3000**.
The Swagger documentation is available at **http://localhost:3000/swagger**.

---

## 3. API Endpoints & How to Test

All endpoints except authentication are protected by **Passport JWT**.
You must first **Signup** and **Signin** to obtain a Bearer token, which should be included in the `Authorization` header of subsequent requests:
`Authorization: Bearer <your-access-token>`

### Authentication Endpoints

#### 1. Sign Up (`POST /auth/signup`)
Creates a new User.
- **Request Body:**
  ```json
  {
    "username": "client1",
    "email": "client1@example.com",
    "password": "Password123!"
  }
  ```
- **Example Curl:**
  ```bash
  curl -X POST http://localhost:3000/auth/signup \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"client1\",\"email\":\"client1@example.com\",\"password\":\"Password123!\"}"
  ```
- **Expected Response:** `201 Created`

#### 2. Sign In (`POST /auth/signin`)
Authenticates user and returns a JWT access token.
- **Request Body:**
  ```json
  {
    "username": "client1",
    "password": "Password123!"
  }
  ```
- **Example Curl:**
  ```bash
  curl -X POST http://localhost:3000/auth/signin \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"client1\",\"password\":\"Password123!\"}"
  ```
- **Expected Response:** `200 OK`
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### Products Endpoints (JWT Protected)

#### 3. Create Product (`POST /products`)
Creates a new product.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Smartphone",
    "price": 599.99
  }
  ```
- **Example Curl:**
  ```bash
  curl -X POST http://localhost:3000/products \
    -H "Authorization: Bearer <your-access-token>" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Smartphone\",\"price\":599.99}"
  ```
- **Expected Response:** `201 Created`
  ```json
  {
    "id": "e2c39d8e-1738-4e89-8d76-123456789abc",
    "name": "Smartphone",
    "price": 599.99
  }
  ```

#### 4. Get All Products (`GET /products`)
Retrieves all products in the database.
- **Headers:** `Authorization: Bearer <token>`
- **Example Curl:**
  ```bash
  curl -X GET http://localhost:3000/products \
    -H "Authorization: Bearer <your-access-token>"
  ```
- **Expected Response:** `200 OK`
  ```json
  [
    {
      "id": "e2c39d8e-1738-4e89-8d76-123456789abc",
      "name": "Smartphone",
      "price": 599.99
    }
  ]
  ```

---

### Orders Endpoints (JWT Protected)

#### 5. Create Order (`POST /orders`)
Creates a new order for the logged-in client.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "amount": 599.99,
    "longitude": 31.2357,
    "latitude": 30.0444,
    "paymentMethod": "Visa",
    "productIds": ["e2c39d8e-1738-4e89-8d76-123456789abc"]
  }
  ```
- **Example Curl:**
  ```bash
  curl -X POST http://localhost:3000/orders \
    -H "Authorization: Bearer <your-access-token>" \
    -H "Content-Type: application/json" \
    -d "{\"amount\":599.99,\"longitude\":31.2357,\"latitude\":30.0444,\"paymentMethod\":\"Visa\",\"productIds\":[\"e2c39d8e-1738-4e89-8d76-123456789abc\"]}"
  ```
- **Expected Response:** `201 Created`

#### 6. Get Order Details (`GET /orders/:id`)
Retrieves order info, including details of the Client (User) who made the order and all Products in that order.
- **Headers:** `Authorization: Bearer <token>`
- **Example Curl:**
  ```bash
  curl -X GET http://localhost:3000/orders/a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d \
    -H "Authorization: Bearer <your-access-token>"
  ```
- **Expected Response:** `200 OK`
  ```json
  {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "amount": "599.99",
    "longitude": 31.2357,
    "latitude": 30.0444,
    "paymentMethod": "Visa",
    "client": {
      "id": "77f33d1b-1234-4bc3-9de0-a1b2c3d4e5f6",
      "username": "client1",
      "email": "client1@example.com"
    },
    "products": [
      {
        "id": "e2c39d8e-1738-4e89-8d76-123456789abc",
        "name": "Smartphone",
        "price": "599.99"
      }
    ]
  }
  ```

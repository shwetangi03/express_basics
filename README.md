# Student Management API

A complete CRUD (Create, Read, Update, Delete) API for managing student records with MySQL database integration.

## Features

- ✅ **CREATE**: Add new students to the database
- ✅ **READ**: Retrieve all students or get a specific student by ID
- ✅ **UPDATE**: Modify existing student records
- ✅ **DELETE**: Remove students from the database
- ✅ **Error Handling**: Comprehensive error handling for all operations
- ✅ **Logging**: Console logging for all database operations
- ✅ **Input Validation**: Validation for required fields

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Configuration**
   - Ensure MySQL is running on your system
   - Update database credentials in `utils/db-connection.js` if needed
   - The application will automatically create the `Student` table

3. **Start the Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

   The server will start on `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000/student`

### 1. Create Student (POST)
**Endpoint:** `POST /student`

**Request Body:**
```json
{
  "name": "Virat Kohli",
  "email": "virat.kohli@example.com",
  "password": "cricket123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student added successfully",
  "studentId": 1,
  "data": {
    "name": "Virat Kohli",
    "email": "virat.kohli@example.com"
  }
}
```

### 2. Get All Students (GET)
**Endpoint:** `GET /student`

**Response:**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Virat Kohli",
      "email": "virat.kohli@example.com"
    },
    {
      "id": 2,
      "name": "King Kohli",
      "email": "king.kohli@example.com"
    }
  ]
}
```

### 3. Get Student by ID (GET)
**Endpoint:** `GET /student/:id`

**Response:**
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "name": "Virat Kohli",
    "email": "virat.kohli@example.com"
  }
}
```

### 4. Update Student (PUT)
**Endpoint:** `PUT /student/:id`

**Request Body:**
```json
{
  "name": "King Kohli",
  "email": "king.kohli@example.com",
  "password": "cricket123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "studentId": 1,
  "data": {
    "name": "King Kohli",
    "email": "king.kohli@example.com"
  }
}
```

### 5. Delete Student (DELETE)
**Endpoint:** `DELETE /student/:id`

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "studentId": 1
}
```

## Testing the API

### Using Postman

1. **Create a Student:**
   - Method: `POST`
   - URL: `http://localhost:3000/student`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Virat Kohli",
     "email": "virat.kohli@example.com",
     "password": "cricket123"
   }
   ```

2. **Get All Students:**
   - Method: `GET`
   - URL: `http://localhost:3000/student`

3. **Get Student by ID:**
   - Method: `GET`
   - URL: `http://localhost:3000/student/1`

4. **Update Student:**
   - Method: `PUT`
   - URL: `http://localhost:3000/student/1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "King Kohli",
     "email": "king.kohli@example.com",
     "password": "cricket123"
   }
   ```

5. **Delete Student:**
   - Method: `DELETE`
   - URL: `http://localhost:3000/student/1`

### Using the Test Script

Run the automated test script to verify all CRUD operations:

```bash
node test-crud.js
```

This script will:
1. Create a student with name "Virat Kohli"
2. Retrieve all students
3. Get the specific student by ID
4. Update the student to "King Kohli"
5. Verify the update
6. Delete the student
7. Verify the deletion

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing required fields
- **404 Not Found**: Student not found (for GET, PUT, DELETE operations)
- **500 Internal Server Error**: Database or server errors

All errors return a consistent JSON format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Database Schema

The `Student` table is automatically created with the following structure:

```sql
CREATE TABLE Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

## Console Logging

All database operations are logged to the console for debugging:

- INSERT operations with the new student ID
- SELECT operations with the number of records retrieved
- UPDATE operations with the student ID
- DELETE operations with the student ID
- Error messages for failed operations

## Why You Weren't Getting Responses in Postman

The main issues that were preventing responses in Postman were:

1. **Missing Middleware**: The Express app didn't have `express.json()` and `express.urlencoded()` middleware to parse request bodies
2. **Incomplete Controller**: The controller wasn't actually using the database connection
3. **No Error Handling**: Missing proper error handling and validation
4. **Limited Routes**: Only had a POST route, missing other CRUD operations

These issues have been resolved in the current implementation. 
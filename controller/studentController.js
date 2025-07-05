const { pool } = require("../utils/db-connection");

// 1. INSERT - Create a new student
const addEntries = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        // Insert data into database
        const query = "INSERT INTO Student (name, email, password) VALUES (?, ?, ?)";
        pool.execute(query, [name, email, password], (err, result) => {
            if (err) {
                console.error("INSERT Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error adding student to database",
                    error: err.message
                });
            }
            
            console.log("INSERT Operation: Student added successfully with ID:", result.insertId);
            res.status(201).json({
                success: true,
                message: "Student added successfully",
                studentId: result.insertId,
                data: { name, email }
            });
        });
    } catch (error) {
        console.error("INSERT Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// 2. READ - Get all students
const getAllStudents = async (req, res) => {
    try {
        const query = "SELECT id, name, email FROM Student";
        pool.execute(query, (err, results) => {
            if (err) {
                console.error("SELECT Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error fetching students",
                    error: err.message
                });
            }
            
            console.log("SELECT Operation: Retrieved", results.length, "students");
            res.status(200).json({
                success: true,
                message: "Students retrieved successfully",
                count: results.length,
                data: results
            });
        });
    } catch (error) {
        console.error("SELECT Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// 3. READ - Get student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = "SELECT id, name, email FROM Student WHERE id = ?";
        pool.execute(query, [id], (err, results) => {
            if (err) {
                console.error("SELECT BY ID Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error fetching student",
                    error: err.message
                });
            }
            
            if (results.length === 0) {
                console.log("SELECT BY ID: No student found with ID:", id);
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }
            
            console.log("SELECT BY ID Operation: Retrieved student with ID:", id);
            res.status(200).json({
                success: true,
                message: "Student retrieved successfully",
                data: results[0]
            });
        });
    } catch (error) {
        console.error("SELECT BY ID Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// 4. UPDATE - Update student by ID
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        // First check if student exists
        const checkQuery = "SELECT id FROM Student WHERE id = ?";
        pool.execute(checkQuery, [id], (checkErr, checkResults) => {
            if (checkErr) {
                console.error("UPDATE Check Error:", checkErr);
                return res.status(500).json({
                    success: false,
                    message: "Error checking student existence",
                    error: checkErr.message
                });
            }
            
            if (checkResults.length === 0) {
                console.log("UPDATE: No student found with ID:", id);
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }
            
            // Update the student
            const updateQuery = "UPDATE Student SET name = ?, email = ?, password = ? WHERE id = ?";
            pool.execute(updateQuery, [name, email, password, id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("UPDATE Error:", updateErr);
                    return res.status(500).json({
                        success: false,
                        message: "Error updating student",
                        error: updateErr.message
                    });
                }
                
                console.log("UPDATE Operation: Student with ID", id, "updated successfully");
                res.status(200).json({
                    success: true,
                    message: "Student updated successfully",
                    studentId: id,
                    data: { name, email }
                });
            });
        });
    } catch (error) {
        console.error("UPDATE Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// 5. DELETE - Delete student by ID
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        // First check if student exists
        const checkQuery = "SELECT id FROM Student WHERE id = ?";
        pool.execute(checkQuery, [id], (checkErr, checkResults) => {
            if (checkErr) {
                console.error("DELETE Check Error:", checkErr);
                return res.status(500).json({
                    success: false,
                    message: "Error checking student existence",
                    error: checkErr.message
                });
            }
            
            if (checkResults.length === 0) {
                console.log("DELETE: No student found with ID:", id);
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }
            
            // Delete the student
            const deleteQuery = "DELETE FROM Student WHERE id = ?";
            pool.execute(deleteQuery, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error("DELETE Error:", deleteErr);
                    return res.status(500).json({
                        success: false,
                        message: "Error deleting student",
                        error: deleteErr.message
                    });
                }
                
                console.log("DELETE Operation: Student with ID", id, "deleted successfully");
                res.status(200).json({
                    success: true,
                    message: "Student deleted successfully",
                    studentId: id
                });
            });
        });
    } catch (error) {
        console.error("DELETE Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = {
    addEntries,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}
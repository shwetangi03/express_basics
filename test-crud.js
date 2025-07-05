const axios = require('axios');

const BASE_URL = 'http://localhost:3000/student';

// Test data
const testStudent = {
    name: "Virat Kohli",
    email: "virat.kohli@example.com",
    password: "cricket123"
};

const updatedStudent = {
    name: "King Kohli",
    email: "king.kohli@example.com",
    password: "cricket123"
};

async function testCRUD() {
    try {
        console.log('🚀 Starting CRUD Operations Test...\n');

        // 1. CREATE - Insert new student
        console.log('1️⃣ Creating new student...');
        const createResponse = await axios.post(BASE_URL, testStudent);
        console.log('✅ Student created:', createResponse.data);
        const studentId = createResponse.data.studentId;
        console.log('📝 Student ID:', studentId, '\n');

        // 2. READ - Get all students
        console.log('2️⃣ Reading all students...');
        const getAllResponse = await axios.get(BASE_URL);
        console.log('✅ All students:', getAllResponse.data, '\n');

        // 3. READ - Get student by ID
        console.log('3️⃣ Reading student by ID...');
        const getByIdResponse = await axios.get(`${BASE_URL}/${studentId}`);
        console.log('✅ Student by ID:', getByIdResponse.data, '\n');

        // 4. UPDATE - Update student
        console.log('4️⃣ Updating student...');
        const updateResponse = await axios.put(`${BASE_URL}/${studentId}`, updatedStudent);
        console.log('✅ Student updated:', updateResponse.data, '\n');

        // 5. READ - Verify update
        console.log('5️⃣ Verifying update...');
        const verifyResponse = await axios.get(`${BASE_URL}/${studentId}`);
        console.log('✅ Updated student:', verifyResponse.data, '\n');

        // 6. DELETE - Delete student
        console.log('6️⃣ Deleting student...');
        const deleteResponse = await axios.delete(`${BASE_URL}/${studentId}`);
        console.log('✅ Student deleted:', deleteResponse.data, '\n');

        // 7. READ - Verify deletion
        console.log('7️⃣ Verifying deletion...');
        try {
            await axios.get(`${BASE_URL}/${studentId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✅ Student successfully deleted (404 Not Found)', '\n');
            } else {
                throw error;
            }
        }

        console.log('🎉 All CRUD operations completed successfully!');

    } catch (error) {
        console.error('❌ Error during CRUD test:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testCRUD(); 
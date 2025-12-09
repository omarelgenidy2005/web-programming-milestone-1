const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:8000/api/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login Success:', response.data);
    } catch (error) {
        console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
}

testLogin();

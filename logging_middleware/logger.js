const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnZ2FsYW1AZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTI0NzUsImlhdCI6MTc4MDgxMTU3NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjIwYWM5MGFiLWEwM2EtNGI3Yi1hODA4LTQ2YzY4ODNhMzNmYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhbGFtIGd1cnUgdnlzaG5hdmkiLCJzdWIiOiJmY2ExNmMwYi1kOWY1LTQ3NDItYjZjMS05YWVjNThiNGJlMzEifSwiZW1haWwiOiJnZ2FsYW1AZ2l0YW0uaW4iLCJuYW1lIjoiZ2FsYW0gZ3VydSB2eXNobmF2aSIsInJvbGxObyI6IjIwMjMwMDI5NTgiLCJhY2Nlc3NDb2RlIjoid2dLdGdaIiwiY2xpZW50SUQiOiJmY2ExNmMwYi1kOWY1LTQ3NDItYjZjMS05YWVjNThiNGJlMzEiLCJjbGllbnRTZWNyZXQiOiJ3ZE1LWVdhWkhVUWZOelZwIn0.4SYEJjsFaTIJcmF90LyUJmJ6b24DVYzK8NOndNcdLSU";

async function Log(stack, level, packageName, message) {
    try {
        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

module.exports = Log;
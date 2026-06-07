const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnZ2FsYW1AZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTY3MjIsImlhdCI6MTc4MDgxNTgyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImZmN2VmMzkyLWM3YTctNGQzNS1hMmZiLTZlMGVkMjUyMjNiYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhbGFtIGd1cnUgdnlzaG5hdmkiLCJzdWIiOiJmY2ExNmMwYi1kOWY1LTQ3NDItYjZjMS05YWVjNThiNGJlMzEifSwiZW1haWwiOiJnZ2FsYW1AZ2l0YW0uaW4iLCJuYW1lIjoiZ2FsYW0gZ3VydSB2eXNobmF2aSIsInJvbGxObyI6IjIwMjMwMDI5NTgiLCJhY2Nlc3NDb2RlIjoid2dLdGdaIiwiY2xpZW50SUQiOiJmY2ExNmMwYi1kOWY1LTQ3NDItYjZjMS05YWVjNThiNGJlMzEiLCJjbGllbnRTZWNyZXQiOiJ3ZE1LWVdhWkhVUWZOelZwIn0.lffaOGXj3mxSFfMdbSmzbY01f0GdOgIJQ8ajC7yzs9M";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

function getWeight(type) {
  switch (type.toLowerCase()) {
    case "placement":
      return 3;
    case "result":
      return 2;
    case "event":
      return 1;
    default:
      return 0;
  }
}

async function getNotifications() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data.notifications || [];
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error.response?.data || error.message
    );
    return [];
  }
}

function calculatePriority(notification) {
  const weight = getWeight(notification.Type);

  const timestamp = new Date(notification.Timestamp).getTime();

  return {
    ...notification,
    priority: weight * 1000000000000 + timestamp,
  };
}

async function main() {
  const notifications = await getNotifications();

  const prioritized = notifications
    .map(calculatePriority)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10);

  console.log("\nTOP 10 PRIORITY NOTIFICATIONS\n");

  prioritized.forEach((n, index) => {
    console.log(
      `${index + 1}. [${n.Type}] ${n.Message}`
    );
    console.log(`   Time: ${n.Timestamp}`);
    console.log(`   Priority: ${n.priority}`);
    console.log("--------------------------------");
  });
}

main();
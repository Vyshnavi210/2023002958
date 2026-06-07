const axios = require("axios");
const { token } = require("./config");
const findBestTasks = require("./scheduler");

async function getDepots() {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/depots",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.depots;
}

async function getVehicles() {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/vehicles",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.vehicles;
}

async function main() {
  try {
    const depots = await getDepots();
    const vehicles = await getVehicles();

    depots.forEach((depot) => {
      const result = findBestTasks(
        vehicles,
        depot.MechanicHours
      );

      console.log("\n======================");
      console.log(`Depot ID: ${depot.ID}`);
      console.log(`Hours: ${depot.MechanicHours}`);
      console.log(`Maximum Impact: ${result.maxImpact}`);
      console.log(
        `Selected Tasks: ${result.selectedTasks.length}`
      );

      result.selectedTasks.forEach((task) => {
        console.log(
          `${task.TaskID} | Duration=${task.Duration} | Impact=${task.Impact}`
        );
      });
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

main();
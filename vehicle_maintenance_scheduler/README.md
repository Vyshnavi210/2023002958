Vehicle Scheduler

Overview

This project fetches depot and vehicle maintenance task data from the Affordmed Evaluation API and determines the optimal set of tasks that maximize impact while staying within the available mechanic hours of each depot.

Technologies Used

* Node.js
* Axios

Files

* index.js : Entry point
* scheduler.js : Scheduling algorithm
* config.js : API configuration and token
* README.md : Documentation

Installation

npm install

Run

node index.js

Approach

The solution uses Dynamic Programming (0/1 Knapsack) where:

* MechanicHours = Capacity
* Duration = Weight
* Impact = Value

For each depot:

1. Fetch available mechanic hours.
2. Fetch vehicle maintenance tasks.
3. Calculate the maximum impact achievable.
4. Display selected tasks.

Output

The application prints:

* Depot ID
* Available Hours
* Maximum Impact
* Selected Tasks
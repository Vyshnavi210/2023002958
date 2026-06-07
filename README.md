# Backend Assessment Submission

## Repository Structure

```text
2023002958
├── logging_middleware
├── vehicle_maintenance_scheduler
├── notification_app_be
├── notification_system_design.md
└── .gitignore
```

## Tasks Completed

### 1. Logging Middleware
Implemented a reusable logging middleware module for capturing request and response information.

Location:
```text
logging_middleware/
```

### 2. Vehicle Maintenance Scheduler
Implemented a maintenance scheduling solution that maximizes impact while respecting depot mechanic-hour constraints.

Location:
```text
vehicle_maintenance_scheduler/
```

### 3. Notification System Design
Documented solutions for:

- Stage 1 – API Design
- Stage 2 – Database Design
- Stage 3 – Query Optimization
- Stage 4 – Performance Improvements
- Stage 5 – Scalable Notification Delivery
- Stage 6 – Priority Inbox Design

Location:
```text
notification_system_design.md
```

### 4. Priority Inbox Implementation
Implemented Stage 6 by:

- Fetching notifications from the provided API
- Assigning weights:
  - Placement = 3
  - Result = 2
  - Event = 1
- Combining weight and recency to calculate priority
- Sorting notifications by priority
- Displaying the Top 10 notifications

Location:
```text
notification_app_be/
```

## Technologies Used

- Node.js
- JavaScript
- Axios

## Running the Projects

### Logging Middleware

```bash
cd logging_middleware
npm install
node test.js
```

### Vehicle Maintenance Scheduler

```bash
cd vehicle_maintenance_scheduler
npm install
node index.js
```

### Notification Priority Inbox

```bash
cd notification_app_be
npm install
node index.js
```

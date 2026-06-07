# Notification App Backend

## Purpose

Implements a Priority Inbox for notifications.

## Priority Rules

- Placement > Result > Event
- If two notifications have the same priority, the newer notification ranks higher.

## Output

Displays the Top 10 highest-priority notifications.

## Efficient Maintenance

A Min Heap (Priority Queue) of size 10 can be used to efficiently maintain the Top 10 notifications as new notifications arrive.
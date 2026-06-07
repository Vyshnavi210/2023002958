# Stage 1 - API Design

## Get Notifications
**Endpoint:** GET /api/v1/notifications

**Response**
```json
{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Amazon Hiring Drive",
      "isRead": false,
      "createdAt": "2026-06-07T10:00:00Z"
    }
  ]
}
```

## Mark Notification as Read
**Endpoint:** PATCH /api/v1/notifications/{id}/read

**Response**
```json
{
  "message": "Notification marked as read"
}
```

## Delete Notification
**Endpoint:** DELETE /api/v1/notifications/{id}

**Response**
```json
{
  "message": "Notification deleted"
}
```

## Real-Time Delivery
Use WebSockets for instant notification delivery to connected students.

# Stage 2 - Database Design

## Database Choice
PostgreSQL

### Reasons
- ACID compliance
- Reliable transactions
- Strong indexing support
- Easy scalability

## Notifications Table

| Column | Type |
|----------|----------|
| id | UUID |
| student_id | BIGINT |
| notification_type | VARCHAR(50) |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

## Scaling Strategy
- Index frequently queried columns
- Use table partitioning for large datasets
- Add read replicas for heavy read traffic

# Stage 3 - Query Optimization

### Original Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

### Why It Is Slow
The notifications table may contain millions of records, causing full table scans.

### Recommended Index

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

### Why Not Index Every Column
- Increased storage usage
- Slower inserts and updates
- More maintenance overhead

### Placement Notification Query

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType='Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

# Stage 4 - Performance Improvements

## Improvements

1. Redis caching
2. Pagination
3. WebSockets instead of frequent polling
4. Read replicas
5. Optimized indexing

## Tradeoffs

- Additional infrastructure cost
- Increased system complexity
- Cache invalidation challenges

# Stage 5 - Scalable Notification Delivery

## Problems With Current Approach

- Sequential processing
- Email failures stop execution
- Poor scalability
- High response time

## Improved Architecture

- RabbitMQ or Kafka
- Background workers
- Retry mechanism
- Asynchronous processing

## Flow

1. Save notification to database
2. Publish event to message queue
3. Worker consumes event
4. Send email/push notification
5. Retry failed deliveries automatically

## Benefits

- Faster response times
- Better fault tolerance
- Improved scalability
- Easier monitoring and maintenance
# Stage 6

Priority is determined using:

1. Notification Type

2. Recency

Weights:

Placement = 3

Result = 2

Event = 1

Notifications are sorted by:

1. Higher weight first

2. Newer timestamp first

Top 10 notifications are displayed.

To efficiently maintain Top 10 notifications when new notifications arrive continuously, a Min Heap (Priority Queue) of size 10 can be used.
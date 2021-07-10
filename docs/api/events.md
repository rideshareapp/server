# /events

## /getAll

Request: N/A

Response:
```json
{
  "status": "success",
  "details": {
    "eventList": [
      {
        "id": 1,
        "event_name": "Event One",
        "event_date": "2000-01-01T12:00:00.000Z",
        "include_time": false
      },
      {
        "id": 2,
        "event_name": "Event Two",
        "event_date": "2000-01-02T12:30:00.000Z",
        "include_time": true
      },
      {
        "id": 3,
        "event_name": "Event Three",
        "event_date": "2000-01-03T15:45:00.000Z",
        "include_time": true
      },
      ...
    ]
  }
}
```

## /create

Request:
```json
{
	"code": "1111",
	"name": "Event Four",
	"date": "2000-01-04 10:00:00",
	"include_time": true
}
```
Response:
```json
{
  "status": "success",
  "details": "event created"
}
```

## /update

Request:
```json
{
	"id": "2",
	"name": "Event Two But With A New Name",
    "event_date": "2000-01-02T12:30:00.000Z",
    "include_time": true
}
```
Response:
```json
{
  "status": "success",
  "details": "event updated"
}
```

## /delete

Request:
```json
{
	"id": 5 // Event ID
}
```
Response:
```json
{
  "status": "success",
  "details": "event deleted"
}
```
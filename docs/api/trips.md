# /trips

# /drivers

## /requests/accept
Request:
```json
{
	"trip_request_id": 21,
	"driver": "BobTheDriver@email"
}
```
Response:
```json
{
  "status": "success",
  "details": "trip accepted"
}
```

## /requests/get
Request:
```json
{
	"event_id": 3
}
```
Response:
```json
{
  "status": "success",
  "details": [
    {
      "id": 1,
      "passenger": "NeedRide1@email",
      "geolocation": {
        "x": 1,
        "y": 2
      },
      "passengers_num": 2
    },
    {
      "id": 2,
      "passenger": "NeedRide2@email",
      "geolocation": {
        "x": 5,
        "y": 6
      },
      "passengers_num": 1
    },
    ...
  ]
}
```

## /confirmed/get
Request:
```json
{
	"driver": "BobTheDriver@email"
}
```
Response:
```json
{
  "status": "success",
  "details": [
    {
      "org_name": "Organization One",
      "event_name": "Event One",
      "event_date": "2114-01-04T17:23:54.000Z",
      "include_time": true,
      "first_name": "Need",
      "last_name": "Ride",
      "passenger": "NeedRide3@email",
      "geolocation": {
        "x": 1,
        "y": 2
      },
      "passengers_num": 1
    },
    {
      "org_name": "Organization One",
      "event_name": "Event One",
      "event_date": "2114-01-04T17:23:54.000Z",
      "include_time": true,
      "first_name": "Need",
      "last_name": "Ride",
      "passenger": "NeedRide4@email",
      "geolocation": {
        "x": 5,
        "y": 3
      },
      "passengers_num": 2
    },
    {
      "org_name": "Organization Two",
      "event_name": "Event Two",
      "event_date": "2100-01-23T19:00:00.000Z",
      "include_time": true,
      "first_name": "Need",
      "last_name": "Ride",
      "passenger": "NeedRide5@email",
      "geolocation": {
        "x": 23,
        "y": 54
      },
      "passengers_num": 1
    },
    ...
  ]
}
```

## /confirmed/finish
Request:
```json
{
	"driver": "BobTheDriver@email",
	"event_id": 3
}
```
Response:
```json
{
  "status": "success",
  "details": "trip finished"
}
```

# /users

## /requests/new
Request:
```json
{
	"event_id": 1,
	"geolocation": {
		"x": -225.2323,
		"y": 646.34
	},
	"passengers_num": 3
}
```
Response:
```json
{
  "status": "success",
  "details": "created new request"
}
```

## /requests/get
Request: N/A (Uses email stored in access token cookie)

Response:
```json
{
  "status": "success",
  "details": [
    {
      "org_name": "Organization One",
      "org_code": "1111",
      "event_name": "Event One",
      "event_date": "2114-01-04T17:23:54.000Z",
      "include_time": true,
      "passenger": "NeedRide1@email",
      "geolocation": {
        "x": 1,
        "y": 2
      },
      "passengers_num": 1
    }
  ]
}
```

## /confirmed/get
Request: N/A (Uses email stored in access token cookie)

Response:
```json
{
  "status": "success",
  "details": [
    {
      "org_name": "Organization One",
      "event_name": "Event One",
      "event_date": "2114-01-04T17:23:54.000Z",
      "include_time": true,
      "driver_first": "Bob",
      "driver_last": "Driver",
      "driver_email": "BobTheDriver@email",
      "geolocation": {
        "x": 1,
        "y": 2
      },
      "passengers_num": 1
    },
    ...
  ]
}
```
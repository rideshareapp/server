# API

Request-body and reponses for all routes.

## /user

* /register

Request:
```json
{
	"first":"John",
	"last": "Doe",
	"phone": "1234567890",
	"email": "JohnDoe@email.com",
	"password": "strongPasswordHere"
}
```
Response:
```json
{
  "status": "success",
  "details": {
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdDRAZW1haWw.N_lLwGNn8R80OKqGTZ2AltIKakmEbBwj-2Kgrefq3R4" // JSON Web Token
  }
}
```
* /login

Request:
```json
{
	"email": "JohnDoe@email.com",
	"password": "strongPasswordHere"
}
```
Response:
```json
{
  "status": "success",
  "details": {
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdDFAZW1haWw.WAOLtSwCo_XLmzjBrayQmncVYdAjUywSIgPYWttdPmI" // JSON web token
  }
}
```

* /logout

Request:
```json

```
Response:
```json

```

* /joinOrg

Request:
```json
{
	"code": "1111",
	"email": "JohnDoe@email.com"
}
```
Response:
```json
{
  "status": "success",
  "details": "joined org"
}
```

* /update/profile

Request:
```json
{
	"first":"John", // Editable
	"last": "Doe", // Editable
	"phone": "1234567800", // Editable
	"email": "JohnDoe@email.com"
}
```
Response:
```json
{
  "status": "success",
  "details": "user updated"
}
```

* /update/email

Request:
```json
{
	"oldEmail": "JohnDoe@email.com",
	"newEmail": "johnsNewEmail@email.com"
}
```
Response:
```json
{
  "status": "success",
  "details": "user updated"
}
```

* /update/password

Request:
```json
{
	"email": "JohnDoe@email.com",
	"oldPassword": "strongPasswordHere",
	"newPassword": "newStrongPasswordHere"
}
```
Response:
```json
{
  "status": "success",
  "details": "user updated"
}
```

---

## /organizations

* /register

Request:
```json
{
	"name":"Organization Name",
	"email": "organization@email.com",
	"password": "strongPassword"
}```
```json
{
  "status": "success",
  "details": {
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdG9yZzJAZW1haWw.vEcbBpsFxK02SRVK2Rw0Aa-_pzzM62m2ibgZkMtY7ZU" // JSON Web Token
  }
}
```

* /login

Request:
```json
{
	"email": "organization@email.com",
	"password": "strongPassword"
}
```
Response:
```json
{
  "status": "success",
  "details": {
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdG9yZzFAZW1haWw.FbbzHCKhtODrQA8a3AJ3iDgANuIvCt-7R4cfIoSHRsE" // JSON Web Token
  }
}
```

---

## /events

* /getAll

Request:
```json
{
	"code": 1111
}
```
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

* /create

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

* /update

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

* /delete

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

---

## /drivers

* /new

Request:
```json
{
	"email": "JohnDoe@email", // An existing email in the user database
	"code": 1111 // Organization code for the organization the user is becoming a driver for
}
```
Response:
```json
{
  "status": "success",
  "details": "driver added"
}
```

---

## /trips

* /newRequest

Request:
```json
{
	"event_id": 3, // Event user is request ride for
	"email": "InNeedOfRide@email.com",
	"geolocation": "(1, 2)", // Coordinates
	"passengers": 2 // Number of passengers
}
```
Response:
```json
{
  "status": "success",
  "details": "created new request"
}
```

* /getAll

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
      "email": "NeedRide@email.com",
      "geolocation": {
        "x": 1,
        "y": 2
      },
      "passengers": 2
    },
    {
      "id": 2,
      "email": "NeedRide2@email.com",
      "geolocation": {
        "x": 5,
        "y": 6
      },
      "passengers": 1
    }
  ]
}
```
# /user

## /register

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
  "details": { // JSON Web Tokens
    "ACCESS_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q3QGVtYWlsIiwiaWF0IjoxNjI1ODgwNTI0LCJleHAiOjE2MjU4ODA4MjR9.YB-ITZeSLPPEAWKftRGRn9i2eQ5KPgT5DPZEqY5qqGo",
    "REFRESH_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q3QGVtYWlsIiwiaWF0IjoxNjI1ODgwNTI0LCJleHAiOjE2Mjg1MTAzMjR9.eP5HuZ62_xPXWw621I7k7llryYJ8RqHv0n2VQ8kjYeM"
  }
}
```
## /login

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
  "details": { // JSON Web Tokens
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q3QGVtYWlsIiwiaWF0IjoxNjI1ODgwNTI0LCJleHAiOjE2MjU4ODA4MjR9.YB-ITZeSLPPEAWKftRGRn9i2eQ5KPgT5DPZEqY5qqGo",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q3QGVtYWlsIiwiaWF0IjoxNjI1ODgwNTI0LCJleHAiOjE2Mjg1MTAzMjR9.eP5HuZ62_xPXWw621I7k7llryYJ8RqHv0n2VQ8kjYeM"
  }
}
```

## /joinOrg

Request:
```json
{
	"code": "1111"
}
```
Response:
```json
{
  "status": "success",
  "details": "joined org"
}
```

## /leaveOrg

Request:
```json
{
	"code": "1111"
}
```
Response:
```json
{
  "status": "success",
  "details": "left org"
}
```

## /profile

Request: Uses user email from authentication cookie

Response:
```json
{
	"first":"John", // Editable
	"last": "Doe", // Editable
	"phone": "1234567800", // Editable
	"email": "JohnDoe@email.com"
}
```

## /update/profile

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

## /update/email

Request:
```json
{
	"newEmail": "JohnsNewEmail@email.com"
}
```
Response:
```json
{
  "status": "success",
  "details": "user updated"
}
```

## /update/password

Request:
```json
{
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
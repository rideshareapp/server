# /drivers

## /new
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
# /auth

## /refresh
Request: N/A (Uses refresh token cookie)

Response:
```json
{
  "status": "success",
  "details": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q3QGVtYWlsIiwiaWF0IjoxNjI1ODgwNTI0LCJleHAiOjE2MjU4ODA4MjR9.YB-ITZeSLPPEAWKftRGRn9i2eQ5KPgT5DPZEqY5qqGo"
  }
}
```

## /validToken
Request: N/A (Uses authentication token cookie)

Response: Status code 200


## /refresh/logout
Request: N/A (Uses existing cookies)

Response: Status code 200
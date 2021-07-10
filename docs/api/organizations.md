# /organizations

## /register

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
  "details": { // JSON Web Tokens
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RvcmcxMjBAZW1haWwiLCJpYXQiOjE2MjU4ODEyNDEsImV4cCI6MTYyNTg4MTU0MX0.2g2pGSNWus71xNFarty5ha3DNC0yiwFmut7vVOP6ssY",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RvcmcxMjBAZW1haWwiLCJpYXQiOjE2MjU4ODEyNDEsImV4cCI6MTYyODUxMTA0MX0.2Dc0SsJLMOd3hDSbfR9Hw0clpE8IhSMrhgHhJsixfA4"
  }
}
```

## /login

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
  "details": { // JSON Web Tokens
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RvcmcxMjBAZW1haWwiLCJpYXQiOjE2MjU4ODEyNDEsImV4cCI6MTYyNTg4MTU0MX0.2g2pGSNWus71xNFarty5ha3DNC0yiwFmut7vVOP6ssY",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RvcmcxMjBAZW1haWwiLCJpYXQiOjE2MjU4ODEyNDEsImV4cCI6MTYyODUxMTA0MX0.2Dc0SsJLMOd3hDSbfR9Hw0clpE8IhSMrhgHhJsixfA4"
  }
}
```

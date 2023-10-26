# API Documentation

This document provides information about the API endpoints and how to use them.

## Authentication

Before using the API, you need to authenticate. Please provide your API key in the `Authorization` header of each request.

- Header: Authorization
- Value: 12345678

  ```json
  
  Authorization: 12345678
  
You can either add this header to your collection or to the particular request you need  

## Endpoints

### GET /api/items

Retrieve a list of items.

#### Request

- Method: GET
- URL: `/api/items`

#### Response

- Status: 200 OK
- Body: 
  ```json
   [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ]

### POST /api/items

#### Request
- Method: POST
- URL: `/api/items`
- Headers: Authorization: Bearer Your API Key

- Body:
  ```json
  {
    "name": "New Item"
  }

#### Response
- Status: *201* Created
- Body:
  ```json
  {
    "id": random_id,
    "name": "New Item"
  }

### PUT /api/items

#### Request
- Method: PUT
- URL: `/api/items`
- Headers: Authorization: Bearer Your API Key

- Body:
  ```json
  {
  "name": "Updated Item"
  }

#### Response
- Status: *200* OK
- Body:
  ```json
  {
  "id": 3,
  "name": "Updated Item"
  }

### DELETE /api/items/:id

#### Request
- Method: DELETE
- URL: `/api/items/{id} (replace {id} with the item's ID)`
- Headers: Authorization: Bearer Your API Key

- Body: No body
#### Response
- Status: *204* No Content


### Error-handling
- 400 Bad Request - Syntax problems
- 401 Unauthorized - Wrong auth key
- 402 No auth token provided - No authorization token
- 404 Not Found - Could not find resource 

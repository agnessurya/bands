# Band API Documentation

## Endpoints :

List of available endpoints:

- `POST /band`
- `GET /band`
- `POST /band/member`
- `GET /band/:band_id`


## 1. POST /band

Description:
- Create New Band


Request:

- body:

```json
{
    "name" :"string",
    "maxmember": "integer",
}
```

_Response (201 - Created)_

```json
{
    "id" : "integer",
    "name": "string",
    "maxmember": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Band Name Must Be Unique"
}
```
OR
```json
{
    "message": "Band Name Cant be Empty!"
}
```
OR
```json
{
    "message": "Band Max Members Cant be Empty!"
}
```

## 2. GET /band

Description:
- Get All Band List


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "BandOne",
        "maxmember": 1
    },
    {
        "id": 2,
        "name": "BandTwo",
        "maxmember": 2
    }
]
```

## 3. POST /band/member

Description:
- Add Members to a Band

Request:

- body:

```json
{
    "name" :"string",
    "position": "integer",
    "BandId": "integer"
}
```
_Response (201 - Created)_

```json
{
    "band_id": "integer",
    "member_id": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Member Name Cant be Empty!"
}
```
OR
```json
{
    "message": "Member Position Cant be Empty!"
}
```
OR
```json
{
    "message": "Maximum Member Limit Exceeded"
}
```


_Response (404 - Not Found)_

```json
{
    "message": "Band Not Found"
}
```

## 4. GET /band/:band_id

Description:
- Find One Band by ID from database

Request:
- params:

```json
{
    "band_id" :"integer",
}
```


_Response (200 - OK)_

```json
{
    "name": "BandOne",
    "maxmember": 1,
    "Members": [
        {
            "name": "Member 1",
            "position": "Vocalist"
        }
    ]
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Band Not Found"
}
```
&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```


## Running
- Drop db : `npx sequelizedb:drop`
- Create db : `npx sequelize db:create`
- Migrate db : `npx sequelize db:migrate`
- Run Test : `npm run dev`

## Testing
- Drop db testing: `npx sequelize --env test db:drop`
- Create db testing: `npx sequelize --env test db:create`
- Migrate db testing: `npx sequelize --env test db:migrate`
- Run Test : `npm run test`

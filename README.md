# back-end

The server is deployed to heroku at the url https://water-my-plants3.herokuapp.com

# Auth endpoints

POST /api/auth/register

Expects an object with the following key constraints

| name      | type   | required |
| ----------| ------ | -------- | 
| `Username` | String | Yes      | 
| `Password`  | string | Yes      |
| `Number`    | String | yes      |

Possible status codes

200 User created
500 Missing required field

On success the endpoint will return an object with a token, and user inside. The token should be saved to local storage, and sent with all further requests in the request header as an authorization.

the user will match this
```
{
    "saved": {
        "id": 5,
        "username": "cranberry",
        "password": "$2a$10$JB19/MDCbWjbgqivQNDc7eXcUxStegi3xPFVZ7VMm1r2oQoefI29S",
        "Number": "800-365-2000"
    }
}
```

POST /api/auth/login

Expects an object with the following key constraints

| name      | type   | required |
| ----------| ------ | -------- | 
| `Username` | String | Yes      | 
| `Password`  | string | Yes      |

Possible status codes

200 `Welcome ${user.username}`
401 Invalid credentials
500 server error

On success a token and a user object will be returned.
```
{
    "message": "Welcome cranberry",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6ImNyYW5iZXJyeSIsImlhdCI6MTU5MDM0OTUyMSwiZXhwIjoxNTkwMzUxMzIxfQ.uI2gmyk-u8SIQShwdflZbcvoKv3vpfGX0KtjIp661QI"
}
```
# PLANT Endpoints

Only logged in users can view, create, update, and delete plants.

GET /api/users/:id/plants

must be loggin in to view your list of plants
:id is your user.id you revieve once you logged in

Possible status codes

200 Will view users list of plants
404 User has no plants

POST /api/users/:id/plants

must be logged in to add a plant.
plant must have the following information

```
    {
        "nickname": ,
        "H2Ofrequency": ,
        "image": ,
        "species_name": ,
        "user_id": 
    }
```
You will be given a plant id

Possible status codes
 201 success plant created
 500 cannot add plant
 
PUT /api/users/:plants/plant:id

must be logged in to updated information on a plant.

can update any one of the following fields

```
    {
        "nickname": ,
        "H2Ofrequency": ,
        "image": ,
        "species_name": ,
    }
```

Possible status codes
200 success
500 cannot update plant

DELETE /api/users/:plants/plant:id

must be logged in to remove plant

possible status codes

200 Removed 1
404 Cannot remove plant with given id



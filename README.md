# Node Challenge

The goal of this project is to create a simple API with Node.js to allow users to query stock quotes.
The project consists of two separate services:

- A user-facing API that will receive requests from registered users asking for quote information.
- An internal stock service that queries external APIs to retrieve the requested quote information.

## Features

- Register a new user
- Authenticate a user's access.
- Retrieve requested quote information.
- Store the searched information.
- List authenticated user's search history
- List the top 5 quote information most searched for by all users.

## Tech

Dillinger uses a number of open source projects to work properly:

- [Node.js]
- [Express]
- [Docker](https://www.docker.com/)
- [MySQL](https://hub.docker.com/_/mysql) - In this project, the official database image available on the docker hub was used.
- [Swagger](https://swagger.io/) - Using Swagger to document both API's.
- [Sequelize](https://sequelize.org/)
- [Postman](https://www.postman.com/) - Optional
- [JWT](https://www.npmjs.com/package/jsonwebtoken) - Using JWT authentication for endpoints.

And all versioning of the project was done through Jobsity git.

## Installation

The project requires [Node.js](https://nodejs.org/) v10+ to run.

With the docker engine running, pull up the mysql database image. Initialization scripts will automatically create the necessary databases for the project (dev and test).

```sh
cd node-challenge
docker-compose up
```

With mysql running, create an .env file by replicating the .env.example, install the dependencies and devDependencies and start the server.

**api-service:**

```sh
cd api-service
npm install
npm run start
```

**stock-service:**

```sh
cd stock-service
npm install
npm run start
```

[node.js]: http://nodejs.org
[express]: http://expressjs.com

## Execution

Once you have both services and mysql running it is possible to call the routes. All routes (except /register) need authentication to run, so the first step in testing the application is to create a user.

**Postman:** All routes are available to be tested in this collection in Postman.
**Swagger:** Accessing the /docs route.

### Testing api-service - http://localhost:3001/

**POST /register**
Request example:

```javascript
  { "email": "caroline@jobsity.com", "role": "admin" }  //role could be user/admin
```

Response example:

```javascript
  { "email": "caroline@jobsity.com", "password": "bda5d07453dfde4440803cfcdec48d92" }
```

With the password generated at the time of registration, it is possible to authenticate the user.

**POST /auth**
Request example:

```javascript
  { "email": "caroline@jobsity.com", "password": "ojI566Bk6foQoZACQN4UWDlKXHs6UCw6" }
```

Response example:

```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjcwODAyMjA0LCJleHAiOjE2NzA4ODg2MDR9.SWC_bjC6kKtOaUVldhjaU4R1MJPtSzUbkEGFAmr3v1o";
```

It is important to mention that authentication needs to add "Bearer " in front of the generated token.

**GET /stock?q=wavc-u.us**

Response example:

```javascript
{
    "name": "WAVERLEY CAPITAL ACQUISITION 1",
    "symbol": "WAVC-U.US",
    "open": "9.965",
    "high": "9.97",
    "low": "9.94",
    "close": "9.97"
}
```

**GET /history**
The history displays only the authenticated user's searches.

Response example:

```javascript
[
  {
    date: "2022-12-12T00:04:25.000Z",
    name: "WAVERLEY CAPITAL ACQUISITION 1",
    symbol: "wavc-u.us",
    open: "9.965",
    high: "9.97",
    low: "9.94",
    close: "9.97",
  },
  {
    date: "2022-12-12T00:07:22.000Z",
    name: "APPLE",
    symbol: "aapl.us",
    open: "142.34",
    high: "145.57",
    low: "140.9",
    close: "142.16",
  },
];
```

**GET /stats**
This endpoint will return the top 5 most requested stocks. **Only admins can access this endpoint.**

Response example:

```javascript
[
  {
    stock: "wavc-u.us",
    times_requested: 2,
  },
  {
    stock: "aapl.us",
    times_requested: 1,
  },
];
```

## Stock service - http://localhost:3002

- Assume this is an internal service, so requests to endpoints in this service don't need to be authenticated.
- When a stock request is received, this service should query an external API to get the stock information. For this project, use this API: https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcvn&h&e=csv.
- Note that {stock_code} above is a parameter that should be replaced with the requested stock code.
  -You can see a list of available stock codes here: https://stooq.com/t/?i=518

**POST /stock**

Request example:

```javascript
{
    "symbol": "NYMX.US"
}

```

Response example:

```javascript
{
    "name": "NYMOX PHARMACEUTICAL",
    "symbol": "NYMX.US",
    "open": "0.6219",
    "high": "0.7064",
    "low": "0.5613",
    "close": "0.5979"
}
```

## Architecture

![Services architecture](./architecture.png "Architecture").

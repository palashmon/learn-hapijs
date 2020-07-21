# Learn Hapi.js

A simple REST API using Hapi.js and MongoDB

## Usage

### Installation

Clone the repo and install npm module

```sh
npm install
```

### Run app

```sh
npm start
```

### Routes

| Description | Http   | URL                               | Body                                              |
| ----------- | ------ | --------------------------------- | ------------------------------------------------- |
| Create      | POST   | http://localhost:3000/person      | `{ "firstName": "Palash", "lastName": "Mondal" }` |
| Read All    | GET    | http://localhost:3000/people      | -                                                 |
| Read One    | GET    | http://localhost:3000/person/{id} | -                                                 |
| Update      | PUT    | http://localhost:3000/person/{id} | `{ "firstName": "Pal" }`                          |
| Delete      | DELETE | http://localhost:3000/person/{id} | -                                                 |

### Links

- [Getting Started](https://hapi.dev/tutorials/gettingstarted/?lang=en_US)
- [Express Migration](https://hapi.dev/tutorials/expresstohapi/?lang=en_US)
- [Routing](https://hapi.dev/tutorials/routing/?lang=en_US)
- [Community support options](https://hapi.dev/support/)

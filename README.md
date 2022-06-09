# EngageXR

Senior Software Engineer Assignment – Node Express Project

To gain API access we need to create an User, it could be possible using the /signup endpoint.

In order to escalate privilege, I create a "hidden" endpoint that it is not in swagger:
```
 http://localhost:3000/change-to-superuser/{userId}
```


### Tasks

- [x] Basic JWT Authentication: ability to log in as administrator
- [x] Use Node, Express, Sequelize, JWT
- [x] Create Express routing to demonstrate CRUD functionality (Create / Read / Update / Delete) for two API items: Companies and Employees
- [x] Use Express validation middleware to demonstrate basic payload validation on POST request bodies 
- [x] Use Express middleware to enforce authorisation
- [x] Demonstrate the use of DB transactions where applicable
- [x] Companies DB table consists of these fields: Name (required), email, phone, website
- [x] Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone
- [x] Create Integration tests for all APIs, all tests should pass. Use Jest or Mocha.
- [x] Try/catch error handling for bad request data
- [x] Document your APIs with Swagger
- [x] Use Typescript in your project
- [x] Typescript Sequelize
# Environment vars
This project have the environment variables defined inside 3 files:
- .env.development.local
- .env.production.local
- .env.development.local

It could be dangerous upload to github but it is just a test.

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version v16.15.1
- Install [MySQL](https://dev.mysql.com/downloads/installer/) version 8.0.29


# Getting started
- Clone the repository
```
git clone https://github.com/jdmorei/engagexr.git
```
- Install dependencies
```
cd engagexr

npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Spec Endpoint : http://localhost:3000/api-docs

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                  |
| `dev`                   | Runs full build before starting all watch tasks. Can be invoked with `npm run dev`                                         |
| `test`                    | Runs build and run tests using jest . Can be invoked with `npm test`          |
| `lint`                    | Runs TSLint on project files  . Can be invoked with `npm run lint`        |
| `lint:fix`                    | Runs TSLint on project files fixing issues  . Can be invoked with `npm run lint:fix`      |


## ESLint rules
All rules are configured through `.eslintrc`.

## Docker

By default, the API will expose port 3000

```
docker-composer up -d
```



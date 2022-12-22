# Simple trello API on nestjs
An App for creating cards, board with authorization

## How to run it
### Install dependencies
```bash
npm install
```
###  Set Environment variables

All Environment variables contain in `.env.example`. To set your Environment variables you should `.env.example` rename to `.env.development` and fill in all variables inside

###  Init DB
```bash
 npm run init-db && npm run typeorm:run-migrations
```
### Run app
```bash
npm run start:dev
```
or choose one of other ways from scripts section in `package.json` 

by default app running on http://localhost:3000/




## Technology Stack
- [NestJs](https://nestjs.com/) 
- [TypeORM](https://typeorm.io/) 
- [MyQSL](https://www.mysql.com/) 
- [GraphQL](https://graphql.org/)

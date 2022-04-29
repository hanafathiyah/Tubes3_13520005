# Tubes3_13520005

> Penerapan _String Matching_ dan _Regular Expression_ dalam DNA _Pattern Matching_

## Description
This is a big project created in order to fulfill the requirements of IF2211 Algorithm Strategy course in Institut Teknologi Bandung (ITB) Academic Year of 2021/2022. This project is a web based application created with Node.js on backend and React on frontend. This application also comes with a database which is implemented using PostgreSQL. This application utilizes String Matching Algorithms and Regular Expressions to detect whether a person has a certain genetic disease or not. The prediction results are stored in a database which can be searched using a query.

## Requirements
- Backend

| Name | Version |
| :---: | :---: |
| Node.js | 16.14.2 |
| PostgreSQL | 12.2.0 |

- Frontend

| Name | Version |
| :---: | :---: |
| @mui/icons-material | 5.6.2 |
| @mui/material | 5.6.3 |
| Axios | 0.27.2 |
| React | 18.0.0 |
| React-Router | 6.3.0 |

## How to run?

### Local Run
- backend
go to folder /src/backend
type:
```shell
npm start
```
- frontend
go to folder /src/frontend
type:
```shell
npm run dev
```
- database
go to folder /src/backend
type:
```shell
npx prisma studio
```
- docker
go to folder /src/backend
type:
```shell
docker-compose up
```

### Run in Deployment Site
- frontend:
  https://dnachecker.netlify.app/
- backend:
  https://dnachecker.herokuapp.com/

## Author
|   NIM    | Name                |
| :---: | :---: |
| 13520005 | Christine Hutabarat |
| 13520017 | Diky Restu Maulana  |
| 13520047 | Hana Fathiyah       |

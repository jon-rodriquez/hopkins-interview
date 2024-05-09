# Project summary 
This repo contains a simple site built with React and Nest js for the backend.
The site is for demo purposes and is not complete.

The Site has 2 user Types an admin and a base user. 
 - The admin user can create, and delete users. 
 - The base user can only view the users.

The site has Telecom feature that allows users to send messages to each other.
 - the messages are sent in real time using websockets with the socket.io library.
 - the telecom feature has a text to voice feature that reads the messages out loud for the convienience of the user.

The site has a basic authentication sysytem.
 - JWT tokens are used to authenticate the user.
 - the tokens are stored in the local storage of the browser.
 - the tokens are used to authenticate the user on the backend.
 - there is a role based system that allows the backend to check if the user is an admin or a base user. This is used to restrict access to certain routes.

--- 

## Technologies used
- React
- Nest js
- Typescript
- Socket.io
- JWT
- Vite
- Nodejs
- Express

---

## Running the project locally
you will need to have node installed on your machine to run the project
in one terminal start the backend and in another terminal start the frontend using the following commands

### Backend
1. cd into the backend folder
2. run `npm install && npm start`
or 
from the root directory run `cd backend && npm i && npm start`

### Frontend
1. cd into the frontend folder
2. run `npm install && npm start`
or
from the root directory run `cd frontend && npm i && npm start`

## Logging in
To login you can use the following credentials for the admin user

email: `admin@mail.com`
password: `admin`

a second user is also created with the following credentials

email: `base@mail.com`
password: `admin`

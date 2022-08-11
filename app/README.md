# Your API

Please build your API inside this folder. You should overwrite this README to include instructions on how to set up and launch your server.

# Pets RESTful API  🐕 😺

a RESTful API using NodeJS + Express.js + Typescript + Json-Server
The four CRUD operations are provided: create, read, update and delete records. 

**It uses fake JSON server to mock data under /data folder. (I didn't have time and didn't want to use fs.readFile to read the data from a file)**
Instead we can use mongodb and mongoose for connection if needed.


## Installation

1.  Install Dependencies

    * [Node.js (version ^14.x is recommended)](https://nodejs.org/en/)

2.  Go to the project's server directory **cd /app**
3.  On a new terminal **cd /database && npm install -g json-server** and after **json-server --watch data.json**
4.  Run **npm install**
5.  Start using it! **npm run dev**
6.  Find it under localhost:4000 (or change port on the .env.local) on localhost:3000 json-server is running.

## Extra
After testing you can uninstall json-server with **npm uninstall -g json-server**

## Available end-points
More info about the end-points you can find on the general README.md file.
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const {getJoke,getFilePath,readJokesFile,readLastJoke,updateJokesFile} = require('./utilities.js');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const apiUrl = process.env.API_URL || 'https://api.chucknorris.io/jokes/random';


const server = http.createServer((req,res) => {

    const jokeFile = readJokesFile('norrisDb', 'json');

    getJoke(apiUrl, (response) => {

        updateJokesFile('norrisDb','json', [...jokeFile, response.value]);

        res.writeHead(200, {"Content-Type": "text/html"});
        
        res.end(`${readLastJoke(response)}`);

    })
});

server.listen(port, host, () => {
    console.log(`Server avviato: http://${host}:${port}`);
});

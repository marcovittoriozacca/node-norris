require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const {getJoke} = require('./utilities.js');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const apiUrl = process.env.API_URL || 'https://api.chucknorris.io/jokes/random';

//get the absolute path of the given file with his extension
const getFilePath = (fileName, extension) => {
    const filePath = path.join(__dirname, fileName +'.'+ extension);
    return filePath;
}

//reads the file by the given name - returns a json parsed file
const readJokesFile = (fileName, extension) => {
    const filePath = getFilePath(fileName, extension);
    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
}

//returns the last joke
const readLastJoke = ({value}) => value;


//overwrite the given file
const updateJokesFile = (fileName, extension, content) => {
    const filePath = getFilePath(fileName, extension);
    const string = JSON.stringify(content);
    fs.writeFileSync(filePath, string);
}

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

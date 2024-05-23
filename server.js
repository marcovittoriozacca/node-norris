require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const apiUrl = process.env.API_URL || 'https://api.chucknorris.io/jokes/random';

const server = http.createServer((req,res) => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end();
});

server.listen(port, host, () => {
    console.log(`Server avviato: http://${host}:${port}`);
});

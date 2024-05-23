require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const {getJoke,getFilePath,readJokesFile,readLastJoke,updateJokesFile,readHtmlFile} = require('./utilities.js');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const apiUrl = process.env.API_URL || 'https://api.chucknorris.io/jokes/random';


const server = http.createServer((req,res) => {
    if(req.url !== "/favicon.ico"){
        
        getJoke(apiUrl, ({value}) => {
            
            const jokeFile = readJokesFile('norrisDb', 'json');
            updateJokesFile('norrisDb','json', value);
            const length = readJokesFile('norrisDb', 'json').length;
            let lengthText;
            let htmlPage = readHtmlFile('index', 'html').replace('{{lastJoke}}', readLastJoke(value));

            if(length === 1){
                lengthText = `${length} battuta`;
            }else{
                lengthText = `${length} battute`;
            }
            htmlPage = htmlPage.replace('{{length}}', lengthText);

            res.writeHead(200, {"Content-Type": "text/html"});
    
            res.end(htmlPage);
            
    
        })
    }
});

server.listen(port, host, () => {
    console.log(`Server avviato: http://${host}:${port}`);
});

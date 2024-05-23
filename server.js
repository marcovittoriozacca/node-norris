require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const {getJoke,getFilePath,readJokesFile,readLastJoke,updateJokesFile} = require('./utilities.js');

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const apiUrl = process.env.API_URL || 'https://api.chucknorris.io/jokes/random';


const server = http.createServer((req,res) => {
    if(req.url !== "/favicon.ico"){
        
        getJoke(apiUrl, (response) => {
            
            const jokeFile = readJokesFile('norrisDb', 'json');
            updateJokesFile('norrisDb','json', [...jokeFile, response.value]);
            const length = readJokesFile('norrisDb', 'json').length;
            
            res.writeHead(200, {"Content-Type": "text/html"});
    
            //top section of an html tag
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Norris DB</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                `);
    
            //body section
            res.write(`
                <body class="h-screen flex items-center justify-center bg-slate-100 p-5">
                    <div class="flex flex-col items-center gap-y-5">
                        <h1 class="text-4xl text-slate-700 text-center">${readLastJoke(response)}</h1>
                        <small class="text-slate-600">Non so come implementare pagine html con i props :(. Sono state generate ${length} battute però :D </small>
                    </div>
                </body>
            `);
    
            
            res.end(`</html>`);
    
        })
    }
});

server.listen(port, host, () => {
    console.log(`Server avviato: http://${host}:${port}`);
});

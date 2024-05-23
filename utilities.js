const path = require('path');
const fs = require('fs');

const getJoke = (api, callback) => {
    fetch(api)
        .then(response => response.json())
        .then(data =>{
            const file = readJokesFile('norrisDb', 'json');
            if(file.includes(data.value)){
                getJoke(api, callback);
                return;
            }else{
                callback(data);
            }
        });
};

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

const readHtmlFile = (fileName, extension) => {
    const filePath = getFilePath(fileName, extension);
    const file = fs.readFileSync(filePath, "utf-8");
    return file;
}
//returns the last joke
const readLastJoke = (value) => value;


//overwrite the given file
const updateJokesFile = (fileName, extension, content) => {
    const filePath = getFilePath(fileName, extension);
    const file = readJokesFile(fileName, extension);
    const updatedFile = [...file, content];
    const string = JSON.stringify(updatedFile);
    fs.writeFileSync(filePath, string);
}



module.exports = {
    getJoke,
    getFilePath,
    readJokesFile,
    readLastJoke,
    updateJokesFile,
    readHtmlFile
}
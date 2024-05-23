const getJoke = (api, callback) => {
    fetch(api)
        .then(response => response.json())
        .then(data =>{
            callback(data);
        });
};

module.exports = {
    getJoke,
}
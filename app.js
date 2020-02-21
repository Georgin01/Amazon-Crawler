const axios = require('axios');

function axioss(url) {
    axios.get(url)
        .then(response => console.log(response.data));
}

axioss(`https://www.amazon.com/s?k=laptop&page=2`);
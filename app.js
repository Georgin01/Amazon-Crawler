const axios = require('axios');

const basicUrl = 'https://www.amazon.com/s';

function recursiveCrawling(pageNum = 1, arrResults = []) {
    return axios.get(basicUrl, {
        params: {k: 'laptop', page: pageNum},
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
        .then(response => {
            return response.data;
        })
        .then(data => {
            //process some data
        })
        .catch(err => {
           console.error(err);
           return arrResults;
        });
}

recursiveCrawling();
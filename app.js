const axios = require('axios');

import {getLinksCheerio, getProductDataCheerio} from "./cheerioUtil";

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
            console.log(pageNum); //delete in final
            let processedInfo = getLinksCheerio(data);

            if (processedInfo.links) arrResults = arrResults.concat(processedInfo.links);
            if (processedInfo.next) return recursiveCrawling(pageNum+1, arrResults);

            return arrResults;
        })
        .catch(err => {
           console.error(err);
           return arrResults;
        });
}

recursiveCrawling()
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
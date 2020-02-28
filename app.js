const axios = require('axios');

const {getLinksCheerio, getProductDataCheerio} = require ('./cheerioUtil');

const basicUrl = 'https://www.amazon.com/s';

//Getting array of product links
function recursiveLinkCrawling(pageNum = 1, arrResults = []) {
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
            if (processedInfo.next) return recursiveLinkCrawling(pageNum+1, arrResults);

            return arrResults;
        })
        .catch(err => {
           console.error(err);
           return arrResults;
        });
}

function getProductData(link){
    return axios.get(link)
        .then(response => {
            return response.data;
        })
        .then(data => {
            console.log(getProductDataCheerio(data));
        })
        .catch(err => {
            console.log(err);
        })
}

recursiveLinkCrawling()
    .then(data => {
        return getProductData(data[0]);
    })
    .catch(err => console.log(err));
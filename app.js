const axios = require('axios');
const cheerio = require('cheerio');

const basicUrl = 'https://www.amazon.com/s';

function cheerioHandler(html){
    let linksOfProducts = [];

    const $ = cheerio.load(html);

    $('.s-result-item').each((i, elem) => {

            linksOfProducts.push($(elem).data('index'));

    });//linksOfProducts.push(elem));

    return linksOfProducts;
}

function recursiveCrawling(pageNum = 1, arrResults = []) {
    return axios.get(basicUrl, {
        params: {k: 'laptop', page: pageNum},
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
        .then(response => {
            return response.data;
        })
        .then(data => {
            console.log(cheerioHandler(data));
        })
        .catch(err => {
           console.error(err);
           return arrResults;
        });
}

recursiveCrawling();
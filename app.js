const axios = require('axios');
const cheerio = require('cheerio');

const basicUrl = 'https://www.amazon.com/s';

function cheerioHandler(html){
    let linksOfProducts = [];

    const $ = cheerio.load(html);

    $('.s-result-item').each((i, elem) => {
        let link = $(elem).find('.s-border-bottom .a-spacing-medium .sg-row:nth-child(2) div:nth-child(2) .sg-row:first-child a').attr('href');

        //Filtering an advertising links and concat with basic url
        if (link && !link.match(/advertising/g)){
            link = basicUrl.replace('/s', link);
            linksOfProducts.push(link);
        }
    });

    //if button 'NEXT' has class 'a-disabled' (we don`t have nextPage link) - 'hasNextPage' == true
    //So, we use the '!' sign to get false. it is more logical.
    let hasNextPage = !$('.a-spacing-none .a-last').hasClass('a-disabled');

    return {links: linksOfProducts,
            next: hasNextPage};
}
        
function recursiveCrawling(pageNum = 20, arrResults = []) {
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
const cheerio = require('cheerio');

const basicUrl = 'https://www.amazon.com/s';

//we use this function to get links of product
function getLinksCheerio(html,){
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

//we use 'getProductDataCheerio' to get info from product page
function getProductDataCheerio(html) {
    const $ = cheerio.load(html);

    let result = {};

    let techDetailsBase = $('#productDetails_feature_div .a-expander-container:nth-child(2) table tr');

    result.title = $('#centerCol #title span').text().trim();
    result.rating = $('.centerColAlign .a-icon-star span').text();
    result.price = $('#price #priceblock_ourprice_row #priceblock_ourprice').text();

    $(techDetailsBase).each((i, elem) => {
        let key = $(elem).find('th').text().trim();
        result[key] = $(elem).find('td').text().trim();
    });

    return result;
}

module.exports = {
    getLinksCheerio,
    getProductDataCheerio
};
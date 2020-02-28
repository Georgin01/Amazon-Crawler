const {recursiveLinkCrawling, getProductData} = require('./requestingUtil');

recursiveLinkCrawling()
    .then(data => {
        return getProductData(data[0]);
    })
    .catch(err => console.log(err));
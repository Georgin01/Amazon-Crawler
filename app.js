const {recursiveLinkCrawling, getProductData} = require('./requestingUtil');


// function crawler(){
//     return recursiveLinkCrawling()
//         .then(links => {
//             let promises = links.map(link => getProductData(link));
//
//             return Promise.all(promises);
//         })
//         .catch(err => console.log(err));
// }
//
// crawler().then(data => console.log(data));

const {recursiveLinkCrawling, getProductData} = require('./requestingUtil');

const TaskQueue = require('./taskQueue');

let queue = new TaskQueue(2);

async function crawler() {
    let links = await recursiveLinkCrawling();

    if (links.length === 0){
        return Promise.resolve();
    }

    return new Promise((res, rej) => {
        let completed = 0;

        links.forEach(link => {
           let task = () => {
                return getProductData(link)
                    .then(() => {
                        if (++completed === links.length) res();
                    })
                    .catch((err) => {
                         if (err) rej();
                    });
           };
           queue.pushTask(task);
        });
    });
}

crawler().then(data => console.log(data));

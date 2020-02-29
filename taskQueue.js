//The class constructor accepts at the input only the limit of the number of jobs running in parallel,
// but at the same time initializes the 'running' and 'queue' variables.

module.exports = class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    //The pushTask () simply adds the new job to the queue and starts processing by calling the this.next () method.
    //The next () method starts several jobs from the queue, given the set limit.
    pushTask(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        while(this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task().then(() => {
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
};
class Scheduler{
    constructor(){
        this._unreceived_jobs = new PQueue();
        this._schedule_queue = new PQueue();
    }

    addUnreceivedJobs(params) {
        for (var i = 0; i < arguments.length; i++) {
            this._unreceived_jobs.enqueue(arguments[i], arguments[i].getArrivalTime());
        }
    }

    addUnreceivedJob(process){
        this._unreceived_jobs.enqueue(process, process.getArrivalTime());
    }

    Schedule(){
        var time = 0; 
        while ((!this._unreceived_jobs.isEmpty() || !this._schedule_queue.isEmpty())){
            
            while(!this._unreceived_jobs.isEmpty()){

                var process = this._unreceived_jobs.dequeue().element;
                if (process.getArrivalTime() == time){
                    this._schedule_queue.enqueue(process, process.getRemainingTime());
                } else {
                    this.addUnreceivedJob(process);
                    break;
                }
            }

            if(!this._schedule_queue.isEmpty()){
                var current_process = this._schedule_queue.dequeue().element;
                console.log((time + 1) + " " + current_process.getName());
                current_process.setRemainingTime(current_process.getRemainingTime() - 1);
                if (current_process.getRemainingTime() > 0){
                    this._schedule_queue.enqueue(current_process, current_process.getRemainingTime());
                }
            } else {
                console.log((time + 1) + " no processes");
            }
            time += 1;
        }
    }

    print(){
        while (!this._unreceived_jobs.isEmpty()) {
            console.log(this._unreceived_jobs.dequeue().element.getName());
        }
    }
}
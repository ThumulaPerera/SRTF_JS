class Scheduler{
    constructor(){
        this._unreceived_jobs = new PQueue();
        this._schedule_queue = new PQueue();
        this._finished_jobs = [];
        this._executing_order = [];
        this._ready_queue = [];
    }

    addUnreceivedJobs(params) {
        for (var i = 0; i < arguments.length; i++) {
            this._unreceived_jobs.enqueue(arguments[i], arguments[i].getArrivalTime());
        }
    }

    addUnreceivedJob(process){
        this._unreceived_jobs.enqueue(process, process.getArrivalTime());
    }

    schedule(){
        var empty_process = new Process("", 0, 0);
        empty_process.setColor("#FFFFFF");

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

            console.log("before");
            console.log(this._schedule_queue);
            var temp_ready_queue = [];
            while(!this._schedule_queue.isEmpty()){
                var ready_process = this._schedule_queue.dequeue().element;
                temp_ready_queue.push(ready_process);
            }
            
            for(var i=0; i < temp_ready_queue.length; i++){
                this._schedule_queue.enqueue(temp_ready_queue[i], temp_ready_queue[i].getRemainingTime());
            }

            temp_ready_queue.shift();
            this._ready_queue[time] = temp_ready_queue;
            console.log("after");
            console.log(this._schedule_queue);

            
            if(!this._schedule_queue.isEmpty()){
                var current_process = this._schedule_queue.dequeue().element;
                console.log((time + 1) + " " + current_process.getName());
                this._executing_order[time] = current_process;
                current_process.setRemainingTime(current_process.getRemainingTime() - 1);
                if (current_process.getRemainingTime() > 0){
                    this._schedule_queue.enqueue(current_process, current_process.getRemainingTime());
                } else {
                    current_process.setFinishTime(time+1);
                    this._finished_jobs.push(current_process);
                }
            } else {
                this._executing_order[time] = empty_process;
                console.log((time + 1) + " no processes");
            }
            time += 1;
        }
    }

    calcTurnaroundTime(process){
        return process.getFinishTime() - process.getArrivalTime(); 
    }

    calcAvgTurnaroundTime(){
        var total_turnaround_time = 0;
        var total_no_of_processes = this._finished_jobs.length;
        for(var i =0; i < total_no_of_processes; i++){
            var process = this._finished_jobs[i];
            total_turnaround_time += this.calcTurnaroundTime(process);
        }
        return Math.round(total_turnaround_time * 1000/total_no_of_processes) / 1000;
    }

    calcWaitingTime(process){
        return process.getFinishTime() - process.getArrivalTime() - process.getBurstTime();
    }

    calcAvgWaitingTime(){
        var total_waiting_time = 0;
        var total_no_of_processes = this._finished_jobs.length;
        for(var i =0; i < total_no_of_processes; i++){
            var process = this._finished_jobs[i];
            total_waiting_time += this.calcWaitingTime(process);
        }
        return Math.round(total_waiting_time * 1000/total_no_of_processes) / 1000;
    }

    print(){
        while (!this._unreceived_jobs.isEmpty()) {
            console.log(this._unreceived_jobs.dequeue().element.getName());
        }
    }

    printOrder(){
        for (var i = 0; i < this._executing_order.length; i++){
            if (typeof this._executing_order[i] === "object"){
                var process = this._executing_order[i];
                document.write(i + 1 + " " + process.getName() + "\n");
            } else {
                document.write(i + 1 + " " + "no processes \n");
            }
        }
    }

    printWaitingTimes(){
        for (var i = 0; i < this._finished_jobs.length; i++){
            var process = this._finished_jobs[i];
            document.write("waiting time for " + process.getName() + " " + this.calcWaitingTime(process) + "\n");
        }
    }

    getExecutingOrder(){
        return this._executing_order;
    }

    getReadyQueue(){
        return this._ready_queue;
    }
}
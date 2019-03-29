class Process{
    constructor(process_name, arrival_time, burst_time){
        this._arrival_time = arrival_time;
        this._remaining_time = burst_time;
        this._process_name = process_name;
    }

    getArrivalTime(){
        return this._arrival_time;
    }

    getRemainingTime(){
        return this._remaining_time;
    }

    getName(){
        return this._process_name;
    }

    setRemainingTime(remaining_time){
        this._remaining_time = remaining_time;
    }
}
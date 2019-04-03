class Process{
    constructor(process_name, arrival_time, burst_time){
        this._arrival_time = arrival_time;
        this._burst_time = burst_time;
        this._remaining_time = burst_time;
        this._process_name = process_name;
        this._color = getRandomColor();
    }

    getArrivalTime(){
        return this._arrival_time;
    }

    getRemainingTime(){
        return this._remaining_time;
    }

    getBurstTime(){
        return this._burst_time;
    }

    getName(){
        return this._process_name;
    }

    getFinishTime(){
        return this._finish_time;
    }

    getColor(){
        return this._color;
    }

    setRemainingTime(remaining_time){
        this._remaining_time = remaining_time;
    }

    setFinishTime(finish_time){
        this._finish_time = finish_time
    }

    setColor(color){
        this._color = color;
    }
}
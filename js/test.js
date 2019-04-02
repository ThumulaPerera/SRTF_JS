// var p1 = new Process(0, 5, "p1");
// var p2 = new Process(1, 3, "p2");
// var p3 = new Process(2, 10, "p3");
// var p4 = new Process(5, 1, "p4");
// var p5 = new Process(3, 15, "p5");
// var p6 = new Process(1, 6, "p6");
// var p7 = new Process(25, 4, "p7");
// var p8 = new Process(50, 3, "p8");
// var scheduler = new Scheduler();
// scheduler.addUnreceivedJobs(p1,p2,p3,p4,p5,p6,p7,p8);
// scheduler.Schedule();

var scheduler = new Scheduler();
var added_processes = []

function addProcess(){
    console.log("test running");
    var p_name = document.getElementById("process_name_input").value;
    var p_arrival = document.getElementById("arrival_time_input").value;
    var p_burst = document.getElementById("burst_time_input").value;
    clearTextField(document.getElementById("process_name_input"));
    clearTextField(document.getElementById("arrival_time_input"));
    clearTextField(document.getElementById("burst_time_input"));
    var process = new Process(p_name, p_arrival, p_burst);
    this.added_processes.push(process);
    this.showAddedProcess(process);

    var schedule_btn = document.getElementById("schedule_btn");
    schedule_btn.removeAttribute('disabled');
    schedule_btn.setAttribute('class', "btn btn-primary btn-lg active");
}

function addTestDataSet(){
    var p1 = new Process("p1", 0, 8);
    var p2 = new Process("p2", 1, 4);
    var p3 = new Process("p3", 2, 9);
    var p4 = new Process("p4", 3, 5);

    this.added_processes.push(p1);
    this.added_processes.push(p2);
    this.added_processes.push(p3);
    this.added_processes.push(p4);

    this.showAddedProcess(p1);
    this.showAddedProcess(p2);
    this.showAddedProcess(p3);
    this.showAddedProcess(p4);

    var schedule_btn = document.getElementById("schedule_btn");
    schedule_btn.removeAttribute('disabled');
    schedule_btn.setAttribute('class', "btn btn-primary btn-lg active");
}

function clearTextField(elementRef){
    elementRef.value = '';
}

function addToUnreceivedJobs(){
    for(var i = 0; i < this.added_processes.length; i++){
        scheduler.addUnreceivedJob(this.added_processes[i]);
    }
}

function displayLast(){
    document.getElementById("input_page").style.display = "none";
}

function schedule(){
    this.addToUnreceivedJobs();
    this.makeProcessTable();
    scheduler.schedule();
    this.showAvgTAT();
    this.showAvgWaiting();
    this.displayLast();
    // scheduler.printOrder();
    // scheduler.printWaitingTimes();
}

function showAddedProcess(process){
    console.log("show added process running");
    var table = document.getElementById("process_list");

    var tr = document.createElement("tr");
    tr.setAttribute('id',process.getName());

    var td_process_name = document.createElement("td");
    var td_arrival_time = document.createElement("td");
    var td_burst_time = document.createElement("td");
    var td_delete_btn = document.createElement("td");

    var delete_btn = document.createElement("button");
    delete_btn.setAttribute('onClick', "deleteAddedProcess(this)");
    delete_btn.setAttribute('class', "btn btn-danger")
    delete_btn.innerHTML = "X";
    
    td_process_name.innerText = process.getName();
    td_arrival_time.innerText = process.getArrivalTime();
    td_burst_time.innerText = process.getBurstTime();
    
    td_delete_btn.appendChild(delete_btn);

    tr.appendChild(td_process_name);
    tr.appendChild(td_arrival_time);
    tr.appendChild(td_burst_time);
    tr.appendChild(td_delete_btn);

    table.appendChild(tr);
}

function deleteAddedProcess(row){
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById("process_list").deleteRow(i);
    added_processes.splice(i - 1, 1);
    if(added_processes.length == 0){
        var schedule_btn = document.getElementById("schedule_btn");
        schedule_btn.setAttribute('disabled', "");
        schedule_btn.setAttribute('class', "btn btn-primary btn-lg disabled");
    }
}

function makeProcessTable(){
    for(var i = 0; i < this.added_processes.length; i++){
        this.addToProcessTable(this.added_processes[i]);
    }
}

function addToProcessTable(process){
    console.log("show added process running");
    var table = document.getElementById("process_table");

    var tr = document.createElement("tr");
 
    var td_process_name = document.createElement("td");
    var td_arrival_time = document.createElement("td");
    var td_burst_time = document.createElement("td");
    
    td_process_name.innerText = process.getName();
    td_arrival_time.innerText = process.getArrivalTime();
    td_burst_time.innerText = process.getBurstTime();
  
    tr.appendChild(td_process_name);
    tr.appendChild(td_arrival_time);
    tr.appendChild(td_burst_time);

    table.appendChild(tr);
}

function showAvgTAT(){
    var element = document.getElementById("avg_tat");
    var avg_tat = scheduler.calcAvgTurnaroundTime();
    element.innerHTML = avg_tat;
}

function showAvgWaiting(){
    var element = document.getElementById("avg_waiting");
    var avg_waiting = scheduler.calcAvgWaitingTime();
    element.innerHTML = avg_waiting;
}


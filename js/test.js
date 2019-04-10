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
var added_processes = [];

displayFirst();

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
    document.getElementById("results_page").style.display = "block";
}

function displayFirst(){
    document.getElementById("results_page").style.display = "none";
}

function schedule(){
    this.addToUnreceivedJobs();
    scheduler.schedule();
    this.makeProcessTable();
    this.showAvgTAT();
    this.showAvgWaiting();
    this.drawGanttChart();
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
    var td_color = document.createElement("td");
    var td_delete_btn = document.createElement("td");

    var delete_btn = document.createElement("button");
    delete_btn.setAttribute('onClick', "deleteAddedProcess(this)");
    delete_btn.setAttribute('class', "btn btn-danger")
    delete_btn.innerHTML = "X";
    
    td_process_name.innerText = process.getName();
    td_arrival_time.innerText = process.getArrivalTime();
    td_burst_time.innerText = process.getBurstTime();
    
    td_delete_btn.appendChild(delete_btn);

    var dot = document.createElement("div");
    dot.setAttribute('class', "rounded-circle color-dot");
    dot.setAttribute('style', "background-color:" + process.getColor() + ";");

    td_color.setAttribute('align', "center");
    td_color.appendChild(dot);

    tr.appendChild(td_process_name);
    tr.appendChild(td_arrival_time);
    tr.appendChild(td_burst_time);
    tr.appendChild(td_color);
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
 
    var td_color = document.createElement("td");
    var td_process_name = document.createElement("td");
    var td_arrival_time = document.createElement("td");
    var td_burst_time = document.createElement("td");
    var td_info_button = document.createElement("td");
    
    td_process_name.innerText = process.getName();
    td_arrival_time.innerText = process.getArrivalTime();
    td_burst_time.innerText = process.getBurstTime();

    var dot = document.createElement("div");
    dot.setAttribute('class', "rounded-circle color-dot");
    dot.setAttribute('style', "background-color:" + process.getColor() + ";");

    td_color.setAttribute('align', "center");
    td_color.appendChild(dot);

    var info_img = document.createElement("img");
    info_img.setAttribute('src', "images/info.png");
    info_img.setAttribute('class', "rounded-circle color-dot");

    var info = document.createElement("button");
    console.log(process.getColor());
    info.setAttribute('onclick', "showProcessInfo(\'" + process.getName() + "\'," + scheduler.calcTurnaroundTime(process) + "," + scheduler.calcWaitingTime(process) + "," + "\'" + process.getColor() + "\')");

    info.appendChild(info_img);

    td_info_button.setAttribute('align', "center");
    td_info_button.appendChild(info);

    tr.appendChild(td_color);
    tr.appendChild(td_process_name);
    tr.appendChild(td_arrival_time);
    tr.appendChild(td_burst_time);
    tr.appendChild(td_info_button);

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

function drawGanttChart(){
    var chart_elements = scheduler.getExecutingOrder();
    var chart = document.getElementById("gantt_chart");

    var length = chart_elements.length;
    var ele_length = (length > 30) ? 100/30 : 100/length;
    console.log("ele_length " + ele_length);
    
    var no_of_rows = Math.ceil(length/30);
    console.log("no of rows " + no_of_rows);


    for(var i = 0; i < no_of_rows; i++){
        var chart_row = document.createElement("div");
        chart_row.setAttribute('class', "row gantt-row");
        chart_row.setAttribute('id', "gantt_chart_" + i); //might not be needed

        var time_row = document.createElement("div");
        time_row.setAttribute('class', "row");
        time_row.setAttribute('id', "gantt_time_" + i); //might not be needed

        for(var j = i * 30; j < (i * 30) + 30; j++){
            if(j < length){
                addChartElement(chart_elements[j], chart_row, ele_length);
                if(j == 0){
                    addChartStartingElementTime(j + 1, time_row, ele_length);
                } else {
                    addChartElementTime(j + 1, time_row, ele_length);
                }
            }
        }

        chart.appendChild(chart_row);
        chart.appendChild(time_row);
    }
}

function addChartElement(process, row, ele_length){
    var div = document.createElement("div");
    div.setAttribute('style', "width: "+ ele_length +"%;");
   
    var inner_div = document.createElement("div");
    inner_div.setAttribute('class', "card chart-card");
    inner_div.setAttribute('style', "background-color:"+ process.getColor() + ";");

    var p = document.createElement("span");
    p.setAttribute('class', "tooltiptext");

    if (process.getName() == ""){
        p.innerHTML = "no process";
    } else {
        p.innerHTML = process.getName();
    }
   
    inner_div.appendChild(p);
    div.appendChild(inner_div);
    row.appendChild(div);
}

function addChartElementTime(time, row, ele_length){
    var main_div = document.createElement("div");
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white;");
    
    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright");
    right_p.innerHTML = time;

    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function addChartStartingElementTime(time, row, ele_length){
    var main_div = document.createElement("div");
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white;");
    
    var left_p = document.createElement("p");
    left_p.setAttribute('class', "alignleft");
    left_p.innerHTML = time - 1;

    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright");
    right_p.innerHTML = time;

    main_div.appendChild(left_p);
    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function showProcessInfo(process_name, tat, waiting_time, process_color){
    console.log("showProcessInfo works");
    console.log(tat);
    console.log(waiting_time);

    var modal = document.getElementById('myModal');
    var process_info_card = document.getElementById("process-info-card");
    var process_info_inner_card = document.getElementById("process-info-inner-card");

    process_info_inner_card.setAttribute('style', "background:" + process_color + ";");

    if(isDark(hexToRgb(process_color))){
        process_info_card.setAttribute('style', "color:white;");
    }else{
        process_info_card.setAttribute('style', "color:black;");
    }

    var p_name = document.getElementById("modal_process_name");
    p_name.innerHTML = process_name;

    var p_tat = document.getElementById("modal_turnaround_time");
    p_tat.innerHTML = "Turnaround time : " + tat;

    var p_waiting = document.getElementById("modal_waiting_time");
    p_waiting.innerHTML = "Waiting time : " + waiting_time;
    
    modal.style.display = "block";
}


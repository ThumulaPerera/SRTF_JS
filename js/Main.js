var scheduler = new Scheduler();
var added_processes = [];
var ele_length;
var const_delay=2000;

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

function displayFirst(){
    document.getElementById("results_page").style.display = "none";
    document.getElementById("progress_page").style.display = "none";
}

function displayProgress(){
    document.getElementById("input_page").style.display = "none";
    document.getElementById("progress_page").style.display = "block";
    document.getElementById("results_page").style.display = "none";
}

function displayLast(){
    document.getElementById("input_page").style.display = "none";
    document.getElementById("progress_page").style.display = "none";
    document.getElementById("results_page").style.display = "block";
}



function schedule(){
    addToUnreceivedJobs();
    scheduler.schedule();
    
    makeProgressProcessTable();
    drawProgressGanttChart();
    showReadyQueue();

    makeProcessTable();
    showAvgTAT();
    showAvgWaiting();
    drawGanttChart();

    displayProgress();
    animateProgressGanttChart();
    showCurrentProcess();
}

function showAddedProcess(process){
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

    //for validation
    addProcessVerify();

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
    ele_length = (length > 30) ? 100/30 : 100/length;
    console.log("ele_length " + ele_length);
    
    var no_of_rows = Math.ceil(length/30);
    console.log("no of rows " + no_of_rows);


    for(var i = 0; i < no_of_rows; i++){
        var chart_row = document.createElement("div");
        chart_row.setAttribute('class', "row gantt-row");

        var time_row = document.createElement("div");
        time_row.setAttribute('class', "row");

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

function addChartElement(process, row, ele_length, ele_number){
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

function addChartElementTime(time, row, ele_length, ele_number){
    var main_div = document.createElement("div");
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white;");
    
    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright gantt-text");
    right_p.innerHTML = time;

    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function addChartStartingElementTime(time, row, ele_length, ele_number){
    var main_div = document.createElement("div");
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white;");
    
    var left_p = document.createElement("p");
    left_p.setAttribute('class', "alignleft gantt-text");
    left_p.innerHTML = time - 1;

    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright gantt-text");
    right_p.innerHTML = time;

    main_div.appendChild(left_p);
    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function showProcessInfo(process_name, tat, waiting_time, process_color){
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

function refresh(){
    location.reload();
}

function printPage() {
    var process_table_main = document.getElementById("process_table_main");
    process_table_main.classList.remove("column-wide");
    process_table_main.classList.remove("left-4");

    var gantt_chart_main = document.getElementById("gantt_chart_main");
    gantt_chart_main.setAttribute('class', "mt-5");

    $("#reset_btn").hide();
    $("#print_btn").hide();

    window.print();

    process_table_main.setAttribute('class', "column-wide left-4");
    gantt_chart_main.setAttribute('class', "column-wide right-8");

    $("#reset_btn").show();
    $("#print_btn").show();
}

function makeProgressProcessTable(){
    for(var i = 0; i < this.added_processes.length; i++){
        this.addToProgressProcessTable(this.added_processes[i]);
    }
}

function addToProgressProcessTable(process){
    var table = document.getElementById("progress_process_table");

    var tr = document.createElement("tr");
 
    var td_color = document.createElement("td");
    var td_process_name = document.createElement("td");
    var td_arrival_time = document.createElement("td");
    var td_burst_time = document.createElement("td");
    
    td_process_name.innerText = process.getName();
    td_arrival_time.innerText = process.getArrivalTime();
    td_burst_time.innerText = process.getBurstTime();

    var dot = document.createElement("div");
    dot.setAttribute('class', "rounded-circle color-dot");
    dot.setAttribute('style', "background-color:" + process.getColor() + ";");

    td_color.setAttribute('align', "center");
    td_color.appendChild(dot);

    tr.appendChild(td_color);
    tr.appendChild(td_process_name);
    tr.appendChild(td_arrival_time);
    tr.appendChild(td_burst_time);

    table.appendChild(tr);
}

function drawProgressGanttChart(){
    var chart_elements = scheduler.getExecutingOrder();
    var chart = document.getElementById("progress_gantt_chart");

    var length = chart_elements.length;
    ele_length = (length > 30) ? 100/30 : 100/length;
    
    var no_of_rows = Math.ceil(length/30);

    for(var i = 0; i < no_of_rows; i++){
        var chart_row = document.createElement("div");
        chart_row.setAttribute('class', "row gantt-row");
        chart_row.setAttribute('style', "opacity:0.0;");
        chart_row.setAttribute('id', "gantt_chart_" + i); 
        

        var time_row = document.createElement("div");
        time_row.setAttribute('class', "row");
        time_row.setAttribute('id', "gantt_time_" + i); 

        for(var j = i * 30; j < (i * 30) + 30; j++){
                if(j < length){
                    addProgressChartElement(chart_elements[j], chart_row, ele_length, j);
                    if(j == 0){
                        addProgressChartStartingElementTime(j + 1, time_row, ele_length, j);
                    } else {
                        addProgressChartElementTime(j + 1, time_row, ele_length, j);
                    }
                }
                chart.appendChild(chart_row);
                chart.appendChild(time_row);
        }
    }
}

function addProgressChartElement(process, row, ele_length, ele_number){
    var div = document.createElement("div");
    div.setAttribute('id', "chart_ele_" + ele_number);
    div.setAttribute('style', "width:0;");
   
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

function addProgressChartElementTime(time, row, ele_length, ele_number){
    var main_div = document.createElement("div");
    main_div.setAttribute('id', "time_ele_" + ele_number);
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white; opacity:0.0;");
    
    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright gantt-text");
    right_p.innerHTML = time;

    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function addProgressChartStartingElementTime(time, row, ele_length, ele_number){
    var main_div = document.createElement("div");
    main_div.setAttribute('id', "time_ele_" + ele_number);
    main_div.setAttribute('style', "width: "+ ele_length +"%; color: white; opacity:0.0;");
    
    var left_p = document.createElement("p");
    left_p.setAttribute('class', "alignleft gantt-text");
    left_p.innerHTML = time - 1;

    var right_p = document.createElement("p");
    right_p.setAttribute('class', "alignright gantt-text");
    right_p.innerHTML = time;

    main_div.appendChild(left_p);
    main_div.appendChild(right_p);
    
    row.appendChild(main_div);
}

function animateProgressGanttChart(){
    var chart_elements = scheduler.getExecutingOrder();
    var length = chart_elements.length;
 
    for (var i = 0; i < length; i++){

        if(i % 30 == 0){
            var row_no = i / 30;
            var chart_row_id = "#gantt_chart_".concat(row_no);
            var time_row_id = "gantt_time_".concat(row_no);

            animateChartRow(chart_row_id,i*const_delay);
            animateTimeRow(time_row_id,i*const_delay);
        }
        
        var card_id = "#chart_ele_".concat(i);
        var time_id = "#time_ele_".concat(i);

        animateChartElement(card_id,i*const_delay);
        animateTimeElement(time_id,i*const_delay);
    }
}

function animateChartElement(id, delay){
    var card = $(id);
    card.delay(delay).animate({width:ele_length+"%"});
}

function animateTimeElement(id, delay){
    var time = $(id);
    time.delay(delay).animate({opacity:1.0});
}

function animateChartRow(id,delay){
    var chart_row = $(id);
    chart_row.delay(delay).animate({opacity:1.0});
}

function animateTimeRow(id,delay){
    var time_row = $(id);
    time_row.delay(delay).animate({opacity:1.0});
}

function showCurrentProcess(){
    var executing_order = scheduler.getExecutingOrder();
    var main_div = document.getElementById("current_process");

    for (var i = 0; i < executing_order.length; i++){
        var process_name = executing_order[i].getName();
        var process_color = executing_order[i].getColor();

        var process_card_wrap = document.createElement("div");
        var process_card = document.createElement("div");
        
        process_card_wrap.setAttribute('class', "current-process-wrap h4 mt-2");
        process_card_wrap.setAttribute('id',"current_process_card_".concat(i));

        process_card.setAttribute('class', "card current-process");
        process_card.setAttribute('style', "background:"+ process_color + ";");
        process_card.innerHTML = process_name;

        if(isDark(hexToRgb(process_color))){
            process_card_wrap.setAttribute('style', "color:white;");
        }else{
            process_card_wrap.setAttribute('style', "color:black;");
        }

        process_card_wrap.appendChild(process_card)
        main_div.appendChild(process_card_wrap);

        var current_process_id = $("#current_process_card_".concat(i));
        current_process_id.hide();
    }

    for(var i = 0; i < executing_order.length; i++){
        var current_process_id = "#current_process_card_".concat(i);
        animateCurrentProcess(current_process_id, i * const_delay);
    }
}

function animateCurrentProcess(id, delay){

    var current_process_id = $(id);
    current_process_id.delay(delay).fadeToggle(const_delay/10);
    current_process_id.delay(const_delay*8/10).fadeToggle(const_delay/10);
}

function showReadyQueue(){
    
    var ready_queue = scheduler.getReadyQueue();
    var main_div = document.getElementById("ready_queue");
    var max_ready_queue_length = 0;

    for(var i=0; i < ready_queue.length; i++){
        var current_ready_queue_length = ready_queue[i].length;

        if(current_ready_queue_length > max_ready_queue_length){
            max_ready_queue_length = current_ready_queue_length
        }
    }

    for(var i=0; i < ready_queue.length; i++){
        var outer_div = document.createElement("div");
        outer_div.setAttribute('class', "ready-queue-row");
        outer_div.setAttribute('id', "ready_queue_row_".concat(i));
        for(var j=0; j < ready_queue[i].length; j++){
            addReadyQueueElement(ready_queue[i][j], outer_div, 100/max_ready_queue_length);
        }
        main_div.appendChild(outer_div);

        var ready_queue_row_id = $("#ready_queue_row_".concat(i));
        ready_queue_row_id.hide();
    }

    for(var i = 0; i < ready_queue.length; i++){
        var ready_queue_row_id = "#ready_queue_row_".concat(i);
        animateCurrentProcess(ready_queue_row_id, i * const_delay);
    }

}

function addReadyQueueElement(process, outer_div, width){
    var div_width = width;
    if (div_width>20){
        div_width=20;
    }

    var div = document.createElement("div");
    div.setAttribute('style', "width:" + div_width + "%;");
    div.setAttribute('class', "ready-queue-process");
   
    var inner_div = document.createElement("div");
    inner_div.setAttribute('class', "card chart-card");
    inner_div.setAttribute('style', "background-color:"+ process.getColor() + ";");
    if(div_width > 10){
        var name_div = document.createElement("div");
        name_div.innerHTML = process.getName();
        name_div.setAttribute('class', "ready-queue-name");
        
        if(isDark(hexToRgb(process.getColor()))){
            name_div.setAttribute('style', "color:white;");
        }else{
            name_div.setAttribute('style', "color:black;");
        }

        inner_div.appendChild(name_div);
    }

    var p = document.createElement("span");
    p.setAttribute('class', "tooltiptext");
    p.innerHTML = process.getName();
       
    inner_div.appendChild(p);
    div.appendChild(inner_div);
    outer_div.appendChild(div);
}

function animateReadyQueueRow(id, delay){
    var current_process_id = $(id);
    current_process_id.delay(delay).fadeToggle(const_delay/10);
    current_process_id.delay(const_delay*8/10).fadeToggle(const_delay/10);
}


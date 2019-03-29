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

function testFunction(){
    var p_name = document.getElementById("process_name_input").value;
    var p_arrival = document.getElementById("arrival_time_input").value;
    var p_burst = document.getElementById("burst_time_input").value;
    clearTextField(document.getElementById("process_name_input"));
    clearTextField(document.getElementById("arrival_time_input"));
    clearTextField(document.getElementById("burst_time_input"));
    var process = new Process(p_name, p_arrival, p_burst);
    scheduler.addUnreceivedJob(process);
}

function clearTextField(elementRef){
    elementRef.value = '';
}

function printF(){
    scheduler.print();
}
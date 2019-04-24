var input_p_name = document.getElementById("process_name_input");
var input_arrival_time = document.getElementById("arrival_time_input");
var input_burst_time = document.getElementById("burst_time_input");

var name_error = document.getElementById("name_error");
var arrival_time_error = document.getElementById("arrival_time_error");
var burst_time_error = document.getElementById("burst_time_error");
var general_error = document.getElementById("general_error")

input_p_name.addEventListener("blur", nameVerify, true);
input_arrival_time.addEventListener("blur", arrivalVerify, true);
input_burst_time.addEventListener("blur", burstVerify, true);

function validate(){
    //other validators
    if (added_processes.length >= 20){
        general_error.textContent = "*maximum number of processes addded";
        return false;
    }
    var tot_burst_time = 0;
    for(var i = 0; i < added_processes.length; i++){
        tot_burst_time += parseInt(added_processes[i].getBurstTime());
    }
    console.log("from validator : " + tot_burst_time);
    if(tot_burst_time + parseInt(input_burst_time.value) > 300){
        general_error.textContent = "*total burst time of the processes must not exceed 300";
        return false;
    }

    //process name validators
    if (input_p_name.value == ""){
        input_p_name.style.border = "4px solid yellow";
        name_error.textContent = "*process name is required";
        input_p_name.focus();
        return false;
    }
    if (input_p_name.value.length > 10){
        input_p_name.style.border = "4px solid yellow";
        name_error.textContent = "*process name must not exceed 10 characters";
        input_p_name.focus();
        return false;
    }
    if (!(/^[a-zA-Z0-9_.-]*$/.test(input_p_name.value))){
        input_p_name.style.border = "4px solid yellow";
        name_error.textContent = "*process name can only contain letters, numbers, underscore(_), dot(.) and, dash(-)";
        input_p_name.focus();
        return false;
    }
    for(var i = 0; i < added_processes.length; i++){
        if(input_p_name.value == added_processes[i].getName()){
            input_p_name.style.border = "4px solid yellow";
            name_error.textContent = "*process name has already been used";
            input_p_name.focus();
            return false;
        }
    }
    
    //arrival time validators
    if (input_arrival_time.value == ""){
        input_arrival_time.style.border = "4px solid yellow";
        arrival_time_error.textContent = "*arrival time is required";
        input_arrival_time.focus();
        return false;
    }
    if (input_arrival_time.value < 0){
        input_arrival_time.style.border = "4px solid yellow";
        arrival_time_error.textContent = "*arrival time cannot be negative";
        input_arrival_time.focus();
        return false;
    }
    if (input_arrival_time.value > 200){
        input_arrival_time.style.border = "4px solid yellow";
        arrival_time_error.textContent = "*arrival time cannot exceed 200";
        input_arrival_time.focus();
        return false;
    }

    //burst time validators
    if (input_burst_time.value == ""){
        input_burst_time.style.border = "4px solid yellow";
        burst_time_error.textContent = "*burst time is required";
        input_burst_time.focus();
        return false;
    }
    if (input_burst_time.value < 1){
        input_burst_time.style.border = "4px solid yellow";
        burst_time_error.textContent = "*burst time must be positive";
        input_burst_time.focus();
        return false;
    }

    //execute if validation passed
    else{
        addProcess();
    }
}

function nameVerify(){
    if (input_p_name.value != ""){
        if (!(input_p_name.value.length > 10)){
            if (/^[a-zA-Z0-9_.-]*$/.test(input_p_name.value)){
                input_p_name.style.border = "";
                name_error.innerHTML = "";
                return true;
            }
        }
    }
}

function arrivalVerify(){
    if (input_arrival_time.value != ""){
        if(!(input_arrival_time.value < 0)){
            if(!(input_arrival_time.value > 200)){
                input_arrival_time.style.border = "";
                arrival_time_error.innerHTML = "";
                return true;
            }
        }
    }
}

function burstVerify(){
    if (input_burst_time.value != ""){
        if(!(input_burst_time.value < 1)){
            input_burst_time.style.border = "";
            burst_time_error.innerHTML = "";
            return true;
        }
    }
}

function addProcessVerify(){
    if (!(added_processes.length >= 20)){
        general_error.innerHTML = "";
        return true;
    }
}
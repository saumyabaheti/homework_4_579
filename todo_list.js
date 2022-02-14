let addButton = document.querySelector("#add_task");
let description_input = document.querySelector("#task_description_input");
let date_input = document.querySelector("#duedate_input");
let time_input = document.querySelector("#duetime_input");
let list_input = document.querySelector("#task_list");

addTask('Play in the snow', 1639944400000)
addTask('Eat five apples', false)
addTask('Read a book')
addTask('Attend office', 1639944400000)

addButton.addEventListener("click", function() {
    addTask(description_input.value, dateAndTimeToTimestamp(date_input, time_input))
});

description_input.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        addTask(description_input.value, dateAndTimeToTimestamp(date_input, time_input));
    }
});

function addTask(description, dueTime = false) {

    let el = document.createElement('li');
    let btn = document.createElement('button');
    btn.classList.add("btn", "btn-sm", "btn-outline-danger", "done");
    btn.type = "button";
    btn.innerHTML = "Done";

    btn.addEventListener("click", removeItem);

    if (dueTime != false) {
        let spanElement = document.createElement('span');
        let date = new Date(dueTime);
        spanElement.innerHTML = " due " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
        spanElement.classList.add("due");
        el.innerHTML = description;
        el.appendChild(spanElement);
        el.appendChild(btn);

    }
    else {
        el.innerHTML = description;
        el.appendChild(btn);
    }

    
    list_input.appendChild(el);

    description_input.value = "";
    date_input.value = "";
    time_input.value = "";

    function removeItem() {

        el.remove();
    
    }

}


function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}
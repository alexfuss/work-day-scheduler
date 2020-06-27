$(document).ready(function() {
    

    // adding a test for logged information
    const test = false;

    //REMOVE - Moment js info
    const now = moment().format('MMMM Do YYYY');
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');

    if (test) {
        nowHour24 = 13;
        nowHOur12 = 1;
    }

    let $dateHeading = $("#currentDay");
    $dateHeading.text(now);

    // below is a link to a font awesome icon
    const saveIcon = "./images/save-solid.svg";

    // Grab the stored information from local storage
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) {console.log(storedPlans);}

    if (storedPlans !== null) {
        planTextArr = storedPlans;
    }
    else {
        // fun little reminder that you need to eat!
        planTextArr = new Array(9);
        planTextArr[4] = "Eat Dude!";
    }

    if (test) {console.log("full array of planned text", planTextArr);}

    // create the variable that references the planner element
    let $plannerDiv = $("#plannerContainer");

    // empty out the existing elements
    $plannerDiv.empty();

    if (test) {console.log("current time", nowHour12);}

    // begin to build out the actual calendar
    // looping through the hour times and adding rows to make sure the calendar can operate
    for (let hour = 9; hour <= 17; hour++) {
        let index = hour - 9;

        //build the row components
        let $rowDiv = $("<div>");
        $rowDiv.addClass("row");
        $rowDiv.addClass("time-block");
        $rowDiv.attr("hour-index", hour);

        // The time box will be operated from the following:
        let $col2TimeDiv = $("<div>");
        $col2TimeDiv.addClass("col-md-2");

        // create the actual time container
        const $timeBoxSpn = $("<span>");
        $timeBoxSpn.attr("class", "timeBox");

        // added formatting to display the hours
        let displayHour = 0;
        let ampm = " ";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        }
        else {
            displayHour = hour;
            ampm = "am";
        }

        // add the time to the time box span
        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        // insert the bootstrap col div to the time box span
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);

        // the below portions will be added to each row:
        let $dailyPlanSpn = $("<input>");

        $dailyPlanSpn.attr("id", `input-${index}`);
        $dailyPlanSpn.attr("hour-index", index);
        $dailyPlanSpn.attr("type", "text");
        $dailyPlanSpn.attr("class", "dailyPlan");

        // access the index from the data array for the hour
        $dailyPlanSpn.val(planTextArr[index]);

        // create an additional bootstrap div for the width
        let $col9IptDiv = $("<div>");
        $col9IptDiv.addClass("col-md-9");

        // update the row for the specific col width
        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);

        let $col1SaveDiv = $("<div>");
        $col1SaveDiv.addClass("col-md-1");

        let $saveBtn = $("<i>");
        $saveBtn.attr("id", `saveid-${index}`);
        $saveBtn.attr("save-id", index);
        $saveBtn.attr("class", "fas fa-save saveIcon");

        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);

        // add coloring to the rows - function is setup below
        updateRowColor($rowDiv, hour);

        $plannerDiv.append($rowDiv);
    };

    // function referenced above to change the row color based on the time
    function updateRowColor($hourRow,hour) {
        
        if (hour < nowHour24) {
            $hourRow.css("background-color", "lightgrey");
        }
        else if (hour > nowHour24) {
            $hourRow.css("background-color", "lightgreen");
        }
        else {

            $hourRow.css("background-color", "red");
        }
    };

    // save the information to local storage
    $(document).on("click", "i", function(event) {
        event.preventDefault();

        let $index = $(this).attr("save-id");

        let inputId = "#input-"+$index;
        let $value = $(inputId).val();

        planTextArr[$index] = $value;

        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    $(document).on("change", "input", function(event){
        event.preventDefault();

        let i = $(this).attr("hour-index");
    });

})
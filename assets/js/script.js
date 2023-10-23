// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D "));

  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  }, 1000);

  var currentTime = dayjs().format("h:mm A");
  var currentHour = dayjs().format("hh");
  var isMorning;

  if (currentTime.slice(currentTime.length - 2) == "AM") {
    isMorning = true;
  } else {
    isMorning = false;
  }

  for (var i = 9; i < 13; i++) {
    var testing = document.getElementById("hour-" + i);

    $(testing)
      .children("textarea")
      .text(localStorage.getItem("hour-" + i));

    if (!isMorning && currentHour != 12) {
      testing.setAttribute("class", "row time-block past");
    } else {
      if (i < currentHour) {
        testing.setAttribute("class", "row time-block past");
      } else if (i > currentHour) {
        testing.setAttribute("class", "row time-block future");
      } else {
        testing.setAttribute("class", "row time-block present");
      }
    }
  }

  for (var i = 1; i < 6; i++) {
    var testing = document.getElementById("hour-" + i);

    $(testing)
      .children("textarea")
      .text(localStorage.getItem("hour-" + i));

    if (!isMorning && currentHour == 12) {
      testing.setAttribute("class", "row time-block future");
    } else {
      if (i < currentHour) {
        testing.setAttribute("class", "row time-block past");
      } else if (i > currentHour) {
        testing.setAttribute("class", "row time-block future");
      } else {
        testing.setAttribute("class", "row time-block present");
      }
    }
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $("button").click(function () {
    console.log($(this).parent().attr("id"));
    console.log($(this).parent().children("textarea").val());

    var hourBox = $(this).parent().attr("id");
    var textBox = $(this).parent().children("textarea").val();

    localStorage.setItem(hourBox, textBox);
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let selectedDayOfTheWeek = document.getElementById("selectedDayOfTheWeek");
let selectedDay = document.getElementById("selectedDay");
let selectedMonth = document.getElementById("selectedMonth");
let selectDayIndex = 1;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let monthAndYear = document.getElementById("monthAndYear");
let dayAndMonth = document.getElementById("dayAndMonth");

showCalendar(currentMonth, currentYear);
selectDate(currentMonth);

// Select Date
function selectDate(el) {
  // Find all elements with class="future-date"
  const futureDates = document.querySelectorAll(".future-date");
  // Remove all classes "selected-date" in class="future-date"
  for (let i = 0; i < futureDates.length; i++) {
    futureDates[i].addEventListener("click", function() {
      futureDates.forEach(element => {
        element.classList.remove("selected-date");
      });

      // Add class to the selected element
      this.classList.toggle("selected-date");

      // ELements in row with selected date
      let rowElements = document.querySelector(".selected-date").parentElement
        .children;

      // Transform HTML collection to Array
      let arr = [...rowElements];

      // Find index of selected element
      for (const key in arr) {
        if (arr[key].classList.contains("selected-date")) {
          selectDayIndex = key;
        }
      }

      // Get selected date
      let selectedDate = document.querySelector(".selected-date .date-item")
        .innerHTML;

      // Display Selected Day and Month
      selectedDayOfTheWeek.innerHTML = `${days[selectDayIndex]}`;
      selectedDay.innerHTML = `${selectedDate}`;
      selectedMonth.innerHTML = `, ${months[el]}`;
    });
  }
}

// Move to the next month
function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  selectDate(currentMonth);
}

// Move to the previous month
function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  selectDate(currentMonth);
}

// Building calendar
function showCalendar(month, year) {
  // Define the start day of month
  let firstDay = new Date(year, month).getDay();
  // Check how many days in a month
  // new Date(year, month, 32) returns the 32nd day after the month started.
  // If we subtract that date from 32, we get the final day of that month
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = `${months[month]} ${year}`;

  // Set Selected Day and Month
  selectedDayOfTheWeek.innerHTML = `${days[firstDay]}`;
  selectedDay.innerHTML = `${daysInMonth}`;
  selectedMonth.innerHTML = `, ${months[month]}`;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let div = document.createElement("div");
        let cellText = document.createTextNode("");
        div.appendChild(cell);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);

        // Add Class "current-date" to current day
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("current-date");
          cell.classList.add("future-date");
        }
        // Add class "future-date" for all future days except Sunday and Saturday
        else if (date > today.getDate() && j % 6 && month >= today.getMonth()) {
          cell.classList.add("future-date");
        }
        // Add class "future-date" for future days except Sunday and Saturday
        else if (
          (month > today.getMonth() || year > today.getFullYear()) &&
          j % 6
        ) {
          cell.classList.add("future-date");
          console.log(today.getMonth() + " " + today.getFullYear());
        }
        // Add <td> to <tr>
        row.appendChild(cell);
        // Add <div> to <td>
        cell.innerHTML = `<div class="date-item">${date}</div>`;
        date++;
      }
    }
    tbl.appendChild(row); // appending each row into calendar body.
  }
}

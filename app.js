const container = document.querySelector(".container");
//puts them all into a node list
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUi();

// assign the ticket price as the value of the movie selection converted to a number
let ticketPrice = +movieSelect.value;
console.log(ticketPrice);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total price and seat count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const numberOfSeats = selectedSeats.length;

  //   // copy selected seats into an array (using spread op to convert node list into an array)
  //   const seatIndex = [...selectedSeats];
  //   // map through the array - to return an array of indexes
  //   seatIndex.map(function () {
  //     return [...seats].indexOf(seats);
  //   });

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // creating local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = numberOfSeats;
  total.innerText = numberOfSeats * ticketPrice;
}

//Retrieve and display data from local storage and show on UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seats, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seats.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie choice and event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData();
  updateSelectedCount();
});

// Seat Choice and Event
container.addEventListener("click", (e) => {
  if (
    //   if element classlists containe x and does not contain x then
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // e.target.classList.add("selected");
    // e.target.classList.remove("selected");
    e.target.classList.toggle("selected");

    updateSelectedCount();
    //   update total number of seats

    //   update total price = ticket price x number of seats
  }
});

// Initial Count and Total
updateSelectedCount();

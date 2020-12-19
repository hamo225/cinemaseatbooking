const container = document.querySelector(".container");
//puts them all into a node list
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// assign the ticket price as the value of the movie selection converted to a number
let ticketPrice = +movieSelect.value;
console.log(ticketPrice);

// Update total price and seat count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const numberOfSeats = selectedSeats.length;

  count.innerText = numberOfSeats;
  total.innerText = numberOfSeats * ticketPrice;
}

// Movie choice and event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
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

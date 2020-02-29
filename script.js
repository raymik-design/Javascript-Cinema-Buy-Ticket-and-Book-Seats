/*eslint-disable*/

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.ocuppied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI(); //20

let ticketPrice = +movieSelect.value; // + sign converts string to a number

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) { //17
  localStorage.setItem('selectedMovieIndex', movieIndex); //18
  localStorage.setItem('selectedMoviePrice', moviePrice); //19
}

// Update total and count
function updateSelectedCount() { // 6
const selectedSeats = document.querySelectorAll ('.row .seat.selected'); //8

//Copy selected seats into array
//Map trought array
//retrun a new array indexes
const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); // 9- 10

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //12

 const selectedSeatsCount = selectedSeats.length; //9 count seats

  count.innerText = selectedSeatsCount; // 10
  total.innerText = selectedSeatsCount * ticketPrice;//11
}

//Get data from localstorage and populate UI
function populateUI() { //21
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // 22
  if(selectedSeats !== null && selectedSeats.length > 0) { // 23 loop throught to see if there seats are available
      seats.forEach((seat, index)=> { //24
        if(selectedSeats.indexOf(index) > -1) { // 25
          seat.classList.add('selected'); // 26
        }
      });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // 27

  if(selectedMovieIndex !== null) {  // 28
    movieSelect.selectedIndex = selectedMovieIndex; // 29
  }
}

//Movie select event
movieSelect.addEventListener('change', e => { // 13
  ticketPrice = +e.target.value; //14
        setMovieData(e.target.selectedIndex, e.target.value); //16
  updateSelectedCount(); //15
});

//Seat click event

container.addEventListener('click', e => { // 1
  if (e.target.classList.contains('seat') &&   // 2
  !e.target.classList.contains('ocuppied') //3-4
  ) {
    e.target.classList.toggle('selected');  // 5 toggle we can  select and unselect class

    updateSelectedCount(); //7

  }
});

// Inital count and total set
updateSelectedCount();  // 30
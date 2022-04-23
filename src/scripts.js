import { getData } from "./api-calls";
import "./css/styles.css";
import Hotel from "./Hotel";
import "./images/OverlookHotel.png";
import "./images/1full.jpg";
import "./images/2full.jpg";
import "./images/1twin.jpg";
import "./images/2twin.jpg";
import "./images/1queen.jpg";
import "./images/2queen.jpg";
import "./images/1king.jpg";
import "./images/2king.jpg";

let hotel;


// QUERY SELECTORS ///////////////////////////////
const bookDateInput = document.querySelector("#bookDateInput");
const userBookings = document.querySelector(".user-bookings-container");
const totalSpent = document.querySelector(".total-spent");

// FUNCTIONS /////////////////////////////////////


const promiseData = () => {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
  .then(data => {
    setHotel(data[0].customers, data[1].rooms, data[2].bookings);
    hotel.selectCustomer(1);
    setBookingDate();
    updateDashboard();
  })
  .catch(err => console.log(err));
}

const setHotel = (customers, rooms, bookings) => {
  hotel = new Hotel(customers, rooms, bookings);
}

const setBookingDate = () => {
  bookDateInput.min = new Date().toISOString().split("T")[0];
  bookDateInput.value = new Date().toISOString().split("T")[0];
}

const updateDashboard = () => {
  userBookings.innerHTML = "";
  totalSpent.innerText = hotel.calcTotal();
  hotel.findUserRoomDetails().forEach(room => {
    userBookings.innerHTML += `
    <article class="user-booking-box">
      <img src="./images/${room.numBeds}${room.bedSize}.jpg">
      <div>
        <h3>Room ${room.number} is booked for ${room.date}</h3>
        <p>${room.roomType}</p>
        <p>${room.numBeds} ${room.bedSize}</p>
      </div>
    </article>
    `;
  });
}


// EVENT LISTENERS ///////////////////////////////
window.addEventListener("load", promiseData);
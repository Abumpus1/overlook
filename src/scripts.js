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
const userBookingsOld = document.querySelector(".user-bookings-container-old");
const totalSpent = document.querySelector(".total-spent");
const welcomeUser = document.querySelector(".welcome-user");
const bookNow = document.querySelector(".book-now");
const returnToDash = document.querySelector(".return-to-dashboard");
const dashboardPage = document.querySelector(".dashboard-page");
const bookingsPage = document.querySelector(".booking-select-page");
const allBookings = document.querySelector(".available-bookings-container");
const roomTypeInputs = document.querySelectorAll(".filter-room-types input");
const updateSearchButton = document.querySelector(".update-booking-search");


// FUNCTIONS /////////////////////////////////////
const hide = (element) => {
  element.classList.add("hidden");
}

const show = (element) => {
  element.classList.remove("hidden");
}

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
  userBookingsOld.innerHTML = "";
  totalSpent.innerText = hotel.calcTotal();
  welcomeUser.innerText = `Welcome back, ${hotel.activeCustomer.name.split(" ")[0]}!`
  let dateNum = bookDateInput.value.split("-").join("");
  let userBookingsByDate;
  hotel.sortUserRooms().forEach(room => {
    let roomDate = room.date.split("/").join("");
    if (roomDate < dateNum) {
      userBookingsByDate = userBookingsOld;
    } else {
      userBookingsByDate = userBookings;
    }
    userBookingsByDate.innerHTML += `
    <article class="user-booking-box">
      <img src="./images/${room.numBeds}${room.bedSize}.jpg" alt="hotel bedroom showing ${room.numBeds} ${room.bedSize}">
      <div>
        <h4>You've booked room ${room.number} for ${room.date}</h4>
        <div class="box-line"></div>
        <p>${room.roomType}</p>
        <p>${room.numBeds} ${room.bedSize}</p>
      </div>
    </article>
    `;
  });
  if (!userBookings.innerHTML) {
    userBookings.innerHTML += `
      <h4>It looks like you have no active bookings.</h4>
    `;
  }
}

const checkForBidet = (room) => {
  if (room.bidet) {
    return "bidet included"
  } else {
    return "bidet not included"
  }
}

const updateBookingsPage = () => {
  // let roomType;
  // roomTypeInputs.forEach(input => {

  // })
  allBookings.innerHTML = "";

  // hotel.findFilteredRooms("2022-02-12").forEach(room => {
  hotel.findFilteredRooms(bookDateInput.value).forEach(room => {
    allBookings.innerHTML += `
      <article class="booking-box">
        <img src="./images/${room.numBeds}${room.bedSize}.jpg" alt="hotel bedroom showing ${room.numBeds} ${room.bedSize}">
        <div>
          <h4>Room ${room.number} is available</h4>
          <div class="box-line"></div>
          <p>${room.roomType}</p>
          <p>${room.numBeds} ${room.bedSize}</p>
          <p>${checkForBidet(room)}</p>
          <p class="cpn">Cost per night: $${room.costPerNight}</p>
        </div>
        <button type="button" class="book-room">BOOK NOW</button>
      </article>
    `
  });


}

const goToBookingPage = () => {
  hide(bookNow);
  hide(dashboardPage);
  show(bookingsPage);
  show(returnToDash);
}

const goToDashPage = () => {
  hide(bookingsPage);
  hide(returnToDash);
  show(bookNow);
  show(dashboardPage);
}


// EVENT LISTENERS ///////////////////////////////
window.addEventListener("load", promiseData);
bookNow.addEventListener("click", goToBookingPage);
returnToDash.addEventListener("click", goToDashPage);
updateSearchButton.addEventListener("click", updateBookingsPage);
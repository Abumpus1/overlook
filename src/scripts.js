import { getData, postData } from "./api-calls";
import "./css/styles.css";
import Hotel from "./Hotel";
import "./images/login-image.jpg";
import "./images/stanley.jpg";
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
const dateErr = document.querySelector(".date-err");
const password = document.querySelector(".password");
const username = document.querySelector(".username");
const loginButton = document.querySelector(".sign-in");
const loginErr = document.querySelector(".login-err");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const loginPage = document.querySelector(".login-page");


// PROMISES //////////////////////////////////////

const promiseData = () => {
  Promise.all([getData("rooms"), getData("bookings")])
  .then(data => {
    setHotel(data[0].rooms, data[1].bookings);
    setBookingDate();
  })
  .catch(err => console.log(err));
}

const promiseUser = (id) => {
  Promise.all([getData(`customers/${id}`)])
  .then(data => {
    hotel.selectCustomer(data[0])
    hide(loginPage);
    show(nav);
    show(main);
    updateDashboard();
  })
  .catch(err => console.log(err));
}

const promisePost = (button) => {
  Promise.all([postData(hotel.activeCustomer.id, button.dataset.date, parseInt(button.dataset.number))])
  .then(data => {
    console.log(data[0].newBooking);
    hotel.addBooking(data[0].newBooking);
    goToDashPage();
  })
  .catch(err => console.log(err));
}


// FUNCTIONS /////////////////////////////////////

const setHotel = (customers, rooms, bookings) => {
  hotel = new Hotel(customers, rooms, bookings);
}

const hide = (element) => {
  element.classList.add("hidden");
}

const show = (element) => {
  element.classList.remove("hidden");
}

const setBookingDate = () => {
  bookDateInput.min = getDate();
  bookDateInput.value = getDate();
}

const getDate = () => {
  return new Date().toISOString().split("T")[0];
}

const resetRoomType = () => {
  roomTypeInputs[0].checked = true;
}

const updateDashboard = () => {
  userBookings.innerHTML = "";
  userBookingsOld.innerHTML = "";
  dashboardPage.scrollTop = 0;
  totalSpent.innerText = hotel.calcTotal();
  welcomeUser.innerText = `Welcome back, ${hotel.activeCustomer.name.split(" ")[0]}!`;
  let dateNum = getDate().split("-").join("");
  let userBookingsByDate;
  hotel.sortUserRooms().forEach(room => {
    let roomDate = room.date.split("/").join("");
    if (roomDate < dateNum) {
      userBookingsByDate = userBookingsOld;
    } else {
      userBookingsByDate = userBookings;
    }
    userBookingsByDate.innerHTML += `
    <article aria-label="room ${room.number}" class="user-booking-box">
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

const updateBookingsPage = () => {
  allBookings.innerHTML = "";
  let roomType;
  roomTypeInputs.forEach(input => {
    if (input.checked) {
      roomType = input.dataset.type;
    }
  });
  if (bookDateInput.value.split("-").join("") >= getDate().split("-").join("")) {
    hide(dateErr);
    hotel.findFilteredRooms(bookDateInput.value, roomType).forEach(room => {
      allBookings.innerHTML += `
        <article aria-label="room ${room.number}" class="booking-box">
          <img src="./images/${room.numBeds}${room.bedSize}.jpg" alt="hotel bedroom showing ${room.numBeds} ${room.bedSize}">
          <div>
            <h4>Room ${room.number} is Available</h4>
            <div class="box-line"></div>
            <p>${room.roomType}</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>${checkForBidet(room)}</p>
            <p class="cpn">Cost per night: $${room.costPerNight}</p>
          </div>
          <button aria-label="book room ${room.number} now" data-number="${room.number}" data-date="${bookDateInput.value.split("-").join("/")}" type="button" class="book-room">BOOK NOW</button>
        </article>
      `;
    });
  } else {
    show(dateErr);
  }
  if(!allBookings.innerHTML) {
    allBookings.innerHTML += `
    <article class="booking-box">
    <h4>We apologize for the inconvenience. There are no rooms available matching your search criteria. Please try selecting alternate dates or modifying your filter options.</h4>
    </article>
    `;
  }
}

const checkForBidet = (room) => {
  if (room.bidet) {
    return "bidet included";
  } else {
    return "bidet not included";
  }
}

const confirmPass = () => {
  if (password.value === "overlook2021") {
    return true;
  }
}

const confirmUsername = () => {
  let uName = username.value;
  if (uName.startsWith("customer") && uName.length === 10) {
    uName = uName.split("customer").join("")
    if (parseInt(uName) >= 10 && parseInt(uName) <= 50) {
      return true;
    }
  } else if (uName.startsWith("customer") && uName.length === 9) {
    uName = uName.split("customer").join("")
    if (parseInt(uName) >= 1 && parseInt(uName) <= 9) {
      return true;
    }
  }
}

const confirmLogin = () => {
  if (confirmUsername() && confirmPass()) {
    loginErr.innerText = "";
    promiseUser(username.value.substring(8));
  } else {
    loginErr.innerText = "Incorrect Username or Password";
  }
}

const goToBookingPage = () => {
  hide(bookNow);
  hide(dashboardPage);
  show(bookingsPage);
  show(returnToDash);
  setBookingDate();
  resetRoomType();
  updateBookingsPage();
  returnToDash.focus();
}

const goToDashPage = () => {
  hide(bookingsPage);
  hide(returnToDash);
  show(bookNow);
  show(dashboardPage);
  updateDashboard();
  bookNow.focus();
}

// EVENT LISTENERS ///////////////////////////////
window.addEventListener("load", promiseData);
bookNow.addEventListener("click", goToBookingPage);
returnToDash.addEventListener("click", goToDashPage);
updateSearchButton.addEventListener("click", updateBookingsPage);
allBookings.addEventListener("click", (event) => {
  if(event.target.type === "button") {
    promisePost(event.target);
  }
});
loginButton.addEventListener("click", confirmLogin);
password.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    confirmLogin();
  }
});
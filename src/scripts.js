import { getData } from "./api-calls";
import "./css/styles.css";
import Hotel from "./Hotel";
import "./images/OverlookHotel.png";



// QUERY SELECTORS ///////////////////////////////
let hotel;
const bookDateInput = document.querySelector("#bookDateInput");

// FUNCTIONS /////////////////////////////////////
bookDateInput.min = new Date().toISOString().split("T")[0];
bookDateInput.value = new Date().toISOString().split("T")[0];

const promiseData = () => {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
  .then(data => {
    setHotel(data[0].customers, data[1].rooms, data[2].bookings);
    hotel.selectCustomer(1);

  })
  .catch(err => console.log(err));
}

const setHotel = (customers, rooms, bookings) => {
  hotel = new Hotel(customers, rooms, bookings);
}


// EVENT LISTENERS ///////////////////////////////
window.addEventListener("load", promiseData);
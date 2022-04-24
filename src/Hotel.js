import Customer from "./Customer";
import Booking from "./Booking";
import Room from "./Room";

class Hotel {
  constructor(customers, rooms, bookings) {
    this.activeCustomer = null;
    this.allCustomers = customers.map(customer => new Customer(customer));
    this.bookings = bookings.map(booking => new Booking(booking));
    this.rooms = rooms.map(room => new Room(room));
  }

  selectCustomer(id) {
    this.activeCustomer = this.allCustomers.find(customer => customer.id === id)
  }

  findUserBookings() {
    return this.bookings.filter(booking => booking.userID === this.activeCustomer.id);
  }

  findUserRoomDetails() {
    // let sortedBookings = this.findUserBookings().sort((a, b) => {
    //   return a.date.split("/").join("") - b.date.split("/").join("");
    // });
    return this.findUserBookings().map(booking => {
      let thisRoom = this.rooms.find(room => room.number === booking.roomNumber)
      return {
        number: thisRoom.number,
        roomType: thisRoom.roomType,
        bidet: thisRoom.bidet,
        bedSize: thisRoom.bedSize,
        numBeds: thisRoom.numBeds,
        costPerNight: thisRoom.costPerNight,
        date: booking.date,
        bookingID: booking.id
      }
    });
  }

  sortUserRooms() {
    return this.findUserRoomDetails().sort((a, b) => {
      return a.date.split("/").join("") - b.date.split("/").join("");
    });
  }

  calcTotal() {
    return this.findUserRoomDetails().reduce((acc, room) => {
      acc += room.costPerNight;
      acc = Math.round(acc * 100) / 100
      return acc;
    },0);
  }
}

export default Hotel;
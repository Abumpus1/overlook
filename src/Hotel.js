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
    return this.findUserBookings().map(booking => {
      let userRoom = this.rooms.find(room => room.number === booking.roomNumber);
      userRoom.date = booking.date;
      console.log(userRoom);
      return userRoom;
    });
  }

  calcTotal() {
    return this.findUserRoomDetails().reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    },0);
  }
}

export default Hotel;
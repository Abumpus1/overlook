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
}

export default Hotel;
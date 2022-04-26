import Customer from "./Customer";
import Booking from "./Booking";
import Room from "./Room";

class Hotel {
  constructor(rooms, bookings) {
    this.activeCustomer = null;
    this.bookings = bookings.map(booking => new Booking(booking));
    this.rooms = rooms.map(room => new Room(room));
  }

  selectCustomer(customer) {
      this.activeCustomer = new Customer(customer);
  }

  findUserBookings() {
    return this.bookings.filter(booking => booking.userID === this.activeCustomer.id);
  }

  findUserRoomDetails() {
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

  findBookings(date) {
    return this.bookings.filter(booking => booking.date === date).map(filtBook => filtBook.roomNumber);
  }

  findFilteredRooms(date, roomType) {
    let filteredBookings = this.findBookings(date.split("-").join("/"));
    let roomsByDate = this.rooms.filter(room => !filteredBookings.includes(room.number))
    return roomsByDate.reduce((acc, room) => {
      if (!roomType) {
        acc.push(room);
      } else if (roomType === room.roomType) {
        acc.push(room);
      }
      return acc;
    }, []);
  }

  addBooking(newBooking) {
    this.bookings.push(new Booking(newBooking));
  }
}

export default Hotel;
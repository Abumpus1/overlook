import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import Booking from '../src/Booking';
import Room from '../src/Room';
import Customer from '../src/Customer';

import sampleBookings from './sample-bookings';
import sampleCustomers from './sample-customers';
import sampleRooms from './sample-rooms';


describe("Hotel", () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(sampleRooms, sampleBookings);
  });

  it("should have a current user with default value of null", () => {
    expect(hotel.activeCustomer).to.equal(null);
  });

  it("should hold all bookings", () => {
    expect(hotel.bookings).to.deep.equal(sampleBookings);
  });

  it("should make bookings be instances of Booking", () => {
    expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
  });

  it("should hold all rooms", () => {
    expect(hotel.rooms).to.deep.equal(sampleRooms);
  });

  it("should make rooms instances of Room", () => {
    expect(hotel.rooms[0]).to.be.an.instanceOf(Room);
  });

  it("should have a method to assign an active customer", () => {
    hotel.selectCustomer(sampleCustomers[0]);

    expect(hotel.activeCustomer).to.deep.equal(sampleCustomers[0]);
  });

  it("should make customer be an instance of Customer", () => {
    hotel.selectCustomer(sampleCustomers[0]);

    expect(hotel.activeCustomer).to.be.an.instanceOf(Customer);
  });

  it("should be able to select another user", () => {
    hotel.selectCustomer(sampleCustomers[4]);

    expect(hotel.activeCustomer).to.deep.equal(sampleCustomers[4]);
  });

  it("should have a method to return active customer's bookings", () => {
    hotel.selectCustomer(sampleCustomers[0]);

    let customerOneBookings = hotel.findUserBookings();

    expect(customerOneBookings).to.deep.equal([sampleBookings[0], sampleBookings[2]]);
  });

  it("should be able to return a different customer's bookings", () => {
    hotel.selectCustomer(sampleCustomers[1]);

    let customerTwoBookings = hotel.findUserBookings();

    expect(customerTwoBookings).to.deep.equal([sampleBookings[1]]);
  });

  it("should have a method to get room details of customer's bookings", () => {
    hotel.selectCustomer(sampleCustomers[0]);

    let customerRoomDetails = hotel.findUserRoomDetails();

    expect(customerRoomDetails).to.deep.equal(
      [
        {
          number: 1,
          date: "2022/04/22",
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          bookingID: "5fwrgu4i7k55hl6sz",
          numBeds: 1,
          costPerNight: 358.4
        }, 
        {
          number: 3,
          date: "2022/01/10",
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          bookingID: "5fwrgu4i7k55hl6t6",
          numBeds: 1,
          costPerNight: 491.14
        }
      ]
    );
  });

  it("should have a method to sort user rooms", () => {
    hotel.selectCustomer(sampleCustomers[0]);
    
    let sortedRoomDetails = hotel.sortUserRooms();

    expect(sortedRoomDetails).to.deep.equal(
      [
        {
          number: 3,
          date: "2022/01/10",
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          bookingID: "5fwrgu4i7k55hl6t6",
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 1,
          date: "2022/04/22",
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          bookingID: "5fwrgu4i7k55hl6sz",
          numBeds: 1,
          costPerNight: 358.4
        }
      ]
    );
  });

  it("should have a method to find active customer's total spent on bookings", () => {
    hotel.selectCustomer(sampleCustomers[0]);

    let customerTotal = hotel.calcTotal();

    expect(customerTotal).to.equal(849.54);
  });

  it("should have a method to return list of room numbers of bookings that are booked on the date passed through", () => {
    let bookingIDs = hotel.findBookings("2022/01/24");

    expect(bookingIDs).to.deep.equal([2]);
  });

  it("should be able to return a different room number for a different date", () => {
    let bookingIDs = hotel.findBookings("2022/02/16");

    expect(bookingIDs).to.deep.equal([4]);
  });

  it("should return an empty array if no matches are found", () => {
    let bookingIDs = hotel.findBookings("2023/01/10");

    expect(bookingIDs).to.deep.equal([]);
  });

  it("should be able to return multiple numbers if there are multiple bookings on the same date", () => {
    let bookingIDs = hotel.findBookings("2022/04/22");

    expect(bookingIDs).to.deep.equal([1, 4]);
  });

  it("should have a method to return list of rooms that are NOT booked on a specified date", () => {
    let openRooms = hotel.findFilteredRooms("2022-04-22");

    expect(openRooms).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[4]])
  });

  it("should return all rooms if there are no bookings on specified date", () => {
    let openRooms = hotel.findFilteredRooms("2023-01-10");

    expect(openRooms).to.deep.equal(sampleRooms);
  });

  it("should be able to sort by room type", () => {
    let openRooms = hotel.findFilteredRooms("2023-01-10", "single room");

    expect(openRooms).to.deep.equal([sampleRooms[2],sampleRooms[3], sampleRooms[4]])
  });

  it("should be able to sort by room type and date", () => {
    let openRooms = hotel.findFilteredRooms("2022-04-22", "single room");

    expect(openRooms).to.deep.equal([sampleRooms[2], sampleRooms[4]])
  });

  it("should be able to sort by a different room type", () => {
    let openRooms = hotel.findFilteredRooms("2022-04-22", "suite");

    expect(openRooms).to.deep.equal([sampleRooms[1]])
  });

  it("should have a method to add a new booking", () => {
    let newBooking = {
      id: "5fwrgu4i7k55hl6aa",
      userID: 2,
      date: "2022/04/22",
      roomNumber: 5
    }
    expect(hotel.bookings).to.have.a.lengthOf(5);

    hotel.addBooking(newBooking);

    expect(hotel.bookings).to.have.a.lengthOf(6);
    expect(hotel.bookings[5]).to.deep.equal(newBooking);
  });

  it("should make the new booking an instance of Booking", () => {
    let newBooking = {
      id: "5fwrgu4i7k55hl6aa",
      userID: 2,
      date: "2022/04/22",
      roomNumber: 5
    }
    hotel.addBooking(newBooking);

    expect(hotel.bookings[5]).to.be.an.instanceOf(Booking);
  });
});
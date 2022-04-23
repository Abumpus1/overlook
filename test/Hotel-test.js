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
    hotel = new Hotel(sampleCustomers, sampleRooms, sampleBookings);
  });

  it("should have a current user with default value of null", () => {
    expect(hotel.activeCustomer).to.equal(null);
  });

  it("should hold all customers", () => {
    expect(hotel.allCustomers).to.deep.equal(sampleCustomers);
  });

  it("should make customers be instances of Customer", () => {
    expect(hotel.allCustomers[0]).to.be.an.instanceOf(Customer);
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

  it("should have a method to assign an active customer based on id", () => {
    hotel.selectCustomer(1);

    expect(hotel.activeCustomer).to.deep.equal(sampleCustomers[0]);
  });

  it("should have a method to return active customer's bookings", () => {
    hotel.selectCustomer(1);

    let customerOneBookings = hotel.findUserBookings();

    expect(customerOneBookings).to.deep.equal([sampleBookings[0], sampleBookings[2]]);
  });

  it("should have a method to get room details of customer's bookings", () => {
    hotel.selectCustomer(1);

    let customerRoomDetails = hotel.findUserRoomDetails();

    expect(customerRoomDetails).to.deep.equal([sampleRooms[0], sampleRooms[2]]);
  });

  it("should have a method to find active customer's total spent on bookings", () => {
    hotel.selectCustomer(1);

    let customerTotal = hotel.calcTotal();

    expect(customerTotal).to.equal(849.54);
  });
});
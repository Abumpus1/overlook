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
});
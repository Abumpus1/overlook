import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
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

});
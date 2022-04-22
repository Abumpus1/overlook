import chai from 'chai';
const expect = chai.expect;
import sampleBookings from './sample-bookings';
import Booking from '../src/Booking';

describe("Booking", () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(sampleBookings[0]);
  });

  it("should have an id", () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6sz");
  });

  it("should have a user id", () => {
    expect(booking.userID).to.equal(1);
  });

  it("should have a date", () => {
    expect(booking.date).to.equal("2022/04/22");
  });

  it("should have a room number", () => {
    expect(booking.roomNumber).to.equal(1);
  });
});
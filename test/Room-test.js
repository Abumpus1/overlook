import chai from 'chai';
const expect = chai.expect;
import sampleRooms from './sample-rooms';
import Room from '../src/Room';

describe("Room", () => {
  let room;

  beforeEach(() => {
    room = new Room(sampleRooms[0]);
  });

  it("should have a number", () => {
    expect(room.number).to.equal(1);
  });

  it("should have a room type", () => {
    expect(room.roomType).to.equal("residential suite");
  });

  it("should have a boolean for bidet", () => {
    expect(room.bidet).to.equal(true);
  });

  it("should have a bed size", () => {
    expect(room.bedSize).to.equal("queen");
  });

  it("should have number of beds", () => {
    expect(room.numBeds).to.equal(1);
  });

  it("should have a cost per night", () => {
    expect(room.costPerNight).to.equal(358.4);    
  });
});
import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer';
import sampleCustomers from './sample-customers';

describe("Customer", () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(sampleCustomers[0]);
  });

  it("should have an id", () => {
    expect(customer.id).to.equal(1);
  });

  it("should have a name", () => {
    expect(customer.name).to.equal("Leatha Ullrich");
  });
});
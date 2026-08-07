/**
 * Centralized test data for UI and API tests.
 * Unique email generated per run to avoid registration conflicts.
 */

const timestamp = Date.now();

const testData = {
  newUser: {
    firstName: 'Tushar',
    lastName: 'QATest',
    dob: '1990-01-01',
    address: '123 Test Street',
    city: 'Mumbai',
    state: 'MH',
    country: 'IN',
    postcode: '400001',
    phone: '9999999999',
    email: `tushar.qatest+${timestamp}@mailinator.com`,
    password: `QaAssess#${timestamp}`,
  },
  existingUser: {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
  },
  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },
  billing: {
    street: 'Zoey Shore',
    city: 'Hesselbury',
    state: 'Florida',
    country: 'TG',
    postalCode: '1234AA',
  },
  apiBaseUrl: 'https://api.practicesoftwaretesting.com',
  searchTerm: 'hammer',
};

module.exports = testData;

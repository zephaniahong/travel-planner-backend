/* eslint-disable quotes */
/* eslint-disable quote-props */
const jsSHA = require('jssha');
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const users = [];
    for (let i = 0; i < 50; i += 1) {
      const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
      shaObj.update('password');
      const userObj = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: shaObj.getHash('HEX'),
        created_at: new Date(),
        updated_at: new Date(),
      };
      users.push(userObj);
    }
    await queryInterface.bulkInsert('users', users);

    // generate random date from 20
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    // add days to a date
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    // hiroshima, kyoto, toyko, kumamoto, sapporo, osaka, okinawa
    const hotels = ['ChIJiVBHfgmiWjURpjekJJu0wyY', 'ChIJ37kzZt2jWjURV9aF8weHHDs', 'ChIJ2TyG6CgGAWAR4hjo_gql_J4', 'ChIJq6q2oIQIAWAR_ZgZSn5Gq-A', 'ChIJfV9KdPiLGGARn4ma2GUEoJo', 'ChIJibNldL-OGGARXu2ehqOhpLo', 'ChIJIY8ZJVymRjURieTwFhgLPQQ', 'ChIJO3FL6menRjURgLiDwXzEebU', 'ChIJYdwsT4gpC18R7Z3NlIV6p-c', 'ChIJBWk65ocpC18REePVyMvohvg', 'ChIJV9_9O5HmAGARP4vReC4HTGo', ' ChIJkZwuriDlAGARO1IWhPEyC-4', 'ChIJQ_efpAgT5TQRLG1aMkoSKls', 'ChIJuzthPjAA5TQRqpxjAaXS1AI'];
    const cities = ['ChIJu0_z7giZWjURcvfBz1DO5Ac', 'ChIJu0_z7giZWjURcvfBz1DO5Ac', 'ChIJ8cM8zdaoAWARPR27azYdlsA', 'ChIJ8cM8zdaoAWARPR27azYdlsA', 'ChIJXSModoWLGGARILWiCfeu2M0', 'ChIJXSModoWLGGARILWiCfeu2M0', 'ChIJTxvxrBT0QDURMVzPm9HOURo', 'ChIJTxvxrBT0QDURMVzPm9HOURo', 'ChIJMzaXWnXUCl8R1bqHRp1-kzM', 'ChIJMzaXWnXUCl8R1bqHRp1-kzM', 'ChIJ4eIGNFXmAGAR5y9q5G7BW8U', 'ChIJ4eIGNFXmAGAR5y9q5G7BW8U', 'ChIJ51ur7mJw9TQR79H9hnJhuzU', 'ChIJ51ur7mJw9TQR79H9hnJhuzU'];
    const tripTypes = ['Graduation', 'Family', 'Friends', 'Backpacking', 'Business', 'Honey Moon', 'Getaway'];
    const isPrivate = [true, false];
    const trips = [];
    for (let i = 0; i < 14; i += 1) {
      const date = randomDate(new Date(2012, 0, 1), new Date());
      const tripObj = {
        user_id: Math.floor(Math.random() * 50) + 1,
        total_cost: Math.floor(Math.random() * 9000) + 300,
        budget: Math.floor(Math.random() * 9000) + 300,
        // budget: {
        //   "food": Math.floor(Math.random() * 3000) + 100,
        //   "sites": Math.floor(Math.random() * 3000) + 100,
        //   "activities": Math.floor(Math.random() * 3000) + 100,
        // },
        hotel_details: hotels[i],
        location_details: cities[i],
        trip_type: tripTypes[Math.floor(Math.random() * (tripTypes.length - 1))],
        start_date: date,
        end_date: addDays(date, Math.floor(Math.random() * 16) + 1),
        private: isPrivate[Math.floor(Math.random() * 2)],
        created_at: new Date(),
        updated_at: new Date(),
      };
      trips.push(tripObj);
    }
    await queryInterface.bulkInsert('trips', trips);
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('trip', null, {});
  },
};

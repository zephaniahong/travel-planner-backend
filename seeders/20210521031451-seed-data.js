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
    const hotels = ['ANA Crowne Plaza Hiroshima, an IHG Hotel', 'Sheraton Grand Hiroshima Hotel', 'Kyoto Hotel Okura', 'Hotel Granvia Kyoto', 'The Yokohama Bay Hotel Tokyu', 'Ibis Styles Tokyo Bay', 'Hotel Route Inn Yanagawa', 'Hotel Wing International Select Kumamoto', 'Hotel Gracery Sapporo', 'Hotel Nord Otaru', 'Tennoji Miyako Hotel', 'Holiday Inn Suites Shin Osaka', 'Okinawa Grand Mer Resort', 'Ansa Okinawa Resort'];

    const cities = ['hiroshima', 'hiroshima', 'kyoto', 'kyoto', 'toyko', 'toyko', 'kumamoto', 'kumamoto', 'sapporo', 'sapporo', 'osaka', 'osaka', 'okinawa', 'okinawa'];

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
        hotel: hotels[i],
        city: cities[i],
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

    const ratings = [1, 2, 3, 4, 5, 1.5, 2.5, 3.5, 4.5];
    const reviews = [];
    for (let i = 0; i < 14; i += 1) {
      const reviewObj = {
        user_id: Math.floor(Math.random() * 50) + 1,
        trip_id: Math.floor(Math.random() * 14) + 1,
        stars: ratings[Math.floor(Math.random() * ratings.length)],
        created_at: new Date(),
        updated_at: new Date(),
      };

      reviews.push(reviewObj);
    }

    await queryInterface.bulkInsert('reviews', reviews);
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('trip', null, {});
  },
};

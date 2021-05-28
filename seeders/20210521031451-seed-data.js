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
    const hotels = ['ANA Crowne Plaza Hiroshima, an IHG Hotel', 'Sheraton Grand Hiroshima Hotel', 'Kyoto Hotel Okura', 'Hotel Granvia Kyoto', 'The Yokohama Bay Hotel Tokyu', 'Ibis Styles Tokyo Bay', 'Hotel Route Inn Yanagawa', 'Hotel Wing International Select Kumamoto', 'Hotel Gracery Sapporo', 'Hotel Nord Otaru', 'Tennoji Miyako Hotel', 'Holiday Inn Suites Shin Osaka', 'Okinawa Grand Mer Resort', 'Ansa Okinawa Resort', 'Gilligans', 'Park Hyatt', 'Palazzo Versace', 'Blue Lagoon', 'Hilton Surfers', 'Ritz Carlton', 'Novotel Surfers Paradise', 'Crown Towers', 'Wrest Point', 'Emporium Hotel South Bank', 'JW Marriot', 'Park Regis', 'Sheraton', 'Sea World Resort'];

    const genLoc = (min, max) => Number((Math.random() * (max - min + 1) + min).toFixed(4));
    // const genAusLat = () => Number((Math.random() * 15 - 42).toFixed(4));

    const hotelLat = [];
    const hotelLng = [];

    for (let i = 0; i < 28; i += 1) {
      if (i <= 14) {
        hotelLat.push(genLoc(30, 33)); // Japan
        hotelLng.push(genLoc(130, 135)); // Australia
      }
      else if (i > 14) {
        hotelLat.push(-Math.abs(genLoc(15, 40))); // Japan
        hotelLng.push(genLoc(125, 147));// Australia
      }
    }

    const cities = ['hiroshima', 'hiroshima', 'kyoto', 'kyoto', 'toyko', 'toyko', 'kumamoto', 'kumamoto', 'sapporo', 'sapporo', 'osaka', 'osaka', 'okinawa', 'okinawa',
      'queensland', 'queensland', 'melbourne', 'melbourne', 'melbourne', 'sydney', 'sydney', 'new south wales', 'new south wales', 'victora', 'victoria', 'tasmania', 'perth', 'perth'];

    const countries = ['japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'japan', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia', 'australia'];

    const tripTypes = ['Graduation', 'Family', 'Friends', 'Backpacking', 'Business', 'Honey Moon', 'Getaway'];

    const isPrivate = [true, false];

    const trips = [];

    for (let i = 0; i < 28; i += 1) {
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
        hotel_lat: hotelLat[i],
        hotel_lng: hotelLng[i],
        hotel: hotels[i],
        country: countries[i],
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

    const ratings = [1, 2, 3, 4, 5];
    const reviews = [];
    for (let i = 0; i < trips.length; i += 1) {
      const reviewObj = {
        user_id: Math.floor(Math.random() * users.length) + 1,
        trip_id: Math.floor(Math.random() * trips.length) + 1,
        stars: ratings[Math.floor(Math.random() * ratings.length)],
        created_at: new Date(),
        updated_at: new Date(),
      };

      reviews.push(reviewObj);
    }

    await queryInterface.bulkInsert('reviews', reviews);

    const types = ['restaurant', 'natural_feature', "point_of_interest"];
    const items = [];
    for (let i = 0; i < 11; i += 1) {
      const itemObj = {
        trip_id: 32,
        name: faker.commerce.product(),
        address: faker.address.streetName() + faker.address.streetAddress(),
        type: types[Math.floor(Math.random() * types.length)],
        created_at: new Date(),
        updated_at: new Date(),
      };

      items.push(itemObj);
    }
    await queryInterface.bulkInsert('items', items, { returning: true });
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('trip', null, {});
  },
};

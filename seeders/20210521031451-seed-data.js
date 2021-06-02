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

    // items
    const items = [];
    const item1 = {
      trip_id: 11,
      name: 'Ramen Feel',
      address: 'Japan, Tokyo, Ome, Baigo, 4 Chome−695-1',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item2 = {
      trip_id: 11,
      name: 'BUNGEE',
      address: 'Seongnam-dong, Ulsan, South Korea',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item3 = {
      trip_id: 11,
      name: 'Mount Fuji',
      address: 'Kitayama, Fujinomiya, Shizuoka, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item4 = {
      trip_id: 11,
      name: 'Ramen Atelier Nakiryū',
      address: '2 Chome-34-4 Minami-Ōtsuka, Toshima City, Tokyo, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item5 = {
      trip_id: 11,
      name: 'Burger King Osu',
      address: '3 Chome-30-32 Osu, Naka Ward, Nagoya, Aichi, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item6 = {
      trip_id: 4,
      name: 'Beef cutlet',
      address: '3 Chome-32-2 Shinjuku, Shinjuku City, Tokyo, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item7 = {
      trip_id: 4,
      name: 'noodle&spice curry 今日の一番',
      address: 'Japan, Saitama, Kawaguchi, Iizuka, 3 Chome−2−12',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item8 = {
      trip_id: 11,
      name: 'noodle&spice curry 今日の一番',
      address: 'Japan, Saitama, Kawaguchi, Iizuka, 3 Chome−2−12',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item9 = {
      trip_id: 4,
      name: 'Japanese Ramen Noodle Lab Q',
      address: '2 Chome-１-3 Kita 1 Jonishi, Chuo Ward, Sapporo, Hokkaido, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const item10 = {
      trip_id: 11,
      name: 'Noodle MAZERU',
      address: '1 Chome-14 Kanda Sakumacho, Chiyoda City, Tokyo, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item11 = {
      trip_id: 4,
      name: 'Mount Takao',
      address: 'Takaomachi, Hachioji, Tokyo, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item12 = {
      trip_id: 11,
      name: 'Mount Mitake',
      address: 'Mitakesan, Ome, Tokyo, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item13 = {
      trip_id: 5,
      name: 'Mount Yoshino',
      address: 'Yoshinoyama, Yoshino, Nara, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item14 = {
      trip_id: 11,
      name: 'Tama river Cycling road',
      address: '6 Chome-34 Haneda, Ota City, Tokyo, Japan',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item15 = {
      trip_id: 11,
      name: 'Tsurumi River Cycling Course',
      address: 'Kozukuechō, Kohoku Ward, Yokohama, Kanagawa, Japan',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item16 = {
      trip_id: 11,
      name: 'Nottingham Train Station',
      address: 'Carrington Street, Nottingham, UK',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item17 = {
      trip_id: 7,
      name: 'Tsurumi River Cycling Course',
      address: 'Kozukuechō, Kohoku Ward, Yokohama, Kanagawa, Japan',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item18 = {
      trip_id: 7,
      name: 'Nottingham Train Station',
      address: 'Carrington Street, Nottingham, UK',
      type: 'activities',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item19 = {
      trip_id: 7,
      name: 'Kiyomizu-dera',
      address: '〒605-0862 Kyoto, Higashiyama Ward, Kiyomizu, 1丁目２９４, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item20 = {
      trip_id: 7,
      name: 'Ramen Atelier Nakiryū',
      address: '2 Chome-34-4 Minami-Ōtsuka, Toshima City, Tokyo, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item21 = {
      trip_id: 7,
      name: 'Burger King Osu',
      address: '3 Chome-30-32 Osu, Naka Ward, Nagoya, Aichi, Japan',
      type: 'food',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item22 = {
      trip_id: 7,
      name: 'Itsukushima Shrine',
      address: 'Itsukushima Shrine, 1-1 Miyajimacho, Hatsukaichi, Hiroshima, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const item23 = {
      trip_id: 7,
      name: 'Himeji Castle',
      address: '68 Honmachi, Himeji, Hyogo 670-0012, Japan',
      type: 'sites',
      created_at: new Date(),
      updated_at: new Date(),
    };

    items.push(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10);
    items.push(item11, item12, item13, item14, item15, item16);
    items.push(item17, item18, item19, item20, item21, item22, item23);

    await queryInterface.bulkInsert('items', items);

    // liked items
    const likedItems = [];
    const types = ['sites', 'activities', 'food'];
    for (let i = 0; i < 79; i += 1) {
      const item = {
        user_id: Math.floor(Math.random() * 50) + 1,
        item_id: Math.floor(Math.random() * 16) + 1,
        type: types[Math.floor(Math.random() * 2)],
        created_at: new Date(),
        updated_at: new Date(),
      };
      likedItems.push(item);
    }

    const user19LikedItem1 = {
      user_id: 19,
      item_id: 1,
      type: "food",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user19LikedItem2 = {
      user_id: 19,
      item_id: 2,
      type: "activities",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user19LikedItem3 = {
      user_id: 19,
      item_id: 3,
      type: "sites",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user19LikedItem4 = {
      user_id: 19,
      item_id: 4,
      type: "food",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user19LikedItem5 = {
      user_id: 19,
      item_id: 5,
      type: "food",
      created_at: new Date(),
      updated_at: new Date(),
    };

    likedItems.push(user19LikedItem1, user19LikedItem2, user19LikedItem3, user19LikedItem4, user19LikedItem5);

    await queryInterface.bulkInsert('liked_items', likedItems);
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('trip', null, {});
  },
};

import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initActivityModel from './activity.mjs';
import initCityModel from './city.mjs';
import initCountryModel from './country.mjs';
import initFoodModel from './food.mjs';
import initReviewModel from './review.mjs';
import initSiteModel from './site.mjs';
import initTripModel from './trip.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Activity = initActivityModel(sequelize, Sequelize.DataTypes);
db.City = initCityModel(sequelize, Sequelize.DataTypes);
db.Country = initCountryModel(sequelize, Sequelize.DataTypes);
db.Food = initFoodModel(sequelize, Sequelize.DataTypes);
db.Review = initReviewModel(sequelize, Sequelize.DataTypes);
db.Site = initSiteModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Trip);
db.Trip.belongsTo(db.User);

db.Trip.hasMany(db.Country);
db.Country.belongsTo(db.Trip);

db.Country.hasMany(db.City);
db.City.belongsTo(db.Country);

db.Trip.hasMany(db.Review);
db.Review.belongsTo(db.Trip);

db.User.hasMany(db.Review);
db.Review.hasMany(db.User);

db.Trip.belongstoMany(db.Activity, { through: 'trip_activities' });
db.Trip.belongstoMany(db.Food, { through: 'trip_food' });
db.Trip.belongstoMany(db.Site, { through: 'trip_sites' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

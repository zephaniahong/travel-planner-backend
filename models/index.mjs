import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initActivityModel from './activity.mjs';
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
db.Food = initFoodModel(sequelize, Sequelize.DataTypes);
db.Review = initReviewModel(sequelize, Sequelize.DataTypes);
db.Site = initSiteModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Trip);
db.Trip.belongsTo(db.User);

db.Trip.hasMany(db.Review);
db.Review.belongsTo(db.Trip);

db.User.hasMany(db.Review);
db.Review.hasMany(db.User);

db.Trip.hasMany(db.Site);
db.Site.belongsTo(db.Trip);

db.Trip.hasMany(db.Activity);
db.Activity.belongsTo(db.Trip);

db.Trip.hasMany(db.Food);
db.Food.belongsTo(db.Trip);

db.User.belongsToMany(db.Site, { through: 'liked_sites' });
db.User.belongsToMany(db.Activity, { through: 'liked_activities' });
db.User.belongsToMany(db.Food, { through: 'liked_food' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

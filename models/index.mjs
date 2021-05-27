import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initItemModel from './item.mjs';
import initReviewModel from './review.mjs';
import initTripModel from './trip.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Item = initItemModel(sequelize, Sequelize.DataTypes);
db.Review = initReviewModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Trip);
db.Trip.belongsTo(db.User);

db.Trip.hasMany(db.Review);
db.Review.belongsTo(db.Trip);

db.User.hasMany(db.Review);
db.Review.hasMany(db.User);

db.Trip.hasMany(db.Item);
db.Item.belongsTo(db.Trip);

db.User.belongsToMany(db.Item, { through: 'liked_items' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

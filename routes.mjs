import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initItemsController from './controllers/items.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const ItemsController = initItemsController(db);

  app.get('./gettrips', TripsController.getTrips);

  // create new trip
  app.post('/createtrip', TripsController.newTrip);

  // get all items of a user
  app.get('/get-items/:tripId', ItemsController.getItems);

  // add single item
  app.post('/add-item', ItemsController.addItem);

  // get all liked item
  app.get('/get-liked-items', UsersController.getLikedItems);

  app.get('/gettrips', TripsController.getTrips);
  app.get('/usertrips', UsersController.userTrips);
}

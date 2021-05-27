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

  // default to sites controller
  app.post('/add-item', ItemsController.addItem);

  app.get('/gettrips', TripsController.getTrips);
  app.get('/usertrips', UsersController.userTrips);
}

import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);

  app.get('./gettrips', TripsController.getTrips);

  // create new trip
  app.post('/createtrip', TripsController.newTrip);
  app.get('/gettrips', TripsController.getTrips);
  app.get('/usertrips', UsersController.userTrips);
}

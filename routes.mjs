import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  app.get('/gettrips', TripsController.getTrips);

  const UsersController = initUsersController(db);
  app.get('/usertrips', UsersController.userTrips);
}

import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initSitesController from './controllers/sites.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const SitesController = initSitesController(db);

  app.get('./gettrips', TripsController.getTrips);

  // create new trip
  app.post('/createtrip', TripsController.newTrip);

  // default to sites controller
  app.post('/add-item', SitesController.addItem);

  app.get('/gettrips', TripsController.getTrips);
  app.get('/usertrips', UsersController.userTrips);
}

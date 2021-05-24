import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);

  app.get('./gettrips', TripsController.getTrips);
}

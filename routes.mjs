import db from './models/index.mjs';

import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initItemsController from './controllers/items.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const ItemsController = initItemsController(db);

  app.get('/gettrips', TripsController.getTrips);
  app.post('/createtrip', TripsController.newTrip); // create new trip
  app.get('/gettrips', TripsController.getTrips);

  app.get('/get-items/:tripId', ItemsController.getItems); // get all items of a user
  app.post('/add-item', ItemsController.addItem); // add single item

  app.get('/get-liked-items', UsersController.getLikedItems); // get all liked item
  app.get('/usertrips', UsersController.userTrips);
  app.post('/addlikeditem/:itemId/:userId', UsersController.addLikedItem); // Add to use's liked items
  app.delete('/deletelikeditem/:itemId/:userId', UsersController.deleteLikedItem); // Delete from use's liked items
}

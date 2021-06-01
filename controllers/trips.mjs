export default function initTripsController(db) {
  const getTrips = async (req, res) => {
    try {
      const trips = await db.Trip.findAll({
        include: [db.Review, db.User],
      });

      // const tripUsers = await trips.getUsers();
      console.log('🚗 ----\n', trips);

      res.send(trips);
    } catch (err) {
      console.log('====== getTrips err======\n', err);
    }
  };

  const newTrip = async (req, res) => {
    try {
      const trip = await db.Trip.create({
        userId: 1,
      });
      const tripId = trip.id;
      res.send({ tripId });
    } catch (err) {
      console.log('====== newTrip err======\n', err);
    }
  };

  return {
    getTrips, newTrip,
  };
}

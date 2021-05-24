export default function initTripsController(db) {
  const getTrips = async (req, res) => {
    try {
      const trips = await db.Trip.findAll();

      res.send(trips);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getTrips,
  };
}

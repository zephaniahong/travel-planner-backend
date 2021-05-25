export default function initUsersController(db) {
  const userTrips = async (req, res) => {
    try {
      // Hard code user id = 1 for MVP.
      const trips = await db.Trip.findAll({
        where: {
          userId: 1,
        },
      });

      console.log("See user id 1's trips: ---", trips);

      res.send(trips);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userTrips,
  };
}

export default function initUsersController(db) {
  const userTrips = async (req, res) => {
    try {
      const trips = await db.User.findOne({
        where: {
          id: 1,
        },
      });

      res.send(trips);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userTrips,
  };
}

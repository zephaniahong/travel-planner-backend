export default function initUsersController(db) {
  const userTrips = async (req, res) => {
    try {
      // Hard code user id = 1 for MVP.
      const trips = await db.Trip.findAll({
        where: {
          userId: 1,
        },
      });

      res.send(trips);
    } catch (err) {
      console.log(err);
    }
  };

  const getLikedItems = async (req, res) => {
    try {
      const user = await db.User.findByPk(19);
      const likedItems = await user.getItems();
      res.send(likedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const addLikedItem = async (req, res) => {
    const { itemId, userId } = req.params;
    try {
      const user = await db.User.findByPk(Number(userId));
      const item = await db.Item.findByPk(Number(itemId));

      const likedItem = await user.addItem(item);

      res.send(likedItem);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLikedItem = async (req, res) => {
    const { itemId, userId } = req.params;

    try {
      const user = await db.User.findByPk(Number(userId));
      // const item = await db.Item.findByPk(Number(itemId));

      const userItemToDelete = await user.getItems({
        where: {
          id: Number(itemId),
        },
      });
      await userItemToDelete.destroy();
      console.log('====== userItemToDelete: --- \n', typeof userItemToDelete);
      // res.send(deletedItem);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userTrips, getLikedItems, addLikedItem, deleteLikedItem,
  };
}

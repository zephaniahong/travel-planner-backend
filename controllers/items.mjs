export default function initItemsController(db) {
  const addItem = async (req, res) => {
    const {
      type, tripId, mainText, secondaryText,
    } = req.body;

    try {
      const item = await db.Item.create({
        name: mainText,
        tripId,
        type,
        address: secondaryText,
      });

      res.send(item);
    } catch (err) {
      console.log('=======addItem err\n========', err);
    }
  };

  const getItems = async (req, res) => {
    // userId being passed through is hardcoded as 19 (from store)
    const { tripId, userId } = req.params;

    try {
      const items = await db.Item.findAll({
        where: {
          tripId: Number(tripId),
        },
      });

      const user = await db.User.findByPk(Number(userId));
      const likedItems = await user.getItems();
      const likedIds = likedItems.map((item) => item.id);

      items.map((item) => {
        if (likedIds.includes(item.id)) {
          item.dataValues.liked = true;
        } else {
          item.dataValues.liked = false;
        }
      });

      res.send(items);
    } catch (err) {
      console.log('====== getItems err =======\n', err);
    }
  };

  const getTripItems = async (req, res) => {
    const { tripId } = req.params;
    try {
      const items = await db.Item.findAll({
        where: {
          tripId: Number(tripId),
        },
      });

      res.send(items);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addItem, getItems, getTripItems,
  };
}

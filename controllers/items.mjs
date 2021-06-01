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
    const { tripId } = req.params;
    try {
      const items = await db.Item.findAll({
        where: {
          tripId: Number(tripId),
        },
      });

      // Find a way to add liked (bool) key into each item.
      // If Item Id equals to something in getLikedItems, then True.

      res.send(items);
    } catch (err) {
      console.log('====== getItems err =======\n', err);
    }
  };
  return {
    addItem, getItems,
  };
}

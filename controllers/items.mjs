export default function initItemsController(db) {
  const addItem = async (req, res) => {
    const { type, tripId, description } = req.body;
    try {
      if (type === 'food') {
        const newItem = await db.Food.create({
          tripId,
          address: description,
        });
      } else if (type === 'sites') {
        const newItem = await db.Site.create({
          tripId,
          address: description,
        });
      } else if (type === 'activities') {
        const newItem = await db.Activity.create({
          tripId,
          address: description,
        });
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };

  const getItems = async (req, res) => {
    const { tripId } = req.params;
    try {
      const siteItems = await db.Site.findAll({
        where: {
          tripId,
        },
      });
      const foodItems = await db.Food.findAll({
        where: {
          tripId,
        },
      });
      const activityItems = await db.Activity.findAll({
        where: {
          tripId,
        },
      });
      res.send({ siteItems, foodItems, activityItems });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    addItem, getItems,
  };
}

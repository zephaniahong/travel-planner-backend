export default function initSitesController(db) {
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
  return {
    addItem,
  };
}

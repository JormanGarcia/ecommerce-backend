const router = require("express").Router();
const Op = require("sequelize").Op;

const Items = require("../models/items");

// Get All Items
router.get("/", async (req, res) => {
  const results = await Items.findAndCountAll({ order: [["ID", "DESC"]] });
  res.status(200).json(results);
});

// Get Item By ID
router.get("/:ID", async (req, res) => {
  const ID = req.params.ID;
  const results = await Items.findAll({
    where: {
      ID,
    },
  }).catch((e) => console.log(e));

  if (results.length !== 0) {
    res.status(200).json(results);
  }

  res.send("No item found");
});

// Get Item By Query
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const { min, max, sort } = req.query;

  const filterMinMax = () => {
    if (min !== undefined && max !== undefined) {
      return {
        [Op.between]: [min, max],
      };
    } else if (min === undefined && max === undefined) {
      return {
        [Op.gte]: 0,
      };
    } else {
      return {
        [min !== undefined ? Op.gte : Op.lte]: min !== undefined ? min : max,
      };
    }
  };

  let filter = filterMinMax(min, max);

  const results = await Items.findAll({
    where: {
      [Op.and]: [
        { price: { ...filter } },
        {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${query}%`,
              },
            },
          ],
        },
      ],
    },
  });

  if (results.length !== 0) {
    res.status(200).json(results);
  }

  res.send("No item found");
});

module.exports = router;

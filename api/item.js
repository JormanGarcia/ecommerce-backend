const router = require("express").Router();
const fs = require("fs");
const verifyToken = require("../middlewares/verifyToken");
const Items = require("../models/items");

// Verify Middleware
router.use(verifyToken);

// Add Item
router.put("/", async (req, res) => {
  const { name, description, price } = req.body;

  await Items.create({
    name,
    description,
    price,
  });
  res.status(200).send("added");
});

// Edit Item
router.put("/:ID", async (req, res) => {
  const { name, description, price } = req.body;
  await Items.update(
    {
      name,
      description,
      price,
    },
    {
      where: {
        ID: req.params.ID,
      },
    }
  );
  res.status(200).send("updated");
});

// Delete Item
router.delete("/:ID", async (req, res) => {
  const ID = req.params.ID;
  await Items.destroy({
    where: {
      ID,
    },
  });
  res.status(200).send("Deleted");
});

module.exports = router;

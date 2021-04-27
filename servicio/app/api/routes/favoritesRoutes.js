const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");

router.get("/views", favoritesController.views);
router.get("/", favoritesController.list);
router.get("/:name", favoritesController.load);
router.post("/", favoritesController.create);

module.exports = router;

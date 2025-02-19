const express = require("express");
const { getWorkouts, addWorkout, updateWorkout, deleteWorkout } = require("../controllers/workoutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getWorkouts);
router.post("/", authMiddleware, addWorkout);
router.put("/:id", authMiddleware, updateWorkout);
router.delete("/:id", authMiddleware, deleteWorkout);

module.exports = router;
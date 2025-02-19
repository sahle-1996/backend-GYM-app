const Workout = require("../models/Workout");

// ✅ Get All Workouts (for a User)
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ✅ Add a Workout
// ✅ Add a Workout
// ✅ Add a Workout
// Add a Workout
exports.addWorkout = async (req, res) => {
  try {
    const { title, exercises } = req.body;

    // Check if title and exercises are provided
    if (!title || !exercises) {
      return res.status(400).json({ msg: "Title and exercises are required" });
    }

    const newWorkout = new Workout({ user: req.user.id, title, exercises });
    await newWorkout.save();

    res.json(newWorkout);
  } catch (error) {
    console.error("Error in addWorkout:", error.message); // Log the error for better debugging
    res.status(500).json({ msg: "Error adding workout", error: error.message });
  }
};


// ✅ Update a Workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: "Workout not found" });

    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ msg: "Error updating workout", error: error.message });
  }
};

// ✅ Delete a Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: "Workout not found" });

    // Check if workout.user is defined and matches the logged-in user
    if (!workout.user) {
      return res.status(500).json({ msg: "Workout has no associated user" });
    }

    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    await Workout.findByIdAndDelete(req.params.id);
    res.json({ msg: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting workout", error: error.message });
  }
};
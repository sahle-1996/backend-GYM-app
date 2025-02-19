const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: { type: String, required: true },
    exercises: [{ name: String, load: Number, reps: Number }],
  },
  { timestamps: true } // ✅ Auto-adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Workout", workoutSchema);
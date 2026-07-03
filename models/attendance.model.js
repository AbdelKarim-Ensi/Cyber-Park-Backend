const mongoose = require("mongoose");

const attendance = new mongoose.Schema(
  {
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    date: { 
        type: Date, 
        required: true, 
        default: () => new Date().setHours(0, 0, 0, 0) }, 
    checkIn: { 
        type: Date, 
        required: true },
    checkOut: { 
        type: Date, 
        default: null },
    status: { 
      type: String, 
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY"], 
      default: "PRESENT" 
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

attendance.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendance);
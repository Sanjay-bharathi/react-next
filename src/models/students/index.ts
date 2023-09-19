var mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Student name"],
    },
    age: {
      type: Number,
      required: [true, "Please add Student age"],
    },
    gender: {
      type: Number,
      required: [true, "Please add Student gender"],
    },
    job: {
      type: String,
      required: [true, "Please add Student job"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
  },
);

delete mongoose.models["Students"];

export const Students =
  mongoose.model("Students", studentSchema) || mongoose.models.studentSchema;

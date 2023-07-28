import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
});

const Test = mongoose.model("Test", testSchema);

export default Test;

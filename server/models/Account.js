import mongoose, { mongo } from "mongoose";

const accountSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;

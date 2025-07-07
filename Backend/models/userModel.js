import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartData: {
    type: Object,
    default: {}, 
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;

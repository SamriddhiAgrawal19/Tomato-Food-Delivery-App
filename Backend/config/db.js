import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://acsamriddhi05:fbP9juaFuzDZ1yIi@cluster0.btfogcu.mongodb.net/food-del")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
    
}

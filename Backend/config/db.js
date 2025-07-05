import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://acsamriddhi05:XkjCoaH4R3EhLY1q@cluster0.btfogcu.mongodb.net/food-del")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
    
}
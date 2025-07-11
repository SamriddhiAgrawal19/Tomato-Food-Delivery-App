import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoutes.js';
import 'dotenv/config'
import orderRouter from './routes/orderRoutes.js';


//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("API Working");
});
// db connectionn
connectDB();
app.use("/api/food" , foodRouter);
app.use("/images" , express.static('uploads'));
app.use("/api/user" , userRouter);
app.use("/api/cart" , cartRouter);
app.use("/api/order" , orderRouter);

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});

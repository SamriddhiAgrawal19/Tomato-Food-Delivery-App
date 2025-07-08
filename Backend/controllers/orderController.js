import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        
        const userId = req.userId || req.body.userId;

        if (!userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        
        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

      
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100 * 80), 
            },
            quantity: item.quantity,
        }));

        
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100 * 80, // ₹2 delivery * ₹80 conversion
            },
            quantity: 1,
        });

        
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Order Placement Error:", error); 
        res.status(500).json({ success: false, message: error.message });
    }
};
const verifyOrder = async(req , res)=>{
    try{
        const{orderId , success} = req.body;
    if(success === "true" || success === true){
        await orderModel.findByIdAndUpdate(orderId , {payment:true});
        res.json({success : true , message:"paid"});
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success : false , message : "Not paid"});
    }


    }catch(error){
        console.log(error);
        res.json({success : false , message : "error"});
    }
    
}
const userOrders = async(req , res)=>{
    try {
        const orders = await orderModel.find({userId : req.body.userId || req.userId});
        res.json({success : true , data:orders});
    } catch (error) {
        console.log(error);
        res.json({success : false , message : "Error"});

        
    }

}
const listOrders = async(req, res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success : true, data : orders})

    }catch(error){
        console.log(error);
        res.jsom({success : false , message : "Error"});
    }

}

export { placeOrder , verifyOrder , userOrders , listOrders};

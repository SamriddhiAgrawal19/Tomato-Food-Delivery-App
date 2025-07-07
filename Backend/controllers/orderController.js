import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // ✅ Use userId from middleware (preferably from req.userId, not req.body)
        const userId = req.userId || req.body.userId;

        if (!userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Create a new order
        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        // ✅ Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // ✅ Build Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100 * 80), // Stripe requires integer value
            },
            quantity: item.quantity,
        }));

        // ✅ Add delivery fee
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

        // ✅ Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // ✅ Return Stripe session URL
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Order Placement Error:", error); // ✅ Always log server-side errors
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder };

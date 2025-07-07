import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = { ...user.cartData };

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = { ...user.cartData };

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting cart data" });
  }
};

export { addToCart, removeFromCart, getCart };

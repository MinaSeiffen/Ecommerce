const { productModel } = require("../Models/products");
const { userModel } = require("../Models/users");

const postProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const newProduct = new productModel({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await newProduct.save();
    res.status(201).json({ success: 1, product: newProduct });
  } catch (error) {
    res
      .status(401)
      .json({ MSG: "there is something wrong in your inserted data" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await productModel.deleteOne({ id });
    res.json({ success: 1, product: deletedProduct });
  } catch (error) {
    res.json({ MSG: "there is something wrong in your deleted data" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json({ success: 1, allProducts });
  } catch (err) {
    console.log(err);
    res.json({ MSG: "there is something wrong in your request" });
  }
};

const collectionProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    const newCollections = allProducts.slice(1).slice(-8);
    res.status(200).json({ success: 1, newCollections });
  } catch (err) {
    console.log(err);
    res.json({ MSG: "there is something wrong in your request" });
  }
};

const popularProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({ category: "women" });
    const womenProduct = allProducts.slice(0, 4);
    res.status(200).json({ success: 1, womenProduct });
  } catch (err) {
    console.log(err);
    res.json({ MSG: "there is something wrong in your request" });
  }
};

const addToCart = async (req, res) => {
  const { item_id } = req.body;
  const user_id = req.user.id;
  try {
    const user = await userModel.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ success: false, MSG: "User not found" });
    }
    if (!user.cartData.hasOwnProperty(item_id)) {
      user.cartData[item_id] = 1;
    } else {
      user.cartData[item_id]++;
    }
    await userModel.findOneAndUpdate(
      { _id: user_id },
      { cartData: user.cartData }
    );

    res.status(200).json({ MSG: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { item_id } = req.body;
  const user_id = req.user.id;
  try {
    const user = await userModel.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ success: false, MSG: "User not found" });
    }
    if (!user.cartData.hasOwnProperty(item_id)) {
      user.cartData[item_id] = 0;
    } else if (user.cartData[item_id] > 0) {
      user.cartData[item_id]--;
    }
    await userModel.findOneAndUpdate(
      { _id: user_id },
      { cartData: user.cartData }
    );

    res.status(200).json({ MSG: "Single item removed from the cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


const getCart = async(req , res) => {
    try {
        const userId = req.user.id
        console.log("cart",userId);
        const userData = await userModel.findOne({_id: userId})
        console.log(userData);
        res.json(userData.cartData)
    } catch (error) {
        res.json({MSG:"Cart error"})
    }
}

module.exports = {
  postProduct,
  deleteProduct,
  getAllProducts,
  collectionProducts,
  popularProducts,
  addToCart,
  removeFromCart,
  getCart
};

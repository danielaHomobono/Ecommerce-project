const express = require("express");
const Products = require("./products.model");
const Reviews = require("../reviews/reviews.model");
const { verify } = require("jsonwebtoken");
const verifyToken = require("../middelware/verifyToken");
const verifyAdmin = require("../middelware/verifyAdmin");
const router = express.Router();

// post a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const saveProduct = await newProduct.save();
    //calculate reviews
    const reviews = await Reviews.find({ productId: saveProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      saveProduct.rating = averageRating;
      await saveProduct.save();
    }
    res.status(201).send(saveProduct);
  } catch (error) {
    console.log("Error creating new product")
    res.status(500).send({message: "failed to create a new product" });
  }
});
//get all products
router.get("/", async (req, res) => {
  try {
    const {category, color, minPrice, maxPrice, page=1, limit=10}= req.query;
    let filter = {};
    if(category && category !== "all"){
        filter.category = category;
    }
    if(color && color !== "all" ){
        filter.color = color; 
    }
    if(minPrice && maxPrice){
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if(!isNaN(min) && !isNaN(max)){
            filter.price = {$gte: min, $lte: max};
        }
    }
    const skip = (parseInt(page)-1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("author", "email")
    .sort({createAt: -1});

    res.status(200).send({products, totalPages, totalProducts});
  } catch (error) {
    res.status(500).send({message: "failed to get all products" });
  }
});
//get single product
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate("author", "email username");
    if (!product) {
      return res.status(404).send({message: "product not found" });
    }
    const reviews = await Reviews.find({ productId}).populate(
      "userId",
      "email username"
    );
    res.status(200).send({product, reviews});
  }  catch (error) {
    console.log("Error fetching the product")
    res.status(500).send({message: "failed obteniendo el producto" });
  }
});
//update product
//CON EL VERIFYTOKEN HABRIA QUE HACER OTRO MIDDLEWARE// VER!!!!!!!!!
router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Products.findByIdAndUpdate(productId, {...req.body}, {new: true} );      
   
    if (!updatedProduct) {
      return res.status(404).send({message: "product not found" });
    }
    res.status(200).send({
        message: "product updated successfully",
        product: updatedProduct
    });
  } catch (error) {
    console.log("Error updating  the product")
    res.status(500).send({message: "failed update el producto" });
  }
});

//delete a product
router.delete("/:id",  async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({message: "product not found" });
    }
    //delete reviews
    await Reviews.deleteMany({productId: productId});

    res.status(200).send({message: "product deleted successfully" });
  } catch (error) {
    console.log("Error deleting the product")
    res.status(500).send({message: "failed to delete the product" });
  }
});
//get related products
router.get("/related/:id", async (req, res) => {
  try {
    const {id} = req.params;
    
    if (!id) {
      return res.status(404).send({message: "product not found" });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({message: "product not found" });
    }
    const titleRegex = new RegExp(
        product.name.split(" ")
        .filter((word) => word.length >1)
        .join("|"), "i");

    const relatedProducts = await Products.find({     
      _id: {$ne: id},
      $or: [
      {name: {$regex: titleRegex}},
      {category: product.category}
    ]
    })
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.log("Error fetching related products")
    res.status(500).send({message: "failed to get related products" });
  }
});
module.exports = router;

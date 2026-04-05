import productModel from "../models/productModel.js";

// @GET /products — get all products (populate category name)
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel
      .find()
      .populate("category", "name description"); // replace ObjectId with actual category data

    res.json({
      loggedInAs: {
        email: req.user.email,
        role: req.user.role,
      },
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @GET /products/:id — get single product
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category", "name description");

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @POST /products — create a product (admin only)
const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      const error = new Error("name and price are required.");
      error.statusCode = 400;
      return next(error);
    }

    const product = await productModel.create({ name, price, category });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

// @PUT /products/:id — update a product (admin only)
const updateProduct = async (req, res, next) => {
  try {
    const product = await productModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .populate("category", "name description");

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @DELETE /products/:id — delete a product (admin only)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.json({ message: "Product deleted successfully.", product });
  } catch (error) {
    next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); // file system

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category") // Products based on Categories
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product Not Found in DB",
        });
      }

      req.product = product;

      next();
    });
};

exports.getProduct = (req, res) => {
  // Making photo as undefined because it's bulky and we will make another middleware which will load the photo in background
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);

    return res.send(req.product.photo.data);
  }
  next();
};

// product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find({})
    .select("-photo") // negative sign as don't select photos
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to fetch products",
        });
      }
      return res.json(products);
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    // Destructure with fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please inclue all fields",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        // 1024*1024*2
        return res.status(400).json({
          error: "File Size too Big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving Product in DB Failed",
        });
      }

      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }

    res.json({
      message: "Deletion was a Success",
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    // Destructure with fields
    const { name, description, price, category, stock } = fields;

    // updation Code
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        // 1024*1024*2
        return res.status(400).json({
          error: "File Size too Big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of Product Failed",
        });
      }

      res.json(product);
    });
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No Category Found!",
      });
    }

    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation Failed!",
      });
    }
  });
};

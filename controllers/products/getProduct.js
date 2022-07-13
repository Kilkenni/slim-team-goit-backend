const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");

const getProduct = async (req, res) => {
  const searchedProduct = req.params.searchQuery;

  const product = await Product.find({ "title.ua": { searchedProduct } });

  if (!product.length) {
    throw createError(404, `Product "${searchedProduct}" not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result: product,
    },
  });
};

module.exports = getProduct;

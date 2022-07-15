const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");
const { calculateCalories } = require("../../helpers/calculateCalories");

const getCaloriesAndNotAllowedProducts = async (req, res) => {
  const { bloodType } = req.body;

  if (bloodType < 1 || bloodType > 4) {
    throw createError(400, "Bad Request");
  }

  const notAllowedProducts = await Product.find(
    { ["groupBloodNotAllowed." + bloodType]: { $eq: true } },
    "-__v ",
    { limit: 50, sort: { calories: -1 } }
  );

  if (!notAllowedProducts) {
    throw createError(404, "Not Found");
  }

  const calories = calculateCalories(req.body);

  res.json({
    status: "Success",
    code: 200,
    data: {
      notAllowedProducts,
      calories,
    },
  });
};

module.exports = getCaloriesAndNotAllowedProducts;

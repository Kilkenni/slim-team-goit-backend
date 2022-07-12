const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");

const getCaloriesAndNotAllowedProducts = async (req, res) => { 
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;
    
  if (bloodType < 1 || bloodType > 4) { 
    throw createError(400, 'Bad Request');
  }

  const notAllowedProducts = await Product.find({["groupBloodNotAllowed." + bloodType]: { $eq: true } }, '',
  { limit: 50 })

  const notAllowedProducts = await Product.find(
    { ["groupBloodNotAllowed." + bloodType]: { $eq: true } },
    { limit: 50 }
  );

  if (!notAllowedProducts) {
    throw createError(404, "Not Found");
  }

  const calories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  res.json({
    status: "Success",
    code: 200,
    data: {
      products: [...notAllowedProducts],
      calories,
    },
  });
};

module.exports = getCaloriesAndNotAllowedProducts;

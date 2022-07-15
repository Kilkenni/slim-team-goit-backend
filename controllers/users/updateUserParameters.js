const { User, Product } = require("../../models");
const { createError } = require("../../helpers/errors");
const { calculateCalories } = require("../../helpers/calculateCalories");


const updateUserParameters = async(req,res) => {
    const { bloodType } = req.body;
    
    const userId = req.user._id;
    
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
    
    const parameters = {
      ...req.body,
      calories,
    };
    await User.findByIdAndUpdate(userId, { parameters,  notAllowedProducts}, {new: true})
    res.json({
       status: "Success",
       code: 200, 
       data:{parameters, notAllowedProducts}
    })
};

module.exports = updateUserParameters;
const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");

const getCaloriesAndNotAllowedProducts = async (req, res) => { 
    const { currentWeight, height, age, desiredWeight } = req.body;
    
    const { bloodType } = req.params;

    const notAllowedProducts = await Product.find({["groupBloodNotAllowed." + bloodType]: { $eq: true } },
    { limit: 50 })

    if (!notAllowedProducts) { 
        throw createError(404, 'Not Found');
    }

    const colories = 
10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight)
        
        
        res.json({
            status: "Success",
            code: 200,
            data: {
                products: [...notAllowedProducts],
                colories
            }
        })
     
}

module.exports = getCaloriesAndNotAllowedProducts;
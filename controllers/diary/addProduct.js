const { Diary } = require("../../models");

const addProduct = async (req, res) => {
    const { _id } = req.user;
    const { title, grams, date} = req.body;
    const productId = req.body.productList._id
    const calories = req.body.productList.calories
    const userDiary = await Diary.find({ $and: [{ date: { $eq: date } }, 
    { owner: { $eq: _id } }] });
    
    if(!userDiary) {
       const kcal = (grams * calories)/100
       const newProduct = await Diary.create({
            date: date,
            productList:[
                {
                    _id: productId,
                    title: title,
                    weight: grams,
                    calories: kcal,
                },
            ],
            owner: _id,

        })

        res.status(201).json({
            status: "Success",
            code: 201,
            message: "New diary entry created, product added.",
            data: {
              result: newProduct,
            },
        });
    };
    
    if(userDiary){
       const kcal = (grams * calories)/100
       const newProduct = await Diary.updateOne({date: date, owner: _id}, 
        {$push: {productList: {title: title, weight: grams, calories: kcal}} });
       
       res.status(201).json({
        status: "Success",
        code: 201,
        message: "Diary entry updated, product added.",
        data: {
          result: newProduct,
        },
    });
    }


}

module.exports = addProduct;
// const { Diary } = require("../../models");

const addNewProductToDiary = async (req, res) => {
    // const { _id } = req.user;
    // const { productName, grams, date} = req.body;
    // const userDiary = await Diary.find({ $and: [{ date: { $eq: date } }, 
    //     { owner: { $eq: _id } }] });
        
    // if(!userDiary) {
    //    const newProduct = await Diary.create({
    //         date: date,
    //         products:[
    //             {
    //                 name: productName,
    //                 weight: grams,
    //             }
    //         ],
    //         owner: _id,

    //     })

    //     res.status(201).json({
    //         status: "Success",
    //         code: 201,
    //         message: "New diary entry created, product added.",
    //         data: {
    //           result: newProduct,
    //         },
    //     });
    // };
    
    // if(userDiary){
    //    const newProduct = await Diary.updateOne({date: date, owner: _id}, 
    //     {$push: {products: {name: productName, weight: grams,}} });
       
    //    res.status(201).json({
    //     status: "Success",
    //     code: 201,
    //     message: "Diary entry updated, product added.",
    //     data: {
    //       result: newProduct,
    //     },
    // });
    // }


}

module.exports = addNewProductToDiary;
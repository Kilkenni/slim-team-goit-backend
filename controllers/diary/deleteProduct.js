const { Diary } = require("../../models");
const createError = require("../../helpers/errors")

const deleteProduct = async (req, res) => {
    const { _id } = req.user;
    const { date} = req.body;
    const { productId } = req.params;
    
    const userDiary = await Diary.find({ $and: [{ date: { $eq: date } }, 
    { owner: { $eq: _id } }] });

    if(!userDiary){
        throw createError(404, `There are no entries in the diary for ${date}`)
    }

    if(userDiary){
        const disposalProduct = await Diary.findByIdAndRemove({ _id: productId });    

        if(!disposalProduct) {
            throw createError(404, "Product could not be removed");

        } else{
            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Product removed'}
            );
        
        }
    }
}

module.exports = deleteProduct;
const { Diary } = require("../../models");
const { createError } = require("../../helpers/errors");

const getDiaryOnDate = async (req, res) => {
  const ownerId = req.user._id;
  const { date } = req.params;

  const dateRegexp = new RegExp("^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$");

  if (dateRegexp.test(date) === false) {
    throw createError(400, "Incorrect date format");
  }

  const filterForFindDiary = {
    $and: [{ date: { $eq: date } }, { owner: { $eq: ownerId } }],
  };

  const diaryOnDate = await Diary.findOne(filterForFindDiary);

  if (!diaryOnDate) {
    return res.json({
      status: "Success",
      code: 200,
      message: `Diary on date ${date} is empty`,
      data: {
        productList: [],
      },
    });
  }

  res.json({
    status: "Success",
    code: 200,
    message: `Diary on date ${date}`,
    data: diaryOnDate,
  });
};

module.exports = getDiaryOnDate;

const { Diary } = require("../../models");
const { createError } = require("../../helpers/errors");

const getDiaryOnDate = async (req, res) => {
  const ownerId = req.user._id;
  const { date } = req.params;

  const filterForFindDiary = {
    $and: [{ date: { $eq: date } }, { owner: { $eq: ownerId } }],
  };

  const diaryOnDate = await Diary.findOne(filterForFindDiary);

  if (!diaryOnDate) {
    throw createError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: 200,
    data: diaryOnDate,
  });
};

module.exports = getDiaryOnDate;

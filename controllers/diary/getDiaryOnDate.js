const { Diary } = require("../../models");
const { createError } = require("../../helpers/errors");

const getDiaryOnDate = async (req, res) => {
  const ownerId = req.user._id;
  const { date } = req.params;

  const diaryOnDate = await Diary.findOne({ ownerId, date });

  if (!diaryOnDate) {
    throw createError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result: diaryOnDate,
    },
  });
};

module.exports = getDiaryOnDate;

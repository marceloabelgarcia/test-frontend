// to check service status and session
exports.views = async (req, res, next) => {
  if (req.session.data == undefined)
    req.session.data = { views: 0, status: "Hello!" };
  req.session.data.views++;

  var data = req.session.data;

  res.status(200).json({ data });
};

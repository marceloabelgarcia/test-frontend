// to check service status and session
exports.views = async (req, res, next) => {
  if (req.session.data == undefined)
    req.session.data = {
      views: 0,
      status: "Hello!",
      favorites: {},
      profiles: {},
    };
  req.session.data.views++;

  var data = req.session.data;

  res.status(200).json({ data });
};

exports.create = (req, res, next) => {
  const list = req.body.list;
  const name = req.body.name;
  const profileList = req.body.profiles;

  console.log("req1: ", req.session);

  if (req.session.data == undefined)
    req.session.data = { favorites: {}, profiles: {} };
  var data = req.session.data;

  const favorites = data.favorites;
  const profiles = data.profiles;

  favorites[name] = list;
  profiles[name] = profileList;

  req.session.data.favorites = favorites;
  req.session.data.profiles = profiles;

  const lists = Object.keys(favorites);
  res.status(200).json({ data: lists });
};

exports.list = (req, res, next) => {
  if (req.session.data == undefined)
    req.session.data = { favorites: {}, profiles: {} };
  var data = req.session.data;

  const favorites = data.favorites;

  const lists = Object.keys(favorites);
  res.status(200).json({ data: lists });
};

exports.load = (req, res, next) => {
  const name = req.params.name;
  if (req.session.data == undefined)
    req.session.data = { favorites: {}, profiles: {} };
  var data = req.session.data;

  let results = [];
  let favorites = [];
  if (data.profiles[name] !== undefined) results = data.profiles[name];
  if (data.favorites[name] !== undefined) favorites = data.favorites[name];

  res.status(200).json({ results, favorites });
};

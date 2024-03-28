const notifier = require("node-notifier");

const verifyUser = (req, res, next) => {
  try {
    console.log(req.cookies.token);
    if (req.cookies.token) {
      next();
    } else {
      notifier.notify("Login First!!");
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = verifyUser;

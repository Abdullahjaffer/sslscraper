var Lacoste = require("../../../models/lacoste");
const mongoose = require("mongoose");

module.exports = function(router) {
  router.post("/", (req, res) => {
    let tmp = new Lacoste({
      _id: new mongoose.Types.ObjectId(),
      ip: req.body.ip,
      existing: req.body.existing,
      token: req.body.token,
      device: req.body.device
    });
    tmp
      .save()
      .then(obj => {
        console.log(obj);
        console.log("saved");
        res.send({text : "Saved!"});
      })
      .catch(err => {
        console.log(err);
      });
  });
};

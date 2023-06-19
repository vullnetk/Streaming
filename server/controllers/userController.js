const User = require('../models/Users');
const ObjectId = require('mongoose').Types.ObjectId;
// var ObjectID = require('mongoose').Types.ObjectId
// const { Types: { ObjectId } } = require('mongoose');
// const { ObjectId } = require('mongoose').Types;


exports.insert_user = function (req, res) {

    console.log(req.body)

    let newUser = new User({
        uid: req.body.uid,
        fullName: req.body.fullname,
        email: req.body.email,
        isAdmin: req.body.email.includes('@eStreaming') ? true : false,
        isSubscribed: false,
    });

    newUser.save();
    
    res.json({
        data: newUser
    });
}


exports.get_user = function (req, res) {
  let id = req.params.uid;
  User.findOne({ uid: id })
    .exec()
    .then(user => {
      if (user) {
        console.log(user)
        res.send(user);
      } else {
        // Handle case when user is not found
        res.sendStatus(404);
      }
    })
    .catch(error => {
      if ([400, 403, 404].includes(error.code)) {
        return res.status(error.code).send(error.message);
      }

      console.error(error);
      return res.status(500).send(error.message);
    });
};

exports.updateSubscription = function (req, res) {
    const uid = req.params.id;
    // const userId = ObjectId(id);
    // console.log(uid)

    User.findOneAndUpdate({ uid: uid }, { $set: { isSubscribed: true } }, { new: true })
    .exec()
    .then((updatedUser) => {
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        console.log('User not found.');
        res.status(404).send('User not found.');
      }
    })
    .catch((error) => {
      console.log('Error while updating user:', error);
      res.status(500).send('Error while updating user.');
    });
  };

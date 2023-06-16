const User = require('../models/Users');
var ObjectID = require('mongoose').Types.ObjectId


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

    try {
        User.findOne({ uid: id }).exec(function (err, user) {
            if (user) {
                res.send(user);
            } 
        });
      } catch (error) {
        if ([400, 403, 404].includes(error.code)) {
          return res.status(error.code).send(error.message);
        }
    
        console.error(error);
        return res.status(500).send(error.message);
      }
};
exports.edit_user = function (req, res) {

    if(!ObjectID.isValid(req.body.uid)){
        return res.status(400).send(`No record with given id:   ${req.body.uid}`)
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let updatedUser = {
        isSubscribed: true,
        
    }
    
    User.findByIdAndUpdate(req.body.uid, {$set: updatedUser}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating category')
        }
    })
}
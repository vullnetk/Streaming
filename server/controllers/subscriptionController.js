const Subscription = require('../models/Subscription');
var ObjectID = require('mongoose').Types.ObjectId


exports.insert_subscription = function (req, res) {

    console.log(req.body)

    let newSubscription = new Subscription({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });

    newSubscription.save();
    
    res.json({
        data: newSubscription
    });
}


exports.get_subscription = function (req, res) {
    let id = req.params.id;

    try {
        Subscription.findOne({ id: id }).exec(function (err, Subscription) {
            if (Subscription) {
                res.send(Subscription);
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

exports.get_subscriptions = function (req, res) {
    Subscription.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.edit_subscription = function (req, res) {

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let updatedSubscription = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }
    
    Subscription.findByIdAndUpdate(req.body._id, {$set: updatedSubscription}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating category')
        }
    })
}
exports.delete_subscription = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Categories.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}
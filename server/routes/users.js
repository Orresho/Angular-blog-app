var express = require('express');
var router = express.Router();
var User = require('../model/user');
var bcrypt = require('bcryptjs');


router.post('/', function (req, res, next) {

  // Get user information from inputs and store in user object
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  
  // Save user object to mongo.
  user.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    console.log(events);
    res.status(200).json({
      message: 'Success',
      obj: result
    });
  });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find()
    .exec(function (err, events) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      console.log(events);
      res.status(200).json({
        message: 'Success',
        obj: events
      });
    });
});


module.exports = router;

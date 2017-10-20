var express = require('express');
var router = express.Router();
var User = require('../model/user')

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

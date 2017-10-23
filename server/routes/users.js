var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../model/user');

// Signup
router.post('/', function (req, res, next) {
    // Get user information from inputs and store in user object
    var user = new User({
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred posting',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


//Signin
router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'invalid Login credentials' }
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'invalid Login credentials' }
            }); 
        }
    });
});


/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find()
        .exec(function (err, events) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured getting',
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

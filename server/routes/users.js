var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../model/user');
var bcrypt = require('bcryptjs');

// Authenticate
router.post('/authenticate', function (req, res, next) {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!user) {
			return res.status(401).json({
				title: 'Login failed - user failed',
				error: { message: 'Invalid login credentials' }
			});
		}
		if (!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(401).json({
				title: 'Login failed - password failed',
				error: { message: 'Invalid login credentials' }
			});
		}
		var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			userId: user._id
		});
	});
});

// Register
router.post('/register', function (req, res, next) {
	// Check if email was provided
	if (!req.body.email) {
		res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
	} else {
		// Check if username was provided
		if (!req.body.username) {
			res.json({ success: false, message: 'You must provide a username' }); // Return error
		} else {
			// Check if password was provided
			if (!req.body.password) {
				res.json({ success: false, message: 'You must provide a password' }); // Return error
			} else {
				// Create new user object and apply user input
				let user = new User({
					username: req.body.username.toLowerCase(),
					email: req.body.email.toLowerCase(),
					password: req.body.password,
					firstname: req.body.firstname,
					lastname: req.body.lastname
				});
				// Save user to database
				user.save((err) => {
					// Check if error occured
					if (err) {
						// Check if error is a validation error
						if (err.errors) {
							// Check if validation error is in the email field
							if (err.errors.email) {
								res.json({ success: false, message: 'An error occured, email or username is already taken' }); // Return error
								console.log('email error');
							} else {
								// Check if validation error is in the username field
								if (err.errors.username) {
									res.json({ success: false, message: 'An error occured, username or email is already taken' }); // Return error
									console.log('username error');
								
								} else {
									// Check if validation error is in the password field
									if (err.errors.password) {
										res.json({ success: false, message: err.errors.password.message }); // Return error
									} else {
										res.json({ success: false, message: err }); // Return any other error not already covered
									}
								}
							}
						} else {
							res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
						}
					} else {
						res.json({ success: true, message: 'Account registered!' }); // Return success
					}
				});
			}
		}
	}
});


/* GET users api*/
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

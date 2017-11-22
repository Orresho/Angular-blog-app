var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../model/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// Authenticate
router.post('/login', function (req, res, next) {
	if (!req.body.username) {
		res.json({ success: false, message: 'Username required' });
	} else {
		if (!req.body.password) {
			res.json({ success: false, message: 'Password required' });
		}
		User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				if (!user) {
					res.json({ success: false, message: 'An error occured' });
				} else {
					const validPassword = user.comparePassword(req.body.password);
					if (!validPassword) {
						res.json({ success: false, message: 'An error occured' });
					} else {
						const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
						res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } });
					}
				}
			}
		});
	}
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


router.use((req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		res.json({ success: false, message: 'No token provided' });
	} else {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				res.json({ success: false, message: 'token invalid: ' + err })
			} else {
				req.decoded = decoded
				next();
			}
		});
	}
});

router.get('/profile', (req, res) => {
	User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			if (!user) {
				res.json({ success: false, message: 'User not found' });
			} else {
				res.json({ success: true, user: user });
			}
		}

	});
});


module.exports = router;

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../model/user');
var Blog = require('../model/blog');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

router.post('/newblog', (req, res) => {
    if (!req.body.title) {
        res.json({ success: false, message: 'Blog title is required' });
    } else {
        if (!req.body.body) {
            res.json({ success: false, message: 'Body title is required' });
        } else {
            if (!req.body.createdBy) {
                res.json({ success: false, message: 'blog creator is required' });
            } else {
                const blog = new Blog({
                    title: req.body.title,
                    body: req.body.body,
                    createdBy: req.body.createdBy
                });
                blog.save((err) => {
                    if (err) {
                        if (err.errors) {
                            if (err.errors.title) {
                                res.json({ success: false, message: err.errors.title.message });
                            } else {
                                if (err.errors.body) {
                                    res.json({ success: false, message: err.errors.body.message });
                                } else {
                                    res.json({ success: false, message: err.errmsg });
                                }
                            }
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else {
                        res.json({success: true, message: 'Blog saved!'})
                    }
                });
            }
        }
    }
});

module.exports = router;
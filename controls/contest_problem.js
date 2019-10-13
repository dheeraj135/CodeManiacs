var helper = {};
var request = require("request-promise");
var testcases = require("../models/testcases");
var submission = require("../models/submission");
var problems = require("../models/problems");
var users = require('../models/users');
var lang = require("../config/lang");
var contests = require("../models/contests");

helper.problemSet = async (req, res, next) => {
    console.log(req.params.contestid)
    contests.find({ _id: req.params.contestid},{problemsID:1, _id:0})
        .then((data) => {
            var prob_qids = data[0].problemsID;
            var contest_problems = {};
            for (var i = 0; i < prob_qids.length; i++){
                problems.find({qID:Number(prob_qids[i])})
                    .then((file) => {
                    console.log(file);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = helper;
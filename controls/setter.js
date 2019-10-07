var helper = {};
const Question = require("../models/problems");
const TC = require("../models/testcases");
const total = require("../models/total_questions");
const contests = require("../models/contests");
const users = require("../models/users");
var moment = require("moment");


helper.displayMyProblems = async (req,res,next) => {
    Question.find({problemSetter:req.user.username}).sort({qID : -1})
        .then((data) => {
            res.render("setter", { data:data });
        })
        .catch((err) => {
            console.log(err);
        })
}

/**POST: creating a new problem 
 * route: /problems/add
*/
helper.addQuestion = async function (req, res, next) {

    const ques = req.body.ques; // problem statement
    const tc = req.body.testcases; // testcases
    req.body.ques.problemSetter=req.user.name;

    try {
        await total.countDocuments({}, async (err, cnt) => {
            /**If the problem is created for the very first time,
             * then 'total' collection would be empty
             */
            if (!cnt) {
                /**inserting totalProblems = 0, which increments
                 * each time on inserting a new problem.
                 */
                await total.create({ totalProblems: 0 })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        });
        // attach qID to tc and ques
        const qID = await total.findOne({});
        qID.totalProblems += 1;
        await qID.save();
        ques.qID = qID.totalProblems;
        tc.qID = qID.totalProblems;

        // log them to the console
        console.log(ques);
        // console.log(tc);

        // push to database
        await Question.create(ques);
        await TC.create(tc);

        // question successfully created
        res.send(`Problem submitted as qID = ${qID.totalProblems}`);
    } catch (error) {
        console.log("couldn't submit the question/testcase");
        console.log(error);
        res.send("Problem could not be submitted");
    }
};

module.exports = helper;
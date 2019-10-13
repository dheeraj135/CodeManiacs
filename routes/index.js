var express = require("express");
var router = express.Router();
var contests = require("../controls/contests");
var problems = require("../controls/problems");
var contest_problem = require("../controls/contest_problem")

/**Getting the homepage */
router.get("/", (req, res) => {
    res.render("index");
});

/**Display the contribution page */
router.get("/contribution", (req, res) => {
    res.render("contribution");
});

/**Display the user contest page */
router.get("/contests", contests.showContests);

/**Display the ranklist */
router.get("/contests/:contestCode/standings", contests.ranklist);

/**Display the problem set visible to the users */
router.get("/problems/all", problems.problemSet);

/**Display the problem with qID */
router.get("/problem/:qID", problems.displayProblem);

/**Display the user ranklist page */
router.get("/rankings", problems.userRankings);

/**Display the IDE page */
router.get("/ide", problems.getIde);

/**POST: submitting the IDE code, input */
router.post("/ide", problems.postIde);

/**Display the contest with objectid */
router.get("/problems/:contestid", contest_problem.problemSet);

module.exports = router;

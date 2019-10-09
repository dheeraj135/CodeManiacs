var express = require("express");
var router = express.Router();
var enforceAuthentication = require("../controls/auth").enforceAuthentication;
var setter = require("../controls/setter");

router.get("/",setter.displayMyProblems);

router.get("/add", (req,res,next) => {
    res.render("problem_add_setter");
});

router.post("/add",setter.addQuestion);
router.get("/edit/:qID",setter.getQuestion);
router.post("/edit/:qID",setter.editQuestion);
router.put("/edit/:qID",setter.editQuestion);
router.post("/dlt_prob/:qID", setter.deleteProblem);

module.exports = router;

var express = require("express");
var router = express.Router();
var enforceAuthentication = require("../controls/auth").enforceAuthentication;
var setter = require("../controls/setter");

router.get("/", enforceAuthentication(true,false,true),setter.displayMyProblems);

router.get("/add",enforceAuthentication(true,false,true),(req,res,next) => {
    res.render("problem_add");
});

router.post("/add",setter.addQuestion);

module.exports = router;

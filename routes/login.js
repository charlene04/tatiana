var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport");
   
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);
// ======================LOG IN===========================
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/cakes",
		failureRedirect: "/login"
	}), function(req, res){
		
});

module.exports = router;
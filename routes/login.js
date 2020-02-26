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
	failureRedirect: "/menu/cakes",
	failureFlash: true,
	successFlash: true
}), function(req, res){
	req.flash("success", "Successfully logged in as "+req.user.username+".");
	res.redirect("/menu/cakes")
});

module.exports = router;
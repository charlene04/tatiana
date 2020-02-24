var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
    bodeyParser = require("body-parser"),
    passport = require("passport"),
	User = require("../models/User");
	
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);

// ==========SIGN UP===================================
router.get("/register", function(req, res){
	res.render("signup");
});

router.post("/register", function(req, res){ 
	var newUser= new User({
		username: req.body.username,
		email: req.body.email
	});
	if(req.body.username === process.env.USERNAME && req.body.password == process.env.PASSWORD){
		newUser.isAdmin= true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", "Something went wrong!");
			return res.render("signup");
		}
			passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully logged in!");
			res.redirect("/");
		});
	});
});

module.exports = router;
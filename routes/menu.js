var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu");
	
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);

router.get("/cakes", function(req, res){
	Menu.find({id:1}, function(err, cakes){
		if(err){
			req.flash("error", "Something went wrong. Please try again.")
			res.redirect("/");
		}else {
			res.render("../views/cake/cakes", {cakes: cakes});
		}
	});
});

router.get("/doughnuts", function(req, res){
	Menu.find({id:2}, function(err, doughnuts){
		if(err){
			req.flash("error", "Something went wrong. Please try again.")
			res.redirect("/");
		}else {
			res.render("../views/doughnut/doughnuts", {doughnuts: doughnuts});
		}
	});
});

router.get("/coffee", function(req, res){
	Menu.find({id:3}, function(err, coffees){
		if(err){
			req.flash("error", "Something went wrong. Please try again.")
			res.redirect("/");
		}else {
			res.render("../views/coffee/coffee", {coffees: coffees});
		}
	});
});

module.exports = router;
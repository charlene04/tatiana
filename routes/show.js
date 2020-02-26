var router = require("express").Router({mergeParams:true});
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
    User = require("../models/User"),
    expressSanitizer = require("express-sanitizer"),
	Comment = require("../models/Comment");
	
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);

router.get("/cakes/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			res.render("cake/show-cake", {cake: foundCake});
		}
	});
});

router.get("/doughnuts/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			res.render("doughnut/show-dough", {dough: foundDough});
		}
	});
});

router.get("/coffee/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			res.render("coffee/show-coffee", {coffee: foundCoffee});
		}
	});
});

module.exports = router;
var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
    User = require("../models/User"),
    expressSanitizer = require("express-sanitizer"),
    Comment = require("../models/Comment"),
	isAdmin = require("../middleware/isAdmin");
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);



router.get("/cakes/new", isAdmin, function(req, res){
	res.render("cake/new-cake");
});
router.get("/doughnuts/new", isAdmin, function(req, res){
	res.render("doughnut/new-dough");
});
router.get("/coffee/new", isAdmin, function(req, res){
	res.render("coffee/new-coffee");
});


// =======================================================================
// ===================CREATE MENU ROUTES=======================
// =======================================================================
router.post("/cakes", isAdmin, function(req, res){
	req.body.cake.description = req.sanitize(req.body.cake.description);
	Menu.create(req.body.cake, function(err, newCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/cakes/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/cakes");
		}
	});
});

router.post("/doughnuts", isAdmin, function(req, res){
	req.body.doughnut.description = req.sanitize(req.body.doughnut.description);
	Menu.create(req.body.doughnut, function(err, newDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/doughnuts/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/menu/doughnuts");
		}
	});
});

router.post("/coffee", isAdmin, function(req, res){
	req.body.coffee.description = req.sanitize(req.body.coffee.description);
	Menu.create(req.body.coffee, function(err, newCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/coffee/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/coffee");
		}
	});
});

module.exports = router;
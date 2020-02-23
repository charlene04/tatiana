var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
    User = require("../models/User"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Comment = require("../models/Comment"),
	isAdmin = require("../middleware/isAdmin");
	
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);
// ========================================================================
// =========================EDIT MENU ROUTE=====================================
// ==========================================================================
router.get("/cakes/:id/edit", isAdmin, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/cakes");
		} else {
			res.render("cake/edit-cake", {cake: foundCake});
		}
	});
});
router.get("/doughnuts/:id/edit", isAdmin, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/doughnuts");
		} else {
			res.render("doughnut/edit-dough", {dough: foundDough});
		}
	});
});
router.get("/coffee/:id/edit", isAdmin, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/coffee");
		} else {
			res.render("coffee/edit-coffee", {coffee: foundCoffee});
		}
	});
});

// ============================================================================
// ====================UPDATE MENU  ROUTE==========================================
// ============================================================================
router.put("/cakes/:id", isAdmin, function(req, res){
	req.body.cake.description = req.sanitize(req.body.cake.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.cake, function(err, updateCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/cakes");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/cakes/" + req.params.id);
		}

	});
});

router.put("/doughnuts/:id", isAdmin, function(req, res){
	req.body.doughnut.description = req.sanitize(req.body.doughnut.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.doughnut, function(err, updateDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/doughnuts");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/doughnuts/" + req.params.id);
		}

	});
});
router.put("/coffee/:id", isAdmin, function(req, res){
	req.body.coffee.description = req.sanitize(req.body.coffee.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.coffee, function(err, updateCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/coffee");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/coffee/" + req.params.id);
		}

	});
});

module.exports =  router;
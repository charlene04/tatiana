var router = require("express").Router({mergeParams:true});
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

router.delete("/cakes/:id", isAdmin, function(req, res){
	Menu.findByIdAndDelete(req.params.id, function(err){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		}else {
			req.flash("success", "Menu deleted!");
			res.redirect("/menu/cakes");
		}
	});	
}); 
router.delete("/doughnuts/:id", isAdmin, function(req, res){
	Menu.findByIdAndDelete(req.params.id, function(err){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		}else {
			req.flash("success", "Menu deleted!");
			res.redirect("/menu/doughnuts");
		}
	});	
}); 
router.delete("/coffee/:id", isAdmin, function(req, res){
	Menu.findByIdAndDelete(req.params.id, function(err){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		}else {
			req.flash("success", "Menu deleted!");
			res.redirect("/menu/coffee");
		}
	});	
}); 

module.exports = router;
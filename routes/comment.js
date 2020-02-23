var router = require("express").Router();
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
    User = require("../models/User"),
    Comment = require("../models/Comment"),
    isLoggedIn = require("../middleware/isLoggedIn");

	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);
// ==============================================================================
// -=====================NEW COMMENT ROUTES==========================================
// ============================================================================
router.get("/cakes/:id/comments/new", isLoggedIn,  function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			res.render("cake/comment-cake", {cake: foundCake});
		}
	});
	
});

router.get("/doughnuts/:id/comments/new", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			res.render("doughnut/comment-dough", {dough: foundDough});
		}
	});
});
router.get("/coffee/:id/comments/new", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			res.render("coffee/comment-coffee", {coffee: foundCoffee});
		}
	});
});

router.post("/cakes/:id/comments", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/cakes");
				}else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCake.comments.push(comment);
					foundCake.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/menu/cakes/"+ foundCake._id);
				}
			});
		
		}
	});
	
});
router.post("/doughnuts/:id/comments", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/doughnuts");
				}else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundDough.comments.push(comment);
					foundDough.save();
					req.flash("error", "Comment added successfully!");
					res.redirect("/menu/doughnuts/"+ foundDough._id);
				}
			});
		
		}
	});
	
});
router.post("/coffee/:id/comments", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/coffee");
				}else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCoffee.comments.push(comment);
					foundCoffee.save();
					req.flash("error", "Comment added successfully!");
					res.redirect("/menu/coffee/"+ foundCoffee._id);
				}
			});
		
		}
	});
	
});

module.exports = router;
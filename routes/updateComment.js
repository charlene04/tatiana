var router = require("express").Router({mergeParams:true});
var mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Menu = require("../models/Menu"),
	User = require("../models/User"),
	isLoggedIn = require("../middleware/isLoggedIn");
    mothodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Comment = require("../models/Comment"),
	isLoggedIn = require("../middleware/isLoggedIn");
	
	mongoose.set('debug', true);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useFindAndModify', false);

// ============================================================================
// ================================EDIT COMMENT ROUTES=========================
// ======================================================================
router.get("/cakes/:id/comments/:comment_id/edit", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/cakes");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/cakes/" + foundCake._id)
				
				} else{
					res.render("../views/cake/edit-comment", {cake:foundCake, comment: foundComment});	
				}
			})
			
		}
	});
});

router.put("/cakes/:id/comments/:comment_id", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("/cakes");
			} else{
				Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/cakes/" + foundCake._id  +"/comments/" + updatedComment._id + "/edit");
			} else{
				req.flash("success", "Comment updated!");
				res.redirect("/cakes/" + foundCake._id);
			}

			});		
		}
	});
});

router.get("/doughnuts/:id/comments/:comment_id/edit",isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/doughnuts");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/doughnuts/" + foundDough._id);
					
				} else{
					res.render("../views/doughnut/edit-comment", {dough:foundDough, comment: foundComment});	
				}
			})
			
		}
	});
});

router.put("/doughnuts/:id/comments/:comment_id", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("/menu/doughnuts");
			} else{
				Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/doughnuts/" + foundDough._id +"/comments/" + updatedComment._id + "/edit");
			} else{
				req.flash("success", "Comment updated!");
				res.redirect("/menu/doughnuts/" + foundDough._id);
			}

			});		
		}
	});
});

router.get("/coffee/:id/comments/:comment_id/edit", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/coffee");
				} else{
					res.render("../views/coffee/edit-comment", {coffee:foundCoffee, comment: foundComment});	
				}
			})
			
		}
	});
});

router.put("/coffee/:id/comments/:comment_id", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("/menu/coffee");
			} else{
				Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/coffee/" + foundCoffee._id +"/comments/" + updatedComment._id + "/edit");
			} else{
				req.flash("success", "Comment updated!");
				res.redirect("/menu/coffee/" + foundCoffee._id);
			}

			});		
		}
	});
});

module.exports = router;
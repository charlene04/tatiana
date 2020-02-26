var router = require("express").Router({mergeParams:true});
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
// =========================================================================================
// ===================DELETE COMMENT ROUTES======================================
// =======================================================================================
router.delete("/cakes/:id/comments/:comment_id", isLoggedIn, function(req, res){
    Menu.findById(req.params.id, function(err, foundCake){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/cakes");
        } else {
            Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/cakes")
        } else{
            req.flash("success", "Comment deleted!");
            res.redirect("/menu/cakes/"+ foundCake._id)
            }
        });
    }
});
});
router.delete("/doughnuts/:id/comments/:comment_id", isLoggedIn, function(req, res){
    Menu.findById(req.params.id, function(err, foundDough){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/doughnuts");
        } else {
            Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/doughnuts")
        } else{
            req.flash("success", "Comment deleted!");
            res.redirect("/menu/doughnuts/"+ foundDough._id)
            }
        });
    }
});
});
router.delete("/coffee/:id/comments/:comment_id", isLoggedIn, function(req, res){
    Menu.findById(req.params.id, function(err, foundCoffee){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/coffee");
        } else {
            Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/menu/coffee")
        } else{
            req.flash("success", "Comment deleted!");
            res.redirect("/menu/coffee/"+ foundCoffee._id)
            }
        });
    }
});
});

module.exports = router;
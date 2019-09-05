var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var flash = require("connect-flash");
// ===========APP CONFIG===============================
mongoose.connect("mongodb://localhost/tatianaDB", {useNewUrlParser: true});

app.use(require("express-session")({
	secret: "Charles built this",
	resave: false,
	saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});




// ===========================USER SCHEMA-===================
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	isAdmin: {type:Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));



// ==============CAKE CONFIG============================================
var menuSchema = new mongoose.Schema({
	id:   Number,
	name: String,
	image: String,
	description: String,
	price: Number,
	
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});

var Menu = mongoose.model("Menu", menuSchema);
// ==========================================================================


// ==========================COMMENT CONFIG==============================
var commentSchema = new mongoose.Schema({
	text: String,
	created: 
		{
		type: Date, 
		default: Date.now
	},
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

var Comment = mongoose.model("Comment", commentSchema);





// ==========================================================
// ==============ROUTES======================================
// ==============================================================
app.get("/", function(req, res){
	res.redirect("/home");
});

app.get("/home", function(req, res){

	res.render("home");
});


app.get("/menu/cakes", function(req, res){
	Menu.find({id:1}, function(err, cakes){
		if(err){
			console.log(err);
		}else {
			res.render("cake/cakes", {cakes: cakes});
		}
	});
});

app.get("/menu/doughnuts", function(req, res){
	Menu.find({id :2}, function(err, doughnuts){
		if(err){
			console.log(err);
		}else {
			res.render("doughnut/doughnuts", {doughnuts: doughnuts});
		}
	});
});

app.get("/menu/coffee", function(req, res){
	Menu.find({id:3}, function(err, coffees){
		if(err){
			console.log(err);
		}else {
			res.render("coffee/coffee", {coffees: coffees});
		}
	});
});
// ====================================================================
// =================NEW MENU ROUTES==================================
// ==================================================================
app.get("/menu/cakes/new", function(req, res){
	res.render("cake/new-cake");
});
app.get("/menu/doughnuts/new", function(req, res){
	res.render("doughnut/new-dough");
});
app.get("/menu/coffee/new", function(req, res){
	res.render("coffee/new-coffee");
});

// =======================================================================
// ===================CREATE MENU ROUTES=======================
// =======================================================================
app.post("/menu/cakes", isLoggedIn, function(req, res){
	req.body.cake.description = req.sanitize(req.body.cake.description);
	Menu.create(req.body.cake, function(err, newCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/menu/cakes");
		}
	});
});

app.post("/menu/doughnuts", isLoggedIn, function(req, res){
	req.body.doughnut.description = req.sanitize(req.body.doughnut.description);
	Menu.create(req.body.doughnut, function(err, newDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/menu/doughnuts");
		}
	});
});

app.post("/menu/coffee", isLoggedIn, function(req, res){
	req.body.coffee.description = req.sanitize(req.body.coffee.description);
	Menu.create(req.body.coffee, function(err, newCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee/new");
		} else {
			req.flash("success", "New menu uploaded successfully!");
			res.redirect("/menu/coffee");
		}
	});
});


// =======================================================================
// ===================SHOW ROUTES=========================================
// ==========================================================================
app.get("/menu/cakes/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			res.render("cake/show-cake", {cake: foundCake});
		}
	});
});

app.get("/menu/doughnuts/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			res.render("doughnut/show-dough", {dough: foundDough});
		}
	});
});

app.get("/menu/coffee/:id", function(req, res){
	Menu.findById(req.params.id).populate("comments").exec(function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			res.render("coffee/show-coffee", {coffee: foundCoffee});
		}
	});
});
// ========================================================================
// =========================EDIT MENU ROUTE=====================================
// ==========================================================================
app.get("/menu/cakes/:id/edit", function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			res.render("cake/edit-cake", {cake: foundCake});
		}
	});
});
app.get("/menu/doughnuts/:id/edit", function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			res.render("doughnut/edit-dough", {dough: foundDough});
		}
	});
});
app.get("/menu/coffee/:id/edit", function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			res.render("coffee/edit-coffee", {coffee: foundCoffee});
		}
	});
});
// ============================================================================
// ====================UPDATE MENU  ROUTE==========================================
// ============================================================================
app.put("/menu/cakes/:id", function(req, res){
	req.body.cake.description = req.sanitize(req.body.cake.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.cake, function(err, updateCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/menu/cakes/" + req.params.id);
		}

	});
});

app.put("/menu/doughnuts/:id", function(req, res){
	req.body.doughnut.description = req.sanitize(req.body.doughnut.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.doughnut, function(err, updateDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/menu/doughnuts/" + req.params.id);
		}

	});
});
app.put("/menu/coffee/:id", function(req, res){
	req.body.coffee.description = req.sanitize(req.body.coffee.description);
	Menu.findByIdAndUpdate(req.params.id, req.body.coffee, function(err, updateCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		}else{
			req.flash("success", "Menu updated!");
			res.redirect("/menu/coffee/" + req.params.id);
		}

	});
});
// ================================================================
//====================DESTROY MENU ROUTE========================================
// ==============================================================================
app.delete("/menu/cakes/:id", function(req, res){
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
app.delete("/menu/doughnuts/:id", function(req, res){
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
app.delete("/menu/coffee/:id", function(req, res){
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
// ==============================================================================
// -=====================NEW COMMENT ROUTES==========================================
// ============================================================================
app.get("/menu/cakes/:id/comments/new", isLoggedIn,  function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else {
			res.render("cake/comment-cake", {cake: foundCake});
		}
	});
	
});

app.get("/menu/doughnuts/:id/comments/new", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else {
			res.render("doughnut/comment-dough", {dough: foundDough});
		}
	});
});
app.get("/menu/coffee/:id/comments/new", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else {
			res.render("coffee/comment-coffee", {coffee: foundCoffee});
		}
	});
});

app.post("/menu/cakes/:id/comments", isLoggedIn, function(req, res){
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
app.post("/menu/doughnuts/:id/comments", isLoggedIn, function(req, res){
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
app.post("/menu/coffee/:id/comments", isLoggedIn, function(req, res){
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
// ============================================================================
// ================================EDIT COMMENT ROUTES=========================
// ======================================================================
app.get("/menu/cakes/:id/comments/:comment_id/edit", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/cakes");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/cakes/" + foundCake._id)
				
				} else{
					res.render("cake/edit-comment", {cake:foundCake, comment: foundComment});	
				}
			})
			
		}
	});
});

app.put("/menu/cakes/:id/comments/:comment_id", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCake){
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("/menu/cakes");
			} else{
				Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/cakes/" + foundCake._id  +"/comments/" + updatedComment._id + "/edit");
			} else{
				req.flash("success", "Comment updated!");
				res.redirect("/menu/cakes/" + foundCake._id);
			}

			});		
		}
	});
});

app.get("/menu/doughnuts/:id/comments/:comment_id/edit",isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundDough){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/doughnuts");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
					res.redirect("/menu/doughnuts/" + foundDough._id);
					
				} else{
					res.render("doughnut/edit-comment", {dough:foundDough, comment: foundComment});	
				}
			})
			
		}
	});
});

app.put("/menu/doughnuts/:id/comments/:comment_id", isLoggedIn, function(req, res){
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

app.get("/menu/coffee/:id/comments/:comment_id/edit", isLoggedIn, function(req, res){
	Menu.findById(req.params.id, function(err, foundCoffee){
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("/menu/coffee");
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					req.flash("error", "Something went wrong!");
				} else{
					res.render("coffee/edit-comment", {coffee:foundCoffee, comment: foundComment});	
				}
			})
			
		}
	});
});

app.put("/menu/coffee/:id/comments/:comment_id", isLoggedIn, function(req, res){
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
// =========================================================================================
// ===================DELETE COMMENT ROUTES======================================
// =======================================================================================
app.delete("/menu/cakes/:id/comments/:comment_id", isLoggedIn, function(req, res){
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
app.delete("/menu/doughnuts/:id/comments/:comment_id", isLoggedIn, function(req, res){
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
app.delete("/menu/coffee/:id/comments/:comment_id", isLoggedIn, function(req, res){
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

// ==============================================================================
// ====================================SEARCH ROUTES========================
// ====================================================================================
app.post("/menu/search", function(req, res){
	var key = req.body.key;
	Menu.find({$text: {$search: key}}, function(err, service){
		if(err){
			console.log(err);
		}else{
			res.render("search", {match : service})
		}
	})
	
})

app.get("/users", isLoggedIn, function(req, res){
	User.find({}, function(err, users){
		if(err){
			req.flash("error", "Something went wrong!");
			console.log(err);
		}else {
			res.render("users", {users: users});
		}
	});
});
// ==================================================================
// ===============================AUTH ROUTES===========================
// ================================================================================
// ==========SIGN UP===================================
app.get("/register", function(req, res){
	res.render("signup");
});

app.post("/register", function(req, res){ 
	var newUser= new User({
		username: req.body.username,
		email: req.body.email
	});
	if(req.body.username === "Admin"){
		newUser.isAdmin= true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", "Something went wrong!");
			return res.render("signup");
		}
			passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully logged in!");
			res.redirect("/menu/cakes");
		});
	});
});

// ======================LOG IN===========================
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/menu/cakes",
		failureRedirect: "/login"
	}), function(req, res){
		
});

// ======================LOG OUT==================
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/home");
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first");
	res.redirect("/login");
}

// =====================ABOUT PAGE=================
app.get("/about", function(req, res){
	res.render("about");
});


// // ===============================================
app.listen("3000", function(){
	console.log("The server has started on port 3000!");
});


// var MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017/kernel", {useNewUrlParser: true}, function(err, db){
// 	if(!err){
// 		console.log("we are connected!");
// 	}
// });



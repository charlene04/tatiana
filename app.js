 var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");
//var MongoStore = require("connect-mongo")(require("express-session"));
var isLoggedIn = require("./middleware/isLoggedIn"),
	 User = require("./models/User"),
	 Menu = require("./models/Menu"),
	 Comment = require("./models/Comment");
// ===========APP CONFIG===============================
 //mongoose.connect("mongodb://localhost/tatianaDB", {useNewUrlParser: true});
const uri = process.env.DATABASEURL;
mongoose.connect(uri,{useNewUrlParser: true}, function(err, db) {
 console.log(db);

});



app.use(session({
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
	res.locals.error = req.flash("error", "Something went wrong!");
	res.locals.success = req.flash("success");
	next();
});
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require("./routes/prod")(app);

var indexRoutes = require("./routes/home"),
	termsRoutes = require("./routes/terms"),
	commentRoutes = require("./routes/comment"),
	deleteCommentRoutes = require("./routes/deleteComment"),
	updateCommentRoutes = require("./routes/updateComment"),
	registerRoutes = require("./routes/register"),
	logoutRoutes = require("./routes/logout"),
	deleteRoutes = require("./routes/delete"),
	createRoutes = require("./routes/create"),
	loginRoutes = require("./routes/login"),
	menuRoutes = require("./routes/menu"),
	faqRoutes = require("./routes/faq"),
	showRoutes = require("./routes/show"),
	updateMenuRoutes = require("./routes/updateMenu");
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


// =====================ABOUT PAGE=================
app.get("/contact", function(req, res){
	res.render("about");
});



app.use("/menu", deleteCommentRoutes);
app.use(termsRoutes);
app.use("/menu", updateCommentRoutes);
app.use(indexRoutes);
app.use(registerRoutes);
app.use("/menu", commentRoutes);
app.use("/menu", deleteRoutes);
app.use("/menu", showRoutes);
app.use("/menu", menuRoutes);
app.use(loginRoutes);
app.use(faqRoutes),
app.use("/menu", updateMenuRoutes);
app.use("/menu", createRoutes);
app.use(logoutRoutes);

// // ===============================================
app.listen(process.env.PORT || "3000", function(){
	console.log("The server has started on port 3000!");
});





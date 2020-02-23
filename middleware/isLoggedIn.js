

function isLoggedIn(req, res, next){
	if(req.isAuthenticated() && req.user._id == req.params.id){
		return next();
	}
	req.flash("error", "Please login first");
	res.redirect("/login");
}

module.exports = isLoggedIn;
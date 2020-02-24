

function isAdmin(req, res, next){
	if(req.isAuthenticated() && req.user.isAdmin){
		return next();
	}
	req.flash("error", "Unauthorised access!");
	res.redirect("/");
}

module.exports = isAdmin;
var router = require("express").Router();

router.get("/", function(req, res){
	res.render("../views/home");
	
});

router.get("/home", function(req, res){

	res.redirect("/");
});

module.exports  = router;
var router = require("express").Router();

router.get("/", function(req, res){
	res.render("home");
	
});

router.get("/home", function(req, res){

	res.render("/");
});

module.exports  = router;
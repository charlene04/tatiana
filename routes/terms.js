var router = require("express").Router();


router.get("/terms", function(req, res){
    res.render("terms");
});

module.exports = router;
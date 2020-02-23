var router = require("express").Router();


router.get("/terms-of-service", function(req, res){
    res.render("terms");
});

module.exports = router;
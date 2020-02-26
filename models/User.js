var express = require("express");
var passport = require("passport");
var mongoose = require("mongoose");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


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

passport.authenticate('local', {failureFlash: 'Invalid username or password.'})
passport.authenticate('local', {successFlash: 'Welcome!'})

module.exports =  User = mongoose.model("User", UserSchema);
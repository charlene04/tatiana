var express = require("express");
var mongoose = require("mongoose");

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

module.exports =  Menu = mongoose.model("Menu", menuSchema);
'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Querychema = new mongoose.Schema({
  _id:        {type: mongoose.Types.ObjectId} ,
  url:       {type: String, lowercase: true,  unique: true, required: [true, "can't be blank"]},
  title:      {type: String, lowercase: true},
  contacted: {type: Boolean, default: false},
  responded: {type: Boolean, default: false},
  template: {type: String},
  search: {type: String},
  user: {type: String}
}, {timestamps: true});

Querychema.plugin(uniqueValidator, {message: 'is already taken.'});
        
module.exports = mongoose.model('Query', Querychema);
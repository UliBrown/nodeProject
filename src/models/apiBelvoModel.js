const { Schema, model} = require('mongoose');

const mongSchem = new Schema (
{
	code: {type: String, required: true}, 
	status: {type: String, required: true},
	copyright: {type: String, required: true},
},
{
	timestamp: true, 
	versionKey: false,
});

module.exports = model("mongSchem", mongSchem);
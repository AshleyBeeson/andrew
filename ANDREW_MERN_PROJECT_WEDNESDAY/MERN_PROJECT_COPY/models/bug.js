const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
		user: String,
		dateCreated: Date,
		action: String
})

const bugSchema = new Schema({
	id:{
        type: Number,
        required: [true, "id is required"]
    },
    issueId:{
    	type: String,
        required: true
    },
    dateCreated:{
    	type: Date,
        required: true
    },
    summary:{
    	type: String,
    	required: true
    },
    description:{
    	type: String,
        required: true
    },
    highPriority:{
    	type: String,
    	enum: ['TRUE', 'FALSE'],
        required: true
    },
    severity:{
    	type: String,
    	enum: ['HIGH', 'MEDIUM', 'LOW'],
    	required: true
    },
    reporter:{
    	type: String,
    	required: true
    },
    assignedUser:{
    	type: String, 
    	default: "Un-assigned"
    },
    actions:{
    	type: [actionSchema],
    	default: []
    },
    status:{
    	type: String,
    	enum: ['TO DO','IN PROGRESS', 'IN REVIEW', 'IN TEST', 'IN DEMO', 'DONE'],
    	required: true
    }

});

//Export mongoose model
const bugModel = mongoose.model("bug", bugSchema);
module.exports = bugModel;

// Native modules
var path = require('path');
var fs = require('fs');

// Third party modules
var _ = require('lodash');

// Self build modules
var cleanDirectory = require('./libs/cleanDirectory');
var file = require('./libs/file');

var config = {
	numberOfPosts: 100,
	template: function(name) {
		name = name + '.hbs';
		return path.join(__dirname, '/templates/', name);
	},
	dist: path.join(__dirname, '/dist')
};

var fakeData = require('./libs/fakeData')(config.numberOfPosts);

// Start timer
var startTime = (new Date()).getTime();

// Prep template file
// - Ex. could come from a query
file.openTemplate(config.template('article'));

// Run through the fake data
_.map(fakeData, function(data, index){
	// Create files on the file system
	file.create(config.dist, data.slug, file.compile(data), function(message){
		if (index === fakeData.length - 1) {
	        done();
	    }
	});
});

function done() {
	// Callback goes here
	var endTime = (new Date()).getTime();

	// End timer
	var timeToFinish = (endTime-startTime);
	console.log("Time to finish: ", timeToFinish, 'ms');

	console.log("clearing dist directory");
	cleanDirectory(config.dist);
}
// Native modules
var fs = require('fs');
var gracefulFs = require('graceful-fs')
gracefulFs.gracefulify(fs);

// Third party modules
var _ = require('lodash');
var templateFile;

// Setup {{ mustage interpolaters }}
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

// Setup functions
var file = {
	openTemplate: openTemplate,
	compile: compile,
	create: create
};

function compile(data) {
	var compiled = (_.template(templateFile))(data);
	return compiled;
}
function openTemplate(templateFilePath) {
	// Read the file
	templateFile = fs.readFileSync(templateFilePath,'utf8');
}

function create(outputDir, filename, file, cb) {
	var path = outputDir + '/' + filename + '.html';
	fs.writeFile(path, file, function (err) {
	    if (err) { return console.log(err); }

	    var message = 'File written to ' + path;
	    cb(message);
	});
}

module.exports = file;
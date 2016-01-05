// Setup functions

function dataSet(numberOfPosts) {
	var dataSet = [];

	for (var i = 0; i < numberOfPosts; i++) {
		var data = {
			slug: 'article-' + i, // Unique
			title: 'article-title-' + i,
			header: 'article-header-' + i
		};

		dataSet.push(data);
	};

	return dataSet;
}

module.exports = dataSet;
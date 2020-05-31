const feedURL = '//www.feedforall.com/blog-feed.xml';
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const fetchData = async () => {

	let Parser = require('rss-parser');
	let parser = new Parser();

	return new Promise((resolve, reject) => {
		parser.parseURL(CORS_PROXY + feedURL, function(err, feed) {
			if (err) {
				console.log(err);
				reject(err);
			}
			// console.log(feed);
		  	resolve(feed.items);
		})
	})

}

export default fetchData;
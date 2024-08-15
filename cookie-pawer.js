// Define the image sources
// load config.json from url 
var pawerConfig = {};

fetch('')
	.then((response) => response.json())
	.then(function (json) {
		PawerConfig = json;
		var ImagesPath = PawerConfig.Web.ImagesPath;
		var images = PawerConfig.Images;

		// replace the images
		for (var key in images) {
			Game.Loader.Replace(key, ImagesPath + images[key]);
		};

		var translations = {
			"%1 cookie": [
				"%1 cookie",
				"%1 cookie"
			]
		}
		// fyi this is just to get rid of an annoying thing this script is based on, I don't want to risk breaking anything
		if (ModLanguage('*', translations)) {
			console.log("Language updated");
		}
		else {
			console.log("Error while updating language");
		}

		var bakeryName = document.getElementById('bakeryName');
		const newBakeryName = bakeryName.substr(0, bakeryName.length - 9)
		bakeryName.innerHTML = newBakeryName;
	}); 

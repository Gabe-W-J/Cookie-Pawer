// Define the image sources
// load config.json from url https://raw.githubusercontent.com/Gabe-W-J/Cookie-Pawer/main/config.json
var pawerConfig = {};

// Note: inside the config there is a references to ImagesPath, I want it to point to only the images I have in the images
// directory but all the references use github.io pages which I don't know how to set up properly for this use case.

fetch('https://raw.githubusercontent.com/Gabe-W-J/Cookie-Pawer/main/config.json')
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
				"%1 tested cookie",
				"%1 tested cookie"
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
		var newBakeryName = bakeryName.substr(0, bakeryName.length - 9)
		bakeryName.innerHTML = newBakeryName;
	}); 

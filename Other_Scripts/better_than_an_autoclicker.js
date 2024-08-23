var cookieClickerInterval;
var buildingPurchaseInterval;
var upgradePurchaseInterval;
var wrinklerInterval;

function automateCookieClicker() {
    // Define the cookie's approximate radius and center coordinates
    const cookieRadius = 400; // Adjust if necessary
    const cookieCenterX = 81.67; // Center X of cookie
    const cookieCenterY = 409.51; // Center Y of cookie

    // Clicks the big cookie at random positions
    cookieClickerInterval = setInterval(function() {
        if (!Game.OnAscend) {
            // Generate random angle and radius for the click position
            var angle = Math.random() * Math.PI * 2;
            var radius = Math.random() * cookieRadius;
    
            // Calculate and set the random click position
            Game.mouseX = cookieCenterX + radius * Math.cos(angle);
            Game.mouseY = cookieCenterY + radius * Math.sin(angle);
    
            // Click the cookie
            Game.ClickCookie();
        }
         else {
            clearInterval(cookieClickerInterval);
        }
    }, 0.006);

    buildingPurchaseInterval = setInterval(function() {
        if (!Game.OnAscend) {
            var buildings = Game.ObjectsById;
            var affordableBuildings = buildings.filter(building => building.price <= Game.cookies);
            if (affordableBuildings.length > 0) {
                var randomIndex = Math.floor(Math.random() * affordableBuildings.length);
                affordableBuildings[randomIndex].buy();
            }
        }
         else {
            clearInterval(buildingPurchaseInterval);
        }
    }, 1);

   var unwantedUpgrades = [74, 84, 182, 183, 184, 185, 209, 332, 563, 361, 806, 333, 414];
	 var upgradePurchaseInterval = setInterval(function() {
		    if (!Game.OnAscend) {
		        var upgrades = Game.UpgradesInStore.filter(function(upgrade) {
		            return !upgrade.bought && upgrade.canBuy() && !unwantedUpgrades.includes(upgrade.id);
		        });
		        if (upgrades.length > 0) {
		            var randomIndex = Math.floor(Math.random() * upgrades.length);
		            upgrades[randomIndex].buy();
		        }
		    }
		}, 1); // Run this every second

	wrinklerInterval = setInterval(function() {
		    // Loop through all wrinklers
		    for (var i in Game.wrinklers) {
		        var wrinkler = Game.wrinklers[i];
		        // Check if the wrinkler is on the big cookie (i.e., it's not an empty slot and it's sucking the cookie)
		        if (wrinkler.close && wrinkler.phase > 0) {
		            wrinkler.hp = 0; // Set its health to 0 to pop it
		        }
		    }
		}, 1);
}

function stopAutomation() {
    clearInterval(cookieClickerInterval);
    clearInterval(buildingPurchaseInterval);
    clearInterval(upgradePurchaseInterval);
    clearInterval(goldenCookieInterval);
    clearInterval(ascensionCheckInterval);
    clearInterval(ascendUpgradeInterval);
	clearInterval(wrinklerInterval);
}

// Start the automation
automateCookieClicker();

// Use this function to stop the automation
// stopAutomation();

// Thanks Sloth <3

window.onload = getMyLocation
var ourCoords = 
{
	  latitude : 51.48,
	 longitude : 0
}

function getMyLocation()
{
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	}
	else
	{
		alert("Sorry, no geolocation support");
	}
		
}

function displayLocation(position)
{
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "You are at latitude: " + latitude + " and at longitude: " + longitude;
	
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from Greenwich, England";
	var displayMessage = document.getElementById("displayMessage");
	displayMessage.innerHTML = "Thank You for using Paul's GPS locator!!!";
}


function displayError(error)
{
	var errorTypes = 
	{
		0: "Unknown error", 
		1: "Permission denied by User",
		2: "Position is not available",
		3: "Request timed out"
	}
	
	var errorMessage = errorTypes[error.code]; 
	if(error.code == 0 || error.code == 2)
	{
		errorMessage = errorMessage + " " + error.message;	
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}	

//calculating distance
function computeDistance(startCoords, destCoords)
{
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	
	var Radius = 6371; //radius of the Earth in KM
	var distance = Math.acos((Math.sin(startLatRads) * Math.sin(destLatRads)) + ((Math.cos(startLatRads) * Math.cos(destLatRads)) * Math.cos(destLongRads - startLongRads))) * Radius;
	
	return distance;
}

function degreesToRadians(degrees)
{
	var radians = (degrees * Math.PI)/180;
	return radians;
}
function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	var getURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchString + "&filter=free-ebooks&key=AIzaSyA-8ljiTTPG7KeuylwBhzjwL3X8J4YM98o";
	console.log("getURL: " + getURL);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"fill_this_in_with_the_correct_key"};

	// Use jQuery to make the get request
	$.get(getURL, function(error, response, body){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:");
		console.log(body);
		console.log("Here is a thing: " + JSON.stringify(body.responseJSON.items[0].volumeInfo.title));
    	updateResultList(body);
	});
}

function updateResultList(body) {
		var resultList = $("#ulResults");
		resultList.empty();

		for (var i = 0; i < body.responseJSON.items.length; i++) {
			var title = JSON.stringify(body.responseJSON.items[i].volumeInfo.title);
			resultList.append("<li><p>" + title + "</p></li>");
		}

}
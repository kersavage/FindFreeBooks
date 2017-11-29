function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	var getURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchString + "&filter=free-ebooks&key=AIzaSyA-8ljiTTPG7KeuylwBhzjwL3X8J4YM98o";
	console.log("getURL: " + getURL);

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

		if(body.responseJSON.items.length == 0) {
			console.log("In if == 0");
			resultList.append("<li><p>No Results</p></li>");
		}
				
		if(body.responseJSON.items.length > 0) {

		for (var i = 0; i < body.responseJSON.items.length; i++) {
			var title = JSON.stringify(body.responseJSON.items[i].volumeInfo.title);
			title = title.replace(/\"/g, "");
			
			if(body.responseJSON.items[i].volumeInfo.authors){
				var author = JSON.stringify(body.responseJSON.items[i].volumeInfo.authors[0]);
				author = author.replace(/\"/g, "");
			}
			else {
				author = "Author Unkown";
			}
			
			resultList.append("<li><pre>Title:  " + title + "<br>Author: " + author +"</pre></li>");
		}
	}

}
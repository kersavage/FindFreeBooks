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
    	updateResultList(body);
	});
}

function updateResultList(body) {
		var resultList = $("#ulResults");
		resultList.empty();

		if(!body.responseJSON.items) {
			console.log("No results");
			resultList.append("<li><p>No Results</p></li>");
		}
				
		if(body.responseJSON.items) {

		for (var i = 0; i < body.responseJSON.items.length; i++) {
			var title = JSON.stringify(body.responseJSON.items[i].volumeInfo.title);
			title = title.replace(/\"/g, "");
			
			var pdf = JSON.stringify(body.responseJSON.items[i].accessInfo.pdf.downloadLink);
			pdf = pdf.replace(/\"/g, "");

			var bookId = JSON.stringify(body.responseJSON.items[i].id);
			bookId = bookId.replace(/\"/g, "");

			var thumbnail = JSON.stringify(body.responseJSON.items[i].volumeInfo.imageLinks.thumbnail);
			thumbnail = thumbnail.replace(/\"/g, "");

			if(body.responseJSON.items[i].volumeInfo.authors){
				var author = JSON.stringify(body.responseJSON.items[i].volumeInfo.authors[0]);
				author = author.replace(/\"/g, "");
			}
			else {
				author = "Author Unkown";
			}
			var displayList = "<li><pre>Title: " + title + "<br>Author: " + author + "<br>Google Book ID: " + bookId;
			displayList += '<br><img src="' + thumbnail + '" alt="Image Unavailable">';

			if(body.responseJSON.items[i].accessInfo.pdf.isAvailable){
				displayList += "<br><button onClick=";
				displayList += '"';
				displayList += "window.open('" + pdf + "','_blank')";
				displayList += '"';
				displayList += ">View PDF</button></pre></li>";
			}
			else {
				var displayList = displayListm + "<br>PDF is unavailable</pre></li>"
			}

			resultList.append(displayList);
		}
	}

}
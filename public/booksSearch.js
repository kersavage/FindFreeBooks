// Retrieve the search parameters and send request to google api
function search() {
	// Get the values from the form
	var searchString = $("#txtSearch").val();
	var numEntries = $('input[name=number]:checked').val();
	var sort = $('#sort').find(":selected").text();

	// Assemble the URL
	var getURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchString; 
	getURL += "&maxResults=" + numEntries;
	getURL += "&orderBy=" + sort;
	getURL += "&filter=free-ebooks&key=AIzaSyA-8ljiTTPG7KeuylwBhzjwL3X8J4YM98o";
	console.log("getURL: " + getURL);

	// Use jQuery to make the get request to the google book api
	$.get(getURL, function(error, response, body){
		console.log("Back from server with the following results:");
		console.log(body);
    	updateResultList(body);
	});
}

// Update the page with the results found from google
function updateResultList(body) {
		var resultList = $("#ulResults");
		resultList.empty();

		// If the search didn't return any results say no results
		if(!body.responseJSON.items) {
			console.log("No results");
			resultList.append("<li><p>No Results</p></li>");
		}
		
		// If there are any results, display them
		if(body.responseJSON.items) {
			// Iterate through each book that was found, displaying it's information
			for (var i = 0; i < body.responseJSON.items.length; i++) {
				var title = JSON.stringify(body.responseJSON.items[i].volumeInfo.title);
				title = title.replace(/\"/g, "");
				
				if (body.responseJSON.items[i].accessInfo.pdf.downloadLink) {
					var pdf = JSON.stringify(body.responseJSON.items[i].accessInfo.pdf.downloadLink);
					pdf = pdf.replace(/\"/g, "");
				}

				var bookId = JSON.stringify(body.responseJSON.items[i].id);
				bookId = bookId.replace(/\"/g, "");

				var thumbnail = JSON.stringify(body.responseJSON.items[i].volumeInfo.imageLinks.thumbnail);
				thumbnail = thumbnail.replace(/\"/g, "");

				// If there is an author display their name
				if(body.responseJSON.items[i].volumeInfo.authors){
					var author = JSON.stringify(body.responseJSON.items[i].volumeInfo.authors[0]);
					author = author.replace(/\"/g, "");
				}
				else {
					author = "Author Unkown";
				}

				var displayList = "<li><pre><b>Title: " + title + "</b><br>Author: " + author + "<br>Google Book ID: " + bookId;
				displayList += '<br><img src="' + thumbnail + '" alt="Image Unavailable">';

				// If there is an available pdf display the PDF button
				if(body.responseJSON.items[i].accessInfo.pdf.isAvailable){
					displayList += "<br><button onClick=";
					displayList += '"';
					displayList += "window.open('" + pdf + "','_blank')";
					displayList += '"';
					displayList += ">View PDF</button></pre></li>";
				}
				else {
					var displayList = displayList + "<br>PDF is unavailable</pre></li>"
				}

				// Append the results to the list
				displayList += "<br>";
				resultList.append(displayList);
		}
	}

}

// Hide or reveal the extra search options
window.onload = function () {
    var link = document.getElementById("hideMenu");
    var div = document.getElementById("menu");
    var more = document.getElementById("hideMenu").innerHTML; 
    var less = more.replace("More", "Less");

    link.onclick = function() {
    	if (div.style.display === "none") {
        	div.style.display = "block";
        	document.getElementById("hideMenu").innerHTML = less;
    	} 
    	else {
        	div.style.display = "none";
        	document.getElementById("hideMenu").innerHTML = more;
    	}
	}
}
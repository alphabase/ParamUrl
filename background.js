// This listener is called when the user clicks on the browser action button
chrome.browserAction.onClicked.addListener(function(tab) {
	// First we split the URL by means of the question mark sign
	var urlparts = tab.url.split("?");
	// If we have at least two parts, this means we have found a "question mark" (?) sign and thus there might be a query string
	if (typeof urlparts[1] != 'undefined') {
		// We split the query string by the "ampersand" (&) sign, separating different parameter parts
		var vars = urlparts[1].split("&");
		// We take care of every query string part
		for (var i = 0; i < vars.length; i++) {
			// Separate the id from the value by splitting by "equals" (=) sign
			var pair = vars[i].split("=");
			// Call the function to set the input value
			setInputValue(pair[0], pair[1]);
		}
	}
});

// This functions sets the input field with a given value
// The input field is indicated by its id attribute
function setInputValue(id, value) {
	// This chrome function allows us to execute JavaScript in the target chrome tab
	chrome.tabs.executeScript({
		code: 'document.getElementById("'+id+'").value = "'+decodeURIComponent(value)+'";'
	});
}

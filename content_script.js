// This array holds the list of positives
var positives = [];

// queryString from the URL
var queryString = window.location.search.substring(1);
// Split the queryString by ampersand
var queries = queryString.split("&");
// We take care of every queryString part
for (var i = 0; i < queries.length; i++) {
	// Separate the id from the value by splitting by "equals" (=) sign
	var pair = queries[i].split("=");
	// If we see the named element (by id) in the DOM, add it to the array of positives
	if (document.getElementById(pair[0]) !== null) {
		positives.push({"id": pair[0], "value": decodeURIComponent(pair[1])});
	}
}

// Send the list of positives to the background script
chrome.runtime.sendMessage({
	positives: positives
});
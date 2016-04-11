// This array will contain tabs that have positives, identified by tab.id
var positiveTabs = [];

// This listener is called when the user clicks on the browser action button
chrome.browserAction.onClicked.addListener(function(tab) {
	// Check if we know an array of positives for this tab.id
	if (typeof positiveTabs[tab.id] !== "undefined") {
		// Run each positive
		for (var i = 0; i < positiveTabs[tab.id].length; i++) {
			var positive = positiveTabs[tab.id][i];
			// This chrome function allows us to execute JavaScript in the target chrome tab
			chrome.tabs.executeScript({
				code: 'var element = document.getElementById("'+positive.id+'"); element.value = "'+positive.value+'"; if ("createEvent" in document) { var evt = document.createEvent("HTMLEvents"); evt.initEvent("change", false, true); element.dispatchEvent(evt); } else { element.fireEvent("onchange"); }'
			});
		}
	}
});

// This listener is called when the content script has loaded
// It should receive an array of positives when detected
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// If we have detected positives, we save it to the positiveTabs array and we update the badgeText for this tab.id
		if (request.positives.length > 0) {
			positiveTabs[sender.tab.id] = request.positives;
			chrome.browserAction.setBadgeText({
				text: String(request.positives.length),
				tabId: sender.tab.id
			});
		// If we have detected no positives, we disable the browserAction for this tab.id
		} else {
			chrome.browserAction.disable(sender.tab.id);
		}
	}
);
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
	if (changeInfo.url) {
	    if(changeInfo.url == "https://note.com/notes/new"){
		console.log("here");
		chrome.tabs.sendMessage( tabId, {
		    message: 'start_bigdata',
		});
	    }
	}
    }
);

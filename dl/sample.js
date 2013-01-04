// A generic onclick callback function.
function onClickDownload(info, tab) {
	chrome.tabs.sendRequest(tab.id, "getClickedEl", function(imageUrl) {
		if (imageUrl){
			
			var name = imageUrl.split("/");
			try {
				//Try for downloads api
				chrome.downloads.download({"saveAs": true, "url":imageUrl, "filename" : name[name.length - 1]});
			}
			catch (err){
				//Failing that open a tab with the fullsize image
				chrome.tabs.create({"url":imageUrl});
			}
		}
    });
}

var contexts = ["page","selection","link","editable","image","video",
                "audio"];

var downloadMenuItem = chrome.contextMenus.create({"title": "Save Full Size Image", "contexts":[contexts[4]], "onclick":onClickDownload});



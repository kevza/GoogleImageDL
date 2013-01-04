var clickedEl = null;
var result = null;


//Add mouse click listener
document.addEventListener("mousedown", function(event){
    //right click	
    if(event.button == 2) { 
		
			clickedEl = event.target;
			clickedEl = clickedEl.parentNode;
			clickedEl = clickedEl.href;
	
	
		try{
			var els = clickedEl.split('&');
			//Extract the Image url
			for (var i = 0; i < els.length; i++){
				parts = els[i].split('=');
				if (parts[0]== "imgurl"){
					result = parts[1];
				}
			}
			if (result == null){
				result = event.target.src;
			}
			
			
			
		}catch (err){
			result = null;
		}
    }else{
		result = null;
	}
}, true);

//Return response to Extension
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
		if (result != null){
			sendResponse(result);
		}
		result = null;
    }
});

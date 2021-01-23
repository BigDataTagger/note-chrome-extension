document.addEventListener('click',post_settings);

function get_title_and_content(){
    var x = document.getElementById('note-body');
    var y = document.getElementById('note-name');
    var text = x.innerHTML.split('>')[1].split('<')[0];
    var title = y.innerHTML;
    return {"content":text,"title":title};
}

function post_settings(event){
    if(event.target.innerText == "公開設定"){
	var request = get_title_and_content();
	console.log(request);
      	$.ajax({
      	    url:"https://bigdatatagger.github.io/data/info_url.json",
      	    dataType:"text",
      	    cache:false,
      	    success: (data)=>{
      		var request_url = JSON.parse(data)["url"]+"/process";
      		var posting = $.post(request_url,request);
		var response;
		console.log(request_url);
      		posting.done((data) => {
      		    response = data["tags"];
      		    console.log("response",response);
      		    insert_tags(response);
		    insert_js();
      		});
      	    }
	});
	// setTimeout(()=>{
	//     insert_tags(target,["Helo","isworkin","nice"])
	//     insert_js();
	// },1000);
    }
}

function insert_js(){
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL("addTags.js");
    document.body.appendChild(s);
}

function insert_tags(tags){
    var elem_list = document.getElementById("big-data-suggestion-list");
    if(elem_list)
	elem_list.innerHTML = "";
    else{
	elem_list = document.createElement("div");
	elem_list.id = "big-data-suggestion-list";
	document.body.appendChild(elem_list);
    }
    for(var i in tags){
	var elem = document.createElement("div")
	elem.className = "bid-data-suggestions-tags";
	elem.style.display = "none";
	elem.innerText = tags[i];
	elem_list.appendChild(elem);
    }
}

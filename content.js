var group_head; 

function generate_tags(target,tags){
    const input_body = target.getElementsByClassName('m-tagInput__body')[0];
    if (input_body == null)
	return;
    for(var i in tags){
	const elem = document.createElement('li');
	elem.setAttribute('data-v-14fc9452', "");
	elem.classList.add("hashtag-recommend-group__item");
	elem.innerHTML = '<button data-v-25fb2d84="" data-v-14fc9452="" class="hashtag"><div data-v-25fb2d84="" class="a-tag a-tag__size_small"><!----> <div data-v-25fb2d84="" class="a-tag__label">' + tags[i] + '</div> <!----></div></button>'
	const label_osusume = '<button data-v-25fb2d84="" data-v-4dd652fa="" class="m-tagInput__item"><div data-v-25fb2d84="" class="a-tag a-tag__size_medium"><!----> <div data-v-25fb2d84="" class="a-tag__label">' + tags[i] +'</div> <i data-v-25fb2d84="" aria-label="close" class="a-tag__close a-icon a-icon--close a-icon--size_small"></i></div></button>';
	elem.onclick = function () {
	    input_body.insertAdjacentHTML('afterbegin',label_osusume);
	};
	group_head.appendChild(elem);
    }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      setTimeout(updateEditor,1000);
});

function updateEditor() {
    var buttons = document.getElementsByTagName('button');
    var button;
    for(var i in buttons){
	if(buttons[i].innerText == "公開設定"){
	    button = buttons[i];
	    break;
	}
    }
    console.log(buttons);
    
    var response = [];
    const target = document.getElementsByClassName('modal-content-wrapper')[0];
    
    button.onclick = function () {
	var x = document.getElementById('note-body');
	var y = document.getElementById('note-name');
	var text = x.innerHTML.split('>')[1].split('<')[0];
	var title = y.innerHTML;
	var request = {"content":text,"title":title};
	console.log(request);
	$.ajax({
	    url:"https://bigdatatagger.github.io/data/info_url.json",
	    dataType:"text",
	    cache:false,
	    success: (data)=>{
		var request_url = JSON.parse(data)["url"]+"/process";
		var posting = $.post(request_url,request);
		console.log(request_url);
		posting.done((data) => {
		    response = data["tags"];
		    console.log("response",response);
		    generate_tags(target,response);
		});
	    }
      });
    };
    
    const observer = new MutationObserver(records => {
	if (target.getAttribute('aria-hidden') == 'true')
	    return;
	console.log(target.cloneNode(true));
	const header = target.getElementsByTagName('header')[0];
	console.log(header.cloneNode(true));
	var bds = document.getElementById("big_data_suggestions");
	if(bds){
	    
	}
	else{
	    const group_top = document.createElement('div');
	    group_top.id = 'big_data_suggestions';
	    group_top.setAttribute('data-v-14fc9452', "");
	    group_top.setAttribute('data-v-74d3cf95', "");
	    group_top.classList.add('hashtag-suggested');
	    group_top.classList.add('hashtag-recommend-group');
	    group_top.innerHTML = '<div data-v-14fc9452 class="m-tagList__title"><div data-v-74d3cf95 data-v-14fc9452>bigdataのおすすめ</div></div>'
	    
	    group_head = document.createElement('ul');
	    group_head.setAttribute('data-v-14fc9452', "");
	    group_head.classList.add("hashtag-recommend-group__body");
	    group_top.appendChild(group_head);
	    
	    console.log(group_top.cloneNode(true));
	    
	    header.insertBefore(group_top, null);
	}
    });
    observer.observe(target, {
	attributes: true,
	attributeFilter: ['aria-hidden']
    });
}

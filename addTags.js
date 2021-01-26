var group_head;
var tags_dict = {};

function addTags(tag){
    var tag_adder = document.getElementsByClassName("o-hashtagInput")[0];
    tag_adder.__vue__.selectSuggestion(tag);
}

function generate_header(){
    const target = document.getElementsByClassName('modal-content-wrapper')[0];
    const header = target.getElementsByTagName('header')[0];
    var bds = document.getElementById("big_data_suggestions");
    if(!bds){
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
	
	header.insertBefore(group_top, null);
    } 
}

function generate_tags(tags){
    const input_body = document.getElementsByClassName('m-tagInput__body')[0];
    if (input_body == null)
	return;
    tags_dict = {};
    for(var i in tags){
	const elem = document.createElement('li');
	elem.setAttribute('data-v-14fc9452', "");
	elem.classList.add("hashtag-recommend-group__item");
	elem.innerHTML = '<button data-v-037895b5 data-v-14fc9452 class="hashtag"><div data-v-037895b5 class="a-tag a-tag__size_small"><!----> <div data-v-037895b5 class="a-tag__label">' + tags[i] + '</div> <!----></div></button>'
	const tag_osusume = tags[i];
	elem.onclick = function () {
	    //this.style.display = "none";
	    addTags(tag_osusume);
	};
	tags_dict[tags[i]] = elem;
	group_head.appendChild(elem);
    }
}

function recoverTag(event){
    console.log(event.target);
    if(event.target.tagName === "I"){
	var tmp = event.target.parentElement.children[0].innerHTML+"";
	var elem = tags_dict[tmp.replace('"',"").replace("#","").replaceAll("\n","").replaceAll("\t","").replaceAll(" ","")];
	elem.style.display = "block";
    }
}

var tags_div = document.getElementsByClassName("bid-data-suggestions-tags");
var tags = []

for(var i = 0;i<tags_div.length;i++)
    tags.push(tags_div[i].innerHTML);

generate_header();
generate_tags(tags);
//document.addEventListener('click',recoverTag);

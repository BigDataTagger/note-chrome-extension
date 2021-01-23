var group_head;

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
    for(var i in tags){
	const elem = document.createElement('li');
	elem.setAttribute('data-v-14fc9452', "");
	elem.classList.add("hashtag-recommend-group__item");
	elem.innerHTML = '<button data-v-25fb2d84="" data-v-14fc9452="" class="hashtag"><div data-v-25fb2d84="" class="a-tag a-tag__size_small"><!----> <div data-v-25fb2d84="" class="a-tag__label">' + tags[i] + '</div> <!----></div></button>'
	const tag_osusume = tags[i];
	elem.onclick = function () {
	    addTags(tag_osusume);
	};
	group_head.appendChild(elem);
    }
}

var tags_div = document.getElementsByClassName("bid-data-suggestions-tags");
var tags = []

for(var i = 0;i<tags_div.length;i++)
    tags.push(tags_div[i].innerHTML);

generate_header();
generate_tags(tags);

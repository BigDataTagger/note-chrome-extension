var group_head; 

function generate_tags(tags){
    for(var i in tags){
	const elem = document.createElement('li');
	elem.setAttribute('data-v-14fc9452', "");
	elem.classList.add("hashtag-recommend-group__item");
	elem.innerHTML = '<span data-v-536dcd77="" data-v-14fc9452="" class="hashtag"><div data-v-536dcd77="" class="a-tag a-tag__size_small"><div data-v-536dcd77="" class="a-tag__label">#' + tags[i] + '</div></div></span>';
	elem.onclick = function () {
	    const input_body = target.getElementsByClassName('m-tagInput__body')[0]
	    if (input_body == null)
		return;
	    input_body.insertAdjacentHTML('afterbegin',
					  '<span data-v-536dcd77="" data-v-3dcb2f50="" class="m-tagInput__item"><div data-v-536dcd77="" class="a-tag a-tag__size_medium"><div data-v-536dcd77="" class="a-tag__label">#' + tags[i] + '</div> <i data-v-536dcd77="" aria-label="close" class="a-tag__close a-icon a-icon--close a-icon--size_small"></i></div></span>');
	};
	
	group_head.appendChild(elem);
    }
}

window.onload = function () {
    var button = document.getElementsByTagName('button')[2];
    console.log(button);
    var response = [];
    button.onclick = function () {
	var x = document.getElementById('note-body');
	var y = document.getElementById('note-name');
	var text = x.innerHTML.split('>')[1].split('<')[0];
	var title = y.innerHTML;
	var request = {"content":text,"title":title};
	console.log(request);
	var posting = $.post("https://d272a769e176.ngrok.io//process",request);
	posting.done((data) => {
	    response = data["tags"];
	    console.log(response);
	    generate_tags(response);
	});
    };
    const target = document.getElementsByClassName('modal-content-wrapper')[0];
    const observer = new MutationObserver(records => {
	if (target.getAttribute('aria-hidden') == 'true')
	    return;
	console.log(target.cloneNode(true));
	const header = target.getElementsByTagName('header')[0];
	console.log(header.cloneNode(true));
	
	const group_top = document.createElement('div');
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
	
	// const elem = document.createElement('li');
	// elem.setAttribute('data-v-14fc9452', "");
	// elem.classList.add("hashtag-recommend-group__item");
	// elem.innerHTML = '<span data-v-536dcd77="" data-v-14fc9452="" class="hashtag"><div data-v-536dcd77="" class="a-tag a-tag__size_small"><div data-v-536dcd77="" class="a-tag__label">#bigdata</div></div></span>';
	// elem.onclick = function () {
	//     const input_body = target.getElementsByClassName('m-tagInput__body')[0]
	//     if (input_body == null)
	// 	return;
	//     input_body.insertAdjacentHTML('afterbegin',
	// 				  '<span data-v-536dcd77="" data-v-3dcb2f50="" class="m-tagInput__item"><div data-v-536dcd77="" class="a-tag a-tag__size_medium"><div data-v-536dcd77="" class="a-tag__label">#bigdata</div> <i data-v-536dcd77="" aria-label="close" class="a-tag__close a-icon a-icon--close a-icon--size_small"></i></div></span>');
	// };
	
	// group_head.appendChild(elem);
    });
    observer.observe(target, {
	attributes: true,
	attributeFilter: ['aria-hidden']
    });
};

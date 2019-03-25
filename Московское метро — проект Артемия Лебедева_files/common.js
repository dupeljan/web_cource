document.onkeydown = NavigateThrough;

function NavigateThrough (event) {
	if (!document.getElementById) return;
	if (window.event) event = window.event;
	var target = event.target || event.srcElement;
	if (target.nodeName == 'TEXTAREA' || target.nodeName == 'INPUT') return;
	if (event.ctrlKey) {
		var link = null;
		var href = null;
		switch (event.keyCode || event.which) {
			case 0x27: link = document.getElementById ('NextLink'); break;
			case 0x25: link = document.getElementById ('PrevLink'); break;
			case 0x26: link = document.getElementById ('UpLink');   break;
			case 0x28: link = document.getElementById ('DownLink'); break;
			case 0x24: href = '/'; break;
		}

		if (link && link.href) document.location = link.href;
		if (href) document.location = href;
	}			
}

function cmnSwitch_class( eOn, sClass_name, sInstead ){
	if( cmnMatch_class( eOn, sClass_name ) ){
		cmnSet_class( eOn, sInstead, sClass_name );
	}else{
		cmnSet_class( eOn, sClass_name, sInstead );
	}
}

function cmnRemove_class( eOn, sClass_name ){
	cmnSet_class( eOn, "", sClass_name );
}

function cmnSet_class( eOn, sClass_name, sInstead ){
	if( eOn ){
		sClass_name = ( sClass_name.length ) ? sClass_name.replace( /(^\s+|\s+$)/, "" ) : "";
		if( eOn.className.length ){
			var sOld = sClass_name;
			if( sInstead && sInstead.length ){
				sInstead = sInstead.replace( /\s+(\S)/g, "|$1" );
				if( sOld ){
					sOld += "|";
				}
				sOld += sInstead;
			}
			eOn.className = eOn.className.replace( new RegExp("(^|\\s+)(" + sOld +")($|\\s+)", "g"), "$1" );
		}
		eOn.className += ( eOn.className.length && sClass_name ? " " : "" ) + sClass_name;
	}
}


$(function(){
	// $('.pseudo').click(function(){
	// 	$(this).siblings('.pseudo').each(function(){
	// 		$(this).removeClass('selected');
	// 		$($(this).attr('href')).hide();
	// 	});
	// 	$(this).addClass('selected');
	// 	$($(this).attr('href')).show();
	// });
	// 
	// $('#map-nav').scroll(function(){
	// });
	
	// Search placeholder
	if (!jQuery.browser.safari) {
		var searchField = $("#form_search input");
		var inputPlaceholder = searchField.attr("placeholder");
		if (inputPlaceholder){
			if(!searchField.val()) { searchField.val(inputPlaceholder).addClass("empty"); }
			searchField.focus( function() { if($(this).hasClass("empty")){ $(this).val("").removeClass("empty"); }  } );
			searchField.blur( function() { if(!$(this).val()){ $(this).val(inputPlaceholder).addClass("empty"); }  } )
		}
	};

	$("#form_search").submit(
		function(){
			var searchField = $("#form_search input");
			if((searchField.val() == '') || (searchField.hasClass("empty"))) {
				return false;
			}
		}
	);
});
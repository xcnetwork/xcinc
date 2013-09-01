// Recent Post Mini Thumbnail with Tooltip by Taufik Nurrohman
// Visit: http://hompimpaalaihumgambreng.blogspot.com
// Have fun modifying this widget but make sure to keep the original attribution stay here :)

$(function() {
	$('div.rp-item img').hide();
	$('div.rp-child').removeClass('hidden');

	var winWidth    = $(window).width(),
		winHeight   = $(window).height(),
		ttWidth     = $('div.rp-child').outerWidth(),
		ttHeight    = $('div.rp-child').outerHeight(),
		thumbWidth  = $('div.rp-item').outerWidth(),
		thumbHeight = $('div.rp-item').outerHeight();

	$(window).resize(function() {
		winWidth = $(this).width();
		winHeight = $(this).height();
	});

	$('div.rp-item').css('position', 'static').mouseenter(function() {
		$('div.rp-child', this).filter(':not(:animated)').fadeIn(rcFadeSpeed);
	}).mousemove(function(e) {	
		var top = e.pageY+20, left = e.pageX+20;
			
			if (top + ttHeight > winHeight) {
				top = winHeight - ttHeight - 40;
			}			
			if (left + ttWidth > winWidth) {
				left = winWidth - ttWidth - 40;
			}	

		$('div.rp-child', this).css({top:top,left:left});

	}).mouseleave(function() {
		$('div.rp-child', this).hide();
	});
});

function showrecentposts(json) {
	var entry = json.feed.entry;
	for (var i = 0; i < numposts; i++) {
		var posturl;  
		for (var j=0; j < entry[i].link.length; j++) {
			if (entry[i].link[j].rel == 'alternate') {
				posturl = entry[i].link[j].href;
				break;
			}
		}
		
		if ("content" in entry[i]) {
			var postcontent = entry[i].content.$t;
		} else if ("summary" in entry[i]) {
			var postcontent = entry[i].summary.$t;
		} else {
			var postcontent = "";
		}

		var re = /<\S[^>]*>/g; 
		postcontent = postcontent.replace(re, "");
		if (postcontent.length > numchar) {
			postcontent = postcontent.substring(0,numchar) + '...';
		}

		var poststitle = entry[i].title.$t;

			if ("media$thumbnail" in entry[i]) {
				postimg = entry[i].media$thumbnail.url;
				postimg = postimg.replace("/s72-c/","/s"+img_sz+"-c/");
			} else {
				postimg = pBlank;
			}
		
		document.write('<div class="rp-item"><a href="' + posturl + '"><img src="' + postimg + '" alt="thumb"></a><div class="rp-child hidden"><h4><a href="' + posturl + '" style="color:inherit;text-decoration:none;">' + poststitle + '</a></h4>' + postcontent + '</div></div>');
	}
}

document.write('<div id="mini-gallery"><h2>' + rpTitle + '</h2><sc' + 'ript src="/feeds/posts/default/-/'+ label +'?max-results=' + numposts + '&orderby=published&alt=json-in-script&callback=showrecentposts"></sc' + 'ript><div style="clear:both;"></div></div>');

$(window).load(function() {
	$('.rp-item img').each(function(i) {
		var $this = $(this);
		setTimeout(function() {
			$this.fadeIn(200);
		}, 100*(i+1));
	});
});

// auto slider carousel custom

function tinyCarouselGallery(json) {
  document.write('<div id="tinycarousel"><div class="viewport"><ul class="overview">');
	for (var i = 0; i < numposts_g; i++) {
		var entry = json.feed.entry[i],
			title = entry.title.$t,
			date = entry.published.$t,
			link, summ, months, cm, img;
		if (i == entry.length) break;
		for (var j = 0, jen = entry.link.length; j < jen; j++) {
			if (entry.link[j].rel == 'alternate') {
				link = entry.link[j].href;
				break;
			}
		}
		for (var k = 0, ken = entry.link.length; k < ken; k++) {
			if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
				cm = entry.link[k].title.split(' ')[0];
				break;
			}
		}
		summ = ("summary" in entry) ? entry.summary.$t.replace(/<(.*)?>/g, "") : "";
		summ = (summ.length > numchars_g) ? summ.substring(0, numchars_g) + '&hellip;' : summ;
		img = ('media$thumbnail' in entry) ? entry.media$thumbnail.url : pBlank;
		img = img.replace(/\/s[0-9]+(\-c)?\//, "/s230-c/");
		months = (idMode) ? ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var date_a = date.split('-')[2].substring(0, 2),
			date_b = date.split('-')[1],
			date_c = date.split('-')[0];
    document.write('</ul></div><div id="tinyarrow"><a class="buttons prev" href="#">' + tinyprevNav + '</a><a class="buttons next" href="#">' + tinynextNav + '</a><span>' + showText + ' ' + numposts_g + ' ' + postText + '</span></div></div>');

    document.write('<li><div class="inner"><a href="' + link + '"' + (slideOpenNewTab ? ' target="_blank"' : '') + '><img src="http://xcinc.googlecode.com/svn/img/promo.png" id="promo"/><img src="' + img + '" alt="' + title + '" class="recent-thumb"></a><h6><a href="' + link + '"' + (slideOpenNewTab ? ' target="_blank"' : '') + '>' + title + '</a></h6><p>' + summ + '</p></div>' + (showPostDate_g ? '<em>' + date_a + ' ' + months[parseInt(date_b, 10)-1] + ' ' + date_c + '</em>' : '') + (showComm_g ? '<em>' + cm + ' ' + text + '</em>' : '') + '</li>');
	}
}

document.write("<scr" + "ipt type='text/javascript' src='" + home_page.replace(/\/$/,"") + "/feeds/posts/summary/" + (slidebyLabels ? '-/' + slideLabelName : '') + "?max-results=" + numposts_g + "&orderby=published&alt=json-in-script&callback=tinyCarouselGallery'><\/scr" + "ipt>");
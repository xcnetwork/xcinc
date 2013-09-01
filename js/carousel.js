// auto slider carousel custom

function dispDate(dateVal) {
    DaystoAdd=dateVal
    TodaysDate = new Date();
    TodaysDay = new Array('Minggu', 'Senin', 'Selasa','Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu');
     TodaysMonth = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
     DaysinMonth = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');
function LeapYearTest (Year) {
     if (((Year % 400)==0) || (((Year % 100)!=0) && (Year % 4)==0)) {
        return true;
    } else {
        return false;
    }
}
CurrentYear = TodaysDate.getYear();
if (CurrentYear < 2000) CurrentYear = CurrentYear + 1900; currentMonth = TodaysDate.getMonth(); DayOffset = TodaysDate.getDay(); currentDay = TodaysDate.getDate(); month = TodaysMonth[currentMonth]; if (month == 'February') { if (((CurrentYear % 4)==0) && ((CurrentYear % 100)!=0) || ((CurrentYear % 400)==0)) { DaysinMonth[1] = 29; } else { DaysinMonth[1] = 28; } } days = DaysinMonth[currentMonth]; currentDay += DaystoAdd; if (currentDay > days) {
if (currentMonth == 11) {
    currentMonth = 0;
    month = TodaysMonth[currentMonth];
    CurrentYear = CurrentYear + 1
} else {
    month = TodaysMonth[currentMonth+1];
}
    currentDay = currentDay - days;
}
    DayOffset += DaystoAdd;
function offsettheDate (offsetCurrentDay) {
    if (offsetCurrentDay > 6) {
         offsetCurrentDay -= 6;
         DayOffset = TodaysDay[offsetCurrentDay-1];
         offsettheDate(offsetCurrentDay-1);
    } else {
         DayOffset = TodaysDay[offsetCurrentDay];
         return true;
    }
}
offsettheDate(DayOffset);TheDate = DayOffset + ', ';
TheDate += currentDay + ' ';
TheDate += month + ' ';
if (CurrentYear<100) CurrentYear="19" + CurrentYear; TheDate += CurrentYear; document.write(' '+TheDate);
}

function tinyCarouselGallery(json) {
	document.write('<div id="tinycarousel"><div id="tinyarrow"><a href="#"><img class="buttons prev" src="' + prevNav + '"/></a><a href="#"><img class="buttons next" src="' + nextNav + '"/></a><span>' + showText + ' <scr" + "ipt type='text/javascript'>dispDate(0);<\/scr" + "ipt></span></div><div class="viewport"><ul class="overview">');
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
		document.write('<li><div class="inner"><a href="' + link + '"' + (slideOpenNewTab ? ' target="_blank"' : '') + '><img id="promo" src="' + prImg + '"/><img src="' + img + '" alt="' + title + '" class="recent-thumb"></a><h6><a href="' + link + '"' + (slideOpenNewTab ? ' target="_blank"' : '') + '>' + title + '</a></h6><p>' + summ + '</p></div>' + (showPostDate_g ? '<em>' + date_a + ' ' + months[parseInt(date_b, 10)-1] + ' ' + date_c + '</em>' : '') + (showComm_g ? '<em>' + cm + ' ' + text + '</em>' : '') + '</li>');
	}
    document.write('</ul></div></div>');
}

document.write("<scr" + "ipt type='text/javascript' src='" + home_page.replace(/\/$/,"") + "/feeds/posts/summary/" + (byLabels ? '-/' + LabelName : '') + "?max-results=" + numposts_g + "&orderby=published&alt=json-in-script&callback=tinyCarouselGallery'><\/scr" + "ipt>");
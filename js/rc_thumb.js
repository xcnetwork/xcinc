function RecentPostThumbnail(json) {
// ul class
document.write('<ul class="rc_thumb">'); 

for (var i = 0; i < numposts; i++) {var entry = json.feed.entry[i];var posttitle = entry.title.$t;var posturl;if (i == json.feed.entry.length) break;for (var k = 0; k < entry.link.length;k++){
if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){var commenttext=entry.link[k].title;var commenturl=entry.link[k].href;}
if (entry.link[k].rel == 'alternate') {posturl = entry.link[k].href;break;}

var thumburl;
try {thumburl=entry.media$thumbnail.url; 
     thumburl = thumburl.replace("/s72-c/","/s"+img_sz+"-c/");}
catch (error)

{
	s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))
{thumburl=d;} else thumburl=img_blank;}

if(postthumbnails==true) 
document.write('<li><a href="'+posturl+'"><img src="'+thumburl+'"/></a>');
// post summary
document.write('<div class="rc_sum">');
    if ("content" in entry) {
      var postcontent = entry.content.$t;}
    else
    if ("summary" in entry) {
      var postcontent = entry.summary.$t;}
    else var postcontent = "";
    var re = /<\S[^>]*>/g; 
    postcontent = postcontent.replace(re, "");

if (postsummary == true) {

      if (postcontent.length < numchars) {
         document.write(postcontent);}
      else {
         postcontent = postcontent.substring(0, numchars);
         var quoteEnd = postcontent.lastIndexOf(" ");
         postcontent = postcontent.substring(0,quoteEnd);
         document.write(postcontent + '...');}
} 

document.write('</div>'); // end post summary
document.write('</li></ul>');
} // end ul class

document.write("<scr" + "ipt type='text/javascript' src='/feeds/posts/default/" + (byLabels ? '-/' + LabelName : '') + "?max-results=" + numposts + "&orderby=published&alt=json-in-script&callback=RecentPostThumbnail'><\/scr" + "ipt>");
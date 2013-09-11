function labelthumbs(json){document.write('<div>');for(var i=0;i<numposts;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){var commenttext=entry.link[k].title;var commenturl=entry.link[k].href;}
if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break;}}
var thumburl;
try{thumburl = entry.media$thumbnail.url; 
    thumburl = thumburl.replace("/s72-c/","/s"+img_sz+"-c/");;
   }
catch(error)
{s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){thumburl=d;}
else thumburl='';}
document.write('<a href="'+posturl+'" title="'+posttitle+'"><img class="label_thumb" src="'+thumburl+'"/></a>');
if(i!=(numposts-1))
document.write('');}
document.write('</div>');}

document.write("<scr" + "ipt type='text/javascript' src='/feeds/posts/default/" + (byLabels ? '-/' + LabelName : '') + "?max-results="+ numposts+ "&orderby=published&alt=json-in-script&callback=labelthumbs'><\/scr" + "ipt>");
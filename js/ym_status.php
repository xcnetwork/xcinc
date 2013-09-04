<HTML><HEAD></HEAD><body><?

/*
GET YAHOO MESSENGGER STATUS
Created by Febian (http://www.geocities.com/frt21)
Created on Jun 13th, 2004 - 01:10am [GMT+7]

=================== Start Code ==========
*/

// Set the yahoo UserName / Setting Nama User
$strUser = "redwine";


$url = "http://mail.opi.yahoo.com/online?u=".$strUser."&m=t&t=0";
$handle = fopen ("$url", "r");
$contents = "";
do {
$data = fread($handle, 10000);
if (strlen($data) == 0) {
break;
}

// Get the output from yahoo / Ambil Keluaran dari Yahoo
$contents .= $data;

} while(true);
fclose ($handle);

if ((strpos(strtoupper($contents),"NOT ONLINE") ? strpos(strtoupper($contents),"NOT ONLINE")+1 : 0)>0)
{

// If your yahoo username offline on Yahoo Messenger set variable status to OFFLINE / Jika Usernya OFFLINE di Yahoo Messenger berikan Variabel di Status jadi OFFLINE
$strStatus = "OFFLINE";

// Add custom Offline Image / Tambahkan gambar Offline yang diinginkan
$imgStatus = "<BR><IMG SRC='http://xcinc.googlecode.com/svn/img/agung_off.png' ALT='OFFLINE'>";

}
else
{

// If your yahoo username Online on Yahoo Messenger set variable status to ONLINE / Jika Usernya ONLINE di Yahoo Messenger berikan Variabel di Status jadi ONLINE
$strStatus = "ONLINE";

// Add Custom Online Image / Tambahkan gambar Online yang diinginkan
$imgStatus = "<BR><IMG SRC='http://xcinc.googlecode.com/svn/img/agung_on.png' ALT='ONLINE'>";

} 

// Print your custom output / Tampilkan keluaran hasil yang kamu inginkan
print "Status : ".$strUser." Is ".$strStatus." ".$imgStatus;

//=================== End Code ==========

?></body></html>


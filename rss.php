<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
function clean_feed($input) {
$original = array("<", ">", "&", '"');
$replaced = array("&lt;", "&gt;", "&amp;", "&quot;");
$newinput = str_replace($original, $replaced, $input);
return $newinput;
}
function htmltxt($document){
$search = array('@<script[^>]*?>.*?</script>@si', // Strip out javascript
'@<[\/\!]*?[^<>]*?>@si', // Strip out HTML tags
'@<style[^>]*?>.*?</style>@siU', // Strip style tags properly
'@<![\s\S]*?--[ \t\n\r]*>@' // Strip multi-line comments including CDATA
);
$text = preg_replace($search, '', $document);
$text = str_replace(", ",",",$text);
return $text;
}

$rssVersion = 2.0;
$type = $_GET['type'];
$page = (int)$_GET['p'];

// so RSS hien thi
$fullpage = 1000;

if($page > 0 && $page!= "")
$start=($page-1) * $fullpage;
else{
$page = 1;
$start=0;
}

$rStar = $fullpage * ($page -1 );


header("Content-Type: text/xml; charset=utf-8");
$rss .= "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n";
$rss .= "<rss version=\"2.0\">\r\n";
$rss .= "<channel>\r\n";
$rss .= "<title>RSS ".NAMEWEB."</title>\r\n";
$rss .= "<link>".SITE_LINK."</link>\r\n";
$rss .= "<description>".WEB_NAME."</description>\r\n";
$rss .= "<language>vi-vn</language>\r\n";
$rss .= "<copyright>Copyright (C) ".NAMEWEB."</copyright>\r\n";
$rss .= "<ttl>60</ttl>\r\n";
$rss .= "<generator>".NAMEWEB."</generator> \r\n";


if(!$type || $type == 'song') {
$arr = $mlivedb->query(" m_id, m_title, m_time, m_singer ","data"," m_type = 1 ORDER BY m_id DESC LIMIT ".$rStar .",".$fullpage."");
for($i=0;$i<count($arr);$i++) {
$singer_name = get_data("singer","singer_name"," singer_id = '".$arr[$i][3]."'");
$m_time = date('D, d M Y H:i:s',$arr[$i][2]);
$singer_name 	=	GetSingerName($arr[$i][3]);
$rss .= "<item>\r\n";
$rss .= "<title>" . clean_feed(un_htmlchars($arr[$i][1])) . " - ". clean_feed($singer_name) ."</title>\r\n";
$rss .= "<description>Bài hát " . clean_feed(un_htmlchars($arr[$i][1])) ." do ca sĩ ". clean_feed($singer_name) ." trình bày</description>\r\n";
$rss .= "<link>".url_link(un_htmlchars($arr[$i][1])."-".$singer_name,$arr[$i][0],'nghe-bai-hat')."</link>\r\n";
$rss .= "<pubDate>".$m_time." GMT</pubDate>\r\n";
$rss .= "</item>\r\n\r\n";
}
}
//
if(!$type || $type == 'video') {
$arr = $mlivedb->query(" m_id, m_title, m_time, m_singer ","data"," m_type = 2 ORDER BY m_id DESC LIMIT ".$rStar .",".$fullpage."");
for($i=0;$i<count($arr);$i++) {
$m_time = date('D, d M Y H:i:s',$arr[$i][2]);
$singer_name 	=	GetSingerName($arr[$i][3]);
$rss .= "<item>\r\n";
$rss .= "<title>" . clean_feed(un_htmlchars($arr[$i][1])) . " - ". clean_feed($singer_name) ."</title>\r\n";
$rss .= "<description>Video " . clean_feed(un_htmlchars($arr[$i][1])) ." do ca sĩ ". clean_feed($singer_name) ." trình bày</description>\r\n";
$rss .= "<link>".url_link(un_htmlchars($arr[$i][1])."-".$singer_name,$arr[$i][0],'xem-video')."</link>\r\n";
$rss .= "<pubDate>".$m_time." GMT</pubDate>\r\n";
$rss .= "</item>\r\n\r\n";
}
}

if(!$type || $type == 'album') {
$arr = $mlivedb->query(" album_id, album_name, album_singer, album_info ","album"," album_id != 0 ORDER BY album_id DESC LIMIT ".$rStar .",".$fullpage."");

for($i=0;$i<count($arr);$i++) {
$m_time = date('D, d M Y H:i:s',time());
$singer_name 	=	GetSingerName($arr[$i][2]);
$rss .= "<item>\r\n";
$rss .= "<title>" . clean_feed(un_htmlchars($arr[$i][1])) . " - ". clean_feed($singer_name) ."</title>\r\n";
$rss .= "<description>Nghe album " . clean_feed(un_htmlchars($arr[$i][1])) ." do ca sĩ ". clean_feed($singer_name) ." trình bày\n".htmltxt(un_htmlchars(clean_feed($arr[$i][3])))."</description>\r\n";
$rss .= "<link>".url_link(un_htmlchars($arr[$i][1])."-".$singer_name,$arr[$i][0],'nghe-album')."</link>\r\n";
$rss .= "<pubDate>".$m_time." GMT</pubDate>\r\n";
$rss .= "</item>\r\n\r\n";
}
}
$rss .= "</channel>\r\n";
$rss .= "</rss>\r\n";

echo $rss;
?>
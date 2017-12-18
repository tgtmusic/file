<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
$rssVersion = 2.0;
$type = $_GET['type'];
$page = (int)$_GET['p'];

$fullpage = 20000;

if($page > 0 && $page!= "")
$start=($page-1) * $fullpage;
else{
$page = 1;
$start=0;
}

$rStar = $fullpage * ($page -1 );
header("Content-Type: text/xml; charset=utf-8");
$rss .= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
$rss .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">\r\n";
$rss .= "<url>\r\n";
$rss .= "<loc>".SITE_LINK."</loc>\r\n";
$rss .= "<lastmod>".date('Y-m-d H:i:s')."</lastmod>\r\n";
$rss .= "</url>\r\n";
$m_date = date('Y-m-d');
$m_time = date('H:i:s');
if(!$type || $type == 'song') {
$arr = $mlivedb->query("m_id, m_title, m_img, m_singer, m_cat, m_hot, m_hq, m_viewed,m_time","data"," m_type = 1 ORDER BY m_id DESC LIMIT ".$rStar .",".$fullpage."");

// tell the browser we want xml output by setting the following header.

for($i=0;$i<count($arr);$i++) {
$singer_name 	=	GetSingerName($arr[$i][3]);
// get singer
$rss .= "<url>\r\n";
$rss .= "<loc>".url_link(un_htmlchars($arr[$i][1]).'-'.$singer_name,$arr[$i][0],'nghe-bai-hat')."</loc>\r\n";
$rss .= "<lastmod>".$m_date."T".$m_time."+07:00</lastmod>\r\n";
$rss .= "</url>\r\n\r\n";
}

}
// Video
if(!$type || $type == 'video') {
$arr = $mlivedb->query(" m_id, m_title,m_singer ","data"," m_type = 2 ORDER BY m_id DESC LIMIT ".$rStar .",".$fullpage."");

// tell the browser we want xml output by setting the following header.
for($i=0;$i<count($arr);$i++) {
$singer_name 	=	GetSingerName($arr[$i][2]);
$rss .= "<url>\r\n";
$rss .= "<loc>".url_link(un_htmlchars($arr[$i][1]).'-'.$singer_name,$arr[$i][0],'xem-video')."</loc>\r\n";
$rss .= "<changefreq>daily</changefreq>\r\n";
$rss .= "<lastmod>".$m_date."T".$m_time."+07:00</lastmod>\r\n";
$rss .= "</url>\r\n\r\n";
}

}

// Album
if(!$type || $type == 'album') {
$arr = $mlivedb->query(" album_id, album_name, album_singer ","album"," album_id != 0 ORDER BY album_id DESC LIMIT ".$rStar .",".$fullpage."");
// tell the browser we want xml output by setting the following header.
for($i=0;$i<count($arr);$i++) {
$singer_name 	=	GetSingerName($arr[$i][2]);
$rss .= "<url>\r\n";
$rss .= "<loc>".url_link(un_htmlchars($arr[$i][1]).'-'.$singer_name,$arr[$i][0],'nghe-album')."</loc>\r\n";
$rss .= "<changefreq>daily</changefreq>\r\n";
$rss .= "<lastmod>".$m_date."T".$m_time."+07:00</lastmod>\r\n";
$rss .= "</url>\r\n\r\n";
}

}
$rss .= "</urlset>\r\n";
echo $rss;
@copy('./sitemap/filesitemap.xml','./sitemap/filesitemap.xml',"./sitemap/song-".$page.'.xml');
$path = './sitemap/filesitemap.xml';
$path = './sitemap/song-'.$page.'.xml';
$file=fopen($path, "w");
$write=fwrite($file,$rss);
fclose($file);

?>
<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
include("temp.php");
include("themes.php");
function grab($url) {

if (preg_match("#http://www.nhaccuatui.com/bai-hat/(.*?).html#i",$url, $id_nct2)){
    	$id 	= 	$id_nct2[1];
        $url = SITE_LINK.'stream/data/nct2/'.$id.'.mp3';		
	}	
elseif (preg_match("#http://www.nhaccuatui.com/nghe\?M=(.*?)#i",$url, $id_nct)){
        $song = explode('http://www.nhaccuatui.com/', $url);
        $song = explode('nghe?M=', $song[1]);
        $url = SITE_LINK.'stream/data/nct/'.$song[1].'.mp3';		
	}	
elseif (preg_match("#http://www.nhaccuatui.com/video/(.*?).html#i",$url, $id_video_nct)){
    	$id 	= 	$id_video_nct[1];
        $url = SITE_LINK.'stream/data/nctv/'.$id.'.mp4';		
	}

elseif (preg_match("#http://www(.*?).zippyshare.com/v/(.*?)/file.html#s",$url,$id_zp)){
        $wid     =     $id_zp[1];        $id     =     $id_zp[2];
        $url    =    SITE_LINK.'stream/data/zip/'.$wid.'/'.$id.'.flv';
    }
elseif (preg_match("#stream/data/nv/(.*?)#s",$url,$id_nv)){
		$url	=	SITE_LINK.'/'.$url;		
    }	
	// *.mp3
elseif (preg_match("#http://(.*?).mp3#s",$url)){
        $url    =    $url;
    }
		// *.mp4
elseif (preg_match("#http://(.*?).mp4#s",$url)){
        $url    =    $url;
    }
	// Youtube
elseif (preg_match("#http(.*?)://www.youtube.com/(.*?)#s",$url)){
		$url	=	$url;
    }
return $url;
}


function BANNER($vitri,$width='auto',$height='auto') {
	global $mlivedb;
	$adv = $mlivedb->query("adv_name, adv_img, adv_url, adv_phanloai  ","adv"," adv_vitri = '".$vitri."' AND adv_status = 0 ORDER by adv_id ASC");
	if($adv) {
		for($i=0;$i<count($adv);$i++){
				if($adv[$i][3] == 1) {
					echo '<div class="adv_padding"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'.$width.'" height="'.$height.'" id="adv_top" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="wmode" value="transparent" /><param name="movie" value="'.$adv[$i][1].'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed src="'.$adv[$i][1].'" quality="high" bgcolor="#ffffff" wmode="transparent" width="'.$width.'" height="'.$height.'" name="adv_top" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object></div>';
				}
				else {
					echo '<div class="adv_padding"><a href="'.$adv[$i][2].'" target="_bank"><img alt="'.$adv[$i][0].'" src="'.$adv[$i][1].'" border="0" width="'.$width.'" ></a></div><br/>';
				}
		}

	}
}

function linkPage($sql,$perPage,$curPage,$url,$all){
	global $link_music,$mlivedb;
	$result = mysqli_query($link_music,$sql);
	$totalRecord = mysqli_num_rows($result);
	$re_write_mod = false;
	$strlink = "";
	if( strpos($url,"#page#") > 0 ){
		$re_write_mod = true;
	}
	$pages =  $totalRecord/$perPage;
	$total = ceil($pages);
	if ($total <= 1) return '';
	if($pages > 1){
		$strlink .= "<div class=\"pagination\"> <ul>";
		// First Page Đầu Trang
		if($curPage <>1){
				$FirstPage = $curPage <>1;
				$tempurl = str_replace("#page#",$FirstPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\" class=\"pagelink\">Đầu</a></li>";
		}
		// Previous page
		if($curPage > 1){
			$prePage = $curPage - 1;
				$tempurl = str_replace("#page#",$prePage, $url);
				$strlink .= "<li><a href=\"".$tempurl."\" class=\"pagelink\"><</a></li>";
		}

		// Print pages
		if($curPage > 4)
			$i = $curPage - 4;
		else
			$i = 1;
		if($pages - $curPage > 3)
			$ubound = $curPage + 3;
		else
			$ubound = $pages;

			
		for($i=$i; $i<=$ubound;$i++){
			if($i == $curPage)
				$strlink .= "<li><a  class=\"active\">".$i . "</a>";
			else{
					$tempurl = str_replace("#page#",$i, $url);
					$strlink .= "<li><a href=\"".$tempurl."\" class=\"pagelink\">".$i."</a></li>";
			}
		}// for

		if($totalRecord%$perPage != 0)
			if($i == $curPage)
				$strlink .= "<li><a  class=\"active\">".$i . "</a>";
			else{
					$tempurl = str_replace("#page#",$i, $url);
					$strlink .= "<li><a href=\"".$tempurl."\" class=\"pagelink\">".$i."</a></li>";
			}
			
		if($all != "") {
				$tempurl = str_replace("#page#","all", $url);
				$strlink .= "<li><a href=\"".$tempurl."\" class=\"pagelink\"'>view all</a></li>";
			}

		// Next page
		if($curPage < $pages){
				$nextPage = $curPage + 1;
				$tempurl = str_replace("#page#",$nextPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\" class=\"pagelink\">></a></li>";
		}
		// Last page Cuối Trang
		if($curPage <> $total){
				$LastPage = $total;
				$tempurl = str_replace("#page#",$LastPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\" class=\"pagelink\">Cuối</a></li>";
		}
		$strlink .= "</ul></div>";
	}
	return $strlink;

}
function pages_ajax($type,$ttrow,$limit,$page,$ext='',$apr='',$cat_id=''){
	global $mlivedb;
	$total = ceil($ttrow/$limit);
	if ($total <= 1) return '';
	$style_1 = 'class="active" onfocus="this.blur()"';
	$style_2 = ' onfocus="this.blur()"';
	$main .= "<div class=\"pagination\"> <ul>";
    if ($page<>1){
		if($type=='cam_nhan') 
		$main .= "<li><a $style_2 href='javascript:void(0)' onClick='return showComment(".$ext.",".$apr.",1); return false;'>Đầu</a></li>";
    }
	for($num = 1; $num <= $total; $num++){
		if ($num < $page - 1 || $num > $page + 4) 
		continue;
		if($num==$page) 
		$main .= "<li><a $style_1 >$num</a></li>"; 
        else { 
		   if($type=='cam_nhan') 
		   $main .= "<li><a $style_2 href='javascript:void(0)' onClick='return showComment(".$ext.",".$num.",".$apr."); return false;'>$num</a></li>";
       } 	
	   
    }

    if ($page<>$total){
		if($type=='cam_nhan') 
		$main .= "<li><a $style_2 href='javascript:void(0)' onClick='return showComment(".$ext.",".$total.",".$apr."); return false;'>Cuối</a></li>"; 
    }
	$main .= "</ul></div>";
  return $main;
}
function check_str($a){
	$n=intval(strlen($a)/21);
		if($n>0){
			for($i=1;$i<=$n;$i++){
				$b=$b.substr($a,0,21)." ";
				$a=substr($a,21,strlen($a));
				}
			}
		else{ $b=$a; }
	return $b;
}

function text_s($text) {
	$text = str_replace (' ', '+', $text );
	return $text;
}

function isFloodPost(){
	$_SESSION['current_message_post'] = time();
	global $wait_post;
	$timeDiff_post = $_SESSION['current_message_post'] - $_SESSION['prev_message_post'];
	$floodInterval_post	= 45;
	$wait_post = $floodInterval_post - $timeDiff_post ;	
	if($timeDiff_post <= $floodInterval_post)
	return true;
	else 
	return false;
}

function un_htmlchars($str) {
	return str_replace(array('&lt;', '&gt;', '&quot;', '&amp;', '&#92;', '&#39','&#039;'), array('<', '>', '"', '&', chr(92), chr(39), chr(39)), $str);
}
function htmlchars($str) {
	return str_replace(
		array('&', '<', '>', '"', chr(92), chr(39)),
		array('&amp;', '&lt;', '&gt;', '&quot;', '&#92;', '&#39'),
		$str
	);
}

function get_ascii($st){
		$vietChar 	= 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ|é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ó|ò|ỏ|õ|ọ|ơ|ớ|ờ|ở|ỡ|ợ|ô|ố|ồ|ổ|ỗ|ộ|ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|í|ì|ỉ|ĩ|ị|ý|ỳ|ỷ|ỹ|ỵ|đ|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ó|Ò|Ỏ|Õ|Ọ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Í|Ì|Ỉ|Ĩ|Ị|Ý|Ỳ|Ỷ|Ỹ|Ỵ|Đ|&#39';
		$engChar	= 'a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|e|e|e|e|e|e|e|e|e|e|e|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|u|u|u|u|u|u|u|u|u|u|u|i|i|i|i|i|y|y|y|y|y|d|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|E|E|E|E|E|E|E|E|E|E|E|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|U|U|U|U|U|U|U|U|U|U|U|I|I|I|I|I|Y|Y|Y|Y|Y|D| ';
		$arrVietChar 	= explode("|", $vietChar);
		$arrEngChar		= explode("|", $engChar);
		return str_replace($arrVietChar, $arrEngChar, $st);
	}
function replace($string) {
	$string = get_ascii($string);
    $string = preg_replace(array('/[^a-zA-Z0-9 -]/', '/[ -]+/', '/^-|-$/'),
        array(' ', '-', ''), htmlspecialchars_decode($string));
    return $string;
} 

function en_id($id) {
    $id = dechex($id + 241104185);
    $id = str_replace(1,'I',$id);
    $id = str_replace(2,'W',$id);
    $id = str_replace(3,'O',$id);
    $id = str_replace(4,'U',$id);
    $id = str_replace(5,'Z',$id); 
    return strtoupper($id);
}
function del_id($id) {
    $id = str_replace('Z',5,$id);
    $id = str_replace('U',4,$id);
    $id = str_replace('O',3,$id);
    $id = str_replace('W',2,$id);
	$id = str_replace('I',1,$id);
    $id = hexdec($id);
	$id = $id - 241104185;
    return strtoupper($id);
}

function url_link($name,$id,$type,$x=1) {
	$id 	= en_id($id);
	$name 	= replace($name);
		switch($type) {
			case 'top-100'			: $url = SITE_LINK.'top100/'.$name.'/'.$id.".html"; break;
			case 'chu-de'			: $url = SITE_LINK.'chu-de/'.$name.'/'.$id.".html"; break;
			case 'the-loai'			: $url = SITE_LINK.'the-loai-bai-hat/'.$name.'/'.$id.".html"; break;
			case 'video-cat'		: $url = SITE_LINK.'the-loai-video/'.$name.'/'.$id.".html"; break;
			case 'album-cat'		: $url = SITE_LINK.'the-loai-album/'.$name.'/'.$id.".html"; break;
			case 'news-cat'		: $url = SITE_LINK.'the-loai-news/'.$name.'/'.$id.".html"; break;
			case 'singer-cat'		: $url = SITE_LINK.'the-loai-nghe-si/'.$name.'/'.$id.".html"; break;
			case 'nghe-bai-hat'		: $url = SITE_LINK.'bai-hat/'.$name.'/'.$id.".html"; break;
			case 'xem-video'		: $url = SITE_LINK.'video/'.$name.'/'.$id.".html"; break;
			case 'nghe-album'		: $url = SITE_LINK.'album/'.$name.'/'.$id.".html"; break;
			case 'nghe-album-st'	: $url = SITE_LINK.'album/'.$name.'/'.$id.".html&st=".$x; break;
			case 'user'				: $url = SITE_LINK.'thanh-vien/'.$name.'/'.$id.".html"; break;
			case 'users'			: $url = SITE_LINK.'u/'.$name.'/'.$act; break;
			case 'singer'			: $url = SITE_LINK.'nghe-si/'.$key.'/'.$act; break;
		}
return $url;
}

function check_url_song($name,$id,$type) {
	$id 	= replace($id);
	$name 	= replace($name);
	if($type == 2) $url = SITE_LINK.'video/'.$name.'/'.en_id($id).".html";
	else $url = SITE_LINK.'bai-hat/'.$name.'/'.en_id($id).".html";
	return $url;
}
function check_url_news($name,$id) { $id = replace($id);
$name = replace($name);
$url = SITE_LINK.'tin-tuc/'.$name.'/'.en_id($id).".html";
return $url;
}
function check_img($img) {
global $web_link;
	if ($img == '') $img =SITE_LINK."theme/images/no-img.jpg";
	return $img;
}
function check_img2($img) {
global $web_link;
	if ($img == '') $img =SITE_LINK."theme/images/no-img-2.jpg";

	return $img;
}

function mss($str, $return=""){
	echo "<script>alert('".$str."');";
	if($return != ""){
		echo "window.location='".$return."';";
	}
	echo "</script>";
}
function mssBOX($str, $return=""){
	echo "<script>Boxy.alert(\"".$str."\", null, {title: 'Thông báo'});";
	if($return != ""){
		echo "window.location='".$return."';";
	}
	echo "</script>";
}
function rut_ngan($str,$num) {
	$limit = $num - 1 ;
	$str_tmp = '';
	$arrstr = explode(" ", $str);
	if ( count($arrstr) <= $num ) { return $str; }
	if (!empty($arrstr))
	{
	for ( $j=0; $j< count($arrstr) ; $j++)
	{
	$str_tmp .= " " . $arrstr[$j];
	if ($j == $limit)
	{
	break;
	}
	}
	}
	return $str_tmp.'...';
} 
function check_type($type,$id_img){
	if($type == 2 || $type == 3 || $type == 5) {
	//$arr = $mlivedb->query(" video_img ","data"," m_id = '$id_img'");
	//$media_type = "<img class=\"img_video\" src=\"".check_img($arr[0][0])."\">";
	$media_type = "<img src=".SITE_LINK."images/media/type/video.png>";
	}
	else {
	$media_type = "<img src=".SITE_LINK."images/media/type/mp3.png>";
	}
	return $media_type;
}
function check_data($name) {
	if ($name == '') $name = "Đang cập nhật";
	return $name;
}
function check_info($name,$title) {
	$name	=	un_htmlchars($name);
	if ($name == '' || $name == '<p>&#160;</p>') $name = "Nghe nhạc online ".$title." tại website. Download album nhạc số chất lượng cao, thưởng thức video clip, chèn nhạc vào blog tại mạng giải trí số một Việt Nam!";
	return $name;
}
function check_info_s($name) {
	$name	=	un_htmlchars($name);
	if ($name == '' || $name == '<p>&#160;</p>') $name = "Chưa Có Thông Tin";
	return $name;
}

function check_hot($id) {
	if ($id == '1') $img = "<img src=\"".SITE_LINK."images/media/hot.png\">";
	else $img = "";
	return $img;
}
function check_hq($id) {
	if ($id == '1') $img = "<img src=\"".SITE_LINK."images/media/hq.png\">";
	else $img = "";
	return $img;
}

function check_avt($img) {
	if ($img == "") $img = SITE_LINK.'theme/images/no_avatar.jpg';
	return $img;
}

function check_kbs($name) {
	if ($name == "") $name = "128kb/s";
	else $name = $name;
	return $name;
}

function ucBr($data)
{
	$data=str_replace("http://","***",$data);
	$data=str_replace(".net","***",$data);
	$data=str_replace(".com","***",$data);
	$data=str_replace(".vn","***",$data);
	$data=str_replace(".info","***",$data);
	$data=str_replace(".biz","***",$data);
	$data=str_replace(".tv","***",$data);
	//1
	$data=str_replace("lồn","***",$data);
	$data=str_replace("lồN","***",$data);
	$data=str_replace("lỒn","***",$data);
	$data=str_replace("lỒN","***",$data);
	$data=str_replace("LỒN","***",$data);
	$data=str_replace("LỒn","***",$data);
	$data=str_replace("LồN","***",$data);
	$data=str_replace("Lồn","***",$data);
	//1
	$data=str_replace("cặc","***",$data);
	$data=str_replace("cẶc","***",$data);
	$data=str_replace("cặC","***",$data);
	$data=str_replace("cẶC","***",$data);
	$data=str_replace("Cặc","***",$data);
	$data=str_replace("CặC","***",$data);
	$data=str_replace("CẶc","***",$data);
	$data=str_replace("CẶC","***",$data);
	//1
	$data=str_replace("đụ","***",$data);
	$data=str_replace("đỤ","***",$data);
	$data=str_replace("ĐỤ","***",$data);
	$data=str_replace("Đụ","***",$data);
	//1
	$data=str_replace("địt","***",$data);
	$data=str_replace("đỊt","***",$data);
	$data=str_replace("địT","***",$data);
	$data=str_replace("đỊT","***",$data);
	$data=str_replace("ĐỊT","***",$data);
	$data=str_replace("ĐỊt","***",$data);
	$data=str_replace("ĐịT","***",$data);
	$data=str_replace("Địt","***",$data);
	return $data;
}
function text_tidy($txt = "", $htmlchars = false) {
	if ($htmlchars) $txt = htmlspecialchars($txt);
	$txt = str_replace("\n","<br>",$txt);
	return $txt;
}

function xem_web($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
}
function get_str($source,$start,$end){
		if($start == ''){
			$str = explode($end,$source);
			return $str[0];
				}elseif($end == ''){
					return str_replace($start,"",strstr($source,$start));
				}else{
				$str = explode($start,$source);
				$str = explode($end,$str[1]);
				return $str[0];
				}
		}
function check_song($t1,$t2) {
	if ($t1 == 1) $img .= "<img src=\"images/media/hit.gif\">";
	if ($t2 == 1) $img .= "<img src=\"images/media/hq.gif\">";
	return $img;
}
?>

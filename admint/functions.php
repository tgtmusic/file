<?php
function GetTopicAdmin($cat_id) {
	 $cat_list	=	substr($cat_id, 1);
	 $cat_list	=	substr($cat_list,0,-1);
	 $s = explode(',',$cat_list);
     foreach($s as $x=>$val) {
		$name_cat	=	get_data("topic","topic_name"," topic_id = '".$s[$x]."'");
		$html_cat  .=	$name_cat.", ";
	 }
	 $html_cat 		= substr($html_cat,0,-2);
	 return $html_cat;
}
function linkPageAdmin($sql,$perPage,$curPage,$url,$all){
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
		// First Page Đầu Trang
		if($curPage <>1){
				$FirstPage = $curPage <>1;
				$tempurl = str_replace("#page#",$FirstPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\">Đầu</a></li>";
		}

		// Previous page
		if($curPage > 1){
			$prePage = $curPage - 1;
				$tempurl = str_replace("#page#",$prePage, $url);
				$strlink .= "<li><a href=\"".$tempurl."\"><i class='fa fa-chevron-left'></i></a></li>";
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
				$strlink .= "<li class='active'><a>".$i . "</a></li>";
			else{
					$tempurl = str_replace("#page#",$i, $url);
					$strlink .= "<li><a href=\"".$tempurl."\" >".$i."</a></li>";
			}
		}// for

		if($totalRecord%$perPage != 0)
			if($i == $curPage)
				$strlink .= "<li><a class=\"pagecurrent\">".$i . "</a>";
			else{
					$tempurl = str_replace("#page#",$i, $url);
					$strlink .= "<li><a href=\"".$tempurl."\" >".$i."</a></li>";
			}
			
		if($all != "") {
				$tempurl = str_replace("#page#","all", $url);
				$strlink .= "<li><a href=\"".$tempurl."\" '>Xem tất cả</a></li>";
			}

		// Next page
		if($curPage < $pages){
				$nextPage = $curPage + 1;
				$tempurl = str_replace("#page#",$nextPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\"><i class='fa fa-chevron-right'></i></a></li>";
		}
		// Last page Cuối Trang
		if($curPage <> $total){
				$LastPage = $total;
				$tempurl = str_replace("#page#",$LastPage, $url);
				$strlink .=  "<li><a href=\"".$tempurl."\" >Cuối</a></li>";
		}
	}
	return $strlink;

}

function acp_type($i) {
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=\"type\">".
		"<option value=1".(($i==1)?' selected':'').">MP3</option>".
		"<option value=2".(($i==2)?' selected':'').">VIDEO</option>".
	"</select>";
	return $html;
}
function acp_topic_h($i) {
	$html = "<select class='form-control' name=\"hot\">".
		"<option value=0".(($i==0)?' selected':'').">Không Chọn</option>".
		"<option value=1".(($i==1)?' selected':'').">Chủ Đề Hot</option>".
	"</select>";
	return $html;
}
function acp_type_s($i) {
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=\"singer_type\">".
		"<option value=1".(($i==1)?' selected':'').">Việt Nam</option>".
		"<option value=2".(($i==2)?' selected':'').">Âu Mỹ</option>".
		"<option value=3".(($i==3)?' selected':'').">Châu Á</option>".
	"</select>";
	return $html;
}
function acp_cat_s($i) {
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=\"cat[]\" id=\"cat\">".
		"<option value=1".(($i==1)?' selected':'').">Việt Nam</option>".
		"<option value=2".(($i==2)?' selected':'').">Âu Mỹ</option>".
		"<option value=3".(($i==3)?' selected':'').">Châu Á</option>".
	"</select>";
	return $html;
}

function acp_cat($id = 0, $add = false) {
	global $link_music,$mlivedb;
	//$arr = $mlivedb->query("cat_id, cat_name","theloai"," sub_id IS NULL OR sub_id = 0 ORDER BY cat_order ASC");
	echo '<div class="left_cat"><strong>Danh sách thể loại</strong><br><select class="select" multiple name="fromBoxCat" id="fromBoxCat">';
	//for($i=0;$i<count($arr);$i++) {
	$cat = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
	// sub 1
		for($z=0;$z<count($cat);$z++) {
        echo "<option value=\"".$cat[$z][0]."\">".$cat[$z][1]."</option>";
			// sub 2
			$sub_2 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id  = '".$cat[$z][0]."' ORDER BY cat_order ASC");
			for($x=0;$x<count($sub_2);$x++) {
			echo "<option value=\"".$sub_2[$x][0]."\">&nbsp;&nbsp;|----".$sub_2[$x][1]."</option>";
			}
		}	
	//} 
	echo "</select><span><a href=\"#\" id=\"add\">Thêm thể loại»</a></span></div>";
	echo "<div class=\"left_cat\"><strong>Thể loại đã chọn</strong><br><select class=\"select\" multiple name=\"cat[]\" id=\"cat\">";
	$topic_all	=	substr($id, 1);
	$topic_all	=	substr($topic_all,0,-1);
	$topic_list = $mlivedb->query("cat_id, cat_name","theloai"," cat_id IN (".$topic_all.")");
	if($topic_all != "") {
		for($y=0;$y<count($topic_list);$y++) {
		echo "<option value=\"".$topic_list[$y][0]."\" selected >".$topic_list[$y][1]."</option>";
		}
	}
	echo "</select>";
	echo "<span><a href=\"#\" id=\"remove\">« Xóa thể loại</a></span></div>";
}
function acp_add_cat($id,$su) {
	global $link_music,$mlivedb;
	if($su == 'sub_id') {
	$arr = $mlivedb->query(" * ","theloai"," sub_id = 0 ORDER BY cat_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub\">";
	$html .= "<option value=0>  Mục chính  </option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">".$arr[$z][2]."</option>";
	}
	$html .= "</select>";
	}else {
	$arr = $mlivedb->query(" * ","theloai"," sub_id != 0 AND cat_type = 'mp3' ORDER BY cat_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub_2\">";
	$html .= "<option value=0>Không Chọn</option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">|--".$arr[$z][2]."</option>";
	}
	$html .= "</select>";
	}
	return $html;
}
function acp_topic($id = 0, $add = true) {
	global $link_music,$mlivedb;
	//$arr = $mlivedb->query("cat_id, cat_name","theloai"," sub_id IS NULL OR sub_id = 0 ORDER BY cat_order ASC");
	echo '<div class="left_cat"><strong>Danh sách thể loại</strong><br><select class="select" multiple name="fromBoxTopic" id="fromBoxTopic">';
	//for($i=0;$i<count($arr);$i++) {
	$topic = $mlivedb->query("topic_id, topic_name","topic"," topic_sub = 0 ORDER BY topic_order ASC");
	// sub 1
		for($z=0;$z<count($topic);$z++) {
        echo "<option value=\"".$topic[$z][0]."\">".$topic[$z][1]."</option>";
			// sub 2
			$sub_2 = $mlivedb->query("topic_id, topic_name","topic"," topic_sub  = '".$topic[$z][0]."' ORDER BY topic_order ASC");
			for($x=0;$x<count($sub_2);$x++) {
			echo "<option value=\"".$sub_2[$x][0]."\">&nbsp;&nbsp;|----".$sub_2[$x][1]."</option>";
			}
		}	
	//} 
	echo "</select><span><a href=\"#\" id=\"addtopic\">Thêm thể loại»</a></span></div>";
	echo "<div class=\"left_cat\"><strong>Thể loại đã chọn</strong><br><select class=\"select\" multiple name=\"topic[]\" id=\"topic\">";
	$topic_all	=	substr($id, 1);
	$topic_all	=	substr($topic_all,0,-1);
	$topic_list = $mlivedb->query("topic_id, topic_name","topic"," topic_id IN (".$topic_all.")");
	if($topic_all != "") {
		for($y=0;$y<count($topic_list);$y++) {
		echo "<option value=\"".$topic_list[$y][0]."\" selected >".$topic_list[$y][1]."</option>";
		}
	}
	echo "</select>";
	echo "<span><a href=\"#\" id=\"removetopic\">« Xóa thể loại</a></span></div>";
}
function acp_add_topic($id,$su) {
	global $link_music,$mlivedb;
	if($su == 'topic_sub') {
	$arr = $mlivedb->query(" * ","topic"," topic_sub = 0 ORDER BY topic_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub\">";
	$html .= "<option value=0>  Mục chính  </option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">".$arr[$z][1]."</option>";
	}
	$html .= "</select>";
	}else {
	$arr = $mlivedb->query(" * ","topic"," topic_sub != 0 AND cat_type = 'mp3' ORDER BY topic_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub_2\">";
	$html .= "<option value=0>Không Chọn</option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">|--".$arr[$z][1]."</option>";
	}
	$html .= "</select>";
	}
	return $html;
}
function acp_news_cat($id = 0, $add = false) {
	global $link_music,$mlivedb;
	//$arr = $mlivedb->query("cat_id, cat_name","theloai"," sub_id IS NULL OR sub_id = 0 ORDER BY cat_order ASC");
	echo '<div class="left_cat"><strong>Danh sách thể loại</strong><br><select class="select" multiple name="fromBoxCat" id="fromBoxCat">';
	//for($i=0;$i<count($arr);$i++) {
	$cat = $mlivedb->query("cat_news_id, cat_news_name","catnews"," cat_news_sub_id = 0 ORDER BY cat_news_order ASC");
	// sub 1
		for($z=0;$z<count($cat);$z++) {

        echo "<option value=\"".$cat[$z][0]."\">".$cat[$z][1]."</option>";
			// sub 2
			$sub_2 = $mlivedb->query("cat_news_id, cat_news_name","catnews"," cat_news_sub_id  = '".$cat[$z][0]."' ORDER BY cat_news_order ASC");
			for($x=0;$x<count($sub_2);$x++) {
			echo "<option value=\"".$sub_2[$x][0]."\">&nbsp;&nbsp;|----".$sub_2[$x][1]."</option>";
			}
		}
		
	//} 
	echo "</select><span><a href=\"#\" id=\"add\">Thêm thể loại»</a></span></div>";
	echo "<div class=\"left_cat\"><strong>Thể loại đã chọn</strong><br><select class=\"select\" multiple name=\"cat[]\" id=\"cat\">";
	$topic_all	=	substr($id, 1);
	$topic_all	=	substr($topic_all,0,-1);
	$topic_list = $mlivedb->query("cat_news_id, cat_news_name","catnews"," cat_news_id IN (".$topic_all.")");
	if($topic_all != "") {
		for($y=0;$y<count($topic_list);$y++) {
		echo "<option value=\"".$topic_list[$y][0]."\" selected >".$topic_list[$y][1]."</option>";
		}
	}
	echo "</select>";
	echo "<span><a href=\"#\" id=\"remove\">« Xóa thể loại</a></span></div>";
}
function acp_news_add_cat($id,$su) {
	global $link_music,$mlivedb;
	if($su == 'cat_news_sub_id') {
	$arr = $mlivedb->query(" * ","catnews"," cat_news_sub_id = 0 ORDER BY cat_news_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub\">";
	$html .= "<option value=0>  Mục chính  </option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">".$arr[$z][2]."</option>";
	}
	$html .= "</select>";
	}else {
	$arr = $mlivedb->query(" * ","catnews"," cat_news_sub_id != 0 AND cat_news_type = 'mp3' ORDER BY cat_news_order ASC");
	$html = "<select class=\"input-sm form-control input-s-sm inline v-middle\" name=\"sub_2\">";
	$html .= "<option value=0>Không Chọn</option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">|--".$arr[$z][2]."</option>";
	}
	$html .= "</select>";
	}
	return $html;
}

function acp_server($id) {
	global $link_music,$mlivedb;
	$arr = $mlivedb->query(" * ","local"," local_id ORDER BY local_id ASC");
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=\"server\">";
	$html .= "<option value=0>---Không chọn---</option>";
	for($z=0;$z<count($arr);$z++) {
		$html .= "<option value=".$arr[$z][0].(($arr[$z][0] == $id)?" selected":"").">Server ".$arr[$z][0]."</option>";
	}
	$html .= "</select>";
	return $html;
}
function GetSingerAdmin($sing_id) {
	$singer_list	=	substr($sing_id, 1);
	 $singer_list	=	substr($singer_list,0,-1);
	 $s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
		$name_sing	=	get_data("singer","singer_name"," singer_id = '".$s[$x]."'");
		$url_sing	=	'index.php?act=singer&mode=edit&id='.$s[$x];
		$html_sing  .=	"<a href=\"".$url_sing."\" title=\"".$name_sing."\">".$name_sing."</a>, ";
	 }
	 $html_sing 		= substr($html_sing,0,-2);
	 return $html_sing;
}

function GetSingerNameAdmin($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	 $singer_list	=	substr($singer_list,0,-1);
	 $s = explode(',',$singer_list);
	 $html_singer .= "<input type=hidden name=singer value=".$singer_id." class='form-control' />";
     foreach($s as $x=>$val) {
		$name_singer	=	get_data("singer","singer_name"," singer_id = '".$s[$x]."'");
		$url_singer	=	'index.php?act=singer&mode=edit&id='.$s[$x];
		$html_singer  .=	"<a href=\"".$url_singer."\" title=\"".$name_singer."\">".$name_singer."</a>, ";
	 }
	 $html_singer 		= substr($html_singer,0,-2);
	 return $html_singer;
}
function acp_singer($id = 0, $add = false) {
	global $link_music,$mlivedb;
	$id = (int)$id;
	$arr = $mlivedb->query(" singer_id, singer_name ","singer"," singer_id = '".$id."'");
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=singer>";
	$html .= "<option value=dont_edit".(($id == 0)?" selected":'').">Không sửa</option>";
	$html .= "<option value=1".((($id == 1) && !$add)?" selected":'').">V.a (Việt Nam)</option>";
	$html .= "<option value=2".(($id == 2 && !$add)?" selected":'').">V.a (Âu Mỹ)</option>";
	$html .= "<option value=3".(($id == 3 && !$add)?" selected":'').">V.a (Châu Á)</option>";
	if($arr) {
	$html .= "<option value=".$arr[0][0].(($id == $arr[0][0])?" selected":'').">".$arr[0][1]."</option>";
	}
	$html .= "</select>";
	return $html;
}

function acp_singer_type($i) {
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=\"singer_type\">".
		"<option value=1".(($i==1)?' selected':'').">CA SĨ VIỆT</option>".
		"<option value=2".(($i==2)?' selected':'').">CA SĨ ÂU MỸ</option>".
		"<option value=3".(($i==3)?' selected':'').">CA SĨ CHÂU Á</option>".

	"</select>";
	return $html;
}

function acp_album_list($id = 0, $add = false) {
	global $link_music,$mlivedb;
	$arr = $mlivedb->query(" * ","album"," album_id ORDER BY album_name ASC");
	$html = "<select input-sm form-control input-s-sm inline v-middle name=album>";
	if ($add) $html .= "<option value=dont_edit".(($id == 0)?" selected":'').">Không sửa</option>";
	$html .= "<option value=0".(($id == 0 && !$add)?" selected":'').">Chưa biết</option>";
	for($i=0;$i<count($arr);$i++) {
		$html .= "<option value=".$arr[$i][0].(($id == $arr[$i][0])?" selected":'').">".$arr[$i][1]."</option>";
	}
	$html .= "</select>";
	return $html;
}
function them_moi_singer_form() {
	$html = "<div class='form-group has-success'><label class='control-label' for='inputSuccess'><i class='fa fa-check'></i> Nhập Tên Ca Sĩ Mới </label><div class='input-group-btn'>
                      <div class='col-xs-3'><select class='input-sm form-control input-s-sm inline v-middle' name=singer_type>".
		"<option value=1".(($i==1)?' selected':'').">CA SĨ VIỆT</option>".
		"<option value=2".(($i==2)?' selected':'').">CA SĨ ÂU MỸ</option>".
		"<option value=3".(($i==3)?' selected':'').">CA SĨ CHÂU Á</option>".

		
	"</select></div><div class='col-xs-5'><input type=text name=new_singer placeholder='Nhập Tên Ca Sĩ Mới' class='form-control'></div></div><br/>";
	return $html;
}
function them_moi_singer_form2() {
	$html = "<select class='input-sm form-control input-s-sm inline v-middle' name=singer_type>".
		"<option value=1".(($i==1)?' selected':'').">CA SĨ VIỆT</option>".
		"<option value=2".(($i==2)?' selected':'').">CA SĨ ÂU MỸ</option>".
		"<option value=3".(($i==3)?' selected':'').">CA SĨ CHÂU Á</option>".

		
	"</select>";
	return $html;
}
function them_moi_singer1($new_singer,$singer_type) {
	global $link_music,$mlivedb;
	$new_singer =  htmlchars(stripslashes($new_singer));
	$singer_ascii = replace($new_singer);
	$singer_ascii = str_replace('-'," ",$singer_ascii);
	$singer_ascii = strtolower(get_ascii($singer_ascii));
	$arr = $mlivedb->query(" singer_id ","singer"," singer_name = '".$new_singer."'");
	if (count($arr)>0) {
		$singer = $arr[0][0];
	}
	else {
		mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_type) VALUES ('".un_htmlchars($new_singer)."','".$singer_ascii."','".$singer_type."')");
		$singer = mysqli_insert_id($link_music);
	}
	return $singer;
}

function them_moi_singer($new_singer,$singer_type) {
	global $link_music,$mlivedb;
	$new_singer =  htmlchars(stripslashes($new_singer));
	$list_singer = $new_singer.',';
	$new_singer = substr($list_singer,0,-1);
	$s = explode(', ',$new_singer);
	foreach($s as $x=>$val)
      {
	$new_singer =  htmlchars(stripslashes($s[$x]));
	$singer_ascii = replace(un_htmlchars($s[$x]));
	$singer_ascii = str_replace('-'," ",$singer_ascii);
	$singer_ascii = strtolower(get_ascii($singer_ascii));
		$arr = $mlivedb->query(" singer_id ","singer"," singer_name = '".$s[$x]."'");
	if (count($arr)>0) {
		$singer1 .= $arr[0][0].',';
		$singer = ','.substr($singer1,0,-1).',';
	}
	else {
		mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_type) VALUES ('".un_htmlchars($new_singer)."','".$singer_ascii."','".$singer_type."')");
		$singer1 .= mysqli_insert_id($link_music).',';
		$singer = ','.substr($singer1,0,-1).',';
	}
	}
	  return $singer;
}
function them_moi_media($media_singer,$media_cat,$media_url,$media_type,$new_media,$media_local,$media_mempost,$media_poster,$media_img,$media_lyric) {
	global $link_music,$mlivedb;
	$new_media =  htmlchars(stripslashes($new_media));
	$list_media = $new_media.',';
	$new_media = substr($list_media,0,-1);
	$s = explode(', ',$new_media);
	foreach($s as $x=>$val)
      {
	$new_media =  htmlchars(stripslashes($s[$x]));
	$media_ascii = replace(un_htmlchars($s[$x]));
	$media_ascii = str_replace('-'," ",$media_ascii);
	$media_ascii = strtolower(get_ascii($media_ascii));
	
		$arr = $mlivedb->query(" m_id ","data"," m_title = '".$s[$x]."' AND m_type = '".$media_type."' AND m_mempost = '".$media_mempost."'");
	if (count($arr)>0) {
		$media1 .= $arr[0][0].',';
		$media = substr($media1,0,-1).',';
	}
	else {
		mysqli_query($link_music,"INSERT INTO table_data (m_singer,m_cat,m_url,m_type,m_title,m_title_ascii,m_is_local,m_mempost,m_poster,m_img,m_lyric,m_time) VALUES ('".$media_singer."','".$media_cat."','".$media_url."','".$media_type."','".un_htmlchars($new_media)."','".$media_ascii."','".$media_local."','".$media_mempost."','".$media_poster."','".$media_img."','".$media_lyric."','".NOW."')");
		$media1 .= mysqli_insert_id($link_music).',';
		$media = substr($media1,0,-1).',';
	}
	}
	  return $media;
}
function them_moi_album_form() {

	$html = "Tên : <input name=new_album size=50><br>Hình : <input name=album_img type=file size=50>";

	return $html;

}

function them_moi_s($new_singer,$singer_cat,$singer_img,$singer_big_img,$singer_info,$singer_type,$singer_tenthat,$singer_ngaysinh,$singer_quocgia,$singer_quequan) {
	global $link_music,$mlivedb;
	$new_singer  =  htmlchars(stripslashes($new_singer));
	$singer_ascii = replace(un_htmlchars($new_singer));
	$singer_ascii = str_replace('-'," ",$singer_ascii);
	$singer_ascii = strtolower(get_ascii($singer_ascii));

	$singer_info =  htmlchars(stripslashes($singer_info));
	$arr = $mlivedb->query(" singer_id ","singer"," singer_name = '".$new_singer."'");
	if (count($arr)>0) {
		$singer = $arr[0][0];
	}
	else {
		
		mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_cat,singer_img,singer_big_img,singer_info,singer_type,singer_tenthat,singer_ngaysinh,singer_quocgia,singer_quequan) 
		VALUES ('".un_htmlchars($new_singer)."','".$singer_ascii."','".$singer_cat."','".$singer_img."','".$singer_big_img."','".$singer_info."','".$singer_type."','".$singer_tenthat."','".$singer_ngaysinh."','".$singer_quocgia."','".$singer_quequan."')");
		$singer = mysqli_insert_id($link_music);
	}
	return $singer;

}

function them_moi_album($new_album,$album_singer,$album_img,$album_cat,$album_song,$album_info,$album_poster) {
	global $link_music,$mlivedb;
	$new_album  =  htmlchars(stripslashes($new_album));
	$album_info =  htmlchars(stripslashes($album_info));
	$album_ascii = replace(un_htmlchars($new_album));
	$album_ascii = str_replace('-'," ",$album_ascii);
	$album_ascii = strtolower(get_ascii($album_ascii));
	$arr = $mlivedb->query(" album_id ","album"," album_name = '".$new_album."'");
	if (count($arr)>0) {
		$album = $arr[0][0];
	}
	else {
		$album_poster = $_SESSION['admin_id'];
		mysqli_query($link_music,"INSERT INTO table_album (album_name,album_name_ascii,album_singer,album_img,album_info,album_poster,album_cat,album_song,album_type,album_time) VALUES ('".$new_album."','".$album_ascii."','".$album_singer."','".$album_img."','".$album_info."','".$album_poster."','".$album_cat."','".$album_song."','0','".NOW."')");
		$album = mysqli_insert_id($link_music);
	}
	return $album;

}



function grab_img($url) {
if (preg_match("#youtube.com/v/([^/-]+)#s",$url,$id_yt)){
		$img = 'http://img.youtube.com/vi/'.$id_yt[1].'/maxresdefault.jpg';
	}
elseif (preg_match("#youtube.com/watch\?v=([^/]+)#s",$url, $id_sr)){
		$img = 'http://img.youtube.com/vi/'.$id_sr[1].'/maxresdefault.jpg';
	}
elseif (preg_match("#http://mp3.zing.vn/video-clip/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('" />',$aArray[1]);
		$img=$A[0];	
    }
elseif (preg_match("#http://mp3.zing.vn/tv/media/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<link rel="image_src" href="',$a);
    	$A=explode('" />',$aArray[1]);
		$img=$A[0];	
    }
	elseif (preg_match("#http://tv.zing.vn/video/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('" />',$aArray[1]);
		$img=$A[0];	
    }
elseif (preg_match("#http://nhacso.net/xem-video/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<link href="',$a);
    	$A=explode('" rel="image_src" />',$aArray[1]);
		$img=$A[0];	
    }	
elseif (preg_match("#http://www.nhaccuatui.com/mv/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('"/>',$aArray[1]);
		$img=$A[0];	
    }	
return $img;

}

?>
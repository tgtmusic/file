<?php
if($sethot) {
	mysqli_query($link_music,"UPDATE table_data SET m_hot = 1 WHERE m_id = '".$sethot."'");
	$arr_s = $mlivedb->query(" m_img,m_title,m_type ","data"," m_id = '".$sethot."'");
	if ($arr_s[0][2] == '2') {
			mss ("Update xong ","index.php?act=list-media&mode=video");
			} else {
			mss ("Update xong ","index.php?act=list-media&mode=songs");
			}
}
if($bohot) {
	mysqli_query($link_music,"UPDATE table_data SET m_hot = 0 WHERE m_id = '".$bohot."'");
		$arr_s = $mlivedb->query(" m_img,m_title,m_type ","data"," m_id = '".$bohot."'");
	if ($arr_s[0][2] == '2') {
			mss ("Update xong ","index.php?act=list-media&mode=video");
			} else {
			mss ("Update xong ","index.php?act=list-media&mode=songs");
			}
}
if($setnew) {
	mysqli_query($link_music,"UPDATE table_data SET m_new = 1 WHERE m_id = '".$setnew."'");
	$arr_s = $mlivedb->query(" m_img,m_title,m_type ","data"," m_id = '".$sethot."'");
	if ($arr_s[0][2] == '2') {
			mss ("Update xong ","index.php?act=list-media&mode=video");
			} else {
			mss ("Update xong ","index.php?act=list-media&mode=songs");
			}
}
if($bonew) {
	mysqli_query($link_music,"UPDATE table_data SET m_new = 0 WHERE m_id = '".$bonew."'");
		$arr_s = $mlivedb->query(" m_img,m_title,m_type ","data"," m_id = '".$bohot."'");
	if ($arr_s[0][2] == '2') {
			mss ("Update xong ","index.php?act=list-media&mode=video");
			} else {
			mss ("Update xong ","index.php?act=list-media&mode=songs");
			}
}
if ($del_id) {
	if ($_POST['submit']) {
		$del_id	= del_id($del_id);
		$arr_img = $mlivedb->query(" m_img,m_title,m_type ","data"," m_id = '".$del_id."'");
		delFile($arr_img[0][0]);
		mysqli_query($link_music,"DELETE FROM table_data WHERE m_id = '".$del_id."'");
		if ($arr_img[0][2] == '2') {
			mss ("Xóa MV thành công ","index.php?act=list-media&mode=video");
			} else {
			mss ("Xóa bài hát thành công ","index.php?act=list-media&mode=songs");
			}
	}
	?>

     <section class="content">
          <div class="row">
            <div class="col-md-6">     
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">DELETE</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
				<div class="box-body">
    <table align="center" width="100%" style="border: 1px solid red;">
    <form method="post"><b>Bạn Muốn Xóa MEDIA:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("data","m_title"," m_id = '".del_id($del_id)."'"));?>" class="form-control">
                    <span class="input-group-btn">
                      <input class="btn btn-danger btn-flat" name=submit type=submit value="Có!">
                    </span>
                  </div><!-- /input-group -->

	</form>
    </table>
	 </div><!-- /.box-body -->
 
            </div><!-- /.col-->
          </div><!-- ./row -->
        </section><!-- /.content -->

	<?php
}
// ADD SONGS
if($mode == 'add') {
	if(isset($_POST['submit'])) {
		if($_POST['song'] == "" || $_POST['url'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");
		}
		if($_POST['song'] && $_POST['url']) { 	
			$song		 = htmlchars(stripslashes($_POST['song']));
			$song_ascii = replace($song);
			$song_ascii = str_replace('-'," ",$song_ascii);
			$song_ascii = strtolower(get_ascii($song_ascii));

				if($_POST['new_singer'] && $_POST['singer_type']) {
					$new_singer 	 = htmlchars(stripslashes($_POST['new_singer']));
					$singer_type = $_POST['singer_type'];
					$singer = them_moi_singer($new_singer,$singer_type);
				}
			else {
			$singer 	 = $_POST['singer'];
			}
			$sangtac	 = htmlchars(stripslashes($_POST['sangtac']));
			$sangtac_ascii = replace($sangtac);
			$sangtac_ascii = str_replace('-'," ",$sangtac_ascii);
			$sangtac_ascii = strtolower(get_ascii($sangtac_ascii));			
			$cat		 = implode(',',$_POST['cat']);
			$cat		 = ",".$cat.",";
			$url		 = htmlchars(stripslashes($_POST['url']));			
			$local		 = $_POST['server'];
			$lyric		 = htmlchars(stripslashes($_POST['lyric']));
			$user_id	 = $_SESSION['admin_id'];
			$type		 = $_POST['type'];
			$lrc		 = htmlchars(stripslashes($_POST['lrc']));
			$id_album		 = htmlchars(stripslashes($_POST['id_album']));
			$official		 = $_POST['official'];
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_VIDEO."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
					$img = LINK_VIDEO."/".WEB_NAME."-".time()."-".$_FILES['img']['name'];
			}
			elseif($_POST['grab_img']) $img = grab_img($url);
			else $img = $_POST['img'];

			$action		 = "index.php?act=media&mode=add";
			mysqli_query($link_music,"INSERT INTO table_data (m_title,m_title_ascii,m_singer,m_cat,m_poster,m_sang_tac,m_lyric,m_type,m_url,m_img,m_is_local,m_lrc,m_official,m_sang_tac_ascii,m_album,m_time) 
						 VALUES ('".$song."','".$song_ascii."','".$singer."','".$cat."','".$user_id."','".$sangtac."','".$lyric."','".$type."','".$url."','".$img."','".$local."','".$lrc."','".$official."','".$sangtac_ascii."','".$id_album."','".NOW."')");
			if ($type == '2') {
			mss ("Thêm MV mới thành công ","index.php?act=list-media&mode=video");
			} else {
			mss ("Thêm Bài Hát mới thành công ","index.php?act=list-media&mode=songs");
			}
		}
	}
include("media_act.php"); }
if($mode == 'edit') {
		$id	= del_id($id);
		$arrz = $mlivedb->query(" m_id, m_title, m_singer, m_cat, m_url, m_img, m_is_local, m_lyric, m_type, m_sang_tac, m_viewed, m_viewed_month, m_lrc,m_official,m_album ","data"," m_id = '$id'");
		$action			= "index.php?act=media&mode=edit&id=".en_id($id);
		if(isset($_POST['submit'])) {
			if($_POST['song'] == "" || $_POST['url'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}
			else { 	
				$song		 = htmlchars(stripslashes($_POST['song']));
			$song_ascii = replace($song);
			$song_ascii = str_replace('-'," ",$song_ascii);
			$song_ascii = strtolower(get_ascii($song_ascii));
				if($_POST['new_singer'] && $_POST['singer_type']) {
					$new_singer 	 = $_POST['new_singer'];
					$singer_type 	 = $_POST['singer_type'];
					$singer = them_moi_singer($new_singer,$singer_type);
				}
				else {
				$singer 	 = $_POST['singer'];
				}
				$sangtac	 = htmlchars(stripslashes($_POST['sangtac']));
			$sangtac	 = htmlchars(stripslashes($_POST['sangtac']));
			$sangtac_ascii = replace($sangtac);
			$sangtac_ascii = str_replace('-'," ",$sangtac_ascii);
			$sangtac_ascii = strtolower(get_ascii($sangtac_ascii));					
				$s_nghe		 = htmlchars(stripslashes($_POST['s_nghe']));
				$cat		 = implode(',',$_POST['cat']);
				$cat		 = ",".$cat.",";
				$url		 = htmlchars(stripslashes($_POST['url']));
				$local		 = htmlchars(stripslashes($_POST['server']));
				$lyric		 = htmlchars(stripslashes($_POST['lyric']));
				$type		 = $_POST['type'];
				$lrc		 = htmlchars(stripslashes($_POST['lrc']));
				$id_album		 = htmlchars(stripslashes($_POST['id_album']));
				$official		 = $_POST['official'];
				if(move_uploaded_file($_FILES['img']['tmp_name'],FOLDER_VIDEO."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
					delFile($arrz[0][5]);
					$img = LINK_VIDEO."/".NAMEWEB."-".time()."-".$_FILES['img']['name'];
				}
				elseif($_POST['grab_img']) $img = grab_img($url);
				else $img = $_POST['img'];

				
				mysqli_query($link_music,"UPDATE table_data SET
					m_title			=  	'".$song."',
					m_title_ascii 	= 	'".$song_ascii."',
					m_singer		= 	'".$singer."',
					m_sang_tac		= 	'".$sangtac."',
					m_cat			=	'".$cat."',
					m_viewed_month	=	'".$s_nghe."',
					m_url			=	'".$url."',
					m_img			=	'".$img."',
					m_is_local		=	'".$local."',
					m_type			=	'".$type."',
					m_sang_tac_ascii		= 	'".$sangtac_ascii."',
					m_lrc			=	'".$lrc."',
					m_album			=	'".$id_album."',
					m_official		=	'".$official."',
					m_lyric			=	'".$lyric."'
			  WHERE m_id 			= 	'$id'
				");
			if ($type == '2') {
			mss ("Sửa MV thành công ","index.php?act=list-media&mode=video");
			} else {
			mss ("Sửa Bài hát thành công ","index.php?act=list-media&mode=songs");
			}
			}
		}
	include("media_act.php");
}
if($mode == 'multi-add-song') {
	include("multi_song.php");
}
if($mode == 'multi-you') {
	include("multi_you.php");
}
if($mode == 'multi-you-playlist') {
	include("multi_you_playlist.php");
}
if($mode == 'multi-nct-tl-song') {
	include("multi_nct_tl_song.php");
}
if($mode == 'multi-nct-tl-video') {
	include("multi_nct_tl_video.php");
}
if($mode == 'multi-nct-album') {
	include("multi_nct_album.php");
}
if($mode == 'multi-nct-video-singer') {
	include("multi_nct_video_singer.php");
}
?>

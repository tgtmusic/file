<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/ajax.php");
include("../includes/class.inputfilter.php");
include("../includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_media = $myFilter->process($_GET['id']); $id_media	=	del_id($id_media);
mysqli_query($link_music,"UPDATE table_data SET m_viewed = m_viewed+".NUMPLAY.", m_viewed_month = m_viewed_month+".NUMPLAY." WHERE m_id = '".$id_media."'");
$song = $mlivedb->query(" m_title, m_singer, m_cat, m_img, m_poster, m_viewed, m_lyric, m_time, m_sang_tac, m_url,m_is_local,m_lrc,m_official,m_hq,m_hot,m_like ","data"," m_id = '".$id_media."' ORDER BY m_id DESC ");

$user 		= 	get_user($song[0][4]);
$user_url 	= url_link('user',$song[0][4],'user');
$st_name 	= un_htmlchars($song[0][8]);
$title 	=	GetSingerName($song[0][1]);
$song_url 	= url_link(un_htmlchars($song[0][0]).'-'.$title,$id_media,'xem-video');
$get_singer = GetSinger($song[0][1]);
$singer_big_img		= GetSingerIMGBIG($song[0][1]);
$singer_img		= GetSingerIMG($song[0][1]);
$lyric_info		= text_tidy(un_htmlchars($song[0][6]));
$download 		= 'down.php?id='.del_id($id).'&key='.md5(del_id($id).'tgt_music');
$url_i = grab(get_url($song[0][10],$song[0][9]));
$arr_singer = $mlivedb->query(" singer_id ","singer"," singer_id = '".GetSingerID($song[0][1])."'");
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
			if(count($arr_singer)>0) {
	 $singer_seach = "m_singer LIKE '%,".$singer_list.",%'";
	 $singer_seach_album = "album_singer LIKE '%,".$singer_list.",%'";
	}
$arr_next = $mlivedb->query(" m_id, m_title, m_singer, m_type ","data"," m_cat = '".$song[0][2]."' AND m_type = 2 ORDER BY RAND() LIMIT 10");
	$singer_name_next	=	GetSingerName($arr_next[0][2]);
	$get_singer_next = GetSinger($arr_next[0][2]);
$song_url_next = url_link($arr_next[0][1].'-'.$singer_name_next,$arr_next[0][0],'xem-video');
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="title" content="Video <?php  echo un_htmlchars($song[0][0]).','.$title; ?>, <?php  echo GetCAT($song[0][2]);?>" />
<meta name="description" content="Video <?php  echo un_htmlchars($song[0][0]);?> do ca sĩ <?php  echo $title;?> trình bày, thuộc thể loại <?php  echo GetCAT($song[0][2]);?>" />
<meta name="keywords" content="<?php  echo un_htmlchars($song[0][0]);?>, Video, <?php  echo $title;?>, ca sĩ, <?php  echo $title;?>, sáng tác, thể loại, <?php  echo GetCAT($song[0][2]);?>" />

<base href="<?php  echo SITE_LINK ?>" />
<title>Video <?php  echo un_htmlchars($song[0][0]).' - '.$title; ?> | <?php  echo GetCAT($song[0][2]);?></title>

<link rel="image_src" href="<?php  echo check_img($song[0][3]);?>" />
<link rel="video_src" href="<?php  echo SITE_LINK.'embed/video/auto/'.en_id($id_media); ?>" />
<style>
    html, body {width:100%;height: 100%;}
</style>
</head>
<body>
	<div id="myvideo" ></div>
 <script type="text/javascript" src="<?=SITE_LINK?>player/nhacvn/jwplayer.js"></script>
<script type="text/javascript">
/*<![CDATA[*/

        jwplayer('myvideo').setup({
                width: '100%',
                height: '100%',
				sources: [{"file":"<?=$url_i?>","label":"480p","default":"true","type":"video/mp4"},],
				"image":"<?php echo check_img($song[0][3]);?>",				
                autostart: true,
                primary: 'html5',
                mode : 'notembed',
                link: '<?=$song_url;?>',
                plugins: {
                    '<?=SITE_LINK?>player/nhacvn/vast.js': {
                      client:'vast',
                      schedule:{
                        overlay: { offset: 0, tag: '/player/banner/type/video', type:'nonlinear' }
                      }
                    }
                  }
            });


/*]]>*/
</script>

</body>
</html>
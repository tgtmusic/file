<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/ajax.php");
include("../includes/class.inputfilter.php");
include("../includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_media = $myFilter->process($_GET['id']);
$id_media	=	del_id($id_media);
mysqli_query($link_music,"UPDATE table_data SET m_viewed = m_viewed+".NUMPLAY.", m_viewed_month = m_viewed_month+".NUMPLAY." WHERE m_id = '".$id_media."'");
//$cache = new cache();
//if ( $cache->caching ) {
$song 		= $mlivedb->query(" m_title, m_singer, m_cat, m_img, m_poster, m_viewed, m_lyric, m_kbs, m_sang_tac, m_url,m_is_local,m_lrc,m_official,m_hq,m_hot,m_like ","data"," m_id = '".$id_media."' ORDER BY m_id DESC ");

$user 		= 	get_user($song[0][4]);
$user_url 	= url_link('user',$song[0][4],'user');
$st_name 	= un_htmlchars($song[0][8]);
$title 	=	GetSingerName($song[0][1]);
$song_url 	= url_link(un_htmlchars($song[0][0]).'-'.$title,$id_media,'nghe-bai-hat');
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
$arr_next = $mlivedb->query(" m_id, m_title, m_singer, m_type ","data"," m_cat = '".$song[0][2]."' AND m_type = 1 ORDER BY RAND() LIMIT 10");
	$singer_name_next	=	GetSingerName($arr_next[0][2]);
	$get_singer_next = GetSinger($arr_next[0][2]);
$song_url_next = url_link($arr_next[0][1].'-'.$singer_name_next,$arr_next[0][0],'nghe-bai-hat');

?>

<!DOCTYPE html>
<html lang="vi">
<head>
<base href="<?php echo SITE_LINK ?>" />
<title><?php  echo un_htmlchars(un_htmlchars($song[0][0])).' - '.un_htmlchars($title); ?> | <?php  echo GetCAT($song[0][2]);?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="title" content="<?php  echo un_htmlchars(un_htmlchars($song[0][0])).' - '.un_htmlchars($title); ?> | <?php  echo GetCAT($song[0][2]);?>" />
<meta name="description" content="Bài hát <?php  echo un_htmlchars(un_htmlchars($song[0][0]));?> do ca sĩ <?php  echo un_htmlchars($title);?> trình bày, thuộc thể loại <?php  echo $cat;?>" />
<meta name="keywords" content="<?php  echo un_htmlchars($song[0][0]);?>, Bài hát, <?php  echo un_htmlchars($title);?>, ca sĩ, <?php  echo un_htmlchars($title);?>, sáng tác, thể loại, <?php  echo GetCAT($song[0][2]);?>" />
<link rel="image_src" href="<?php  echo $singer_img;?>" />
<link rel="video_src" href="<?php  echo SITE_LINK.'embed/song/auto/'.en_id($id_media); ?>" />
<style>
    html, body {width:100%;height: 100%;}
</style>
</head>
<body>
<script type="text/javascript" src="<?=SITE_LINK?>player/nhacvn/jwplayer.js"></script>

<div id="audio"></div>

<script type="text/javascript">
            jwplayer('audio').setup({
                width: '100%',
                height: '100%',
            image: '<?=SITE_LINK;?>images/img/no-img-2.jpg',
            stretching: 'fill',
            playlist: [{"sources":[{"file":"<?=$url_i?>","label":"320K"}],"image":"<?=$singer_big_img?>","mediaid":"535696","media_title":"<?=un_htmlchars($song[0][0])?>","media_desc":"<?=$title?>","active_from":0,"link":"<?=$song_url?>","tracks":[{"file":"<?=$song[0][11]?>","kind":"captions","label":"L\u1eddi Karaoke","default":true}]}],
            autostart: true,
            mode : 'notembed',
            //primary: primaryCookie

            primary: 'html5',
            plugins: {
                '<?=SITE_LINK?>player/nhacvn/vast.js': {
                  client:'vast',
                  schedule:{
                    overlay: { offset: 0, tag: '/player/banner/type/album', type:'nonlinear' }
                  }
                }
            }
        });

</script>

</body>
</html>
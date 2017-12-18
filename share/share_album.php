<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/ajax.php");
include("../includes/class.inputfilter.php");
include("../includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_album = $myFilter->process($_GET['id']);
if(isset($_GET["st"])) $st 	 	 = $myFilter->process((int)$_GET['st']+1);
$id_album 						 = del_id($id_album);

mysqli_query($link_music,"UPDATE table_album SET album_viewed = album_viewed+".NUMPLAY.", album_viewed_month = album_viewed_month+".NUMPLAY." WHERE album_id = '".$id_album."'");
//$cache = new cache();
//if ( $cache->caching ) {
$album 			= $mlivedb->query(" * ","album"," album_id = '".$id_album."' ORDER BY album_id DESC ");
$title 			= GetSingerName($album[0][3]);
$album_url 		= url_link($album[0][1].'-'.$title,$id_album,'nghe-album');
$user 			= get_user($album[0][7]);
$user_url 		= url_link($user,$album[0][7],'user');
$get_singer = GetSinger($album[0][3]);
$singer_big_img		= GetSingerIMGBIG($album[0][3]);
$singer_img		= GetSingerIMG($album[0][3]);
$arr_singer = $mlivedb->query(" singer_id ","singer"," singer_id = '".GetSingerID($album[0][3])."'");
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
			if(count($arr_singer)>0) {
	 $singer_seach = "m_singer LIKE '%,".$singer_list.",%'";
	 $singer_seach_album = "album_singer LIKE '%,".$singer_list.",%'";
	}

//Kiem tra cac bai hat nao co lyricKAR thi se hien thi link den phan choi bang AS3 Karaoke Player
$songalbum = "";
$album1 = $mlivedb->query(" album_song ","album"," album_id = '".$id_album."'");
$dem = 0;
$dem1 = 0;
$s = explode(',',$album1[0][0]);
//lấy thông tin các bài hát trong album cho vào biến $album_list_song
$album_list_song = "[";
foreach($s as $x=>$val) {
	$arr[$x] = $mlivedb->query(" m_id, m_url, m_title, m_singer, m_is_local, m_lrc, m_img ","data"," m_id = '".$s[$x]."'");
	$song_name = str_replace("'", " ", un_htmlchars($arr[$x][0][2]));
	$lyricSRT = un_htmlchars($arr[$x][5]);
	$song_img = un_htmlchars($arr[$x][6]);
	$song_img = check_img($song_img);
	$song_direct_link = grab(get_url($arr[$x][0][4],$arr[$x][0][1]));
	$singer_name = GetSingerName($arr[$x][0][3]);
	$singer_big_img		= GetSingerIMGBIG($arr[$x][0][3]);
	$singer_img		= GetSingerIMG($arr[$x][0][3]);
	$song_url 	= url_link($arr[$x][0][2].'-'.$singer_name,$s[$x],'nghe-bai-hat');
	if(strlen($lyricKAR)>5){
		$songalbum .= $song_name.",".$lyricKAR.";";
	}
	$album_list_song .= '{"sources":[{"file":"'.$song_direct_link.'","label":"320K"},'.
	'{"file":"'.$song_direct_link.'","label":"192K","default":"true"}],'.
	'"image":"'.$singer_big_img.'",'.
	'"mediaid":"'.$s[$x].'",'.
	'"media_title":"'.$song_name.'",'.
	'"media_desc":"'.$singer_name.'",'.
	'"active_from":0,'.
	'"link":"'.$song_url.'",'.
	'"tracks":[{"file":"'.$lyricSRT.'",'.
	'"label":"L\u1eddi Karaoke",'.
	'"kind":"captions",'.
	'"default":"true"}]'.
	'},';

	
	//$songalbum .= $song_name.",".$lyricCaption.";";
	//$dem = $dem + 1;
	//$songalbum .= $song_name.",".$lyricKAR.";";
}
$songalbum = rtrim($songalbum,";");
//bo ky tu ,
$album_list_song =  rtrim($album_list_song,",");
$album_list_song .= ']';

?>
<!DOCTYPE html>
<html lang="vi">
<head>
<base href="<?php echo SITE_LINK ?>" />
<title>Album <?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> | <?=NAMEWEB?></title>
<meta name="title" content="Album <?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> | <?=NAMEWEB?>" />
<meta name="description" content="Nghe & tải album <?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> , album <?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> , <?php  echo $title; ?><?php } ?> , do <?php  echo $user; ?>  tạo tại <?=NAMEWEB?> - web nhạc chất lượng cao, tốc độ load nhanh & bài hát" />
<meta name="keywords" content="Nghe,tải album,<?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> , <?php  echo $title; ?><?php } ?>,album <?php  echo $album[0][1];?><?php  if($album[0][11] == '0') {?> , <?php  echo $title; ?><?php } ?> , <?php  echo $user; ?>  ,<?=NAMEWEB?>,web nhạc chất lượng cao, tốc độ load nhanh,bài hát" />
<link rel="canonical" href="<?php  echo $album_url;?>"/>
<link rel="image_src" href="<?php  echo SITE_LINK.$album[0][4];?>" />
<link rel="video_src" href="<?php  echo SITE_LINK.'embed/album/auto/'.en_id($id_media); ?>" />
<link href="<?php echo SITE_LINK;?>theme/css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo SITE_LINK;?>theme/js/ichphienpro.js"></script>

<script>
jQuery.fn.scrollTo = function(elem, speed) { 
    $(this).animate({
        scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
    }, speed == undefined ? 1000 : speed); 
    return this; 
};
</script>
<style>
    html, body {width:100%;height: 100%;background:#fff;}
	    #playlistItems {
        max-height: 300px!important;
overflow:auto;
    }

</style>

</head>
<body>

 <script type="text/javascript" src="<?=SITE_LINK?>player/nhacvn/jwplayer.js"></script>
<div id="audio"></div>
<script type="text/javascript">
    jwplayer("audio").setup({
            playlist: <?=$album_list_song;?>, 
        stretching: 'fill',
        height: 200,
		width:'100%',
		autostart: false,
                primary: 'html5',
                plugins: {
                    '<?=SITE_LINK?>player/nhacvn/vast.js': {
                      client:'vast',
                      schedule:{
                        overlay: { offset: 0, tag: '/player/banner', type:'nonlinear' }
                      }
                    }
                }
            });

        function playThis(index) {
                jwplayer().playlistItem(index);
				
        };

                var device_type = 'desktop';
                var listPlayed =Array();
                var logPlayAlbumFlag = true;
                var logSongFlag = true;
                var embed= false;
                var isFirst = true;
                var index_st = '0';
                var firstPause = false;

                jwplayer().setMute(false);
                jwplayer().onPlaylistItem(function(evt) {
                    logSongFlag = true;
                })
                jwplayer().onPause(function(){
                    var currentItem = jwplayer().getPlaylistItem();
                    itemId = currentItem.mediaid;
                });
                jwplayer().onBeforePlay(function() {
                    var currentItem = jwplayer().getPlaylistItem();
                    itemId = currentItem.mediaid;
        			var now = '1474367420';
        		
        			if(currentItem.active_from > now){
        				var curentIndex = jwplayer().getPlaylistIndex();
                        var totalItem = jwplayer().getPlaylist().length;
                        if(curentIndex<totalItem){
                            nextItem = curentIndex+1;
                        }else{
                            nextItem = 0;
                        }
                        jwplayer().playlistItem(nextItem);
    				}
        			
					$("[id-index]").removeClass('playing fn-current');
					$("[id-index='"+itemId+"']").addClass('playing fn-current');	
					$('#playlistItems').scrollTo("[id-index='"+itemId+"']", 2000);
	
                });
                jwplayer().onBeforeComplete(function() {
                    if(isFirst){
                        isFirst = false;
                    }
                });
                jwplayer().onTime(function(event) {
                    if(firstPause==false && embed==true){
                        firstPause = true;
                        jwplayer().pause();
                    }
                    var currentItem = jwplayer().getPlaylistItem();
                    var now = '1474367420';
                    if(currentItem.active_from > now){
                        jwplayer().pause();
                    }
                    

			    })
			    var isFallback = '';
			    jwplayer().onError(function(event){
			        isFirst = true;
                    console.log('onError:'+event.message);
                    var currentItem = jwplayer().getPlaylistItem();
                    var fileCurrent = currentItem.file;
                    var isFcurr = '20062435'+fileCurrent;

                    if(isFallback!=isFcurr){
                        var ref = document.referrer;
                    }
                    var playlist = jwplayer().getPlaylist();
                    var playlistIndex = jwplayer().getPlaylistIndex();

                });
					jwplayer().playlistItem(<?php if($st!=''){ echo $st = $st-2;} else{ echo '0';}?>);

				
</script>

            <div  id="playlistItems" class="box-scroll fn-scrollbar ">
    <ul class="playlist">
        
     <?php 
            
            $s = explode(',',$album[0][10]);
            foreach($s as $x=>$val) {
            $arr[$x] 			= $mlivedb->query(" m_id, m_title, m_singer,m_type ","data"," m_id = '".$s[$x]."'");
			$singer_name 	=	GetSingerName($arr[$x][0][2]);
			$get_singer = GetSinger($arr[$x][0][2]);
            $download 			= 'down.php?id='.$arr[$x][0][0].'&key='.md5($arr[$x][0][0].'tgt_music');
            $song_url 			= url_link($arr[$x][0][1].'-'.$singer_name,$arr[$x][0][0],'nghe-bai-hat');
			$album_url_list 	= url_link($album[0][1].'-'.$title,$id_album,'nghe-album-st',$x+1);
			$number = $x+1;
            ?>
           	 <li id="song<?=$number;?>" id-index="<?=$arr[$x][0][0]?>" class="fn-playlist-item fn-song <?php  if($number == $st) echo 'playing fn-current';?>" data-order="<?=$number;?>" data-type="song" data-id="<?=en_id($arr[$x][0][0])?>" data-code="LnxmTZmaQaxZhBHyZvxTFmkH" data-active="show-tool">
            <div class="item-song ">
                <span onClick="javascript: playThis('<?=$x;?>');return false;"><?=$number;?></span>
                <h3><a onClick="javascript: playThis('<?=$x;?>');return false;"  class="fn-name" data-order="<?=$number;?>" href="<?php  echo $album_url_list;?>" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>"><?php  echo un_htmlchars($arr[$x][0][1]); ?></a></h3>
                <div class="inline ellipsis"><div class="wrap-h4"> <h4><?=$get_singer?></h4>
                  </div>
                </div>
            </div>
            <div class="tool-song">
                <div class="i25 i-small ringtone none" rel="<?=en_id($arr[$x][0][0])?>" class="provider" sname="<?php  echo $arr[$x][0][1];?>" aname=""><a href="#"></a></div>
                <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?=en_id($arr[$x][0][0])?>" href="<?php  echo $download;?>"></a></div>
	<!-- Playlist ADD -->
                        <div class="i25 i-small addlist" id="playlist_<?php  echo $arr[$x][0][0]; ?>"><a title="Thêm vào" class="fn-addto" data-item="#song<?=en_id($arr[$x][0][0])?>" style="cursor:pointer;" onclick="_load_box(<?php  echo $arr[$x][0][0]; ?>);"></a></div>
                        <div class="_PL_BOX" id="_load_box_<?php  echo $arr[$x][0][0]; ?>" style="display:none;"><span class="_PL_LOAD" id="_load_box_pl_<?php  echo $arr[$x][0][0]; ?>"></span></div>
                        <!-- End playlist ADD -->
                <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#song<?=en_id($arr[$x][0][0])?>" href="<?php  echo $song_url;?>"></a></div>
                <div class="i25 i-small direct"><a class="track-log" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?> - " href="<?php  echo $song_url;?>"></a></div>
            </div>
        </li>
            <?php  } ?>
    </ul>
</div>

</body>
</html>
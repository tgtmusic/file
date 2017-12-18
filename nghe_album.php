<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_album = $myFilter->process($_GET['id']);
if(isset($_GET["st"])) $st 	 	 = $myFilter->process((int)$_GET['st']);
$id_album 						 = del_id($id_album);

mysqli_query($link_music,"UPDATE table_album SET album_viewed = album_viewed+".NUMPLAY.", album_viewed_month = album_viewed_month+".NUMPLAY.", album_viewed_week = album_viewed_week+".NUMPLAY.", album_viewed_day = album_viewed_day+".NUMPLAY." WHERE album_id = '".$id_album."'");
//$cache = new cache();
//if ( $cache->caching ) {
$album 			= $mlivedb->query(" * ","album"," album_id = '".$id_album."' ORDER BY album_id DESC ");

$title 			= GetSingerName($album[0][3]);
$album_img		= check_img($album[0][4]);
$album_name		= un_htmlchars($album[0][1]);
$album_url 		= url_link($album[0][1].'-'.$title,$id_album,'nghe-album');
$user 			= get_user($album[0][7]);
$user_img 		= check_img(get_data("user","avatar","userid ='".$album[0][7]."'"));
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
	$arr[$x] = $mlivedb->query(" m_id, m_url, m_title, m_singer, m_is_local, m_lrc, m_img,m_lyric ","data"," m_id = '".$s[$x]."'");

	$song_name = str_replace("'", " ", un_htmlchars($arr[$x][0][2]));
	$lyricSRT = str_replace("'", " ", un_htmlchars($arr[$x][0][5]));
	$song_img = str_replace("'", " ", un_htmlchars($arr[$x][0][6]));
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
        <title><?php  echo $album_name;?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> | <?=NAMEWEB?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="<?php  echo $album_url;?>">
<meta name="title" content="<?php  echo $album_name;?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> | <?=NAMEWEB?>" />
<meta name="description" content="<?php  if($album[0][11] == '0') { ?>Phát hành: <?=date('Y',$album[0][12]);}?> | Nghe nhạc miễn phí - Tải nhạc chất lượng cao" />
<meta name="keywords" content="album, <?php  echo str_replace ('-', ' ',replace($album_name)).',';?> <?php if($album[0][11] == '0') {  echo str_replace ('-', ' ',replace($title)).',';}?> <?php  echo str_replace ('-', ' ',replace($album_name));?> tai album, mua album, album 320 lossless" />
<meta property="og:title" content="<?php  echo $album_name;?><?php  if($album[0][11] == '0') {?> - <?php  echo $title; ?><?php } ?> | <?=NAMEWEB?>" />
<meta property="og:description" content="<?php  if($album[0][11] == '0') { ?>Phát hành: <?=date('Y',$album[0][12]);}?> | Nghe nhạc miễn phí - Tải nhạc chất lượng cao" />        
<meta property="og:image" content="<?php  echo $album_img;?>" />
<meta property="og:image:url" content="<?php  echo $album_img;?>" />
<meta property="og:url" content="<?php  echo $album_url;?>" />
<link rel="image_src" href="<?php  echo $album_img;?>" />
<?php  include("./theme/ip_java.php");?>

</head>
<body>
	<?php  include("./theme/ip_header.php");?>
	
	 <div class="wrapper-page"> <div class="wrap-body group page-play-album container">  
<?=BANNER('top_banner_play_album','1006');?>
    <div class="wrap-content">   

        <div class="player">            
            <div class="info-top-play group">
    <img width="120" class="pthumb" src="<?=$album_img;?>" alt="<?=un_htmlchars($album_name);?>" itemprop="image" />
    <div class="info-content" itemscope itemtype="http://schema.org/MusicAlbum">
        <div class="ctn-inside">
            <h1 class="txt-primary"><?=un_htmlchars($album_name);?></h1>
             <?php  if($album[0][11] == '0') {?>
			<div class="info-artist ellipsis">
  <h2 itemprop="byArtist" class="txt-primary"><?=$get_singer;?></h2>
			 </div>            <?php }?>
            <meta content="<?=un_htmlchars($album_name);?>" itemprop="name" />
            <meta content="<?=$album_url;?>" itemprop="url" />            
        </div>
        <div class="info-song-top">   
		 <?php  if($album[0][11] == '0') {?>
            <div>  
                <span>Phát hành: </span>
                <div class="inline" itemprop="copyrightYear"><?=date('Y',$album[0][12]);?></div>										
            </div>
            <div>
                <span>Thể loại: </span>                 
                <h4 itemprop="genre"><?=GetTheLoai($album[0][8],'album');?></h4> 
				
                      </div> 
					 <?php }?>
		 <?php if($user) { if($album[0][11] == '1') {?>
			<div>
                <span>Người tạo: </span>
                <i class="fn_zme_info" style="display: none;" data_uname="" data-dname="#createdBy"></i>
                <div class="inline"><span id="createdBy"><?=$user;?></span></div>
</div><?php } }?>
        </div>

    <div class="clear"></div> 
</div>
 <?php  if($album[0][5]) {?>
<p  id="commentsalbum-show" class="ellipsis-4 descript-album">
       <?=un_htmlchars(rut_ngan($album[0][5],36));?>
        <a href="#" class="readmore fn-showhide " onclick="showCommalbum('commentsalbum');return false;">Xem toàn bộ</a>
    </p>
    
    
    <p class='hide-contentalbum descript-album' id='commentsalbum'  >
          <?=un_htmlchars($album[0][5]);?>
        <a href="#" onclick="showCommalbum('commentsalbum');return false;"  class="readmore fn-showhide" >Rút gọn</a>
    </p>
 <?php }?>

  <div class="box-social-2 otr" style="width: 100%">

        <div style="float:left">
        	<?php
// Like
$like_album = $mlivedb->query(" user_album_like ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_album_like LIKE '%,".$id_album.",%' ");
if($like_album != '') { ?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_LikeAlbum_<?=$id_album;?>" >
                <a class="fn-btn" href="javascript:;" onclick="UNLIKE(<?=$id_album;?>,2,<?=$album[0][17];?>);"><span class="zicon"></span>Bỏ Thích</a>
                 <span><i></i><b></b><s class="fn-count"><?=$album[0][17];?></s></span>
            </div>
<?php } else {?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_LikeAlbum_<?=$id_album;?>" >
                <a class="fn-btn" href="javascript:;" onclick="ADDLIKE(<?=$id_album;?>,2,<?=$album[0][17];?>);"><span class="zicon"></span>Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$album[0][17];?></s></span>
            </div>
<?php } ?>
			            <div class="g-plusone" data-size="medium"></div>
            <div class="box-fb-like">
                <div class="fb-like" data-size="small" data-mobile-iframe="true" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false" data-href="<?=$album_url?>"></div>
            </div>
        </div>
        <div class="social-mini">            
            <a class="icm ic-gg fn-sharelink fn-track-sharelink" href="https://plus.google.com/share?url=<?=$album_url?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                    return false;"></a>
            <a class="icm ic-fb fn-sharelink fn-track-sharelink" data-layout="button" data-mobile-iframe="true" data-href="<?=$album_url?>" data-type="facebook" data-net="fb" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?=$album_url?>&amp;src=sdkpreparse"></a>

        </div>
    </div>            
    </div><!-- END .info-content -->


<div class="_player">

 <script type="text/javascript" src="./player/nhacvn/jwplayer.js"></script>
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
                    './player/nhacvn/vast.js': {
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
					jwplayer().playlistItem(<?php if($st !='') { echo $d =$st-1;} else { echo '0';}?>);

				
</script>
         </div>
		 <div id="_player">
            
    <div id="zplayerjs-wrapper" class="player " data-xml="http://mp3.zing.vn/json/playlist/get-source/playlist/LHcmtZmxEaCJHZiTLvctDnZH"></div>
    <div id="html5player" data-isalbum="false" data-isoffical="true" style="display:none;" data-xml="http://mp3.zing.vn/json/playlist/get-source/playlist/LHcmtZmxEaCJHZiTLvctDnZH" class="zm-player zm-player-song zm-player-album none" role="application" aria-label="media player">
    </div>
    <div id="lrcContent" class="none"></div>    
    <div class="banner-in-player _bannerAds none" data-zoneid="870285593013603088"><span class="close-banner _bannerHide"></span></div>  
    
    
</div>
            <div  id="playlistItems" class="box-scroll fn-scrollbar ">
    <ul class="playlist">
     <?php 
            $s = explode(',',$album[0][10]);
            foreach($s as $x=>$val) {
            $arr[$x] 			= $mlivedb->query(" m_id, m_title, m_singer,m_type,m_official ","data"," m_id = '".$s[$x]."'");
			$singer_name 	=	GetSingerName($arr[$x][0][2]);
			$get_singer = GetSinger($arr[$x][0][2]);
            $download 			= 'down.php?id='.$arr[$x][0][0].'&key='.md5($arr[$x][0][0].'tgt_music');
            $song_url 			= url_link(un_htmlchars($arr[$x][0][1]).'-'.$singer_name,$arr[$x][0][0],'nghe-bai-hat');
			$album_url_list 	= url_link($album_name.'-'.$title,$id_album,'nghe-album-st',$x+1);
			$number = $x+1;
				if (count($arr[$x])<1) header("Location: ".SITE_LINK."404.html");
            ?>
           	 <li id="song<?=$number;?>" id-index="<?=$arr[$x][0][0]?>" class="fn-playlist-item fn-song <?php  if($number == $st) echo 'playing fn-current';?>" data-order="<?=$number;?>" data-type="song" data-id="<?=en_id($arr[$x][0][0])?>" data-code="LnxmTZmaQaxZhBHyZvxTFmkH" data-active="show-tool">
            <div class="item-song ">
                <span onClick="javascript: playThis('<?=$x;?>');return false;"><?=$number;?></span>
                <h3><a class="fn-name" data-order="<?=$number;?>" href="<?php  echo $album_url_list;?>" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>"><?php  echo un_htmlchars($arr[$x][0][1]); ?></a></h3>
                <div class="inline ellipsis"><div class="wrap-h4"> <h4><?=$get_singer?></h4>
                  </div>
                </div>
            </div>
            <div class="tool-song">
<?php		
		$arr_video = $mlivedb->query(" m_id, m_title, m_singer, m_viewed","data"," m_id = '".$arr[$x][0][4]."'");
		$singer_name 	=	GetSingerName($arr_video[0][2]);
			$video_url 		= url_link(un_htmlchars($arr_video[0][1]).'-'.$singer_name,$arr_video[0][0],'xem-video');
		if ($arr_video){
?>		
            <div class="i25 i-small video "><a class="fn-video_link" title="Xem <?=un_htmlchars($arr_video[0][1]);?> - <?=$singer_name?>" href="<?=$video_url?>"></a></div>
<?php  } ?>
                <div class="i25 i-small ringtone none" rel="<?=en_id($arr[$x][0][0])?>" class="provider" sname="<?php  echo $arr[$x][0][1];?>" aname=""><a href="#"></a></div>
                <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?=en_id($arr[$x][0][0])?>" href="<?php  echo $download;?>"></a></div>
 <!-- Playlist ADD -->
				<div class="i25 i-small addlist" id="playlist_<?=$arr[$x][0][0]?>"><a href="javascript:;" title="Thêm vào" class="fn-addto" data-item="#songnew<?=$arr[$x][0][0]?>" onclick="_load_box(<?=$arr[$x][0][0]?>);"></a></div>
                <!-- End playlist ADD -->
                <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#song<?=en_id($arr[$x][0][0])?>" href="<?php  echo $song_url;?>"></a></div>
                <div class="i25 i-small direct"><a class="track-log" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?> - " href="<?php  echo $song_url;?>"></a></div>
            </div>
        </li>
            <?php  } ?>
    </ul>
</div>
</div>
<div class="section section mt20">
    <div class="media-func group fn-tabgroup">
                     <!-- begin shared -->
            <div class="media-func group fn-tabgroup" >
<?php
// Like
$like_album = $mlivedb->query(" user_like_album ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_like_album LIKE '%,".$id_album.",%' ");
if($like_album != '') { ?>
<!-- user -->
<div id="Load_Album_<?=$id_album;?>"><a href="javascript:;" onclick="UNFAV(<?=$id_album;?>,2);" class="button-style-1 pull-left fn-add _trackLink added" ><i class="zicon icon-add"></i><span>Đã thêm</span></a></div>
<?php } else {?>
<!-- user -->
<div id="Load_Album_<?=$id_album;?>"> <a href="javascript:;" onclick="ADDFAV(<?=$id_album;?>,2);" class="button-style-1 pull-left fn-add _trackLink" > <i class="zicon icon-add"> </i> <span>Thêm vào</span> </a></div>
<?php } ?>
           <a href="javascript:;" id="btnShareNowPlaying"  class="_Share button-style-1 pull-left " ><i class="zicon icon-share"></i><span>Chia sẻ</span></a>
		
 	<p class="count-view" data-group=".fn-tab-panel" data-panel=".fn-tab-panel-stats">
            <b class="ico">lượt nghe</b>&nbsp;<span class="fn-total-play" data-id="<?=en_id($id_album);?>" data-type="song"><?=number_format($album[0][6]);?></span> <i class="icon-down"></i>
            <span class="ztip">Được tổng hợp dựa trên số liệu lượt nghe của người dùng trên cả desktop, mobile và smart TV</span>
        </p>
            </div>
            <div class="clr"></div>
			  <div id="divShowShare" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-share po-r none">
        <div class="tab-menu group">
            <ul>
                <li class="str-active"><a href="#">Chia sẻ</a></li>
            </ul>
        </div>
        <div class="share-container share-container-otr context">
            <div class="share-nwsocial">
                <div class="func-share">
                    <i class="icon-za zshare-zalo" data-net="za" href="javascript:void(0)" style="background: url('http://static.mp3.zdn.vn/skins/zmp3-v4.2/images/icon_zalo.png'); background-size: 33px; background-repeat: no-repeat;"></i>                                        
                    <i class="icon-fb fn-sharelink" data-net="fb" href="<?php  echo $album_url; ?>"></i>                    
                </div><!-- END .func-share -->
            </div><!-- END .share-nwsocial -->

            <div class="context mb20">
                <input type="text" class="frm-textbox pull-left txt-long txt-long-100" name="video-width" value="<?php  echo $album_url; ?>">						
            </div><!-- END .outside-textarea -->
        </div><!-- END .service-container -->

       		  <div class="fn-sub-panel fn-sub-embed embed-container" id="divShowShare" >		
            <div class="context outside-textarea">
                <div class="title-outside-textarea">
                    <label class="ltitle">Mã nhúng</label>
                    <div class="box-checkbox">
                        <input type="radio" id="radioAuto" key="<?=en_id($id_album);?>" rel="album" name="type_embed" checked class="icheckbox_minimal-purple">
                        <label>Tự động play</label>
                    </div>
                    <div class="box-checkbox">
                        <input type="radio" id="radioNormal" key="<?=en_id($id_album);?>" rel="album" name="type_embed" class="icheckbox_minimal-purple">
                        <label>Mã kiểu cũ</label>
                    </div>
					     
                    <div class="clearfix"></div>
                </div>

                <textarea id="urlEmbedBlog" readonly="readonly" name="" cols="30" rows="10"><iframe scrolling="no" width="640" height="180" src="<?=SITE_LINK?>embed/album/<?=en_id($id_album);?>" frameborder="0" allowfullscreen="true"></iframe></textarea>
                <input type="hidden" name="embedUrl" id="embedUrl" value="<?=SITE_LINK?>embed/album/<?=en_id($id_album);?>">
            </div><!-- END .outside-textarea -->
            <div class="clearfix"></div>
            <div class="con-select">
                <label class="ltitle">Kích thước</label>
                <select name="video-size" id="embedSize" class="frm-select">
                    <option value="640x180" selected="selected">640x180</option>
                    <option value="853x240">853x240</option>				
                    <option value="640x180">Tùy chỉnh</option>
                </select>
                <div class="option-select none">				
                    <input id="embedWidth" type="text" value="640" maxlength="4" class="fn-change frm-textbox fn-input-number" name="video-height">
                    <span>x</span>				
                    <input id="embedHeight" type="text" value="180" maxlength="4" class="fn-change frm-textbox fn-input-number" name="video-width">		
                </div><!-- END .option-select -->


            </div>
             <div class="clearfix"></div>
        </div><!-- END .service-container -->

        <span class="close fn-closetab" data-tab="#tabShare"></span>
    </div>

            <!-- end shared -->	
		</div>	</div>
		
	
<!--- Singer Info --->


 <?php 
$arrSinger = $mlivedb->query("  singer_id, singer_name, singer_img, singer_big_img, singer_info,singer_viewed,singer_like  ","singer"," singer_id = '".GetSingerID($album[0][3])."'");
if($arrSinger) {
$singer_name = un_htmlchars($arrSinger[0][1]);
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_info = $arrSinger[0][4];
$singer_img = check_img($arrSinger[0][2]);
 ?>
 <div class="section">
    <div class="box-artist">
        <a href="<?=$singer_url;?>" title="<?=$singer_name;?>" class="_trackLink" tracking="_frombox=play_artistprofile">
            <img width="110" height="110" class="thumb-art" src="<?=$singer_img;?>" alt="<?=$singer_name;?>">
        </a>
        <div class="artist-info">
            <h2><a title="<?=$singer_name;?>" href="<?=$singer_url;?>" class="_trackLink" tracking="_frombox=play_artistprofile"><?=$singer_name;?></a></h2>
<?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$arrSinger[0][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="UNLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][6];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][6] ;?></s></span>
            </div>
<?php } else {?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="ADDLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][6];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][6] ;?></s></span>
            </div>
<?php } ?>	
        </div>

        <div class="artist-info-text" id="comments-show">
            <p>
 <?php  echo un_htmlchars(rut_ngan($singer_info,40));?>   <a href="#" onclick="showComm('comments');return false;" target="_blank" rel="nofollow" class="readmore pull-right fn-showhide __web-inspector-hide-shortcut__">Xem toàn bộ</a>
 </p>
        </div>
  <div class='hide-content' id='comments' class="none">
            <div class="artist-info-text">
                <p>
               <?php  echo un_htmlchars($singer_info);?>               
                </p>
                <a href="#"  onclick="showComm('comments');return false;" rel="nofollow" class="readmore pull-right fn-showhide" >Rút gọn</a>
            </div>
        </div>
</div>
</div>
 <?php  } if($user) { if($album[0][11] == '1') {?>
  <div id="block-artist" data-action="load-info-artist" data-id="IW6DD697" data-offical="false" data-target="#block-artist">
<div class="section">
    <div class="box-artist">
        <a href="<?=$user_url?>" title="<?=$user?>" class="_trackLink" tracking="_frombox=play_artistprofile">
            <img width="110" height="110" class="thumb-art" src="<?=$user_img?>" alt="<?=$user?>">
        </a>
        <div class="artist-info">
            <h2><a title="<?=$user?>" href="<?=$user_url?>" class="_trackLink" tracking="_frombox=play_artistprofile"><?=$user?></a></h2>            
            <div class="subcribe subcribed">
                <a class="fn-ufollow " data-id="" data-type="user" ><span></span>Quan tâm</a>
                <span><i></i><b></b><s class="fn-ufollowed" data-id="" data-type="user">0</s></span>
            </div>
        </div>
        <div class="artist-info-text">			
            <ul class="full-text">
                <li class="text-vip">Thành viên</li>
            </ul>
        </div>
    </div>
</div>
</div>
<?php } } ?>

    <!-- Album cung ca si -->
<?php 
if($album[0][11] == '0') {
$arrz = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_cat ","album"," album_type = 0 AND $singer_seach_album ORDER BY RAND() LIMIT 4");
if($arrz) {
	$s_album = 'nghe-si/'.replace($arrSinger[0][1]).'/album';
?>
	<div class="section po-r" id="albumOfArtist" data-total="8" data-id="<?=en_id($id_album);?>">  
 <h2 class="title-section"><a href="<?=$s_album?>" title="Xem album <?=un_htmlchars($arrSinger[0][1]);?>">Album <?=un_htmlchars($arrSinger[0][1]);?>  <i class="icon-arrow"></i></a></h2>
    <div class="row fn-list slick-initialized slick-slider">
            <div aria-live="polite" class="slick-list draggable" tabindex="0">
<div class="slick-track" style="opacity: 1; width: 1336px; transform: translate3d(0px, 0px, 0px);">
<?php 
 for($z=0;$z<count($arrz);$z++) {
	 $name_album = un_htmlchars($arrz[$z][1]);
	$img_album = check_img($arrz[$z][3]);
	$singer_name	=	GetSingerName($arrz[$z][2]);
	$get_singer = GetSinger($arrz[$z][2]);
     $album_url = url_link($arrz[$z][1].'-'.$singer_name,$arrz[$z][0],'nghe-album');
	 if($z==3)	$class[$z]	=	"fjx";
?>
	<div class="album-item col-3 fn-item slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 167px;">
 <a href="<?php echo $album_url?>" title="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink" tracking="_frombox=play_artistvideo_">
<img width="200" height="150" src="<?php echo $img_album;?>" alt="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="img-responsive fn-thumb" style="height: 150px;">
        <span class="icon-circle-play otr"></span>
    </a>
    <h3 class="title-item ellipsis">
        <a href="<?php echo $album_url?>" title="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="txt-primary fn-name fn-link _trackLink" tracking="_frombox=play_artistvideo_">
            <?php echo $name_album;?> 
        </a>
    </h3>
    <div class="inblock ellipsis fn-artist_list">
        <h4 class="title-sd-item txt-info fn-artist"><?php echo $get_singer;?></h4>
    </div>
    <span class=" fn-badge"></span>
</div>
<?php  } ?>
</div></div>
    </div>
    <div class="nav-caro fn-nav ">
        <span class="next fn-next" style="display: block;"></span>
        <span class="prev fn-prev disabled" style="display: block;"></span>
    </div>
</div>
<?php  } }?>
<!--- Video cung ca si -->
<?php 
if($album[0][11] == '0') {
$arrz = $mlivedb->query(" m_id, m_title, m_singer, m_img, m_cat ","data"," $singer_seach AND m_type = 2 ORDER BY RAND()
 LIMIT 4");
if($arrz) {
	$s_video = 'nghe-si/'.replace($arrSinger[0][1]).'/video';
?>
     <div class="section po-r" id="videoOfArtist" data-total="26" data-id="IWZ997CU">
    <h2 class="title-section"><a href="<?=$s_video?>" title="Xem video <?=un_htmlchars($arrSinger[0][1]);?> ">Video <?=un_htmlchars($arrSinger[0][1]);?>  <i class="icon-arrow"></i></a></h2>
    <div class="row">
        <div class="fn-list slick-initialized slick-slider">
                <div aria-live="polite" class="slick-list draggable" tabindex="0">
				<div class="slick-track" style="opacity: 1; width: 1336px; transform: translate3d(0px, 0px, 0px);">
<?php 
for($z=0;$z<count($arrz);$z++) {
	$name_video = un_htmlchars($arrz[$z][1]);
	$img_video = check_img($arrz[$z][3]);
	$singer_name	=	GetSingerName($arrz[$z][2]);
	$get_singer = GetSinger($arrz[$z][2]);
    $video_url 		= url_link($arrz[$z][1].'-'.$singer_name,$arrz[$z][0],'xem-video');
	if($z==3)	$class[$z]	=	"fjx";
?>
 <div class="album-item col-3 fn-item slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 167px;">
    <a href="<?php echo $video_url?>" title="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink" tracking="_frombox=play_artistvideo_">
        <img width="151" height="85" src="<?php echo $img_video;?>" alt="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="img-responsive fn-thumb" style="height: 85px;">
        <span class="icon-circle-play otr"></span>
    </a>
    <h3 class="title-item ellipsis">
        <a href="<?php echo $video_url?>" title="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="txt-primary fn-name fn-link _trackLink" tracking="_frombox=play_artistvideo_">
         <?php echo $name_video;?>
        </a>
    </h3>
    <div class="inblock ellipsis fn-artist_list">
        
        <h4 class="title-sd-item txt-info fn-artist"><?php echo $get_singer;?></h4>
        
    </div>
    <span class=" fn-badge"></span>
</div>
<?php  } ?>
	</div></div>
            </div>
    </div><!-- END .row -->
    
    <div class="nav-caro fn-nav ">
        <span class="next fn-next" style="display: block;"></span>
        <span class="prev fn-prev disabled" style="display: block;"></span>
    </div>
    
</div>
<?php  } }?>
<!--- Binh luan --->
<div class="section box-comment">
<h3 class="title-section"> <div style="float:right">
				<a class="active fn-chart" href="javascript:;" id="btnCommentFB">FB</a>
				| <a class="fn-chart" href="javascript:;" id="btnCommentSite">WEBSITE</a>
				</div></h3>	
			</div>
<div id="divFBBox" class="tab-pane-cm ">
<div class="fb-comments" data-href="<?=$album_url?>" data-width="650" data-numposts="5"></div>
</div>
<div id="divWEBBox" class="tab-pane-cm none">
<?=cam_nhan($id_album,1,2);?>
</div>
<!-- end binh luan -->
</div>
        <div class="wrap-sidebar">
		<!--- Quang cao --->
        <?=BANNER('play_right','345');?>
<?php if($album[0][11] == '0') { 
	$query = mysqli_query($link_music,"SELECT * FROM table_album WHERE album_cat = '".$album[0][8]."' AND album_type = 0 AND album_id>$id_album ORDER BY album_id LIMIT 10");
	//get rows query
	$rowCount = mysqli_num_rows($query);
	if($rowCount) {
?>
<div id="block-playlist-suggest" data-action="load-playlist-suggest" data-id="ZWZCWFDC" data-target="#block-playlist-suggest">
<div class="widget widget-countdown">
    <h3 class="title-section sz-title-sm">CÓ THỂ BẠN MUỐN NGHE</h3>
    <div class="widget-content no-padding no-border" id="playlistRec">
        <ul class="fn-list">
<?php 
		//number of rows
	if($rowCount > 0){ 
	while($row = mysqli_fetch_assoc($query)){ 
    $tutorial_id = 	$row['album_id'];
	$album_name =	un_htmlchars($row['album_name']);
	$album_img_hot = check_img($row['album_img']);
	$singer_name	=	GetSingerName($row['album_singer']);
	$get_singer = GetSinger($row['album_singer']);
	$singer_img = GetSingerIMG($row['album_singer']);
	$album_url_hot 		= 	url_link($album_name.'-'.$singer_name,$row['album_id'],'nghe-album');
?>
<li class="fn-item" id="playlistrec<?php echo en_id($tutorial_id);?>" data-id="<?php echo en_id($tutorial_id);?>">
    <a href="<?php echo $album_url_hot; ?>" title="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>" class="thumb fn-link _trackLink track-log" tracking="_frombox=playplaylist_suggestplaylist_">
        <img class="fn-thumb" width="90" src="<?php echo $album_img_hot;?>" alt="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>">
        <span class="icon-circle-play class otr"></span>
    </a>                    
    <h3 class="song-name"><a href="<?php echo $album_url_hot; ?>" title="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>" class="txt-primary fn-link fn-name _trackLink track-log" tracking="_frombox=playplaylist_suggestplaylist_"><?=un_htmlchars($album_name);?></a></h3>
    <div class="inblock ellipsis fn-artist_list">
        <h4 class="singer-name txt-info fn-artist"><?php echo $get_singer; ?></h4>
    </div>
</li>
<?php  } ?>
<a href="javascript:void(0);" id="<?php echo en_id($tutorial_id);?>" class="load-more fn-rec" data-item="#playlistRec"><span>Xem thêm</span></a>
</ul>
<?php } ?>
            </div>
			
        </div>
        <div class="clr"></div>
    </div>
<?php  } }?>
</div></div>
<?php  include("./theme/ip_album_chonloc2.php");?>
</div>
    <?php  include("./theme/ip_footer.php");?> 
</body>
</html>
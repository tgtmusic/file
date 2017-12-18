<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_media = $myFilter->process($_GET['id']);
$id_media	=	del_id($id_media);
mysqli_query($link_music,"UPDATE table_data SET m_viewed = m_viewed+".NUMPLAY.", m_viewed_month = m_viewed_month+".NUMPLAY.", m_viewed_week = m_viewed_week+".NUMPLAY.", m_viewed_day = m_viewed_day+".NUMPLAY." WHERE m_id = '".$id_media."'");
//$cache = new cache();
//if ( $cache->caching ) {
$song 		= $mlivedb->query(" m_title, m_singer, m_cat, m_img, m_poster, m_viewed, m_lyric, m_kbs, m_sang_tac, m_url,m_is_local,m_lrc,m_official,m_hq,m_hot,m_like,m_album,m_mempost ","data"," m_id = '".$id_media."' ORDER BY m_id DESC ");

$user 		= 	get_user($song[0][4]);
$user_url 	= url_link('user',$song[0][4],'user');
$st_name 	= un_htmlchars($song[0][8]);
$song_name	= un_htmlchars($song[0][0]);
$title 	=	GetSingerName($song[0][1]);
$song_url 	= url_link($song[0][0].'-'.$title,$id_media,'nghe-bai-hat');
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
$arr_next = $mlivedb->query(" m_id, m_title, m_singer, m_type ","data"," m_cat = '".$song[0][2]."' AND m_type = 1 AND m_id >$id_media ORDER BY m_id LIMIT 10");
	$singer_name_next	=	GetSingerName($arr_next[0][2]);
	$get_singer_next = GetSinger($arr_next[0][2]);
$song_url_next = url_link(un_htmlchars($arr_next[0][1]).'-'.$singer_name_next,$arr_next[0][0],'nghe-bai-hat');

$album_names = un_htmlchars(get_data("album","album_name","album_id = '".$song[0][16]."'"));
$album_singers = get_data("album","album_singer","album_id = '".$song[0][16]."'");
$album_links = url_link($album_name.'-'.GetSingerName($album_singers),$song[0][16],'nghe-album');
	if (count($song)<1) header("Location: ".SITE_LINK."404.html");
	$lyric = str_replace("<br>",".",str_replace("<br />","", $lyric_info));
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="<?php  echo $song_url;?>">
<link rel="canonical" href="<?php  echo $song_url;?>">
<meta name="title" content="<?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?>" />
<meta name="description" content="<?php  if($st_name != '') {?>Sáng tác: <?php echo $st_name;}?><?php  if($st_name&$song[0][16]) {?> | <?php } if($song[0][16] != '') { ?>Album: <?php echo $album_names;}?> <?php  if($st_name&$song[0][16]) {?> | <?php } if($lyric_info != '') { ?><?php echo rut_ngan($lyric,45);}?>" />
<meta name="keywords" content="album, <?php  echo str_replace ('-', ' ',replace($song_name)).',';?> <?php if($song[0][17] == '0') { echo str_replace ('-', ' ',replace($title)).',';}?> <?php  echo str_replace ('-', ' ',replace($song_name));?> tai album, mua album, album 320 lossless" />
<meta property="og:title" content="<?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?>" />                
<meta property="og:description" content="<?php  if($st_name != '') {?>Sáng tác: <?php echo $st_name;}?><?php  if($st_name&$song[0][16]) {?> | <?php } if($song[0][16] != '') { ?>Album: <?php echo $album_names;}?> <?php  if($st_name&$song[0][16]) {?> | <?php } if($lyric_info != '') { ?><?php echo rut_ngan($lyric,45);}?>" />        
<meta property="og:image" content="<?php  echo $singer_big_img;?>" />
<meta property="og:image:url" content="<?php  echo $singer_big_img;?>" />
<meta property="og:url" content="<?php  echo $song_url;?>" />
<link rel="image_src" href="<?php  echo $singer_big_img;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>

<div class="wrapper-page"> <div class="wrap-body container"> 
	
<?=BANNER('top_banner_play_mp3','1006');?>
		<div class="wrap-content">

	
	<div class="info-top-play group">            
    <div class="info-content otr">
        <div>
            <h1 class="txt-primary"><?php  echo un_htmlchars($song[0][0]);?>
                       <?php  if($song[0][17] == '0') {?>
					   <span class="zadash">-</span><div class="inline">
     <h2 class="txt-primary artist-track-log" data-id="<?=en_id($id_media);?>"><?=$get_singer?></h2>
                        </div> 
<?php }?>						
            </h1>                    
        </div>
    </div>
    <div class="box-social-2 otr" style="height: 30px;">
        <div class="box-rate none">
            <div class="rate-snip">
                <div xmlns:v="http://rdf.data-vocabulary.org/#" typeof="v:Review-aggregate">
                    <span property="v:itemreviewed" class="kksr-title">Aggregate Rating Schema</span>
                    <span rel="v:rating">    
                        <span typeof="v:Rating">
                            <span property="v:average">4.2</span>/<span property="v:best">5</span> (85%) <span property="v:votes">840</span> votes    
                        </span>
                    </span>
                </div>
            </div>
        </div>  
        <div style="float:left;">
	<?php
// Like
$like_song = $mlivedb->query(" user_song_like ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_song_like LIKE '%,".$id_media.",%' ");
if($like_song != '') { ?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_Like_<?=$id_media;?>" >
                <a class="fn-btn" href="javascript:;" onclick="UNLIKE(<?=$id_media;?>,1,<?=$song[0][15];?>);"><span class="zicon"></span>Bỏ Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } else {?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_Like_<?=$id_media;?>" >
                <a class="fn-btn" href="javascript:;" onclick="ADDLIKE(<?=$id_media;?>,1,<?=$song[0][15];?>);"><span class="zicon"></span>Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } ?>
            <div class="g-plusone" data-size="medium"></div>
            <div class="box-fb-like">
                <div class="fb-like" data-size="small" data-mobile-iframe="true" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false" data-href="<?=$song_url?>"></div>
            </div>
        </div>
        <div class="social-mini">            
            <a class="icm ic-gg fn-sharelink fn-track-sharelink" href="https://plus.google.com/share?url=<?=$song_url?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                    return false;"></a>
            <a class="icm ic-fb fn-sharelink fn-track-sharelink" data-layout="button" data-mobile-iframe="true" data-href="<?=$song_url?>" data-type="facebook" data-net="fb" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?=$song_url?>&amp;src=sdkpreparse"></a>

        </div>
    </div>
</div>	

<?=BANNER('play_mp3','860');?>
<div  style="width:auto;">

				<script type="text/javascript" src="./player/nhacvn/jwplayer.js"></script>
<div class="player" id="audio"></div>
<script type="text/javascript">

            jwplayer('audio').setup({
            width: '100%',
            height: '219',
            image: '<?=SITE_LINK;?>images/img/no-img-2.jpg',
            stretching: 'fill',
            playlist: [{"sources":[{"file":"<?=$url_i?>","label":"320K"}],"image":"<?=$singer_big_img?>","mediaid":"535696","media_title":"<?=$song[0][0]?>","media_desc":"<?=$title?>","active_from":0,"link":"<?=$song_url?>","tracks":[{"file":"<?=$song[0][11]?>","kind":"captions","label":"L\u1eddi Karaoke","default":true}]}],
            autostart: false,
            mode : 'notembed',
            //primary: primaryCookie
			 primary: "primaryCookie",
				events: {
					onComplete: function(event) {
					<?php if ($arr_next){?>	if (localStorage.getItem("auto_next") == "on")
						{
							top.location = "<?=$song_url_next?>";
					} <?php } ?>
					},
				},
            primary: 'html5',
            plugins: {
                './player/nhacvn/vast.js': {
                  client:'vast',
                  schedule:{
                    overlay: { offset: 0, tag: '/player/banner/type/album', type:'nonlinear' }
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
        			
					$("[id-index] .here").remove();
					$("[id-index='"+itemId+"']").append("<div class='here'></div>");
					$('.wap-list-song-of-singer').scrollTo("[id-index='"+itemId+"']", 2000);
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
					jwplayer().playlistItem(0);
				
</script>
					</div>
<div class="info-song-top otr fl">
   <?php  if($st_name != '') {?><span>Sáng tác: </span>
 <div class="inline" id="composer-container">
                <h2 data-id="<?=en_id($id_media);?>"><?php echo $st_name;?></h2>
            </div>
   <?php } ?>
<?php  if($st_name&$song[0][16]) {?><span class="bull">•</span>
<?php }?>
<?php if($song[0][16] != '') { ?>
<span>Album: </span>
        <div class="inline">
<h2>
<a href="<?=$album_links?>" title="<?=$album_names?>" class="txt-info">
                    <?=$album_names?>
                    </a>
                </h2>
        </div>
<?php } ?>
</div>
<div class="info-song-top otr clear">
        <span>Thể loại: </span><div class="inline"><h2><?php  echo GetTheLoai($song[0][2]);?></h2></div>
    </div>


    <link rel="stylesheet" type="text/css" media="screen, print, projection" href="http://nhac24.esy.es/theme/css/nct.custom.v11.0.1.css"/> 


                <!--begin box menu player-->

            <!-- begin shared -->
			<div class="section section mt20">
            <div class="media-func group fn-tabgroup">
            	<a href="javascript:;" id="btnAddBox" class="button-style-1 pull-left" ><i class="zicon icon-add"></i><span>Thêm vào</span></a>
				 <a href="javascript:;" id="btnDownloadBox" class="button-style-1 pull-left" ><i class="zicon icon-download"></i><span>Tải về</span></a>
                <a href="javascript:;" id="btnReportError"  class="button-style-1 pull-left" ><i class="zicon icon-flag"></i><span>Báo lỗi</span></a>
            	<a href="javascript:;" id="btnShareNowPlaying" class="button-style-1 pull-left " ><i class="zicon icon-share"></i><span>Chia sẻ</span></a>
				
				<p class="count-view" data-group=".fn-tab-panel" data-panel=".fn-tab-panel-stats">
            <b class="ico">lượt nghe</b>&nbsp;<span class="fn-total-play" data-id="<?=en_id($id_media);?>" data-type="song"><?php  echo number_format($song[0][5]);?></span> <i class="icon-down"></i>
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
                    <i class="icon-fb fn-sharelink" data-net="fb" href="<?php  echo $song_url; ?>"></i>                    
                </div><!-- END .func-share -->
            </div><!-- END .share-nwsocial -->

            <div class="context mb20">
                <input type="text" class="frm-textbox pull-left txt-long txt-long-100" name="video-width" value="<?php  echo $song_url; ?>">						
            </div><!-- END .outside-textarea -->
        </div><!-- END .service-container -->

       		  <div class="fn-sub-panel fn-sub-embed embed-container" id="divShowShare" >		
            <div class="context outside-textarea">
                <div class="title-outside-textarea">
                    <label class="ltitle">Mã nhúng</label>
                    <div class="box-checkbox">
                        <input type="radio" id="radioAuto" key="<?=en_id($id_media);?>" rel="song" name="type_embed" checked class="icheckbox_minimal-purple">
                        <label>Tự động play</label>
                    </div>
                    <div class="box-checkbox">
                        <input type="radio" id="radioNormal" key="<?=en_id($id_media);?>" rel="song" name="type_embed" class="icheckbox_minimal-purple">
                        <label>Mã kiểu cũ</label>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <textarea id="urlEmbedBlog" readonly="readonly" name="" cols="30" rows="10"><iframe scrolling="no" width="640" height="180" src="<?=SITE_LINK?>embed/song/<?=en_id($id_media);?>" frameborder="0" allowfullscreen="true"></iframe></textarea>
                <input type="hidden" name="embedUrl" id="embedUrl" value="<?=SITE_LINK?>embed/song/<?=en_id($id_media);?>">
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


         
<div id="divAddBox" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-addto po-r none">
        <div class="add-playlist-region">
            <h4>Thêm vào playlist <span class="close fn-closetab" data-tab="#tabAdd"></span></h4>
            <div class="box-scroll fn-scrollbar mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar" style="overflow: visible;"><div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_outside" tabindex="0" style="max-height: 315px;"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; left: 0px; top: 0px;" dir="ltr">
                <ul class="playlist-region fn-list">
 
                <li class="fn-fav" id="0">
                        <i class="icon-heart"></i>
                        <p class="fn-name">Bài hát yêu thích</p>
                        <!--<span><span class="fn-total">1</span> bài</span>-->
                        <a href="javascript:;" onclick="ADDFAV(<?=$id_media;?>,1);" class="fix-button fn-add" ><span>Thêm</span><b></b></a>
                    </li>
									<li class="fn-item" id="15816594">
                        <i class="icon-playlist"></i>
			<select class="select" id="_lstPls" style="width: 150px; height:40px;">
<?php 
$farr = $mlivedb->query(" album_id, album_name ","album"," album_poster = '".$_SESSION["mlv_user_id"]."' AND album_type = 1 ORDER BY album_name ASC");
for($z=0;$z<count($farr);$z++) {
?>
                    <option value="<?=$farr[$z][0];?>"><?=$farr[$z][1];?></option>
<?php  } ?>
                    </select>
                        <!--<span><span class="fn-total">0</span> bài</span>-->
                        <button id="_addPls" onclick="_lstPlsAdd(<?=$id_media;?>);" class="fix-button fn-add" ><span>Thêm</span><b></b></button>
                    </li>
	
					</ul>
            </div></div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical mCSB_scrollTools_onDrag_expand" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; height: 0px; top: 0px;" oncontextmenu="return false;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
            <div class="form-add-playlist">
   
                    <input name="name" class="txt-style-1" type="text" placeholder="Tạo playlist mới" id="_playlist_name_<?=$id_media;?>" value="">
                    <select name="privacy" id="privacy" disabled="disabled">
                        <option value="0">Công khai</option>
                        <option value="1">Riêng tư</option>
                    </select>
                    <input type="hidden" name="item_id" value="ZW78DU0A">
                    <button onclick="_CREATPLAYLIST(<?=$id_media;?>,1);" type="submit" class="button btn-dark-blue">Tạo playlist</button>
              
            </div>
			<div id="_Add2"></div>
        </div>
    </div>
 
			  <div id="divReportErrorBox" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-report po-r none">
        <h4 class="title-pane"><span>Phản hồi cho bài hát này (Report this song)</span><span class="close fn-closetab" data-tab="#tabReport"></span></h4>
        <div class="frm-rpt group" >
            <p>Vui lòng chọn cụ thể các mục bên dưới để thông báo cho <?=NAMEWEB?> biết vấn dề bạn gặp phải đối với bài hát này. <br>Để thông báo vi phạm bản quyền, vui lòng gửi (To file a copyright infringement notification, please )</p>

            <div align="center" style="margin-bottom: 10px;">Thông báo lỗi bài hát, các vấn đề phát sinh.</div>
            <form method="post">
            <input type="hidden" id="media_id" value="<?php  echo $id_media;?>" />
			<input type="hidden" id="type" value="1"  />
		
            <div align="center">
<select style="height: 40px;" class="select" id="drlReason" name="drlReason">
<option value="0">Vui lòng chọn nguyên nhân</option>
<optgroup label="Vấn đề về kỹ thuật">
<option value="Bài hát không play được">Bài hát không play được</option>
<option value="Bài hát có chất lượng kém">Bài hát có chất lượng kém</option>
<option value="1">Khác</option>
</optgroup>
<optgroup label="Vấn đề về nội dung">
<option value="Bài hát có nội dung khiêu dâm, thô tục">Bài hát có nội dung khiêu dâm, thô tục</option>
<option value="Bài hát có nội dung bạo lực">Bài hát có nội dung bạo lực</option>
<option value="Bài hát có nội dung phản động, kích động thù địch">Bài hát có nội dung phản động, kích động thù địch</option>
<option value="1">Khác</option>
</optgroup>
</select>
 	 <div align="center" id="ERCT" class="none1">
			<br/><textarea name="txtContent" rows="10" cols="30" id="txtContent" class="textarea"></textarea>
			</div>
             </div>
			 <div align="center">
			 <input type="button" value="Gửi đi" class="button btn-dark-blue" onclick="SendError();"/>
			 </div>
            </form>
            <div class="margin-top10 error_yeu_thich none"></div>
			 </div><!-- /.frm-lyrics -->
    </div>
   
    <div >
			 <div id="divDownloadBox" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-service po-r none">    
        <div class="service-container fn-sub-panel">
            <div class="row mb0">
                <div class="col-4">
                    <ul class="dl-service fn-list">
                        <li>
                            <a href="<?=$download;?>" class="button btn-dark-blue small-button ghost-button fn-128 _trackLink" tracking="_frombox=playsong_download_128" target="_ifrTemp"><i class="zicon icon-dl"></i>128 kbps</a>
                            <b><s class="fn-size-128">0</s>MB • mp3 • miễn phí</b>
                        </li>
                        <li>
                            <a href="<?=$download;?>" class="button btn-dark-blue small-button fn-320 fn-viprequire _trackLink" tracking="_frombox=playsong_download_320" target="_ifrTemp"><i class="zicon icon-dl"></i>320 kbps</a>
                            <b><s class="fn-size-320">0</s>MB • mp3 • <a class="fn-viprequire" target="_blank" title="Zing MP3 VIP">VIP</a></b>
                        </li>
                        <li>
                            <a href="<?=$download;?>" class="button btn-dark-blue small-button fn-lossless fn-viprequire _trackLink" tracking="_frombox=playsong_download_lossless" target="_ifrTemp"><i class="zicon icon-dl"></i>Lossless</a>
                            <b><s class="fn-size-lossless">0</s>MB • flac • <a class="fn-viprequire" target="_blank" title="Zing MP3 VIP">VIP</a></b>
                        </li>
                    </ul>
                    <div class="xdownload fn-download-off none"><img width="15" height="15" src="./theme/images/x-round.png" alt="Zing MP3"><p>Bài hát này không tải được vì lý do bản quyền</p></div>
                </div><!-- /.col-4 -->

                <div class="col-border-left col-8 fn-notvip">
                    <div class="content-promote">
                        <img width="33" height="37" src="./theme/images/icon-human.png" alt="Zing MP3">
                        <p>Trải nghiệm <strong>chất lượng âm thanh</strong> tương tự nghe CD gốc với tài khoản <strong class="hightlight"><?=NAMEWEB?></strong>.</p>
                    </div>
                    <div class="content-promote-func align-right">
                        <a href="" target="_blank" class="vip-info"><span>?</span>Tìm hiểu về VIP</a>
                        <a class="button btn-dark-blue small-button fn-viprequire" data-step="2" href="" target="_blank"><i class="icon-crown-small"></i>Nâng cấp VIP</a>
                    </div>
                </div>
            </div>
        </div>
        <span class="close fn-closetab" data-tab="#tabService"></span>
    </div>
	</div>	
			</div>					
            <!-- end shared -->	
			
<!--- Lyric --->
<?php  if($lyric_info) { ?>

    <div class="tab-pane fn-tab-panel-lyrics">
        <div class="lyrics-container po-r" id="lyrics">
            <div class="fn-container">  <div id="lyrics" class="fn-lyrics fn-lyrics" >
                    <div class="fn-wlyrics title">
                        <strong class="ellipsis fn-wlyrics title">
                            <label>Lời bài hát </label>
                            <s class="fn-name"><?=un_htmlchars($song[0][0]);?></s>
                        </strong>
                        <div class="lyrics-tools fn-wlyrics fn-tools">
                            <div class="lyrics-control">
                                <a href="javascript:void(0);" class="icon-arrow-left-1 prev fn-prev disabled" >
                                </a>
                                <span>phiên bản <bdo class="fn-version">1/1</bdo>
                                </span>
                                <a href="javascript:void(0);" class="icon-arrow-right-1 next fn-next " >
                                </a>
                            </div>
                        </div>
                        <span class="donggop ellipsis">Đóng góp: <span class="fn-user">mp3</span>
                        </span>
                    </div>
                    <p id="lyric_load" class="fn-wlyrics fn-content" style="overflow: hidden; height: 300px;"><?=un_htmlchars($lyric_info);?></p>
                </div>    </div>        
            <div class="lyrics-func group fn-wlyrics">
                <div class="iLyric"><a href="javascript:;" onclick="LYRICSHOWHIDE(1);" class="ml0 pull-left fn-expand" >Xem thêm</a></div>
                <p class="pull-right">Đóng góp: <a href="javascript:;" class="fn-new" data-new="lyrics">Lời bài hát</a></p>

            </div>
        </div>
    </div> 


<?php  } ?>

<!--- Singer Info --->


 <?php 
$arrSinger = $mlivedb->query("  singer_id, singer_name, singer_img, singer_big_img, singer_info,singer_viewed,singer_like  ","singer"," singer_id = '".GetSingerID($song[0][1])."'");
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
<?php  } ?>

<!--- Album Cung Ca Si --->
<?php 

$arrz = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_cat ","album"," $singer_seach_album ORDER BY RAND() LIMIT 6");
if($arrz) {
	$s_album = 'nghe-si/'.replace($arrSinger[0][1]).'/album';
?>
	<div class="section po-r" id="albumOfArtist" data-total="8" data-id="IWZ997CU">  
 <h2 class="title-section"><a href="<?=$s_album?>" title="Xem album <?=$arrSinger[0][1]?>">Album <?=$arrSinger[0][1]?>  <i class="icon-arrow"></i></a></h2>
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
<?php  } ?>
 <!--- Video cung ca si --->

<?php 

$arrz = $mlivedb->query(" m_id, m_title, m_singer, m_img, m_cat ","data"," m_type = 2 AND $singer_seach ORDER BY RAND() LIMIT 6");
if($arrz) {
	$s_video = 'nghe-si/'.replace($arrSinger[0][1]).'/video';
?>
    <div class="section po-r" id="videoOfArtist" data-total="26" data-id="IWZ997CU">
    <h2 class="title-section"><a href="<?=$s_video?>" title="Xem video <?=$arrSinger[0][1]?> ">Video <?=$arrSinger[0][1]?>  <i class="icon-arrow"></i></a></h2>
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
<?php  } ?>
<!--- Binh luan --->
<div class="section box-comment">
<h3 class="title-section"> <div style="float:right">
				<a class="active fn-chart" href="javascript:;" id="btnCommentFB">FB</a>
				| <a class="fn-chart" href="javascript:;" id="btnCommentSite">WEBSITE</a>
				</div></h3>	
			</div>
<div id="divFBBox" class="tab-pane-cm ">
<div class="fb-comments" data-href="<?php echo $song_url?>" data-width="650" data-numposts="5"></div>
</div>
<div id="divWEBBox" class="tab-pane-cm none">
<?php echo cam_nhan($id_media,1,1);?>
</div>
<br/>
<!-- end binh luan -->
</div>
<!--- Khung Phai --->
        <div class="wrap-sidebar">
		<!--- Quang cao --->
        <?=BANNER('play_right','345');?>
		<!--- Bài hát cùng ca sĩ --->
<?php
	$query = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_cat = '".$song[0][2]."' AND m_type = 1 AND m_id>$id_media ORDER BY m_id LIMIT 10");
	//get rows query
	$rowCount = mysqli_num_rows($query);
	if($rowCount) {
		?>
		<div id="block-song-suggest" >
<div class="widget widget-countdown">
    <h3 class="title-section sz-title-sm">Gợi ý</h3>
    <div class="widget-content no-padding no-border" id="songRec" >
        <ul class="fn-list">
<?php 
if($rowCount > 0){ 
	while($row = mysqli_fetch_assoc($query)){ 
    $tutorial_id = 	$row['m_id'];
	$song_name =	un_htmlchars($row['m_title']);
	$singer_name	=	GetSingerName($row['m_singer']);
	$get_singer = GetSinger($row['m_singer']);
	$singer_img = GetSingerIMG($row['m_singer']);
	$song_url 		= 	url_link($song_name.'-'.$singer_name,$row['m_id'],'nghe-bai-hat');
	$download		= 'down.php?id='.$arr[$z][0].'&key='.md5($arr[$z][0].'tgt_music');
?>
   <li id="songrec<?php echo en_id($tutorial_id);?>" class="fn-item" >
    <a href="<?php echo $song_url; ?>" title="<?php echo $song_name; ?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink track-log">
        <img width="50" height="50" class="fn-thumb" src="<?php echo $singer_img;?>" alt="Bài hát <?php echo $song_name; ?> - <?php echo $singer_name;?>">
        <span class="icon-circle-play icon-small"></span>
    </a>                    
    <h3 class="song-name ellipsis"><a href="<?php echo $song_url; ?>" title="Bài hát <?php echo $song_name; ?> - <?php echo $singer_name;?>" class="txt-primary fn-link fn-name _trackLink track-log"><?php echo $song_name;?></a></h3>
    <div class="inblock ellipsis fn-artist_list">

            <h4 class="singer-name txt-info fn-artist"><?php echo $get_singer;?></h4>
    </div>
    <div class="tool-song log-vote-recommend">
        <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#songrec<?php echo $tutorial_id; ?>" href="<?php  echo $download;?>"></a></div>
			<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?php echo $tutorial_id; ?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?php echo $tutorial_id; ?>);"></a></div>
                <!-- End playlist ADD -->
        <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" href="<?php echo $song_url; ?>"></a></div>        
    </div>
</li>
<?php  } ?>         
        <a href="javascript:void(0);" class="load-more fn-rec" id="<?php echo en_id($tutorial_id);?>" data-item="#songRec"><span>Xem thêm</span></a>
 </ul>
<?php  } ?>
    </div>
		<div class="autoplay">
        <span class="label">Autoplay</span>
        <span class="atip">i<i>Tự động chuyển sang bài hát được gợi ý khi kết thúc bài hát đang nghe. (Yêu cầu player ở chế độ không lặp)</i></span>
        <span class="btn-sw btn-sw-off fn-autoplay"><a onclick="change_auto_next();"><i class="node"></i><b class="zicon"></b></a></span>
    </div>
</div>
</div><?php  } ?>

    </div>
	
</div>
<?php  include("./theme/ip_album_chonloc2.php");?>
</div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
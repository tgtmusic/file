<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["name"])) $name = $myFilter->process($_GET['name']);

if($name == 'bai-hat-Viet-Nam') $where = "find_in_set(".IDCATVN.",m_cat) AND m_type = 1";
elseif($name == 'bai-hat-Au-My') $where = "find_in_set(".IDCATAM.",m_cat) AND m_type = 1";
elseif($name == 'bai-hat-Chau-A') $where = "find_in_set(".IDCATCA.",m_cat) AND m_type = 1";

elseif($name == 'video-Viet-Nam') $where = "find_in_set(".IDCATVN.",m_cat) AND m_type = 2";
elseif($name == 'video-Au-My') $where = "find_in_set(".IDCATAM.",m_cat) AND m_type = 2";
elseif($name == 'video-Chau-A') $where = "find_in_set(".IDCATCA.",m_cat) AND m_type = 2";

//Kiem tra cac bai hat nao co lyricKAR thi se hien thi link den phan choi bang AS3 Karaoke Player
$songalbum = "";

//lấy thông tin các bài hát trong album cho vào biến $album_list_song
$album_list_song = "[";	
	$arr = $mlivedb->query(" m_id, m_url, m_title, m_singer, m_is_local, m_lrc, m_img,m_lyric ","data"," $where ORDER BY m_viewed_week DESC LIMIT 20");
	for($x=0;$x<count($arr[$x]);$x++) {
	$song_name = un_htmlchars($arr[$x][2]);
	$lyricSRT = un_htmlchars($arr[$x][5]);
	$song_img = un_htmlchars($arr[$x][6]);
	$song_img = check_img($song_img);
	$song_direct_link = grab(get_url($arr[$x][4],$arr[$x][1]));
	$singer_name = GetSingerName($arr[$x][3]);
	$singer_big_img		= GetSingerIMGBIG($arr[$x][3]);
	$singer_img		= GetSingerIMG($arr[$x][3]);
	$song_url 	= url_link($arr[$x][2].'-'.$singer_name,$s[$x],'nghe-bai-hat');
	if(strlen($lyricKAR)>5){
		$songalbum .= $song_name.",".$lyricKAR.";";
	}
	if($name == 'bai-hat-Viet-Nam' || $name == 'bai-hat-Au-My' || $name == 'bai-hat-Chau-A'){
		$img_ = $singer_big_img;
	}
	elseif($name == 'video-Viet-Nam' || $name == 'video-Au-My' || $name == 'video-Chau-A'){
		$img_ = $song_img;
	}


$album_list_song .= '{"id":"44251","file":"'.$song_direct_link.'","image":"'.$img_.'","title":"'.$song_name.'","artist_name":"'.$singer_name.'","mediaid":0,"composer_name":"'.$singer_name.'","label":"480p","default":"true","type":"video/mp4"},';
	
	//$songalbum .= $song_name.",".$lyricCaption.";";
	//$dem = $dem + 1;
	//$songalbum .= $song_name.",".$lyricKAR.";";
}
$songalbum = rtrim($songalbum,";");
//bo ky tu ,
$album_list_song =  rtrim($album_list_song,",");
$album_list_song .= ']';
//echo $album_list_song;
//exit();
?>
<base href="<?=SITE_LINK?>" />

<link rel="stylesheet" type="text/css" href="<?=SITE_LINK?>/player/jwplayer_nhac/nhac-1.0.0.css" />
<script type="text/javascript" src="<?=SITE_LINK?>/player/jwplayer-7.8.7/jwplayer.js"></script>

<div id='myvideo_wrapper'></div>
<script type="text/javascript">
/*<![CDATA[*/
jwplayer.key="YgtWotBOi+JsQi+stgRlQ3SK21W2vbKi/K2V86kVbwU="
			jwplayer('myvideo_wrapper').setup({
				            width: '100%',
				            height: '100%',
				           'playlist': <?=$album_list_song?>,
				            nextupoffset: -5,
				            localization: {
				                nextUp: 'Bài hát kế tiếp',
				                playlist: 'Danh sách bài hát'
				            },				     
				            base: '<?=SITE_LINK?>/player/jwplayer-7.8.7/',
				            androidhls:'true',
				            skin: {
				                name: 'nhac'
				            },
				            plugins: {
				                '<?=SITE_LINK?>/player/jwplayer_nhac/nhac-1.js': {
			                        showVIP: true,
                                    showVIP: 1,
                                    showVIP: 2
				                }
				            },
				            autostart: true,
					expand: '1',
                primary: 'html5',
                mode : 'notembed',
				        });
           
jwplayer().onBeforePlay(function() {
                var currentItem = jwplayer().getPlaylistItem();
                itemId = currentItem.mediaid;

                //var now = Math.floor(Date.now() / 1000);
                var now = '1485795156';
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
                loadVideoInfo(currentItem.id);
                
                $('.name_detail').html(currentItem.title+' - <span class="artist f-weight4">'+currentItem.artist_name+'</span>');
                $('.h2-composer .val').html(currentItem.composer_name);
                $('.playlist-vertical li').removeClass('active');
                $('.playlist-vertical li[for='+itemId+']').addClass('active');
                if(expand){
                    console.log(typeof scrollToX);
                    if(typeof scrollToX=='function') scrollToX(itemId);
                }else{
                    if(typeof scrollToY=='function') scrollToY(itemId);
                }
            });
            function loadVideoInfo(id){
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    data:'action=videoLyric&video_id='+id,
                    url:'/ajax',
                    success:function(result){
                        if(result.status){
                            $('.box_lyric').html(result.lyric);
                            $('.h2-genre').html(result.genre_name);
                            if($('#lyric_box').height() > 198){
                                $('#lyric_box').height('198px');
                                $('#lyric_more').show();
                            }else{
                                $('#lyric_more').hide();
                            }
                        }
                    }
                });
            }
            setInterval(function(){
                var state = jwplayer().getState();
                if(state=='PLAYING'){
                    if(typeof jwplayer().getPlaylistItem() =='object'){
                        var currentItem = jwplayer().getPlaylistItem();
                        var contentId = currentItem.id;
                        ajax_load('/player/logPlayEverytime',{'content_type':'video','content_id':contentId});
                    }
                }
            }, 60000);
        

            function onPlayerExpandCollapse() {
                if(jwplayer('myvideo_wrapper').getFullscreen) {
                    jwplayer('myvideo_wrapper').setFullscreen(false);
                }
                var w_window = $(window).width();
                var h_window = $(window).height();
                if($('#myvideo_wrapper').width() <= 750){
                    //alert($('#myvideo_wrapper').width());
                    $('.wapper > .colum2').css({'margin-top':'200px'});
                    $('.artist_detail > .colum2').css({'margin-top':'868px'});
                    $('.video-info-profile').css({'margin-top':'200px'});
                    //$('.wrr-column1').css({'margin-top':'200px'});
                    $('.video-player-list').css({'height':'540px'});
                    $('.video-player-list').css({'width':'950px','margin':'0 auto'});
                    $('#player-holder').removeClass('watch-normal-mode');
                    $('#player-holder').addClass('watch-large-mode');
                    $('#list-video').addClass('video-list-fullwidth');
                    var w=950;
                    var h=540;
                    onPlayerExpand(w,h);
                    $('#playlist-mv').css({'width':'5000px'});
                    $('.playlist-scroll').addClass('horizontal-only');
                    if(escroll){
                        escroll = $('.playlist-scroll').jScrollPane();
                        api = escroll.data('jsp');
                        $('.jspPane').css({'top':'0'});
                    }
                    expand = true;
                }else{
                    //alert($('#myvideo_wrapper').width());
                    var w=1100;
                    var h=390;
                    var w_player = 750;
                    if(w_window<1170){
                        w=950;
                        w_player = 605;
                    }
                    onPlayerCollapse(w_player,h);
                    $('.colum2').css({'margin-top':''});
                    $('.video-info-profile').css({'margin-top':'10px'});
                    $('.video-player-list').css({'height':h+'px'});
                    $('.video-player-list').css({'width':w+'px'});
                    $('#player-holder').removeClass('watch-large-mode');
                    $('#player-holder').addClass('watch-normal-mode');
                    $('#list-video').removeClass('video-list-fullwidth');
                    $('.playlist-scroll').removeClass('horizontal-only');
                    $('#playlist-mv').css({'width':'inherit'});
                    if(escroll){
                        escroll = $('.playlist-scroll').jScrollPane();
                        api = escroll.data('jsp');
                        $('.jspPane').css({'left':'0'});
                    }
                    expand = false;
                }
            }

            function onPlayerExpand(w,h) {
              jwplayer('myvideo_wrapper').resize(w,h);
            }

            function onPlayerCollapse(w,h) {
              jwplayer('myvideo_wrapper').resize(w,h);
            }


            function playThis(index){
                jwplayer().playlistItem(index);
                $('.playlist-vertical li').removeClass('active');
                $('li[for='+index+']').addClass('active');
            }
        

            var device_type = 'desktop';
            var listPlayed =Array();
            var playVideoFlag = true;
            var logedin = true;
			jwplayer().onBeforePlay(function() {
				playVideoFlag = true;
			});
			jwplayer().onTime(function(event) {
				if(Math.round(event.position) >=5){
                    var currentItem = jwplayer().getPlaylistItem();
					if(playVideoFlag) {
						playVideoFlag = false;
                        var action = 'Play Video';
						if(in_array(listPlayed,'video_'+currentItem.id)){
							var action = 'Replay Video';
						}
						var item = {id:'video_'+currentItem.id};

                        if(!in_array(listPlayed,item.id)){
                            listPlayed.push(item);
                        }
						ga('send', 'event', device_type, action,currentItem.name+'-'+currentItem.artist_name+'-'+currentItem.id);

						ajax_load('/player/logVideo',{'id':currentItem.id});
					}
				}
			});
            

                    var logedin = false;
                    var userStatus = 1;
                    jwplayer().onQualityLevels(function(event){
                        
                        var currQIndex = jwplayer().getCurrentQuality();
                        var currQL = jwplayer().getQualityLevels();
                        var defaultProfile = '480p';
                        if(userStatus==1){
                            defaultProfile = '720p';
                        }else if(userStatus==2){
                            defaultProfile = '1080p';
                        }
                        for(var i=0; i<currQL.length;i++){
                            //console.log(currQL[i].label);
                            if(currQL[i].label==defaultProfile){
                                jwplayer().setCurrentQuality(i);
                            }
                        }
                        /*var bitrate = currQL[currQIndex].label;
                        if(logedin==false && bitrate=='720p'){
                            jwplayer().setCurrentQuality(currQIndex+1);
                        }*/
                    });
                    jwplayer().onQualityChange(function(event){
                        logedin = false;
                        var currEQIndex = jwplayer().getCurrentQuality();
                        var currQL = jwplayer().getQualityLevels();
                        var bitrate = currQL[currEQIndex].label;
                        /*if(bitrate=='720p'){
                            $.ajax({
                                url: '/ajax/isAuthenticate',
                                type: 'post',
                                data: {fa:'720p',url_return:''},
                                async: false,
                                dataType: 'json',
                                success: function(data){
                                    if(data.errorCode==0){
                                        logedin = true;
                                    }
                                }
                            })
                            if(logedin==false){
                                NhacVnCoreJs.popupLoginVegaId();
                                jwplayer().setCurrentQuality(currEQIndex+1);
                            }
                        }*/
                        bitrate = parseInt(bitrate.replace('p',''));
                        var defaultProfile = '';
                        if(userStatus==0 && bitrate>=720){
                            NhacVnCoreJs.popupLoginVegaId();
                            //jwplayer().setCurrentQuality(currEQIndex+1);
                            defaultProfile = '480p';
                        }else if(userStatus==1 && bitrate>=1080){
                            NhacVnCoreJs.requiredPackage();
                            //jwplayer().setCurrentQuality(currEQIndex+1);
                            defaultProfile = '720p';
                        }
                        if(defaultProfile!=''){
                            for(var i=0; i<currQL.length;i++){
                                if(currQL[i].label==defaultProfile){
                                    jwplayer().setCurrentQuality(i);
                                }
                            }
                        }
                    });
                

            var escroll = $('.playlist-scroll').jScrollPane();
            api = escroll.data('jsp');
            function scrollToY(index){
                api.scrollToY(index*72,'slow');
            }

            function scrollToX(index){
                var x = index*300;
                api.scrollToX(x,'slow');
            }
            

/*]]>*/
</script>
</body>
</html>

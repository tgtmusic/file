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
	$arr = $mlivedb->query(" m_id, m_url, m_title, m_singer, m_is_local, m_lrc, m_img,m_lyric ","data"," $where ORDER BY m_viewed_week DESC LIMIT 40");
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
		$img_ .= $singer_big_img;
	}
	elseif($name == 'video-Viet-Nam' || $name == 'video-Au-My' || $name == 'video-Chau-A'){
		$img_ .= $song_img;
	}
	$album_list_song .= '{"sources":[{"file":"'.$song_direct_link.'","label":"320K"},'.
	'{"file":"'.$song_direct_link.'","label":"192K","default":"true"}],'.
	'"image":"'.$img_.'",'.
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
//echo $album_list_song;
//exit();
?>
<base href="<?php echo SITE_LINK ?>" />
<script type="text/javascript" src="<?=SITE_LINK?>player/nhacvn/jwplayer.js"></script>
<div id="audio"></div>
<script type="text/javascript">
    jwplayer("audio").setup({
            playlist: <?=$album_list_song?>, 
        stretching: 'fill',
        height: '100%',
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
					jwplayer().playlistItem(0);

				
</script>
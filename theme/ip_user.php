
        <div class="sidebar no-fixed">
		<?php
$arr = $mlivedb->query(" * ","user"," userid = '".$_SESSION['mlv_user_id']."' ");
?>
            <ul class="data-list" id="navLeft">        
    <li class="profile-row">
        <i class="fn_zme_info" style="display: none;" data_uid="" data-thumb="#navLeft .fn-thumb"></i>
        <img class="fn-thumb" src="<?php echo check_img($arr[0][7]);?>" />
        <a href="./thanh-vien/<?=$arr[0][1];?>/<?=en_id($arr[0][0]);?>.html" class="ellipsis"><?=$arr[0][1];?></a>
        
    </li>
    <li><a class="active"  href="./thanh-vien/<?=$arr[0][1];?>/<?=en_id($arr[0][0]);?>.html" title="Kênh của tôi">Kênh của tôi</a>
        <ul>
            <li><a href="quan-ly/music/upload.html" title="Bài hát">Bài hát <span class="pull-right"></span></a></li>
            <li><a class="" href="quan-ly/music/playlist.html" title="Playlist">Playlist <span class="pull-right"></span></a></li>            
            <li><a class="" href="quan-ly/video/upload.html" title="Video">Video <span class="pull-right"></span></a></li>
        </ul>
    </li>
    <li><a href="#">Yêu Thích</a>
        <ul>
         <li><a href="quan-ly/music/favourite.html" title="Bài hát">Bài hát <span class="pull-right"></span></a></li>
            <li><a class="" href="quan-ly/music/favouritep.html" title="Playlist">Playlist <span class="pull-right"></span></a></li>            
            <li><a class="" href="quan-ly/video/favourite.html" title="Video">Video <span class="pull-right"></span></a></li>
        </ul>
    </li>
    <li><a class="" href="quan-ly/music/upload.html" title="Nhạc upload">Nhạc upload</a></li>
</ul>
        </div><!-- END .sidebar-->
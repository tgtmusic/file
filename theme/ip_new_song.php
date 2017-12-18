
			<div class="section" >
			<div class="row">
	        	 <div id="viet-new-song" class="col-6 col-border-left"> 
			 <h2 class="title-section" id="tab_click_new_song">
			 <a title="Nhạc Việt Mới" href="/chu-de/nhac-viet-moi/IWZ9Z0ED.html">Bài hát mới <i class="icon-arrow"></i></a>
			
			
			<ul class="tab-nav">
			<li><a class="active fn-chart" href="javascript:void(0);" onClick="return BXH('new_vn',10,this); return false;">Việt Nam</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH('new_am',10,this); return false;">Âu Mỹ</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH('new_ca',10,this); return false;">Châu Á</a></li>
			</ul>
			</h2>
			
			 <div class="list-item tool-song-hover style2"> <ul id="load_new_song">
					<?=top_song('new_vn',10);?>
				</ul>
			</div>	
			</div>

			 <div id="viet-new-song" class="col-6 col-border-left"> 
			 <h2 class="title-section">
			 <a title="Nghệ sĩ Việt Nam" href="#">Nghệ sĩ Việt Nam <i class="icon-arrow"></i></a></h2>
			<div class="list-item tool-song-hover style2"><ul>
			        <?php 
                    $hotSinger = $mlivedb->query("  singer_id, singer_name, singer_img  ","singer"," singer_type = 1 ORDER BY singer_name_ascii ASC LIMIT 10");
                    for($i=0;$i<count($hotSinger);$i++) {

                    ?>
 <li id="songnewZW78BUBI" class="fn-song" data-type="song" data-id="ZW78BUBI" data-code="ZGcHTkGsQsiRGxETZFxTbmZn" data-active="show-tool"> 
 <a class="thumb pull-left _trackLink track-log" tracking="_frombox=home_newsong_" href="nghe-si/<?php  echo replace($hotSinger[$i][1]);?>" title="Nghệ Sĩ <?php  echo un_htmlchars($hotSinger[$i][1]);?>"> 
 <img width="50" alt="Nghệ Sĩ <?php  echo un_htmlchars($hotSinger[$i][1]);?>" src="<?php  echo check_img($hotSinger[$i][2]);?>" /> 
 <span class="icon-circle-play icon-small"></span> </a> 
 <h3 class="txt-primary"> <a class="ellipsis list-item-width _trackLink track-log" tracking="_frombox=home_newsong_" href="nghe-si/<?php  echo replace($hotSinger[$i][1]);?>" title="Nghệ Sĩ <?php  echo un_htmlchars($hotSinger[$i][1]);?>"><?php  echo un_htmlchars($hotSinger[$i][1]);?></a> </h3> 

<br/>
 </li>
		
		<?php  } ?>
				</ul></div>
			</div>
			</div>
            </div>


		<!--	<div id="block-playlist-collection" data-action="load-playlist-collection" data-target="#block-playlist-collection">
<div id="albumCollection" class="fn-slide-show" data-slides-to-show="5" data-slides-to-scroll="5" data-infinite="false" data-speed="1000" data-custom-nav="#albumCollection .dot">
    <div class="outer-container out-direction">
        <div class="container">
            <h2 class="title-section"><a href="/the-loai-album.html" title="Playlist chọn lọc" class="_trackLink" tracking="_frombox=playplaylist_playlisthot">Playlist chọn lọc <i class="icon-arrow"></i></a></h2>
            <div class="row mb0 fn-slide slick-initialized slick-slider">
                
                <div aria-live="polite" class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 3168px; transform: translate3d(0px, 0px, 0px);">
	<?php 
                    $hotA = $mlivedb->query("album_id, album_name, album_singer, album_img","album"," album_type = 0 AND album_hot = 0 ORDER BY album_id DESC LIMIT 5");
						for($i=0;$i<count($hotA);$i++) {
						$album_nameA	=	un_htmlchars($hotA[$i][1]);
						$album_singerA	=	get_data("singer","singer_name"," singer_id = '".$hotA[$i][2]."'");
						$album_imgA		=	check_img($hotA[$i][3]);
						$album_urlA		= url_link($album_nameA.'-'.$album_singerA,$hotA[$i][0],'nghe-album');
						?>
				<div class="col-2 col-2p5 slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 198px;">
    <div class="bg-white des-inside">
        <a href="<?=$album_urlA;?>" title="<?=$album_nameA?> - <?=$album_singerA;?>" class="thumb _trackLink" tracking="_frombox=playplaylist_playlisthot">
            <img width="174" height="174" src="<?=$album_imgA;?>" alt="<?=$album_nameA?> - <?=$album_singerA;?>" class="img-responsive">
            <span class="icon-circle-play otr"></span>														
        </a>
        <span class="des-more">
            <h3><a href="<?=$album_urlA;?>" title="<?=$album_nameA?> - <?=$album_singerA;?>" class="_trackLink" tracking="_frombox=playplaylist_playlisthot">
			<script type="text/javascript"> var tempCollecName = "<?=$album_nameA?>"; if (tempCollecName == null) { tempCollecName = ""; } else { if (tempCollecName.length > 40) { tempCollecName = tempCollecName.substring(0, 40); last = tempCollecName.lastIndexOf(" "); tempCollecName = tempCollecName.substring(0, last); tempCollecName = tempCollecName + "..."; } } document.write(tempCollecName); </script></a></h3>							
        </span>
    </div>
</div>
<?php  } ?>

</div></div>
 </div>
            <div class="nav-caro">
                <span class="next fn-next" style="display: block;"></span>
                <span class="prev fn-prev disabled" style="display: block;"></span>
            </div>
        </div>
    </div>
</div>

<div class="clearfix"></div>
</div>-->
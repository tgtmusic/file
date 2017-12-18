<div id="albumCollection" class="fn-slide-show" data-slides-to-show="4" data-slides-to-scroll="4" data-infinite="false" data-speed="1000">
<div class="section"> 
<h2 class="title-section"><a href="./chu-de" title="Playlist Chọn Lọc" class="_trackLink" tracking="_frombox=home_playlisthot">Playlist Chọn Lọc <i class="icon-arrow"></i></a></h2> 
<div class="row mb0 fn-slide slick-initialized slick-slider"> 
 <div aria-live="polite" class="slick-list draggable" tabindex="0">
 <div class="slick-track" style="opacity: 1; width: 2004px; transform: translate3d(0px, 0px, 0px);">
 				<?php 
                    $hotA = $mlivedb->query("album_id, album_name, album_singer, album_img","album"," album_type = 0 AND album_chonloc = 1 ORDER BY album_id DESC LIMIT 5");
						for($i=0;$i<count($hotA);$i++) {
						$album_nameA	=	un_htmlchars($hotA[$i][1]);
						$album_singerA	=	GetSingerName("".$hotA[$i][2]."");
						$album_imgA		=	check_img($hotA[$i][3]);
						$album_urlA		= url_link($album_nameA.'-'.$album_singerA,$hotA[$i][0],'nghe-album');
						?>
 <div class="col-3 col-2p5 slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 167px;"> 
 <div class="bg-white des-inside"> <a href="<?=$album_urlA?>" title="<?=$album_nameA?>" class="thumb _trackLink track-log" tracking="_frombox=home_playlisthot_"> 
 <img src="<?=$album_imgA?>" alt="<?=$album_nameA?>" class="img-responsive" style="opacity: 1;"> 
 <span class="icon-circle-play otr"></span> </a> 
 <span class="des-more des-more-slim"> <h3> <a href="<?=$album_urlA?>" title="<?=$album_nameA?>" class="_trackLink track-log" tracking="_frombox=home_playlisthot_"><?=$album_nameA?> </a> </h3> </span> </div>
 </div>
 <?php  } ?>	
 </div>
 </div> 
 <div class="nav-caro"> 
 <span class="next fn-next" style="display: block;"></span> 
 <span class="prev fn-prev disabled" style="display: block;"></span> 
 </div> </div></div>
 </div>
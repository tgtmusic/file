		<div class="slide fn-slide-show" >	<div id="bigPic">
		 <div class="slide-body non-opacity"> <div class="slide-scroll fn-slide">
		
				<?php 
                    $hotA = $mlivedb->query("album_id, album_name, album_singer, album_img","album"," album_type = 0 AND album_hot = 0 ORDER BY album_id DESC LIMIT 5");
						for($i=0;$i<count($hotA);$i++) {
						$album_nameA	=	un_htmlchars($hotA[$i][1]);
						$album_singerA	=	get_data("singer","singer_name"," singer_id = '".$hotA[$i][2]."'");
						$album_imgA		=	check_img($hotA[$i][3]);
						$album_urlA		= url_link($album_nameA.'-'.$album_singerA,$hotA[$i][0],'nghe-album');
						?>
				<a 
href="<?=$album_urlA;?>" target="_self" title="Album <?=$album_nameA?> - <?=$album_singerA;?>" >
				<img width="100%" height="274" src="<?=$album_imgA;?>" alt="Album <?=$album_nameA?> - <?=$album_singerA;?>" ></a>

				<?php  } ?>
			</div></div></div>
			<div 
class="slide-thumb">
			<ul id="thumbs">
				<?php 
                    $hotA = $mlivedb->query("album_id, album_name, album_singer, album_img","album"," album_type = 0 AND album_hot = 0 ORDER BY album_id DESC LIMIT 5");
						for($i=0;$i<count($hotA);$i++) {
						$album_nameA	=	un_htmlchars($hotA[$i][1]);
						$album_singerA	=	get_data("singer","singer_name"," singer_id = '".$hotA[$i][2]."'");
						$album_imgA		=	check_img($hotA[$i][3]);
						$album_urlA		= url_link($album_nameA.'-'.$album_singerA,$hotA[$i][0],'nghe-album');
						?>	
			<li class="dot active" rel="<?=$i+1?>"><img width="124" height="50" 
src="<?=$album_imgA;?>" alt="Album <?=$album_nameA?> - <?=$album_singerA;?>" /></li>

<?php  } ?>	
			</ul>
		</div>	</div>
<div class="clearfix"></div>


	<script type="text/javascript">
	var currentImage;
    var currentIndex = -1;
    var interval;
    function showImage(index){
        if(index < $('#bigPic img').length){
        	var indexImage = $('#bigPic img')[index]
            if(currentImage){   
            	if(currentImage != indexImage ){
                    $(currentImage).css('z-index',2);
                    clearTimeout(myTimer);
                    $(currentImage).fadeOut(250, function() {
					    myTimer = setTimeout("showNext()", 3000);
					    $(this).css({'display':'none','z-index':1})
					});
                }
            }
            $(indexImage).css({'display':'block', 'opacity':1});
            currentImage = indexImage;
            currentIndex = index;
            $('#thumbs li').removeClass('active');
            $($('#thumbs li')[index]).addClass('active');
        }
    }
    
    function showNext(){
        var len = $('#bigPic img').length;
        var next = currentIndex < (len-1) ? currentIndex + 1 : 0;
        showImage(next);
    }
    
    var myTimer;
    
    $(document).ready(function() {
	    myTimer = setTimeout("showNext()", 3000);
		showNext(); //loads first image
        $('#thumbs li').bind('click',function(e){
        	var count = $(this).attr('rel');
        	showImage(parseInt(count)-1);
        });
	});
    
	
	</script>	

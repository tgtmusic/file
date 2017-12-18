			<div id="block-artist-hot" data-action="load-artist-hot" data-target="#block-artist-hot"><div class="section box-artist2">
    <h2 class="title-section"><a href="/the-loai-nghe-si" rel="nofolow">Nghệ sĩ Hot <i class="icon-arrow"></i></a></h2>
    <ul class="list-artist-hot clearfix">
          <?php 
                    $hotSinger = $mlivedb->query("  singer_id, singer_name, singer_img  ","singer"," singer_hot = 1 ORDER BY RAND() LIMIT 9");
                    for($i=0;$i<count($hotSinger);$i++) {
					$singer_name = un_htmlchars($hotSinger[$i][1]);
					$singer_url = 'nghe-si/'.replace($singer_name);
 if($i==0)	$class[$i]	=	"class=\"first-item\"";
                    ?>
        <li <?php  echo $class[$i];?>>
            <div class="large">
                <a href="<?=$singer_url;?>" title="Nghệ Sĩ <?php  echo $singer_name;?>" class="thumb _trackLink" tracking="_frombox=home_hotartist_">
                    <img alt="Nghệ Sĩ <?php  echo $singer_name;?>" src="<?php  echo check_img($hotSinger[$i][2]);?>">
                </a>
                <h4>
                    <a href="<?=$singer_url;?>" title="Nghệ Sĩ <?php  echo $singer_name;?>" class="txt-artist">
                        <?php  echo $singer_name;?>
                    </a>
                </h4>
            </div>
        </li>
			<?php  } ?>
    </ul>
</div></div>

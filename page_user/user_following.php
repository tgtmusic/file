
<h2 class="title-section ellipsis"><?php  echo $user_name;?> quan tâm</h2>
<div class="nav-background group">							
                <div class="nav-title">
                    <ul class="nav-ul-title group">									
                        <li><a class="<?php  if($act=='following') echo 'active';?>" href="./u/<?=$user_name?>/following">Nghệ sĩ (<?php  if($fav_following == ',') { echo '0';}
						else { echo SoBaiHat(substr(substr($fav_following,1),0,-1)); }?>)</a></li>
                    </ul>
                </div>	
            </div>
<?php  if($fav_following == ',') {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
                <div class="clearfix"></div>
				<?php 
$list =  substr($fav_following,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$link_s = 'u/'.$user_name.'/following';
if($page > 0 && $page!= "")
	$start=($page-1) * 30;
else{
	$page = 1;
	$start=0;
}
	$sql_tt = "SELECT singer_id  FROM table_singer WHERE singer_id IN ($list) ORDER BY singer_id DESC ";

	$phantrang = linkPage($sql_tt,30,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = 30 * ($page -1 );
	$arr_singer = $mlivedb->query(" singer_id, singer_name, singer_img, singer_type, singer_cat,singer_viewed ","singer"," singer_id IN ($list) ORDER BY singer_id DESC LIMIT ".$rStar .", 30");
		$tong_so_bai_hat=mysqli_query($link_music,"$sql_tt") or die(mysqli_error());
	$bai_hat = mysqli_num_rows($tong_so_bai_hat);
			?>   
<div class="section mt0">  
<?php  
echo '<div>';
for($i=0;$i<count($arr_singer);$i++) {
	$singer_name 	=	un_htmlchars($arr_singer[$i][1]);
	$singer_img = check_img($arr_singer[$i][2]);
	$singer_url = 'nghe-si/'.replace($singer_name);
		if($i == 0 || $i == 5 || $i == 10 || $i == 15 || $i == 20 || $i == 25 || $i == 30 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
	}
?><?php  echo $class1[$i]; ?>
<div class="pone-of-five">
                        <div class="item">
                            <i class="fn_zme_info" style="display: none;" data-thumbsize="120"></i>
                            <a href="<?=$singer_url?>" title="<?=$singer_name?>" class="thumb">								
                                <img width="240" src="<?=$singer_img?>" alt="<?=$singer_name?>" />
                            </a>
                            <div class="description text-center">
                                <h3 class="title-item fw7 ellipsis"><a href="<?=$singer_url?>" title="<?=$singer_name?>" class="txt-primary"><?=$singer_name?></a></h3>								
                                <span class="txt-info"><s class="fn-followed" data-id="<?=en_id($arr_singer[$i][0])?>"><?=$arr_singer[$i][5]?></s> quan tâm</span>								
                            </div><!-- END .description -->							
                        </div><!-- END .item -->
                    </div>
<?php } echo '</div>'; ?>
            </div>
<?php  echo $phantrang; ?>
 <?php } ?>
 </div>
 
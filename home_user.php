<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/functions_user.php");
$myFilter = new InputFilter();
if(isset($_GET["act"])) $act=$myFilter->process($_GET["act"]);
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);
$id	=	del_id($id);
if($act == "dang-ky") $name_seo = "Đăng ký thành viên";
if($act == "p") $name_seo = "Thông tin cá nhân";
if($act == "doi-thong-tin") $name_seo = "Đổi thông tin cá nhân";
if($act == "doi-mat-khau") $name_seo = "Đổi mật khẩu";
if($act == "quen-mat-khau") $name_seo = "Quên mật khẩu ?";
if ($act=='') header("Location: ".SITE_LINK."404.html");
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $name_seo;?> | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="<?php  echo $name_seo;?> | <?php  echo NAMEWEB;?>" />
<meta name="description" content="<?php  echo $name_seo;?> | <?php  echo NAMEWEB;?>" />
<meta name="keywords" content="<?php  echo $name_seo;?> | <?php  echo NAMEWEB;?>" />
<meta property="og:title" content="<?php  echo $name_seo;?> | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="<?php  echo $name_seo;?> | <?php  echo NAMEWEB;?>" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php  echo SITE_LINK.$act.".html";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>

</head>
<body>
	<?php  include("./theme/ip_header.php");?>
 <div class="wrapper-page"> <div class="wrap-body group  page-artist-genre container">
    <div class="wrap-2-col">
		<?php
	if($_SESSION["mlv_user_id"]) {?>
	<?php  include("./user/user_right.php");?>
	<?php }else { 
		 ?>
 <!-- .sidebar -->
        <div class="sidebar fn-sidebar-fixed">
<?php  include("./theme/box/cat_video.php");?>
        </div>
        <!-- END .sidebar -->
		<?php }?>
        <!-- END .sidebar -->
		
					<?php 
                    $link = '/home_user.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default					:include("./user/dang_ky.php");break;
                        case "dang-ky"			:include("./user/dang_ky.php");break;
						case "quen-mat-khau"	:include("./user/reset_pass.php");break;
						case "doi-thong-tin"	:include("./user/user_edit.php");break;
						case "doi-mat-khau"		:include("./user/user_pass.php");break;
						case "p"				:include("./user/user_info.php");break;
                    }
                    ?>
        </div>
    </div>
	 </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php  
//}
//$cache->close();
?>
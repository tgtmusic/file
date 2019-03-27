<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Thông báo lỗi | <?=WEB_NAME;?></title>
<meta name="title" content="Thông báo lỗi | <?=WEB_NAME;?>" />
<meta name="description" content="Thông báo lỗi | <?=WEB_NAME;?>" />
<meta name="keywords" content="<?=web_key;?>" />
<meta name="ROBOTS" content="index, follow" />
<?php include("./theme/ip_java.php");?>
</head>
<body>
	<?php include("./theme/ip_header.php");?>
<div class="wrapper-page"> <div class="wrap-body page-404 container">
    <img src="<?=SITE_LINK;?>theme/images/logo200.png" alt="Zing mp3" />
    <div class="box-404">
        <p class="title-404">Không tìm thấy trang mà bạn yêu cầu</p>
        <p class="text-guide">Hãy sử dụng chức năng tìm kiếm phía trên. Hoặc <a href="<?=SITE_LINK;?>">nhấn vào đây</a> để về lại trang chủ</p>
    </div>
</div>
<div class="clearfix"></div> </div>
    <?php include("./theme/ip_footer.php");?>
</body>
</html>
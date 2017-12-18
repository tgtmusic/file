<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
include("../includes/securesession.class.php");
$myFilter = new InputFilter();
$ss = new SecureSession();
$ss->check_browser = true;
$ss->check_ip_blocks = 2;
$ss->secure_word = 'SALT_';
$ss->regenerate_id = true;
$ss->Open();
		  
if(isset($_GET["act"]) && $_GET["act"] == "login"){
	$username = $myFilter->process($_POST["user"]);
	$password =$myFilter->process($_POST["pass"]);
	$pass2 =$myFilter->process($_POST["pass2"]);

	$arr = $mlivedb->query(" userid, username, password, salt, user_level ","user"," username = '".$username."'");
	$pass_new = md5(md5($password) . $arr[0][3]);
	if (count($arr)<1) { 
		mss("Tên đăng nhập không tồn tại !","index.php");
		exit();
	}
	elseif ($pass_new != $arr[0][2]) {
		mss("Mật khẩu cấp 1 không đúng !","index.php");
		exit();
	}
	elseif ($pass2 != PASS2ADMIN) {
		mss("Mật khẩu cấp 2 không đúng !","index.php");
		exit();
	}

	elseif ($arr[0][4] == 3) {
			$_SESSION["username"] = $username;
			$_SESSION["admin_id"] = $arr[0][0];
			$_SESSION["rights"] = $arr[0][2];
			mss("Chào mừng ".$_SESSION["username"]." đến với Trang Quản Trị ".NAMEWEB." !","index.php");
			exit();
	}
	elseif ($arr[0][4] == 2) {
			$_SESSION["username"] = $username;
			$_SESSION["admin_id"] = $arr[0][0];
			$_SESSION["rights"] = $arr[0][2];
			mss("Chào mừng ".$_SESSION["username"]." đến với Trang Quản Trị ".NAMEWEB." !","index.php");
			exit();
	}	
	else {
		mss("Bạn không có quyền vào trang này !","index.php");
		exit();
	}
}
?>
<!DOCTYPE html>
<html>
  <head>

    <meta charset="UTF-8">
    <title>ĐĂNG NHẬP QUẢN TRỊ WEBSITE | <?php echo NAMEWEB?> </title>
	<?php  include("java.php");?>

  </head>
   <body class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="login.php?act=login"><b>QUẢN TRỊ WEBSITE </b><br/><?php echo NAMEWEB?></a>
      </div><!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Đăng nhập để vào quản trị website </p>

        <form name="signin" action="login.php?act=login" method="post">
          <div class="form-group has-feedback">
            <input type="user" name="user" class="form-control" placeholder="Tài Khoản" />
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" name="pass" class="form-control" placeholder="Password" />
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
		  <div class="form-group has-feedback">
            <input type="password" name="pass2" class="form-control" placeholder="Password 2" />
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
		 
          <div class="row">
            <div class="col-xs-8">
              <div class="checkbox icheck">
                <label>
                  <input type="checkbox"> Ghi nhớ
                </label>
              </div>
            </div><!-- /.col -->
            <div class="col-xs-4">
              <button type="submit" name="login" class="btn btn-primary btn-block btn-flat">Đăng Nhập</button>
            </div><!-- /.col -->
          </div>
        </form>

        <!--<div class="social-auth-links text-center">
          <p>- OR -</p>
          <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Đăng nhập bằng Facebook</a>
          <a href="#" class="btn btn-block btn-social btn-google-plus btn-flat"><i class="fa fa-google-plus"></i> Đăng nhập bằng Google+</a>
        </div><!-- /.social-auth-links -->

        <a href="<?php echo SITE_LINK;?>thanh-vien/quen-mat-khau.html">Quên Mật Khẩu</a><br>
        <a href="<?php echo SITE_LINK;?>thanh-vien/dang-ky.html" class="text-center">Đăng ký</a>

      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- iCheck -->
    <script src="plugins/iCheck/icheck.min.js" type="text/javascript"></script>
    <script>
      $(function () {
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });
      });
    </script>
  </body>
</html>

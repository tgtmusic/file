<?php 
	$arr = $mlivedb->query(" userid, username, email, salt, user_level, avatar, info, time ","user"," username = '".$username."'");
	$user_url = url_link($_SESSION["mlv_user_name"],$act,'users');
?>
  
<body class="skin-blue sidebar-mini">

    <div class="wrapper">
<header class="main-header">
        <!-- Logo -->
        <a href="<?php echo SITE_LINK;?>" target="_blank" rel="nofollow" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>M</b>LV</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b><?php echo NAMEWEB?></b> <?php echo VER;?></span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
		  
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
  <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="<?php  echo check_img($arr[0][5]);?>" class="user-image" alt="<?=$arr[0][1];?>" />
                  <span class="hidden-xs"><?=$arr[0][1];?></span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-header">
                    <img src="<?php  echo check_img($arr[0][5]);?>" class="img-circle" alt="<?=$arr[0][1];?>" />
                    <p>
                      <?php  echo rut_ngan($arr[0][6],10);?>
                      <small><?php  echo date('d-m-Y',$arr[0][7]);?></small>
                    </p>
                  </li>
                  <li class="user-footer">
                    <div class="pull-left">
                      <a href="<?php echo $user_url;?>" class="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div class="pull-right">
                      <a href="<?php echo DOMAIN_ADMIN;?>logout.php" class="btn btn-default btn-flat">Đăng Xuất</a>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- Control Sidebar Toggle Button -->
			  <li>
                <a href="<?php echo SITE_LINK;?>" target="_blank" rel="nofollow" ><i class="fa fa-home"></i> Trang Chủ</a>
              </li>
			  <li>
                <a href="<?php echo DOMAIN_ADMIN;?>logout.php" ><i class="fa fa-sign-out"></i></a>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
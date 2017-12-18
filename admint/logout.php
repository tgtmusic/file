<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/securesession.class.php");
$ss = new SecureSession();
$ss->check_browser = true;
$ss->check_ip_blocks = 2;
$ss->secure_word = 'SALT_';
$ss->regenerate_id = true;
session_destroy();
?>
<script>
alert("Bạn đã thoát khỏi hệ thống");
parent.location='login.php';
</script>
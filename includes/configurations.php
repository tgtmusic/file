<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start('ob_gzhandler');
else ob_start();
@session_start();
header("Content-Type: text/html; charset=UTF-8");
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
if (!ini_get('register_globals')) {
	$superglobals = array($_SERVER, $_ENV, $_FILES, $_COOKIE, $_POST, $_GET);
	if (isset($_SESSION)) {
		array_unshift($superglobals, $_SESSION);
	}
	foreach ($superglobals as $superglobal) {
		extract($superglobal, EXTR_SKIP);
	}
	ini_set('register_globals', true);
}
// cau hinh ket noi den csdl
define('SERVER_HOST',			'localhost');
define('DATABASE_NAME',			'data_mlive');
define('DATABASE_USER',			'root');
define('DATABASE_PASS',			'123456');
define('DATABASE_FX',			'table_');
if (!$_SERVER['HTTP_USER_AGENT'] || !$_SERVER['REMOTE_ADDR']) exit();
include("mysql.php");
$mlivedb = new mysql;
// cau hinh website
define('PATH', 			$_SERVER["DOCUMENT_ROOT"] .'/cache/'); // Thư mục cache
define('FOLDER_ALBUM', 	$_SERVER["DOCUMENT_ROOT"] .'/upload/album/' . date("Ym")); // UPLOAD ALBUM
define('LINK_ALBUM', 	'upload/album/' . date("Ym"));
define('FOLDER_SINGER',	$_SERVER["DOCUMENT_ROOT"] .'/upload/singer/' . date("Ym")); // UPLOAD CA SI
define('LINK_SINGER', 	'upload/singer/' . date("Ym"));
define('FOLDER_VIDEO',	$_SERVER["DOCUMENT_ROOT"] .'/upload/video/' . date("Ym")); // UPLOAD VIDEO
define('LINK_VIDEO', 	'upload/video/' . date("Ym"));
define("ADV_FOLDER_ABSOLUTE",		$_SERVER["DOCUMENT_ROOT"] . '/upload/adv');	// UPLOAD BANNER
define("ADV_FOLDER",				'upload/adv');
define('FOLDER_NEWS',	$_SERVER["DOCUMENT_ROOT"] .'/upload/news/' . date("Ym")); // UPLOAD NEWS
define('LINK_NEWS', 	'upload/news/' . date("Ym"));
define('FOLDER_TOPIC',	$_SERVER["DOCUMENT_ROOT"] .'/upload/topic/' . date("Ym")); // UPLOAD CHU DE
define('LINK_TOPIC', 	'upload/topic/' . date("Ym"));
define('NOW',			time() + 6*3600);
define('IP',			$_SERVER['REMOTE_ADDR']);
define('VER',			'1.0');
define('NAMEWEB',		'M Live Channel');

define('SITE_LINK',		getConfig('domain'));
define('WEB_NAME',		getConfig('web_name'));
define('WEB_KEY',		getConfig('web_key'));
define('WEB_DES',		getConfig('web_des'));
define('HOME_PER_PAGE', 20);
define('LIMITSONG', 	500);
define('IDCATVN', 		getConfig('cat_vn'));
define('IDCATAM', 		getConfig('cat_am'));
define('IDCATCA', 		getConfig('cat_ca'));
define('PASS2ADMIN',	getConfig('passii'));
define('SERVER',		getConfig('upload'));
define('NUMPLAY',		getConfig('play'));
define('APPFB_ID',		'765396036943117'); //ID APP FB
define('GG_VR_API',		''); //Xác minh quyền sở hữu trang web của bạn
define('DOMAIN_ADMIN',	'http://domain.com/admint/');
require("box.php");
?>
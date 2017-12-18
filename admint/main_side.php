<?php 
define('MLive-Channel',true);
$menu_arr = array(
	'dashboard'	=>	array(
		'Dashboard',
		array(
			'dashboard'	=>	array('Dashboard','act=dashboard'),
		),
		'fa fa-dashboard',
		'fa fa-angle-left pull-right',

	),
	'media'	=>	array(
		'Multi Media',
		array(
			'add'	=>	array('Thêm Mới Media','act=media&mode=add'),
			'multi-add-song'	=>	array('Thêm Nhiều Media','act=media&mode=multi-add-song'),
			'multi-singer-nct'	=>	array('SINGER NCT','act=singer&mode=multi-singer-nct'),
			'multi-singer-nhacvn'	=>	array('SINGER NHAC.VN','act=singer&mode=multi-singer-nhacvn'),
			'multi-nct-tl-video'	=>	array('Thể Loại VIDEO NCT','act=media&mode=multi-nct-tl-video'),
			'multi-nct-tl-song'	=>	array('Thể Loại SONG NCT','act=media&mode=multi-nct-tl-song'),
			'multi-nct-album'	=>	array('Album NCT','act=media&mode=multi-nct-album'),
			'multi-nct-video-singer'	=>	array('Video Singer NCT','act=media&mode=multi-nct-video-singer'),
			'multi-you'	=>	array('Youtube','act=media&mode=multi-you'),
			'multi-you-playlist'	=>	array('Youtube Playlist','act=media&mode=multi-you-playlist'),
			'multi-news-zing'	=>	array('News Zing','act=news&mode=multi-news-zing'),
		),
		'fa-edit',
		'fa fa-angle-left pull-right',

	),

	'list-media'	=>	array(
		'Quản Lý Media',
		array(
			'songs'	=>	array('Danh sách bài hát','act=list-media&mode=songs'),
			'video'	=>	array('Danh sách Video Clip','act=list-media&mode=video'),
			'songs-broken'	=>	array('Bài Hát Lỗi','act=list-media&mode=songs-broken'),
			'video-broken'	=>	array('Video Lỗi','act=list-media&mode=video-broken'),
			'new-songs'	=>	array('Top Bài Hát Mới','act=list-media&mode=new-songs'),
			'top-hot-songs'	=>	array('Top Bài Hát Hot','act=list-media&mode=top-hot-songs'),
			'top-hot-video'	=>	array('Top MV Hot','act=list-media&mode=top-hot-video'),	
			'hq'	=>	array('Nhạc HQ 320K','act=list-media&mode=hq'),
			'new-songs'	=>	array('Top Bài Hát Mới','act=list-media&mode=new-songs'),
			'member-upload'	=>	array('Member Upload','act=list-media&mode=member-upload'),
		),
		'fa-youtube-play',
		'fa fa-angle-left pull-right',
	),
		'list-album'	=>	array(
		'Quản Lý Album',
		array(
			'list-album'	=>	array('Danh Sách Album','act=list-album&mode=list-album'),
			'list-album-hot'	=>	array('Album Hot','act=list-album&mode=list-album-hot'),
			'list-album-new'	=>	array('Album Mới','act=list-album&mode=list-album-new'),
			'list-album-top-100'	=>	array('Album Top 100','act=list-album&mode=list-album-top-100'),
			'list-album-chon-loc'	=>	array('Album Chọn Lọc','act=list-album&mode=list-album-chon-loc'),
			'list-album-topic'	=>	array('Album Chủ Đề','act=list-album&mode=list-album-topic'),
			'list-album-member'	=>	array('Album Member','act=list-album&mode=list-album-member'),
		),
		'fa-list',
		'fa fa-angle-left pull-right',
	),
		'list-bxh'	=>	array(
		'Bảng Xếp Hạng',
		array(
			'add'	=>	array('Thêm BXH Mới','act=bxh&mode=add'),
			'songs'	=>	array('BXH Bài Hát','act=list-bxh&mode=songs'),
			'video'	=>	array('BXH Video','act=list-bxh&mode=video'),
			'album'	=>	array('BXH Album','act=list-bxh&mode=album'),
			'social'	=>	array('BXH Social','act=list-bxh&mode=social'),
		),
		'fa-users',
		'fa fa-angle-left pull-right',
	),
		'list-singer'	=>	array(
		'Ca Sĩ',
		array(
			'add'	=>	array('Thêm Ca Sĩ Mới','act=singer&mode=add'),
			'singer'	=>	array('Danh sách Ca Sĩ','act=list-singer&mode=singer'),
			'singer-hot'	=>	array('Top HOT','act=list-singer&mode=singer-hot'),
		),
		'fa-user-secret',
		'fa fa-angle-left pull-right',
	),
		'list-news'	=>	array(
		'Tin Tức',
		array(
			'add'	=>	array('Đăng bài mới','act=news&mode=add'),
			'list-news'	=>	array('Danh sách Tin Tức','act=list-news&mode=list-news'),
		),
		'fa-newspaper-o',
		'fa fa-angle-left pull-right',
	),
		'list-cat'	=>	array(
		'Thể Loại',
		array(
			'add'	=>	array('Thêm TL Mới','act=cat&mode=add'),
			'list'	=>	array('Danh sách Thể Loại','act=list-cat&mode=list'),
		),
		'fa-server',
		'fa fa-angle-left pull-right',
	),
		'list-topic'	=>	array(
		'Chủ Đề',
		array(
			'add'	=>	array('Thêm Chủ Đề Mới','act=topic&mode=add'),
			'list-topic'	=>	array('Danh sách Chủ Đề','act=list-topic&mode=list-topic'),
			'list-topic-stt'	=>	array('STT Chủ Đề','act=list-topic-stt&mode=list-topic-stt'),
		),
		'fa-server',
		'fa fa-angle-left pull-right',
	),
		'list-cat-news'	=>	array(
		'Thể Loại Tin Tức',
		array(
			'add'	=>	array('Thêm TL Mới','act=cat-news&mode=add'),
			'list-cat'	=>	array('Danh sách Thể Loại','act=list-cat-news&mode=list-cat'),
		),
		'fa-tags',
		'fa fa-angle-left pull-right',
	),
	'ads'	=>	array(
		'Quảng Cáo',
		array(
			'add'	=>	array('Thêm Mới','act=ads&mode=add'),
			'list-ads'	=>	array('Danh sách Quảng Cáo','act=list-ads&mode=list-ads'),
		),
		'fa-money',
		'fa fa-angle-left pull-right',
	),
		'list-user'	=>	array(
		'Member',
		array(
			'add'	=>	array('Thêm Thành Viên','act=user&mode=add'),
			'list-user'	=>	array('Danh sách Member','act=list-user&mode=list-user'),
		),
		'fa-users',
		'fa fa-angle-left pull-right',
	),
		'cau-hinh'	=>	array(
		'Phần Dành Cho Admin',
		array(
			'cau-hinh'	=>	array('Cấu Hình Website','act=cau-hinh'),
			'slider'	=>	array('Slider Home','act=slider'),
			'list-comment'	=>	array('Bình Luận','act=list-comment'),
			'server'	=>	array('Server Upload','act=server'),
		),
		'fa-folder',
		'fa fa-angle-left pull-right',
	),
);
?>


<?php 
	$arr = $mlivedb->query(" userid, username, email, salt, user_level, avatar, info, time ","user"," username = '".$username."'");
?>
 <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="<?php  echo check_img($arr[0][5]);?>" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
              <p><?php echo $arr[0][1];?></p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <!-- search form -->
         <!-- <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search..." />
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>-->
          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">Điều Hướng Trang</li>
			<?php 
foreach ($menu_arr as $key => $arr) {
?>
<li class="<?php  if($act == $key) echo 'active';?> treeview"><a href="#" ><i class="fa <?=$arr[2]?>"></i> <span><?=$arr[0]?></span> <i class="<?=$arr[3]?>"></i></a>
			<ul class="treeview-menu">
<?php	foreach ($arr[1] as $m_key => $m_val) {
?><li class="<?php  if($mode ==$m_key) echo 'active';?>"><a href="index.php?<?=$m_val[1]?>" ><i class="fa fa-circle-o"></i><span><?=$m_val[0]?></span></a></li>
	<?php } echo '</ul></li>';?>

<?php }?> 


           
            <li class="header">LABELS</li>
            <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
            <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
            <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
          </ul>
        </section>
        <!-- /.sidebar -->
      </aside>
	  
	        <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Bảng Điều Khiển
            <small>Quản Trị Website</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="<?php echo DOMAIN_ADMIN;?>"><i class="fa fa-home"></i> Trang Chủ</a></li>
            <li class="active"><a href="<?php echo DOMAIN_ADMIN;?>xoa_cache.php" target="_blank" rel="nofollow"><i class="fa fa-refresh"></i> Cập Nhập Cache</a></li>
          </ol>
        </section>
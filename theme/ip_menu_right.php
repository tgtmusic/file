 <div class="quick-nav">
 <div class="quick-nav-bar">
 <?php
	if($_SESSION["mlv_user_id"]) {
	echo ' <ul class="quick-nav-above">
 <li><a href="#" title="Thông tin cá nhân"><span class="zicon icon-user-1"></span></a></li>
 <li><a href="#" title="Nhạc của tôi"><span class="zicon icon-playlist-2"></span></a></li>
 <li><a href="#" title="Yêu thích"><span class="zicon icon-favorites-1"></span></a></li>
 <li><a href="#" title="Đồng hồ"><span class="zicon icon-time-1"></span></a></li>
 </ul>';
	}
	?>
 <ul class="quick-nav-below">
 <li><a href="#" title="Trở lên trên" onclick="window.scrollTo(0, 0); return false;"><span class="zicon icon-to-top"></span></a></li>
 <li><a href="mailto:mlive.channel@gmail.com" target="_blank" title="Góp ý - Báo lỗi"><span class="zicon icon-feedback"></span></a></li>
 </ul>
 </div>
 </div>
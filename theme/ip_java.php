<base href="<?php echo SITE_LINK ?>" />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>
<meta property="og:site_name" content="<?=NAMEWEB;?>" />
<meta property="og:type" content="website" />
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta property="fb:app_id" content="<?php echo APPFB_ID;?>" />
<meta name="format-detection" content="telephone=no" />
<meta name="google-site-verification" content="<?php echo GG_VR_API;?>" />
<meta name="geo.region" content="VN-HN" />
<meta name="geo.position" content="14.058324;108.277199" />
<meta name="ICBM" content="14.058324, 108.277199" /> 
<link href="<?php echo SITE_LINK;?>theme/images/icon_60.png" rel="shortcut icon" />
<link rel="stylesheet" href="<?php echo SITE_LINK;?>theme/css/style-8.3.6.3.min.css" media="all" type="text/css" />
<link rel="stylesheet" href="<?php echo SITE_LINK;?>theme/css/skin.css" media="all" type="text/css" />
<link rel="stylesheet" href="<?php echo SITE_LINK;?>theme/css/playlist.page-1.0.1.css" media="all" type="text/css" />
<!--<link href="<?php echo SITE_LINK;?>theme/css/mobile.css" rel="stylesheet" type="text/css" />-->

<script>var mainURL = "<?php echo SITE_LINK;?>";</script>
<script src="https://apis.google.com/js/platform.js" async defer>
  {lang: 'vi'}
</script>
<div id="fb-root"></div>
<script>  window.fbAsyncInit = function() {
    FB.init({
      appId      : '<?php echo APPFB_ID;?>',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
$(document).ready(function() {
    $('.ic-fb').click(function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'fbShareWindow', 'height=550, width=650, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });
});
</script>

    <style> 
        .jumper-link li.active a, .jumper-link li:hover a {
                background: #342c52;
                color: #FFF;
            }
            header {
                background-image: url('<?php echo SITE_LINK;?>theme/images/tet_2017.jpg');            
                background-size: auto 50px;
                background-position-x: center;
                background-repeat: no-repeat;
                background-color: #403667;
            }
    </style>

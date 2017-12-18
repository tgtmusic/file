<?php
//hacobi1102 coder
//Get link mp3 zippyshare
//Lay noi dung site zippy sau do lay link nhac mp3
//Host ho tro cURL thi la 1, ho tro file_getcontent thi la 0
//Su dung http://domain.com/zp.php?id=http://www63.zippyshare.com/v/15751817/file.html.flv

    function GetBetween($content,$start,$end){
            $r = explode($start, $content);
            if (isset($r[1])){
                $r = explode($end, $r[1]);
                return $r[0];
            }
            return '';
    }
    function getmicrotime($e = 0)
    {
        list($u, $s) = explode(' ',microtime());
        return bcadd($u, $s, $e);
    }
    $time = getmicrotime();
   
    //Check request
    $link = $_REQUEST['id'];
    if(strlen($link)>15){
        //http://www63.zippyshare.com/v/15751817/file.html
        $id = GetBetween($link,'http://www','.zippyshare');
        //Phan tich link
        $splitlink = explode('/', $link);
        $musicid = $splitlink[4];
        //http://www63.zippyshare.com/downloadMusic?key=15751817&time=1303395147
       
        $dlink = "http://www$id.zippyshare.com/downloadMusic?key=$musicid&time=$time";
        header( "Location: $dlink" );
    }
//Seo link for embed
//http://domain.com/zp/www63-15751817.flv

$wid = $_GET['wid'];
$musicid = $_GET['fid'];


$dlink = "http://www$wid.zippyshare.com/downloadMusic?key=$musicid&time=$time";
header( "Location: $dlink" );
?>
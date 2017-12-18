<?php 
define('MLive-Channel',true);
require_once("./includes/configurations.php");
require_once("./includes/ftp.class.php");

function file_type(&$url) {
	$t_url = strtolower($url);
	$ext = explode('.',$t_url);
	$ext = $ext[count($ext)-1];
	$ext = explode('?',$ext);
	$ext = $ext[0];
	return $ext;
}


	// Thu muc upload
	$forder_upload	= "file_music/";
	$file_type		= file_type($_FILES["resume_file"]["name"]);
	// Tao thu muc upload
	$oldumask = umask(0);
		@mkdir('file_music/', 0777);
	umask($oldumask); 
	// File sau khi duoc upload
	$file_name 		= NAMEWEB.'-' .time() . '.' . $file_type;
	if (isset($_FILES["resume_file"]) && is_uploaded_file($_FILES["resume_file"]["tmp_name"]) && $_FILES["resume_file"]["error"] == 0) {
		@move_uploaded_file($_FILES["resume_file"]["tmp_name"],$forder_upload.$file_name);
		
		$ftpZ	=	$mlivedb->query("local_folder,local_user,local_pass,local_ftp","local"," local_id = '".SERVER."'  ");
		
		// FTP tai khoan
		$hostname 		= $ftpZ[0][3];
		$FTP_username 	= $ftpZ[0][1];
		$FTP_password 	= $ftpZ[0][2];
		$htdoc			= $ftpZ[0][0];
		$path_to_folder	= $htdoc.date("m-Y").'/';
		$local_file 	= './file_music/'.$file_name;
		$ftp_path 		= $path_to_folder.$file_name;
		// TAGs
		$TaggingFormat = 'UTF-8';
		require_once('./getid3/getid3.php');
		// Initialize getID3 engine
		$getID3 = new getID3;
		$getID3->setOption(array('encoding'=>$TaggingFormat));
		
		require_once('./getid3/write.php');
		// Initialize getID3 tag-writing module
		$tagwriter = new getid3_writetags;
		//$tagwriter->filename       = '/path/to/file.mp3';
		$tagwriter->filename   = $local_file;
		$tagwriter->tagformats = array('id3v1'); 
		// set various options (optional)
		$tagwriter->overwrite_tags = true;
		$tagwriter->tag_encoding   = $TaggingFormat;
		$tagwriter->remove_other_tags = true;
		
		// populate data array
		$TagData['title'][]   =  '';
		$TagData['artist'][]  =  '';
		$TagData['album'][]   = '© M Live';
		$TagData['year'][]    =  date("Y");
		$TagData['genre'][]   = 'Other';
		$TagData['comment'][] = '© M Live';
		$TagData['track'][]   =  date("m");
		
		$tagwriter->tag_data = $TagData;
		$tagwriter->WriteTags();
		// ket noi FTP
		$ftp = new ClsFTP($FTP_username,$FTP_password, $hostname);
		if(!is_dir($path_to_folder)) {
		  $ftp->mkdir($path_to_folder);
		}
		if($ftp->put($ftp_path, $local_file)) {
			$filezxx	=	$file_name;
		}
		$ftp->close();
		delFile($local_file);
		echo $filezxx;
	}
	
	exit(0);
?>
<?php


require_once('../../init.php');
@session_start();
if(isset($_POST['hashtag']))
	$hashtag=$_POST['hashtag'];
else
	$hashtag='';

if(isset($_POST['mode'])) {
	if($_POST['mode']==1)
		session_unset();
}




$twitterObject = new Twitter($settings);
$string=$twitterObject->getMyTweets($hashtag);

//echo "<pre>";
print_r($string);
//echo "</pre>";

//echo $_SESSION['maxId'];
?>
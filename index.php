<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

require_once('init.php');

$seo = array('title' => 'Kayako Challenge',
			 'keywords' => 'kayako, helpdesk software, twitter hashtag search, sentiment analysis, twitter app',
			 'description' => 'This App allows you to search for any hashtag and analyze its sentiment (positive, negative or neutral)',
			 'site_name' => 'https://naman-malhotra.rhcloud.com/kayako/'
			 );


$view ="index.php";

$renderViewObj = new renderView();

$renderViewObj->render("$view", $seo);
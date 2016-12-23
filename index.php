<?php
// session start
session_start();

/**
 * initialise autoload 
 * Pass debug=1 as parameter in URL to enable, and see useful error messages
 * Pass debug=0 as parameter to disable debugging
 * see init.php for implementation
 */

require_once('init.php');

// Route Object
$routeObj = new Route();
//Retrieving Route, sending scriptName and requestUri 
$route = $routeObj->appRoute($_SERVER['SCRIPT_NAME'],$_SERVER['REQUEST_URI']);


switch($route)
{
	// Route for index page
	case '/': 
		// Some SEO stuff	
$seo = array('title' => 'Senti App',
			 'keywords' => 'Senti , helpdesk software, twitter hashtag search, sentiment analysis, twitter app',
			 'description' => 'This App allows you to search for any hashtag and analyze its sentiment (positive, negative or neutral)',
			 'site_name' => 'https://naman-malhotra.rhcloud.com/senti/'
			 );

		$view = "index.php";
			//RenderView Object
		$renderViewObj = new RenderView();
			// Rendering index.php and passing SEO array
		$renderViewObj->render("$view", $seo);
		break;

	// Route for api call	
	case '/fetch':
			if(isset($_POST['hashtag']))
				$hashtag = $_POST['hashtag']; // fetch hashtag if posted
			else
				$hashtag = '';				

			if(isset($_POST['mode'])) 
			{
				// Mode = 1; new hashtag is searched unset maxId stored from previous call.
				if($_POST['mode'] == 1) 
					session_unset($_SESSION['maxId']);
			}
			// Object that will interact with Twitter Class
			$twitterObject = new Twitter($settings);
			// Fetch Tweets
			$tweets=$twitterObject->getMyTweets($hashtag);
			print_r($tweets);
			break;

	// If no route is matched
	default:
		require '404.html';

}


<?php


spl_autoload_register(function($class) 
{

	if(file_exists(__DIR__."/app/model/{$class}.php"))
	{
		require_once __DIR__."/app/model/{$class}.php";
	}
	else
	{
		require_once __DIR__."/app/controllers/{$class}.php";
	}

});

require_once('app/config/config-twitter.php');


/**
 * Enable/Disable Debugging 
 * Pass debug=1 as parameter in URL to enable, and see useful error messages
 * Pass debug=0 as parameter to disable debugging
 */


if((isset($_GET['debug']) and $_GET['debug'] == 0))
{
	session_unset($_SESSION['debug']);
}
if((isset($_GET['debug']) and $_GET['debug'] == 1) or $_SESSION['debug'] == 1)
{
	$_SESSION['debug'] = 1;
	require_once(__DIR__.'/app/debug/debugMode.php');	
}

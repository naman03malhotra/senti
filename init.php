<?php


//require_once('app/model/Twitter.php');
//require_once('app/model/renderView.php');



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
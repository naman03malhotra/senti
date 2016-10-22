<?php

/**
 * Class Route 
 * Controls Routes for the app
 */


class Route
{

	/**
	 * Stores the final part of uri after '/' 
	 */
	private $uri;

	/**
	 * stores basepath of URI 
	 */
	
	private $basepath;
		

	/**
	 * Contructor
	 */
	
	public function __construct()
	{
		return $this->uri = '/';
	}

	/**
	 * appRoute function
	 * @param string $scriptName; contains the actual file name with extention
	 * @param string $requestUri; contains the url displayed with parameters
	 * @return string $uri; that needs to be routed
	 */

	public function appRoute($scriptName,$requestUri)
	{
		//extracting the basepath from uri
		$this->basepath = implode('/', array_slice(explode('/',$scriptName ), 0, -1)) . '/';
		//extracting the part of uri after basepath
		$this->uri = substr($requestUri, strlen($this->basepath));

		//checking if url contains any parameters, if present remove it.
		if (strstr($this->uri, '?')) 
			$this->uri = substr($this->uri, 0, strpos($this->uri, '?'));

		// trim the trailing slash at the end, and add at front
		$this->uri = '/' . trim($this->uri, '/');
		return $this->uri;
	}
}


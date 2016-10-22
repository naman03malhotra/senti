<?php

/**
 * Class Twitter extending class TwiiterAPiExchange
 *
 * Fetch Tweets using twitter API
 *
 */


class Twitter extends TwitterAPIExchange

{
	/**
	 * URL that API will interact with.
	 */
	public $url;
	/**
	 * Parameters that needs to be sent.
	 */
	public $getfield;
	/**
	 * Request Method, GET/POST
	 */
	public $requestMethod;
	/**
	 * Object that will interact with Twitter API
	 */
	private $twitterOAuth;
	/**
	 * Stores the lowest tweet fetch
	 */
	private $lowestId;
	/**
	 * Stores final result
	 */
	private $final_result;

	/**
	 * Constructor
	 */
	public function __construct($settings) 
	{
		$this->url = "https://api.twitter.com/1.1/search/tweets.json";
		$this->requestMethod = "GET";
		$this->getfield = '?q=%23custserv&count=100';
		$this->twitterOAuth = new TwitterAPIExchange($settings);
	}


	/**
	 * In Order to reduce redundant tweets, we need to process the maxId
	 * 64 Bit machine is required else it may result in abrupt behaviour
	 * We save the lowest tweet, fetched from previous call and subtract 1 from it
	 * In the next call, we send MaxId along
	 * Only tweets with Id lower than that of  MaxID will be fetched
	 * To read more about Why we process maxId please follow the URL 
	 * 
	 * https://dev.twitter.com/rest/public/timelines
	 *
	 * @param int $maxId; takes lowest id of fetched tweets from previous call.
	 * @return processed maxId
	 */

	public function processMaxId($maxId) 
	{

		if($maxId != '' and PHP_INT_SIZE === 8)
			return $maxId-1;
		else
			return $maxId;
	}
	
	/**
	 * function for fetching tweets
	 * @param string $hashtag; takes hashtag that will be searched
	 * @return array with tweets that is retweeted at least once
	 */
	
	public function getMyTweets($hashtag) 
	{
		// If hashtag is not empty
		if($hashtag != '') 
		{
			$this->getfield = '?q=%23'.$hashtag.'&count=100'; // %23 == # and count == 100 (max limit)
		}

		// If maxId is set from previous session
		if(isset($_SESSION['maxId']) and $_SESSION['maxId'] != '')
		{	
			$processedMaxId = $this->processMaxId($_SESSION['maxId']); // Process MaxId and substract 1 from it
			$this->getfield = '?max_id='.$processedMaxId.'&q=%23'.$hashtag.'&count=100'; // set getfield along with maxId		
		}

		$final_result = array();

		try 
		{
		// obtain tweets and decode json	
		$MyTweets=json_decode($this->twitterOAuth->setGetfield($this->getfield)->buildOauth($this->url,$this->requestMethod)->performRequest());
		// set query_status to true
		$final_result['query_status'] = TRUE;
		$final_result['mytweets'] = array();

			foreach ($MyTweets->statuses as $val)  //loop though tweets
			{
				if($val->retweet_count > 0) // check if retweet count is atleast once
				{
					$thedata = array('id'=>$val->id_str,'text'=>$val->text,'rt_count'=>$val->retweet_count,'screen_name'=>$val->user->screen_name,'img'=>$val->user->profile_image_url_https);

					array_push($final_result['mytweets'], $thedata); // pushing data into final_result
				}

				$lowestId=$val->id_str; // fetching the lowestId 
			}
			$final_result['maxId'] = $_SESSION['maxId'] = $lowestId; // Storing lowest id in SESSION to use for next call
		}
		catch (\Exception $e) 
		{
            // status => FALSE meaning unable to fetch, some error occured
			$final_result['query_status'] = FALSE;
			$final_result['error_msg'] = $e->getMessage();
		}

		return json_encode($final_result); // return final_result
	}

}
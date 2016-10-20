<?php

//require_once('TwitterAPIExchange.php');
 @session_start();


class Twitter extends TwitterAPIExchange{

	public $url;
	public $getfield;
	public $requestMethod;
	public $twitterOAuth;
	//public $settings;
	//public $respose;


	public function __construct($settings) {

		$this->url = "https://api.twitter.com/1.1/search/tweets.json";
		$this->requestMethod = "GET";
		$this->getfield = '?q=%23custserv&count=100';
		$this->twitterOAuth = new TwitterAPIExchange($settings);

	}

	public function processMaxId($maxId) {

		if($maxId!='' and PHP_INT_SIZE === 8)
			return $maxId-1;
		else
			return $maxId;
	}
	

	
	public function getMyTweets($hashtag) {

		if($hashtag!='') {
			$this->getfield = '?q=%23'.$hashtag.'&count=100';
		}

		if(isset($_SESSION['maxId']))
		{
			if($_SESSION['maxId']!='')
			{
				$processedMaxId = $this->processMaxId($_SESSION['maxId']);
				$this->getfield = '?max_id='.$processedMaxId.'&q=%23'.$hashtag.'&count=100';
			}
		}

		$final_result= array();

		 try {
		 $MyTweets=json_decode($this->twitterOAuth->setGetfield($this->getfield)->buildOauth($this->url,$this->requestMethod)->performRequest());
		  $final_result['query_status'] = TRUE;
		  $final_result['mytweets']= array();
		 

		 //$final_result['maxId']=$MyTweets->search_metadata->max_id_str;
		 // $_SESSION['maxId']=$MyTweets->search_metadata->max_id_str;
		 // $final_result['sinceId']=$MyTweets->search_metadata->since_id_str;


		  foreach ($MyTweets->statuses as $val) {
		  	
		  	if($val->retweet_count > 0) {

		  		//$sentiment_analysis=$this->sentiment($val->text);



		  		$thedata= array('id'=>$val->id_str,'text'=>$val->text,'rt_count'=>$val->retweet_count,'screen_name'=>$val->user->screen_name,'img'=>$val->user->profile_image_url_https);

		  	array_push($final_result['mytweets'], $thedata);

		  	}

		  	$lowestId=$val->id_str;


		  }
		  $final_result['maxId']=$_SESSION['maxId'] = $lowestId;

		}
		catch (\Exception $e) {
            // status => FALSE meaning unable to fetch, some error occured
            $final_result['query_status'] = FALSE;
            $final_result['error_msg'] = $e->getMessage();
        }


        return json_encode($final_result);

	}





}
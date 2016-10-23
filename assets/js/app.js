
/*
 Require Basic Modules
*/
$ = jQuery = require('jquery');

/*
Nprogress loading bar
*/
var NProgress = require('NProgress');

/*
NPM module to convert plain tweet text to HTML
*/
var htmlTweet = require('html-tweet')()





/*
 To count the number of rows
*/
var counter = 0;

/*
To store HTML form of tweet
*/
var html_Tweet;

/*
To store text for sentiment analysis
*/
var textForSentiment;


/*
Maximum Number of attempts if request fails or hashtag not found
*/

var maxNumberOfAttempts=2;

/*
 temp variable to store max attemps
*/

var maxAttempts = maxNumberOfAttempts;


/*
To store processed text for sentimental analysis.
*/
var sentiText;

/*
Card template that will be appended
*/

var cardTemplate = '<div class="col-md-4">'+
                    '<div class="card text-center">'+
                      '<div class="card-content">'+
                          '<div class="card-image">'+
                                '<img class="img-circle user-img" src="" alt="Loading image...">'+
                                '<h5 class="card-image-headline">'+
                                '<span class="user-name"></span><br>'+
                                '<span class="badge"><span class="fa fa-retweet"></span>'+ 
                                '<span class="user-rt"></span></span> </h5>'+
                          '</div>'+
                          '<div class="card-body">'+                       
                          '</div>'+
                          '<footer class="card-footer">'+
                              '<a class="btn btn-block btn-primary card-footer-btn" role="button" onclick="">Analyze Sentiment</a>'+                        
                          '</footer>'+
                        '</div>'+
                    '</div>'+
                   '</div>';

 


 
 /**
  * @param string text; Contains plain tweet text
  * @return sentiText string; processed text
  */

var processTextForSentiment = function(text) 

{
    sentiText = text;
    // removing special characters
    sentiText = sentiText.replace(/[^\w\s]/gi, "");
    //Removing new line. Windows would be \r\n but Linux just uses \n and Apple uses \r.
    sentiText = sentiText.replace(/(\r\n|\n|\r)/gm,"");    
    return sentiText;
}



 /**
  * function for fetching tweets
  *
  * @callback - requests callback
  * @param int            
  * mode = 1; call made from input i.e new hashtag is searched; resetting maxNumberOfAttempts 
  * mode = 0; call made from scrolling, no need to reset, work on same hashtag.
  */

var fetchTweets = function(callback,mode) 

{  
       
        // Picks value from hashtag input    
        var hashtag = $('#myhashtag').val();         

        // create FormData
        var formData = new FormData();
        formData.append('hashtag',hashtag);

        // resetting maxAttempts for a new search and appending mode with form data to reset MaxID (see fetchTweets.php)
        if(mode == 1)
            {
              formData.append('mode','1');
              maxAttempts = maxNumberOfAttempts;
            }
         

        if (window.XMLHttpRequest)
            {
              xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
            }
          else
            {
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
            }

        xmlhttp.onreadystatechange = function()
          {
                if (xmlhttp.readyState == 1)
                {                                    
                   NProgress.start();  // Initiate loadingBar
                   NProgress.set(0.6);                                   
                }
              else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {                                    
                    var response=JSON.parse(xmlhttp.responseText); // parsing JSON string obtained

                    if(response.query_status === false) //If request fails
                    {
                      alert('FATAL Error: '+response.error_msg); // alert msg
                      return;
                    }

                    if(response.mytweets.length == 0)  // Check if respose is empty
                    { 

                      // If Max attempts are exhausted and request is made for a new hashtag not by scroll.
                      if(maxAttempts-- <= 0 && mode != 0)    
                        {
                            // Display if no result is fetched for a tweet
                            $("#populate").html('<h1 class="text-center">No tweets found for this hashtag</h1>');                                   
                            NProgress.done();
                            return;
                        }
                      else  
                        fetchTweets(displayCards); // Retry Until maxAttempts < 0 
                    }
                    else
                    {                                    
                        NProgress.set(0.8);
                        callback(response); // Fire Callback
                        NProgress.done();   // End Loading Bar
                    }   
                }
           }
        // Send Call only if Attempts are left.
        if(maxAttempts >= 0)  
          {
            xmlhttp.open("POST","fetch",true);
            xmlhttp.send(formData); // send hashtag and mode.
          }
          
  }


 /**
  * function for displaying tweets
  *
  * @param {json} tweets; contains tweets in json object           
  */
  

var displayCards = function (tweets)

{  
    for(var i = 0;i < tweets.mytweets.length;i++) 
      {        
          // Create a Row (bootstrap), after 3 rows are displayed
        
          if (counter%3 == 0) 
          {
              var rowDiv = $("<div/>", {'class': 'row'});
              $("#populate").append(rowDiv);    // Append Row 
          }

          var tweeterCard = $(cardTemplate);
          var tweetTxt = tweets.mytweets[i].text; //extracting tweet text
          var screenName = tweets.mytweets[i].screen_name; 
          html_Tweet = htmlTweet(tweetTxt.replace(/"/g, '\&quot;')); // Convert plain text tweet to HTML tweet and escape double quotes
          textForSentiment = processTextForSentiment(tweetTxt);  // send tweet text to process for sentimental analysis

          tweeterCard.find('.user-img').attr("src",tweets.mytweets[i].img);
          tweeterCard.find('.user-name').html('<a target="_blank" href="https://twitter.com/search?q=%40'+screenName+'">@'+screenName+'</a>');
          tweeterCard.find('.user-rt').text(tweets.mytweets[i].rt_count);
          tweeterCard.find('.card-body').html('<h6>'+html_Tweet+'</h6>');
          tweeterCard.find('.card-footer-btn').attr('onClick', 'analyze_sentiment(\''+textForSentiment+'\',this)');
                
          $(".row").last().append(tweeterCard);
          counter++;
      }

}
  
/*
  Fetch Tweets as soon as page loads
*/
  $(document).ready(function() 
  {    
    fetchTweets(displayCards);
  });

/*
 Fetch Tweets when GO button is clicked
*/

  $("#goTrigger").click(function()
  {
    // When GO is clicked, i.e new hashtag is searched; empty #populate div  
    $("#populate").html('');
    fetchTweets(displayCards,'1'); // send mode = 1, i.e New hashtag is searched.

  });

/*
 Fetch Tweets if enter is pressed
*/

  $('#myhashtag').keydown(function(event)
  { 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) 
        {
            $('#goTrigger').trigger('click');
        }
  });



/*
 Fetch Tweets if scrolled to bottom
*/

$(window).scroll(function() 
{
    if ($(window).scrollTop() + $(window).height() == $(document).height()) 
    {
        // send mode = 0, stating call is made by scrolling down, i.e work on same hashtag
        fetchTweets(displayCards,'0');
    }
});
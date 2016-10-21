


$ = jQuery = require('jquery');
require('bootstrap');
var NProgress = require('NProgress');
var htmlTweet = require('html-tweet')()






var counter = 0;


var html_Tweet;

var maxNumberOfAttempts=2;




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

 




var processTextForSentiment = function(text, selector) {
    //var wrapped = $("<div>" + text + "</div>");
   // wrapped.find(selector).remove();
    //wrapped = wrapped.html();
    wrapped = text;
    // removing special characters
    wrapped = wrapped.replace(/[^\w\s]/gi, "");

    //How you'd find a line break varies between operating system encodings. Windows would be \r\n but Linux just uses \n and Apple uses \r.
    wrapped = wrapped.replace(/(\r\n|\n|\r)/gm,"");    
    return wrapped;
}





function fetchTweets(callback,mode) {  
                
             var hashtag = $('#myhashtag').val();
                //alert(hashtag);
               
               


              // create FormData
                var formData = new FormData();
                formData.append('hashtag',hashtag);
                if(mode==1)
                  {
                    formData.append('mode','1');
                    maxNumberOfAttempts=2;
                  }
               

                      if (window.XMLHttpRequest)
                          {// code for IE7+, Firefox, Chrome, Opera, Safari
                          xmlhttp=new XMLHttpRequest();
                          }
                        else
                          {// code for IE6, IE5
                          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                          }
                        xmlhttp.onreadystatechange=function()
                          {
                            if (xmlhttp.readyState==1||xmlhttp.readyState==2||xmlhttp.readyState==3)
                            {

                                
                               NProgress.start();
                               NProgress.set(0.6);


                               
                            }
                          else if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {
                                
                                
                                //console.log(xmlhttp.responseText);
                                var response=JSON.parse(xmlhttp.responseText);

                                if(response.mytweets.length==0) {
                                  

                                  if(maxNumberOfAttempts-- <= 0 && mode!=0) 
                                    {
                                        $("#populate").html('<h1 class="text-center">No tweets found for this hashtag</h1>');
                                        //maxNumberOfAttempts=2;
                                        console.log(maxNumberOfAttempts);
                                        NProgress.done();
                                        return;
                                    }
                                    fetchTweets(displayCards);
                                }

                                
                                 NProgress.set(0.8);
                                callback(response);
                                NProgress.done();
                            }
                          }

                        if(maxNumberOfAttempts >= 0)  
                        {
                          xmlhttp.open("POST","app/controllers/fetchTweets.php",true);
                          xmlhttp.send(formData);
                        }
                }



  


  function displayCards(tweets){

   // tweets=JSON.parse(tweets);
   // alert(tweets.mytweets.length);
     /** Iterate through all the tweets **/
    for(var i=0;i<tweets.mytweets.length;i++) {
        /** Create a new bootstrap row div after every 3 tweets displayed **/
       // alert(tweets.mytweets[i].screen_name);
        if (counter % 3 == 0) {
            var div = $("<div/>", {'class': 'row'});
            $("#populate").append(div);    /** Add row div at the end **/
        }

        var tweeterCard = $(cardTemplate);
        var tweetTxt=(tweets.mytweets[i].text);
        var screenName=tweets.mytweets[i].screen_name;

        html_Tweet = htmlTweet(tweetTxt.replace(/"/g, '\&quot;')); 

        var textForSentiment= processTextForSentiment(tweetTxt,"a");

        tweeterCard.find('.user-img').attr("src",tweets.mytweets[i].img);
        tweeterCard.find('.user-name').html('<a target="_blank" href="https://twitter.com/search?q=%40'+screenName+'">@'+screenName+'</a>');
        tweeterCard.find('.user-rt').text(tweets.mytweets[i].rt_count);
        tweeterCard.find('.card-body').html('<h6>'+html_Tweet+'</h6>');
        tweeterCard.find('.card-footer-btn').attr('onClick', 'analyze_sentiment(\''+textForSentiment+'\',this)');

         
        
        
        $(".row").last().append(tweeterCard);
        counter++;
    }



    console.log(tweets);
   // var tweet= htmlTweet('"I, Chatbot." See what @AspectSoftware @tpgoebel has to say about #custserv chatbots in this @CCPipeline column. http://tinyurl.com/hvxw9s6');
    
    //var card = $('.card-body').html('<h6>'+tweet+'</h6>');

   // console.log(textForSentiment);

  }

  $(document).ready(function() {
    /** Fetch and display the tweets **/
    fetchTweets(displayCards);

     $("#goTrigger").click(function(){
            $("#populate").html('');
            fetchTweets(displayCards,'1');

    });

     $('#myhashtag').keydown(function(event){ 
            var keyCode = (event.keyCode ? event.keyCode : event.which);   
            if (keyCode == 13) {
                $('#goTrigger').trigger('click');
            }
      });

});





$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        /** Fetch and display the tweets **/
        fetchTweets(displayCards,'0');
    }
});


/*



require('bootstrap');


  $(document).ready(function() {
     $('#myModalshare').modal("show");
});
*/

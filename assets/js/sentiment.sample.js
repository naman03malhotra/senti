
/*
Get API key from HPE havenOnDemand
*/
var apikey = '';

/*
Progress Bar template
*/
var progressBarTemplate = '<div>'+
                            '<div class="progress card-footer-btn">'+
                                '<div class="progress-bar"></div>'+
                            '</div>'+
                            '<div class="progress-text"></div>'+
                          '</div>';
    
/*
 * @param
 * Score takes result from sentiment result and converts to percentage upto two decimal places  
 */
var formatScore = function(score)
{
  return (score * 100).toFixed(2);
}

/*
 * @param
 * score - takes result from sentiment result and converts to percentage upto two decimal places.
 * element - points to the element from which it is called.  
 */

var analyze_sentiment = function(text,element) 
{

      element = $(element);
        
      // create FormData
      var formData = new FormData();
      formData.append('text',text);
      formData.append('apikey',apikey);

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
              element.addClass("m-progress");   //  add button loading            
            }
          else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {             
                var response = JSON.parse(xmlhttp.responseText);   // converting JSON response from api to json object           
                
                var sentimentScore = formatScore(response.sentiment_analysis[0].aggregate.score);
                console.log('Sentiment Score: ' + sentimentScore);

                var progressBar = $(progressBarTemplate);
                // setting width of progress-bar with absolute score
                progressBar.find('.progress-bar').css('width', Math.abs(sentimentScore) + '%');
                
                switch (true) 
                { 
                  case sentimentScore > 0: //+ve case
                    progressBar.find('.progress-text').html('Positive ' +sentimentScore+ '%');
                    progressBar.find('.progress-bar').addClass('progress-bar-success');
                    progressBar.find('.progress-text').addClass('text-success');
                    break;

                  case sentimentScore < 0: // -ve case
                    progressBar.find('.progress-text').html('Negative ' +Math.abs(sentimentScore)+ '%');
                    progressBar.find('.progress-bar').addClass('progress-bar-danger');
                    progressBar.find('.progress-text').addClass('text-danger');
                    break;  

                  default: // neutral case
                    progressBar.find('.progress-text').html('Neutral');
                    progressBar.find('.progress-bar').addClass('progress-bar-warning');
                    progressBar.find('.progress-text').addClass('text-warning');
                }

                element.parent().html(progressBar); // Embed progress bar 
            }
          }
        // send request  
        xmlhttp.open("POST","https://api.havenondemand.com/1/api/sync/analyzesentiment/v2",true);
        xmlhttp.send(formData);
}






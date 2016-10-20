


var apikey='9f610d60-d4ca-4047-b3f4-1d9ef15d2993';

 var progressBarTemplate= '<div><div class="progress card-footer-btn">'+
                                '<div class="progress-bar"></div></div><div class="progress-text"></div></div>';
    

function formatScore(score)
{
  return (score*100).toFixed(2);
}

function analyze_sentiment(text,element) {

  //alert(sentiment_text);

  //console.log(element);
  element=$(element);


  
  
     // create FormData
                var formData = new FormData();
                formData.append('text',text);
                formData.append('apikey',apikey);

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

                                
                              element.addClass("m-progress");


                               
                            }
                          else if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {
                                
                                

                                //console.log(xmlhttp.responseText);
                                var response=JSON.parse(xmlhttp.responseText);
                                console.log(response);
                                //$(element).removeClass("m-progress");
                                
                                var sentimentScore=formatScore(response.sentiment_analysis[0].aggregate.score);
                                console.log(sentimentScore);


                                var progressBar=$(progressBarTemplate);


                                progressBar.find('.progress-bar').css('width', Math.abs(sentimentScore)+'%');
                                //progressBar.find('.progress-text').html(sentimentScore+'%');
                                
                                //element.parentNode.innerHTML=progressBar;
                                //console.log(progressBar);

                                switch (true) 
                                { 
                                  case sentimentScore>0: 
                                    progressBar.find('.progress-text').html('Positive '+sentimentScore+'%');
                                    progressBar.find('.progress-bar').addClass('progress-bar-success');
                                    progressBar.find('.progress-text').addClass('text-success');
                                    break;
                                  case sentimentScore<0: 
                                    progressBar.find('.progress-text').html('Negative '+Math.abs(sentimentScore)+'%');
                                    progressBar.find('.progress-bar').addClass('progress-bar-danger');
                                    progressBar.find('.progress-text').addClass('text-danger');
                                    break;                                  
                                  default:
                                    progressBar.find('.progress-text').html('Neutral');
                                    progressBar.find('.progress-bar').addClass('progress-bar-warning');
                                    progressBar.find('.progress-text').addClass('text-warning');
                                }

                                element.parent().html(progressBar);



                                            
                           

                                

                               
                            }
                          }
                          
                        xmlhttp.open("POST","https://api.havenondemand.com/1/api/sync/analyzesentiment/v2",true);
                        xmlhttp.send(formData);

	//element.parentNode
  //


}






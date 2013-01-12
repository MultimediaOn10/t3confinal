$(document).ready(function() {
  /*******************************************/
  /******** Pausen-Fancy-Slides **************/
  /*******************************************/

    $("#break1-5").mouseover(function(){
      $("#break1-5").css('background-color','#ec9634');
      $("#break1-5").stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
         // $("#break1-5").append("<div class='slideshow-1-5')><div class='slides_container'><div class='imagecontent'><img src='http://placehold.it/50x50'></div><div class='imagecontent'><img src='http://placehold.it/50x50'></div><div class='imagecontent'><img src='http://placehold.it/50x50'></div><div class='imagecontent'><img src='http://placehold.it/50x50'></div></div></div>");
         // $(function(){
             /*$(".slideshow-1-5").slides({
                preload: true,
                generateNextPrev: true,
                pagination: false
              });*/
          });
      });
    });

    $("#break1-5").mouseout(function(){
      $("#break1-5").css('background-color','#757776');
          $("#break1-5").stop(true).animate({ left: '+=50', height: '30px' }, 500, function() {
            //$("#break1-5").empty();
      });
    });
});
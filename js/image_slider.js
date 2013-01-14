$(document).ready(function() {
  /*******************************************/
  /******** Pausen-Fancy-Slides **************/
  /*******************************************/

  /*Make the bubbles disappear*/
  function disappear_bubbles(){
    $("#bubble-1").fadeOut('slow', function() {
      showOrHide = false;
    });
    $("#bubble-2").fadeOut('slow', function() {
      showOrHide = false;
    });
  };

  /*Mouseover-Slideout-Effekt*/
  $("#break1-5").mouseover(function(){
      disappear_bubbles();
      $("#break1-5").css('background-color','#ec9634');
      $("#break1-5").stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
        $("#break1-5").append("<div id='slides')><div class='slides_container'><div class='imagecontent'>Bla</div><div class='imagecontent'>yeah</div><div class='imagecontent'>blub</div><div class='imagecontent'>blöp</div></div></div>");
        $(function(){
          $(".slideshow-1-5").slides({
              preload: true,
              generateNextPrev: true,
              pagination: false,
              play: 2500
          });
        });
      });
  });

 $("#break1-5").mouseout(function(){
      $("#break1-5").css('background-color','#757776');
          $("#break1-5").stop(true).animate({ left: '+=50', height: '30px' }, 500, function() {
            //$("#break1-5").empty();
      });
  });

 $(function(){
      $('#slides').slides({
        preload: true,
        generateNextPrev: true,
        generatePagination: false,
        play: 2500
      });
    });
});
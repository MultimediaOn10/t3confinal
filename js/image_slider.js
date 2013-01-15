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

  /*get the ids of the breaks*/
  var break_id;

  /*Mouseover-Slideout-Effekt*/
 $(".break").mouseenter(function(){
    disappear_bubbles();
    /*Get the id of the break*/
    break_id = $(this).attr('id');
    $('#'+break_id).css('background-color','#ec9634');
    $('#'+break_id).append("<div id='slides'></div>");
    $('#'+break_id).stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
      $("#slides").append("<div class='slides_container'><div class='slide'><div class='item'>Item One</div><div class='item'>Item Two</div><div class='item'>Item Three</div><div class='item'>Item X</div></div><div class='slide'><div class='item'>Item One</div><div class='item'>Item Two</div><div class='item'>Item Three</div><div class='item'>Item X</div></div></div>");
     $(function(){
        $('#slides').slides({
          preload: true,
          generateNextPrev: true,
          generatePagination: false,
          play: 2500
        });
      });
    });
  });

 $(".break").mouseleave(function(){
    /*Get the id of the break*/
    break_id = $(this).attr('id');
    $('#'+break_id).css('background-color','#757776');
    $('#'+break_id).stop(true).animate({ left: '+=50', height: '30px' }, 500, function() {
      $("#slides").remove();
    });
  });
});
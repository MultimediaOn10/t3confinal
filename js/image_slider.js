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
  var breakname;
  /*Get the images*/

    function get_images(breakname){
    $.ajax({
        async: false,
        url: "php/ajaxrequest_images.php",
        data: { breakname:breakname, action: "img_array"},
        type: "POST",
        dataType: "json",
        cache: false,
        success: function (data, textStatus, XMLHttpRequest) {
                console.log('success!');
                  for (var i = 0; i < data.items.length; i++) {
                    console.log(data.items[i].items);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('autsch!');
            }
    });
  };

  /*Mouseover-Slideout-Effekt*/
 $(".break").mouseenter(function(){
  
    /*Get breakname*/
    //breakname = $(this).attr('id');  
    breakname = "break1";
    get_images(breakname);
    /*Get the id of the break*/
    break_id = $(this).attr('id');
    $('#'+break_id).css('background-color','#ec9634');
    $('#'+break_id).append("<div id='slides'></div>");
    $('#'+break_id).stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
    $("#slides").append("<div class='slides_container'><div class='slide'><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8605_thumb.jpg' href='../img/break1/MG_8605.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8607_thumb.jpg' href='../img/break1/MG_8607.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8608_thumb.jpg' href='../img/break1/MG_8608.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8609_thumb.jpg' href='../img/break1/MG_8609.jpg'>Open #2</a></div></div><div class='slide'><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8612_thumb.jpg' href='../img/break1/MG_8612.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8613_thumb.jpg' href='../img/break1/MG_8613.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8615_thumb.jpg' href='../img/break1/MG_8615.jpg'>Open #2</a></div><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/MG_8616_thumb.jpg' href='../img/break1/MG_8616.jpg'>Open #2</a></div></div></div>");
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

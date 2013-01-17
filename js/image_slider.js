$(document).ready(function() {
  /*******************************************/
  /******** Pausen-Fancy-Slides **************/
  /*******************************************/

  /*global variables*/
  var break_id;
  var breakname;
  var images_links1;
  var images_links2;
  var images_links3;
 
  /*Get the images*/
    function get_images(breakname, images_links1, images_links2, images_links3){
    $.ajax({
        async: false,
        url: "php/ajaxrequest_images.php",
        data: { breakname:breakname, action: "img_array"},
        type: "POST",
        dataType: "json",
        cache: false,
        success: function (data, textStatus, XMLHttpRequest) {
                /*Get the image links*/
                for (var i = 0; i < 4; i++) {
                  images_links1 += data.items[i];
                }
                for (var i = 5; i < 9; i++) {
                  images_links2 += data.items[i];
                }
                images_links1 = images_links1.replace('undefined','');
                images_links2 = images_links2.replace('undefined','');

                $('#'+breakname).append("<div id='slides'></div>");
                $("#slides").append("<div class='slides_container'><div class='slide'>"+images_links1+"</div><div class='slide'>"+images_links2+"</div></div>");
                 $(function(){
                    $('#slides').slides({
                      preload: true,
                      generateNextPrev: true,
                      generatePagination: false,
                      play: 2500
                    });
                  });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('autsch!');
            }
    });
  };

/*Mouseover-Slideout-Effekt*/
  $(".break").mouseenter(function(){
    /*Get breakname*/
    breakname = $(this).attr('id'); 
    $('#'+breakname).css('background-color','#ec9634');
    get_images(breakname, images_links1, images_links2, images_links3);
    $('#'+breakname).stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
    });
  });

  $(".break").mouseleave(function(images_links1, images_links2, images_links3, breakname){
    /*Get the id of the break*/
    breakname = $(this).attr('id');
    $('#'+breakname).css('background-color','#757776');
    $('#'+breakname).stop(true).animate({ left: '+=50', height: '30px' }, 500, function() {
    $("#slides").remove();
    $(breakname).empty();
    $(images_links1).empty();
    $(images_links2).empty();
    $(images_links3).empty();
    });
  });

 /**** ADD Fancybox to Images ***/
  $(".fancybox-images").attr('rel', 'gallery')
  $(".fancybox-images").fancybox({
    helpers: {
        thumbs: {
            width  : 70,
            height : 70,
            source  : function(current) {
            return $(current.element).data('thumbnail');
            }
        }
    }
});
});

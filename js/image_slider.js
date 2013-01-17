$(document).ready(function() {
  /*******************************************/
  /******** Pausen-Fancy-Slides **************/
  /*******************************************/

  /*get the ids of the breaks*/
  var break_id;
  var breakname;
  var images_links;
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
                  images_links = data.items[i];
                }
                console.log(images_links);
                $('#'+breakname).append("<div id='slides'></div>");
                $("#slides").append("<div class='slides_container'><div class='slide'>"+images_links+"</div></div>");
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
    $('#'+breakname).css('background-color','#ec9634');
    get_images(breakname);
    $('#'+breakname).stop(true).animate({ left: '+=50', height: '100px' }, 500, function() {
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
    breakname = $(this).attr('id');
    $('#'+breakname).css('background-color','#757776');
    $('#'+breakname).stop(true).animate({ left: '+=50', height: '30px' }, 500, function() {
      $("#slides").remove();
    });
  });

 $(".fancybox-media").fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
      media : {}
    }
  });

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

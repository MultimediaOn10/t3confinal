$(document).ready(function() {

  /*global variables for bubble contents*/
  var short_description;
  var add_content;
  var track_title;
  var speaker_name;
  var trackID;

  /*Animation for the skip-button*/
  $(".skip").animate({ left: '+=50', height: '90px' }, 800, function() {
  });

  /*Hover-Effect for Tracks*/
  $(".track").mouseenter(function(){
    $(this).css('background', '#9d9f9e');
  });
  $(".track").mouseleave(function(){
    $(this).css('background', '#cacccb');
  });

  /* Placing Bubbles to the tracks */
  
  $(".track").click(function(){
    /*get the track ID*/
    track_ID = $(this).attr('id');
  });


  $("#2").click(function(){
    trackID = $('#2').attr('id');
    disappear_bubbles();
    get_contents(trackID);
    bubble1_drawing(track_title); 
    $("#bubble-1").css('margin-top','30px');
    Animate_Bubble_right();
  });

  $("#3").click(function(){
    trackID = $('#3').attr('id');
    disappear_bubbles();
    get_contents(trackID);
    bubble2_drawing(track_title); 
    $("#bubble-2").css('margin-top','90px');
    Animate_Bubble_left();
  });

  $("#4").click(function(){
    trackID = $('#4').attr('id');
    disappear_bubbles();
    get_contents(trackID);
    bubble1_drawing(track_title); 
    $("#bubble-1").css('margin-top','90px');
    Animate_Bubble_right();
  });

  $("#6").click(function(){
    trackID = $('#6').attr('id');
    disappear_bubbles();
    get_contents(trackID);
    bubble2_drawing(track_title); 
    $("#bubble-2").css('margin-top','210px');
    Animate_Bubble_left();
  });

  $("#7").click(function(){
    trackID = $('#7').attr('id');
    disappear_bubbles();
    get_contents(trackID);
    bubble1_drawing(track_title); 
    $("#bubble-1").css('margin-top','210px');
    Animate_Bubble_right();
  });

  /*Animate the right bubble*/  
  function Animate_Bubble_right(){
    /* remove text from button and bubble to load in the new text*/
    $(".button-right").empty();
    $(".bubble-content-right").empty();
    $(".title-right").empty();
    $(".speaker-name-right").empty();

    /* Add Animation to Bubble*/
    $('#bubble-1').fadeIn('600', function() {
      $(".title-right").append(track_title);
      $(".speaker-name-right").append(speaker_name);
        
      $(".bubble-content-right").animate({ left: '+=100', height: 'show' }, 1000, function() {
        $(".bubble-content-right").css('color','#000000');
        $(".bubble-content-right").append(short_description);
        /*Button Animation*/
        $(".button-right").animate({ left: '+=100', height: 'show' }, 500, function() {
          $(".button-right").append("<a class='fancybox-button' rel='group' href='#additional-content'>Info</a>");
        });
      });
    });
  };

  function Animate_Bubble_left(){
    /* remove text from button and bubble to load in the new text*/
    $(".button-left").empty();
    $(".bubble-content-left").empty();
    $(".title-left").empty();
    $(".speaker-name-left").empty();


    /* Add Animation to Bubble*/
    $('#bubble-2').fadeIn('600', function() {
      $(".title-left").append(track_title);
      $(".speaker-name-left").append(speaker_name);
        
      $(".bubble-content-left").animate({ left: '+=50', height: 'show' }, 500, function() {
        $(".bubble-content-left").css('color','#000000');
        $(".bubble-content-left").append(short_description);
        /*Button Animation*/
        $(".button-left").animate({ left: '+=50', height: 'show' }, 500, function() {
          $(".button-left").append("<a class='fancybox-button' rel='group' href='#additional-content'>Info</a>");
        });
      });
    });
  };

  /*Additional Animation for info-button with fancybox*/
  $(".button-right").click(function(){ 
    $(".fancybox-button").fancybox({
      openEffect  : 'none',
      closeEffect : 'none',
      maxWidth : '600',
      arrows     : false,
      afterLoad   : function() {
        this.inner.prepend('<h3 class="additional-content">'+track_title+'</h3>');
        this.content = '<div class="additional-content">'+add_content+'</div>';
      }
    });
  });
  $(".button-left").click(function(){
    $(".fancybox-button").fancybox({
      openEffect  : 'none',
      closeEffect : 'none',
      maxWidth : '600',
      arrows     : false,
      afterLoad   : function() {
        this.inner.prepend('<h3 class="additional-content">'+track_title+'</h3>');
        this.content = '<div class="additional-content">'+add_content+'</div>';
      }
    });
  });


  /* Get the content for the bubbles*/
  function get_contents(trackID){
    $.ajax({
      async: false,
      url: "php/ajaxrequest.php",
      data: { trackID:trackID, action: "getmycontent" },
      type: "POST",
      dataType: "json",
      cache: false,
      success: function (data, textStatus, XMLHttpRequest) {
                console.log('success!');
                for (var i = 0; i < data.items.length; i++) {
                    var description_text = data.items[i].note;
                    var videolink = data.items[i].url;
                }
                short_description = "<img src='http://img.youtube.com/vi/"+videolink+"/1.jpg'/><a class='video-link fancybox-media' rel='group' href='http://www.youtube.com/watch?v="+videolink+"'>link</a>";
                add_content = "<div class='additional-content'>"+description_text+"</div>";   
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('autsch!');
            }
    });
    $.ajax({
      async: false,
      url: "php/ajaxrequest_nametitle.php",
      data: { trackID:trackID, action: "getspeakertitle"},
      type: "POST",
      dataType: "json",
      cache: false,
      success: function (data, textStatus, XMLHttpRequest) {
        console.log('success!');
        for (var i = 0; i < data.items.length; i++) {
          track_title = data.items[i].title;
          speaker1_fullname = data.items[i].ref1_first+" "+data.items[i].ref1_last;
          speaker2_fullname = data.items[i].ref2_first+" "+data.items[i].ref2_last;
        }  
        /* Check if there are one or two speakers*/
        if (speaker2_fullname == "null") {
          speaker_name = speaker1_fullname;
        }
        else {
          speaker_name = speaker1_fullname+" & "+speaker2_fullname;
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('autsch!');
      }
    });
  };


  /*Bubble whith an arrow that points to the  right */
  function drawBubble_left(ctx, x, y, w, h, radius)
  {
    var r = x + w;
    var b = y + h;
    ctx.fillStyle = "#6F9A37"; 
    ctx.beginPath();

    /*Creates Arrow*/
    ctx.moveTo(x+180+radius, y);
    ctx.lineTo(x+191+radius * 2, y+20);
    ctx.lineTo(x+190+radius/2, y+35);
    ctx.lineTo(x+190+radius, y+10);

    /*Creates Bubble*/
    ctx.lineTo(r-radius, y);
    ctx.quadraticCurveTo(r, y, r, y+radius);
    ctx.lineTo(r, y+h-radius);
    ctx.quadraticCurveTo(r, b, r-radius, b);
    ctx.lineTo(x+radius, b);
    ctx.quadraticCurveTo(x, b, x, b-radius);
    ctx.lineTo(x, y+radius);
    ctx.quadraticCurveTo(x, y, x+radius, y);

    ctx.fill();
  };

  /*Bubble whith an arrow that points to the left*/
  function drawBubble_right(ctx, x, y, w, h, radius)
  {
    var r = x + w;
    var b = y + h;
    ctx.fillStyle = "#6F9A37"; 
    ctx.beginPath();

    /*Creates Arrow*/
    ctx.moveTo(x, y+radius*3);
    ctx.lineTo(x-11, y+radius*2);
    ctx.lineTo(x * 2, y);
    ctx.lineTo(r-radius, y);

    /*Creates Bubble*/
    ctx.quadraticCurveTo(r, y, r, y+radius);
    ctx.lineTo(r, y+h-radius);
    ctx.quadraticCurveTo(r, b, r-radius, b);
    ctx.lineTo(x+radius, b);
    ctx.quadraticCurveTo(x, b, x, b-radius);
    ctx.lineTo(x, y+radius);
    ctx.quadraticCurveTo(x, y, x+radius, y);

    ctx.fill();
  };

  /*Generating the bubbles*/
  function bubble1_drawing(track_title) 
  {
    /*check the length of the title for the length of the bubble*/
    var title_chars = track_title.length;
    if (title_chars > 40){
      content_height  = 135;
    }
    else {
      content_height  = 70;
    }
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d'); 
    drawBubble_right(ctx, 10,60,200, content_height +15, 10);
  };

  function bubble2_drawing(track_title) 
  {
    /*check the length of the title for the length of the bubble*/
    var title_chars = track_title.length;
    if (title_chars > 40){
      content_height  = 135;
    }
    else {
      content_height  = 70;
    }
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d'); 
    drawBubble_left(ctx, 10,60,200, content_height +15, 10);
  };

  /*Make the bubbles disappear*/
  function disappear_bubbles(){
    $("#bubble-1").fadeOut('slow', function() {
      showOrHide = false;
    });
    $("#bubble-2").fadeOut('slow', function() {
      showOrHide = false;
    });
  };


  /*******************************/
  /******** The Legend ***********/
  /*******************************/

  function close_legends(){
    $('.upper-legend-text').stop(true).animate({ left: '+=50', height: '0px' }, 500, function() {
      $('.upper-legend-text').empty();
    });
    $('.lower-legend-text').stop(true).animate({ left: '+=50', height: '0px' }, 500, function() {
      $('.lower-legend-text').empty();
    });
  };

  $(".legend").click(function(){
    close_legends();
    /*Get the id*/
    legend_id = $(this).attr('id');
    /*animate*/
    switch(legend_id) {
        case 'legend-yellow': 
          $('.upper-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 500, function() {
            $('.upper-legend-text').text("All about the business facts of TYPO3 and the best practies with it");
            $('.upper-legend-text').css('background-color','#F4CC3E');
            $('.upper-legend-text').addClass("legend-style-text-yellow");
          });
        break;
        case 'legend-purple': 
          $('.upper-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 500, function() {
            $('.upper-legend-text').text("All about mobile Websites, App content services and TYPO3 mobile frameworks");
            $('.upper-legend-text').css('background-color','#856AA2');
            $('.upper-legend-text').addClass("legend-style-text");
          });
        break;
        case 'legend-blue': 
          $('.upper-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 500, function() {
            $('.upper-legend-text').text("All about the TYPO3 core product");
            $('.upper-legend-text').css('background-color','#265D9C');
            $('.upper-legend-text').addClass("legend-style-text");
          });
        break;
        case 'legend-green':  
          $('.lower-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 500, function() {
            console.log("hallo");
            $('.lower-legend-text').text("All about the new PHP frameworks with TYPO3 Community");
            $('.lower-legend-text').css('background-color','#6F9A37');
            $('.lower-legend-text').addClass("legend-style-text");
          });
        break;
        case 'legend-orange':  
          $('.lower-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 500, function() {
            $('.lower-legend-text').text("All about Design und Userexperiance");
            $('.lower-legend-text').css('background-color','#EC9A43');
            $('.lower-legend-text').addClass("legend-style-text");
          });
        break;
        case 'legend-red':  
          $('.lower-legend-text').stop(true).animate({ left: '+=50', height: '50px' }, 300, function() {
            $('.lower-legend-text').text("All about the TYPO3 community and project timelines");
            $('.lower-legend-text').css('background-color','#C13829');
            $('.lower-legend-text').addClass("legend-style-text");
          });
        break;
      }
  });
  /*Close legends by clicking somewhere*/
  $(document).click(function() {
    if ($('.lower-legend-text').height() == 50 || $('.upper-legend-text').height() == 50){   
        close_legends();   
        $('.lower-legend-text').css('background-color','');
        $('.upper-legend-text').css('background-color','');
        $('.upper-legend-text').removeClass("legend-style-text");
        $('.upper-legend-text').removeClass("legend-style-text-yellow");
        $('.lower-legend-text').removeClass("legend-style-text");
    };
  });
});




  

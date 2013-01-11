$(document).ready(function() {

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
  }

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
  }

  /*Generating the bubbles*/
  function bubble1_drawing() 
  {
    var content_height = $(".bubble-text-right").height();
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d'); 
    drawBubble_right(ctx, 10,60,200, content_height +65, 10);
  }

  function bubble2_drawing() 
  {
    var content_height = $(".bubble-text-left").height();
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d'); 
    drawBubble_left(ctx, 10,60,200, content_height +95, 10);
  }

  /* Master Function for the bubbles*/
  function MasterFkt() {
    bubble1_drawing(); 
    bubble2_drawing();  
  }

  window.onload=MasterFkt;

  /*Hover-Effect for Tracks*/
  $(".track").mouseenter(function(){
    $(this).css('background', '#9d9f9e');
  });
  $(".track").mouseleave(function(){
    $(this).css('background', '#cacccb');
  });


  /*global variables for bubble contents*/
  var short_description;
  var add_content;
  var track_title;
  var speaker_name;

  /*Animate the right bubbles*/  
  function Animate_Bubble_right(){
    /* remove text from button and bubble to load in the new text*/
    $(".button-right").empty();
    $(".bubble-content-right").empty();
    $(".title-right").empty();
    $(".speaker-right").empty();

    /* Add Animation to Bubble*/
    $('#bubble-1').fadeIn('600', function() {
      $(".bubble-content-right").text(short_description);
      $(".title-right").text(track_title);
      $(".speaker-name-right").text(speaker_name);
        
      $(".bubble-content-right").animate({ left: '+=50', height: 'show' }, 1000, function() {
        $(".bubble-content-right").css('color','#000000');
        /*Button Animation*/
        $(".button-right").animate({ left: '+=50', height: 'show' }, 1000, function() {
          $(".button-right").text("Info »");
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
      $(".bubble-content-left").text(short_description);
      $(".title-left").text(track_title);
      $(".speaker-name-left").text(speaker_name);
        
      $(".bubble-content-left").animate({ left: '+=50', height: 'show' }, 1000, function() {
        $(".bubble-content-left").css('color','#000000');
        /*Button Animation*/
        $(".button-left").animate({ left: '+=50', height: 'show' }, 1000, function() {
          $(".button-left").text("Info »");
        });
      });
    });
  };

  /*Additional Animation for info-button*/
  $(".button-right").click(function(){
    $(".button-right").css("display","none");
    $(".bubble-content-right").append(add_content);

    $(".additional-content-right").animate({ left: '+=50', height: 'show' }, 1000, function() {
      $(".additional-content-right").css('color','#000000');
    });       
  });
  $(".button-left").click(function(){
    $(".button-left").css("display","none");
    $(".bubble-content-left").append(add_content);

    $(".additional-content-left").animate({ left: '+=50', height: 'show' }, 1000, function() {
      $(".additional-content-left").css('color','#000000');
    });       
  });

  /*Make the bubbles disappear*/
  function disappear_bubbles(){
    $("#bubble-1").fadeOut('slow', function() {
      showOrHide = false;
    });
    $("#bubble-2").fadeOut('slow', function() {
      showOrHide = false;
    });
  };

  /* Placing Bubbles to the tracks */
  $("#3").click(function(){
    disappear_bubbles();
    var trackID = $('#2').attr('id');
    short_description = "Dies ist ein kurzer Text der den Inhalt der Veranstaltung beschreibt";
    add_content = "<div class='additional-content additional-content-right'>Hallo</div>";
    track_title = "Der beste Vortrag aller Zeiten";
    speaker_name = "Liesa Burgey";
    $.ajax({
      async: false,
      url: "php/ajaxrequest.php",
      //url: "../cakephp/app/Controller/AjaxrequestController.php",
      data: { trackID:trackID, action: "getmycontent" },
      type: "POST",
      dataType: "json",
      cache: false,
      success: function (data, textStatus, XMLHttpRequest) {
                console.log('success!');
                for (var i = 0; i < data.items.length; i++) {
                    /*var titel = data.items[i].titel;
                    var farbe_banner = data.items[i].farbe_banner;
                    var farbe_links = data.items[i].farbe_links;
                    var farbe_rechts = data.items[i].farbe_rechts;
                    var Contentanordnung  = data.items[i].Contentanordnung ;

            
                    $('#banner').css('background-color', farbe_banner);
                    $('#contentleft').css('background-color', farbe_links);
                    $('#contentright').css('background-color', farbe_rechts);
                    $('#column2').html('<div>' + Contentanordnung  + '</div>');*/
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('autsch!');
            }
    });
    $("#bubble-1").css('margin-top','30px');
    Animate_Bubble_right();
  });

  $("#1").click(function(){
      disappear_bubbles();
      short_description = "Dies ist ein kurzer Text der den Inhalt der Veranstaltung beschreibt";
      add_content = "<div class='additional-content additional-content-left'>Hallo</div>";
      track_title = "Der beste Vortrag aller Zeiten";
      speaker_name = "Liesa Burgey";
      $("#bubble-2").css('margin-top','90px');
      Animate_Bubble_left();
  });

});
/* Author:

*/

function draw_hsl($wrapper, options){
  options = options || {
    radius: "100px",
    lightness: "50%"
  }
  for(var i = 0; i < 360; i++){
    var from = "hsl(" + i + ", 0%, "+options.lightness+")";
    var to = "hsl(" + i +", 100%, "+options.lightness+")";
    $wrapper.append("<li style=\"width:"+options.radius+"; -webkit-transform: rotate(" + i + "deg); background: -webkit-linear-gradient(45deg,"+ from + ", " + to +");\"></li>");
  }
}

$(function(){
  var start = null;

  draw_hsl($("#hue_canvas_one"),{
    radius: "25px",
    lightness: "90%"
  });
  
  draw_hsl($("#hue_canvas_two"), {
    radius: "50px",
    lightness: "70%"
  });

  draw_hsl($("#hue_canvas_three"), {
    radius: "100px",
    lightness: "50%"
  });

  draw_hsl($("#hue_canvas_four"), {
    radius: "50px",
    lightness: "30%"
  });

  draw_hsl($("#hue_canvas_five"), {
    radius: "25px",
    lightness: "10%"
  });

  var $progressbar = $('aside.progress');
  var $progressbar_inner = $progressbar.find('figure');

  var update_progress = function(){
    var now = new Date();
    var progress = ((now - start)/(1000 * 60 * 4.8)) * 100;
  
    $progressbar_inner.css({
      width: progress + "%"
    });

    if(progress < 100){
      setTimeout(update_progress, 1000/30);
    }
    
    if(progress > 75){
      $progressbar.addClass("warning");
    }

    if(progress > 90){
      $progressbar.addClass("dire");
    }
  }

  var current = $('section:first-child');
  current.addClass("focussed");
  $(document).keypress(function(){
    if(start == null){
      start = new Date();
      update_progress();
    }

    current.removeClass("focussed");
    current = current.next();
    current.addClass("focussed");

    console.log(current.offset().top);
    $("article").animate({scrollTop: "+=" + current.offset().top}, 500);
  });
});




$(function() {

  $.mobile.loading().hide();

  console.log('Hex o’clock');
  console.log('https://github.com/idleberg/hex-o-clock');

  css = getData();

  google_font = css['font'].replace(' ', '+');
         font = getFontMetrics(css['font']);


  // Set labels
  $('#value-font-size').text(css['font-size'] + 'em');
  $('#value-invert').text(css['invert'] + '%');
  $('#value-hue').text(css['hue'] + '°');
  $('#value-saturate').text(css['saturate'] + '%');
  $('#value-brightness').text(css['brightness'] + '%');
  $('#value-contrast').text(css['contrast'] + '%');
  $('.google-font').prop('href', 'http://fonts.googleapis.com/css?family='+google_font);
  $('#input-font-family').text(css['font']);
  

  // Set slider values
  $('#input-font-size').val(css['font-size']);
  $('#input-invert').val(css['invert']);
  $('#input-hue').val(css['hue']);
  $('#input-saturate').val(css['saturate']);
  $('#input-brightness').val(css['brightness']);
  $('#input-contrast').val(css['contrast']);
  $('#input-font-family').val(css['font']);


  // Set CSS// Set textsize label
  $('#hex').css('font-size', css['font-size'] + 'em');
  $('#hex').css({
        'font-family': font['family'] + ', Menlo, "Courier New", monospace',
        'font-weight': font['weight']
      });
  $('div.background').css('-webkit-filter', 'invert('+css['invert']+'%) hue-rotate('+css['hue']+'deg) saturate('+css['saturate']+'%) brightness('+css['brightness']+'%) contrast('+css['contrast']+'%)');

  $("body").fadeIn('fast');

  // Change textsize
  $('#input-font-size').bind("mouseup mousemove keydown vmouseup vmousemove",function (e) {
    changeFont();
  });    


  // Change invert percentage
  $('.filter, .filter-label').bind("mouseup mousemove keydown vmouseup vmousemove",function (e) {
    changeFilter();
  });

  $('#input-font-family').on('input', function() {
    changeFont();
  });

  $('#label-font-size').bind("dblclick taphold", function() {
    $('#value-font-size').text('12em');
    invert = $('#input-font-size').val(12);
    changeFont();
  });

  $('#label-invert').bind("dblclick taphold",function() {
    $('#value-invert').text('0%');
    invert = $('#input-invert').val(0);
    changeFilter();
  });

  $('#label-hue').bind("dblclick taphold",function() {
    $('#value-hue').text('0°');
    hue_rotate = $('#input-hue').val(0);
    changeFilter();
  });

  $('#label-saturate').bind("dblclick taphold",function() {
    $('#value-saturate').text('100%');
    saturate = $('#input-saturate').val(100);
    changeFilter();
  });

  $('#label-brightness').bind("dblclick taphold",function() {
    $('#value-brightness').text('100%');
    brightness = $('#input-brightness').val(100);
    changeFilter();
  });

  $('#label-contrast').bind("dblclick taphold",function() {
    $('#value-contrast').text('100%');
    contrast = $('#input-contrast').val(100);
    changeFilter();
  });

  $('#label-font-family').bind("dblclick taphold",function() {
    saturate = $('#input-font-family').val('Lato:100');
    changeFont();
  });

  $('.background').bind("swipeleft",function() {
    $('.offcanvas').offcanvas('show')
  });

  $('.background').bind("swiperight",function() {
    $('.offcanvas').offcanvas('hide')
  });


  $('.close-menu').click(function (event) {
    $('.navmenu').offcanvas('hide');
  });

  
  $('.toggle-menu').delay(5000).fadeOut(5000);

  $(document).mouseleave(function() {
    $('.toggle-menu').finish().fadeOut(2000);
  });



  // http://css-tricks.com/snippets/jquery/calculate-distance-between-mouse-and-element/
  var mX, mY, distance,
  $element  = $('#sweetspot');

  function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
  }

  $(document).mousemove(function(e) {  
    mX = e.pageX;
    mY = e.pageY;
    distance = calculateDistance($element, mX, mY);
    if (distance <= 500) {
      $('.toggle-menu').finish().fadeIn(200);
    } else {
      $('.toggle-menu').fadeOut(5000);
    }   
  });


  // http://stackoverflow.com/a/23925132/1329116
  $(".modal").on("show.bs.modal", function() {
    var curModal;
    curModal = this;
    $(".modal").each(function() {
      if (this !== curModal) {
        $(this).modal("hide");
      }
    });
  });

});
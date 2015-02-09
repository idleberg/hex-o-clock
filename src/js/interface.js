$(function() {

  console.log('Hex o’clock');
  console.log('https://github.com/idleberg/hex-o-clock');

  css = getData();

  google_font = css['font'].replace(' ', '+');
         font = getFontMetrics(css['font']);


  // Set labels
  $('#valueFontSize').text(css['font-size'] + 'em');
  $('#valueInvert').text(css['invert-percentage'] + '%');
  $('#valueHue').text(css['hue-rotate'] + '°');
  $('#valueSaturate').text(css['saturate'] + '%');
  $('.google-font').prop('href', 'http://fonts.googleapis.com/css?family='+google_font);
  $('#inputFontFamily').text(css['font']);
  

  // Set slider values
  $('#inputFontSize').val(css['font-size']);
  $('#inputInvert').val(css['invert-percentage']);
  $('#inputHue').val(css['hue-rotate']);
  $('#inputSaturate').val(css['saturate']);
  $('#inputFontFamily').val(css['font']);


  // Set CSS// Set textsize label
  $('#hex').css('font-size', css['font-size'] + 'em');
  $('#hex').css({
        'font-family': font['family'] + ', Menlo, "Courier New", monospace',
        'font-weight': font['weight']
      });
  $('div.background').css('-webkit-filter', 'invert('+css['invert-percentage']+'%) hue-rotate('+css['hue-rotate']+'deg) saturate('+css['saturate']+'%)');

  $("body").fadeIn('fast');

  // Change textsize
  $('#inputFontSize').bind("click mousemove keydown",function (e) {
    changeFont();
  });    


  // Change invert percentage
  $('.filter, .filter-label').bind("click mousemove keydown",function (e) {
    changeFilter();
  });

  $('#inputFontFamily').on('input', function() {
    changeFont();
  });

  $('#labelFontSize').dblclick(function() {
    $('#valueFontSize').text('12em');
    invert = $('#inputFontSize').val(12);
    changeFont();
  });

  $('#labelInvert').dblclick(function() {
    $('#valueInvert').text('0%');
    invert = $('#inputInvert').val(0);
    changeFilter();
  });

  $('#labelHue').dblclick(function() {
    $('#valueHue').text('0°');
    hue_rotate = $('#inputHue').val(0);
    changeFilter();
  });

  $('#labelSaturate').dblclick(function() {
    $('#valueSaturate').text('100%');
    saturate = $('#inputSaturate').val(100);
    changeFilter();
  });

  $('#labelFontFamily').dblclick(function() {
    saturate = $('#inputFontFamily').val('Fira Mono:700');
    changeFont();
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
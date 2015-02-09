// load options
function getData() {

  var css = [];

  css = setDefaults();

  if (use_storage()) {
    if (debug === true) console.info('\tlocalStorage is available\n');

    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i),
      val = localStorage.getItem(key);
      css[key] = val;
      if (debug === true) console.log('\t'+key+'='+val);
    }
  }

  return css;
}


// set default options
function setDefaults() {

  var css = [];
  
               css['font'] = "Fira Mono:700";
          css['font-size'] = "12";
  css['invert-percentage'] = "0";
         css['hue-rotate'] = "0";
           css['saturate'] = "100";

  return css;
}


// get and parse font setting
function getFontMetrics(input) {

  var output = [];

  if (input.indexOf(':') > -1) {
        font_array     = input.split(':');
      output['family'] = font_array[0];
      output['weight'] = font_array[1];
      output['google'] = input.replace(' ', '+');
    } else {
      output['family'] = input;
      output['weight'] = 'inherit';
      output['google'] = input.replace(' ', '+');
    }

    return output;
}


//load and set filter settings
function changeFilter() {

    invert = $('#inputInvert').val();
       hue = $('#inputHue').val();
  saturate = $('#inputSaturate').val();

  if (debug === true) {
    console.log('Invert percentage changed to:\t'+invert);
    console.log('Hue rotate changed to:\t'+hue);
    console.log('Saturation changed to:\t'+saturate);
  }

  $('div.background').css('-webkit-filter', 'invert('+invert+'%) hue-rotate('+hue+'deg) saturate('+saturate+'%)');
  $('#valueInvert').text(invert+'%');
  $('#valueHue').text(hue+'°');
  $('#valueSaturate').text(saturate+'%');

  localStorage.setItem("invert-percentage", invert);
  localStorage.setItem("hue-rotate", hue);
  localStorage.setItem("saturate", saturate);
}


// load and set font settings
function changeFont() {
  size = $('#inputFontSize').val();
  family = $('#inputFontFamily').val();

  font = getFontMetrics(family);

  $('.google-font').delay(1500).queue( function(next){ 
    $(this).prop('href', 'http://fonts.googleapis.com/css?family='+font['google']);
    next(); 
   });

  if (debug === true) {
    console.log('Font-family changed to:\t'+family);
    console.log('Font-size changed to:\t'+size);
  }

  $('#hex').css('font-size', size+'em');
  $('#hex').css({
    'font-family': font['family'] + ', Menlo, "Courier New", monospace',
    'font-weight': font['weight']
  });

  $('#valueFontSize').text(size+'em');

  localStorage.setItem("font-size", size);
  localStorage.setItem("font", family);
}


// load localStorage
var use_storage = function() {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};


// hexclock (http://www.jacopocolo.com/hexclock/)
function timeToHex() {
  var d = new Date();
  var t = [];
    t.hour = d.getHours();
    t.min  = d.getMinutes();
    t.sec  = d.getSeconds();

    if (t.hour<=9) {t.hour = '0' + t.hour;}
    if (t.min<=9)  {t.min  = '0' + t.min;}
    if (t.sec<=9)  {t.sec  = '0' +t.sec;}

    return t;
}
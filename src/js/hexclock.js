function refreshData() {
    x = 1;  // x = seconds
    
    t = timeToHex();

    var	color = '#' + t.hour + t.min + t.sec;

    $("div.background").css({"background-color": color, "transition": "all 0.2s" });
    $("p#hex").text(color);
    $('fa-cog').css("-webkit-filter", "invert(100%");

    setTimeout(refreshData, x * precision);
}

function isOdd(num) { return num % 2;}

refreshData(); // execute function
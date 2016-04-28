// Constants
var MIN_VALUE = 1,
    MAX_VALUE = 9,
    SECOND = 1000,
    TICK = 7000;

// Variants
var colors = ['red','yellow','green','blue'];

// Tags
var tags = {};

// Tick each second
var secsCounter = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function secondsToTime(secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        h : hours,
        m : minutes,
        s : seconds
    };
    return obj;
}

function timeToString(secs) {
    var time = secondsToTime(secs), str = '';
    for (var t in time) {
        var tm = time[t];
        str += ':' + ((tm < 10) ? '0' + tm : tm);
    }
    return str.substring(1);
}

function updateClock() {
    tags.$time.text(timeToString(secsCounter));
}

function changeCard(showDefault) {
    var color = 'black', text = '';

    if (showDefault) {
        color = 'black';
        text = '?';
    } else {
        var colorIndex = getRandomInt(0, colors.length - 1);
        color = colors[colorIndex];
        text = getRandomInt(MIN_VALUE, MAX_VALUE);
    }

    tags.$body.attr('class','').addClass(color);
    tags.$value.text(text);
}

function handler() {
    secsCounter++;
    updateClock();

    switch (secsCounter * 1000 % TICK) {
        case (TICK - 2000):
        case (TICK - 1000):
            changeCard(true);
            break;
        case 0:
            changeCard();
            break;
    }
}

$(document).ready(function() {
    // Tags
    tags = {
        $body : $('body'),
        $time : $('.time'),
        $value : $('.value')
    };

    // Infinite loop
    setInterval(handler, SECOND);
});

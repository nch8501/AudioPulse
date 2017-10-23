'use strict'
//loads the app

//create app if it doesn't exist yet
var app = app || {};

//create global if it doesn't exist yet
var GLOBAL = GLOBAL || {};

//global properties
GLOBAL = {
    INKVALUE: 0.0,
    VIBRANCEVALUE: 0.0,
    MAXRADIUS: 100,
    LINEWIDTH: 1.0,
    PULSES: [],
    CIRCLECOLOR: '#FFFFFF',
    BACKCOLOR: '#000000'
},

//loads the other scripts onload
window.onload = function(){
    //initialize datguicontrol
    app.datguicontrol.init();
    //initialize audio
    app.audio.init();
    //initialize mouse
    app.mouse.init();
}
'use strict'
//controls the mouse

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

//mouse properties
app.mouse = {
    
    //whether the user is dragging or not
    dragging: null,
    
    //canvas of the program
    canvas: null,
    
    //initializes the script
    init: function(){
        this.dragging = false;
        this.canvas = document.querySelector('canvas');
        
        //call update
        this.update();
        
    },
    
    //checks for mouse input
    update: function(){
        
        //loop this function
        requestAnimationFrame(this.update.bind(this));
        
        //check mouse events
        this.canvas.onmousedown = this.onMouseDown.bind(this);
        this.canvas.onmouseup = this.onMouseUp.bind(this);
        this.canvas.onmouseout = this.onMouseOut.bind(this);
    },
    
    //mouse is down
    onMouseDown: function(e){
        
        //set dragging to true
        this.dragging = true;
        
    },
    
    //mouse is up
    onMouseUp: function(e){

        //check if dragging is true
        if(this.dragging){
            
            //get the mouse data
            var mouse = this.getMouse(e);
            
            //add a pulse at this location
            GLOBAL.PULSES.push([mouse.x, mouse.y]);
            
            //stop dragging
            this.dragging = false;
        }
    },
    
    //mouse is off the canvas
    onMouseOut: function(e){
      
        //set dragging to false
        this.dragging = false;
         
    },
    
    //get the mouse position
    getMouse: function(e){
        
        //create mouse
        var mouse = {};
        
        //get canvas bounds
        var canvasBounds = this.canvas.getBoundingClientRect();
        
        
        //get mouse position
        mouse.x = e.clientX;
        mouse.y = e.clientY - canvasBounds.top;
        
        //return the mouse
        return mouse;
    },
}
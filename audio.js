'use strict'
//controls the audio of the program

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


app.audio ={
    
    //canvas
    canvas: null,
    canvasBounds: null,
    canvas2D: null,
    ctx: null,
    width: null,
    height: null,
    texture: null,
    
    //audio values
    audioElement: null,
    audioAnalyser: null,
    audioCtx: null,
    
    //gain
    LGain: null,
    RGain: null,
    
    //splitter and merger
    splitter: null,
    merger: null,
    
    //initialize the audio
    init: function(){
        this.setupCanvas();
        this.setupAudio();
        this.setupGraphics();
        this.setupGUI();
        
    },
    
    //setup the canvas 
    setupCanvas: function(){
        
        //get the canvas working
        this.canvas = fx.canvas();
        this.canvas2D = document.querySelector('canvas');
        
        //change canvas size to correct size
        this.canvas2D.width = window.innerWidth;
        this.canvas2D.height = window.innerHeight;
        
        //create context of canvas
        this.ctx = this.canvas2D.getContext('2d');
        
        //set the width and height
        this.width = this.canvas2D.width;
        this.height = this.canvas2D.height;
        
        //set texture
        this.texture = this.canvas.texture(this.canvas2D);
        
    },
    
    
    //setup the audio
    setupAudio: function(){
        
        //setup the audio context
        this.audioCtx = new AudioContext();
        
        //get audio
        this.audioElement = document.querySelector('audio');
        var player = this.audioCtx.createMediaElementSource(this.audioElement);
        
        //setup splitter and merger
        this.splitter = this.audioCtx.createChannelSplitter(2);
        this.merger = this.audioCtx.createChannelMerger(2);
        
        //setup left and right gain
        this.LGain = this.audioCtx.createGain();
        this.RGain = this.audioCtx.createGain();
        
        //connect splitter to player
        player.connect(this.splitter, 0, 0);
        
        //connect splitter to LGain and RGain
        this.splitter.connect(this.LGain, 0);
        this.splitter.connect(this.RGain, 1);
  
        //connect left and right channels to merger
        this.LGain.connect(this.merger, 0, 0);
        this.RGain.connect(this.merger, 0, 1);
        
        //connect merger to audio
        this.merger.connect(this.audioCtx.destination)
        
        //make audio analyser
        this.audioAnalyser = this.audioCtx.createAnalyser();
        this.audioAnalyser.fftSize = 512;   
        
        //connect merger to analyser
        this.merger.connect(this.audioAnalyser);
        
    },
    
    //setup the GUI and handle song selection
    setupGUI: function(){
        
        //get the song selector
        var select = document.querySelector('select');
        
        //if it changes, change song and play it
        select.onchange = function(e){
            var path = e.target.value;
            this.audioElement.src = path;
            this.audioElement.play();
        }.bind(this)   
    },
    
    //setup the graphics
    setupGraphics: function(){
        
        //create array to hold analyser results
        var results = new Uint8Array(this.audioAnalyser.frequencyBinCount);
        
        //draw the results to the canvas
        var draw = function(){
            
            //clear canvas
            this.ctx.fillStyle = GLOBAL.BACKCOLOR;
            this.ctx.fillRect(0,0,this.width, this.height);
            
            //get analyser results
            this.audioAnalyser.getByteFrequencyData(results);
            
            //change stroke style
            this.ctx.strokeStyle = GLOBAL.CIRCLECOLOR;
            
            //change line width
            this.ctx.lineWidth = GLOBAL.LINEWIDTH;
            
            //draw a default pulse
            this.drawPulses(results, GLOBAL.MAXRADIUS, this.width/2, this.height/2);
            
            //draw the pulses
            for(var i = 0; i < GLOBAL.PULSES.length; i++)
                {
                    this.drawPulses(results, GLOBAL.MAXRADIUS, GLOBAL.PULSES[i][0], GLOBAL.PULSES[i][1]);
                }
            
            //create a texture of the canvas
            this.texture.loadContentsOf(this.canvas2D);
            
            //apply effects to the texture
            this.canvas.draw(this.texture).ink(GLOBAL.INKVALUE).vibrance(GLOBAL.VIBRANCEVALUE).update();
            
            //keep drawing
            window.requestAnimationFrame(draw);
            
        }.bind(this)
        
        //switch texture and canvas
        this.canvas2D.parentNode.insertBefore(this.canvas, this.canvas2D);
        this.canvas2D.parentNode.removeChild(this.canvas2D);

        //draw
        draw();
        
    },
    
    //changes the audio gain on left channel
    changeLGain: function(value){
        
        //change the audio gain on left channel
        this.LGain.gain.value = value;
    },
    
    //changes audio gain on right channel
    changeRGain: function(value){
        
        //change right channel gain
        this.RGain.gain.value = value;
    },
    
    //draw pulses
    drawPulses: function(results, maxRadius, xOrigin, yOrigin){
        
        //draw pulse
        for(var i = 0; i < this.audioAnalyser.frequencyBinCount; i++){
            
            //get the results of the analyser
            var value = results[i];
            
            //set the pulses's radius
            var radius = (value/255) * maxRadius;
            
            //draw the circle
            this.ctx.beginPath();
            this.ctx.arc(xOrigin, yOrigin, radius, Math.PI * 2, false);
            this.ctx.closePath(); 
            this.ctx.stroke();
        }  
    }
    
        
    
    
    
    
    
    
    
    
    
    
}
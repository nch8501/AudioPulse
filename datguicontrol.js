'use strict'
//controls the dat.gui

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

//dat.gui properties
app.datguicontrol ={
    
    //gain controllers
    LGainController: undefined,
    RGainController: undefined,
    
    //circle controllers
    vibranceController: undefined,
    inkController: undefined,
    radiusController: undefined,
    lineWidthController: undefined,
    
    //color controllers
    circleColorController: undefined,
    backColorController: undefined,
    
    
    //create controls
    controller: function(){
        this.message = 'dat.gui';
        
        //audio gain
        this.LGain = 1.0;
        //L R audio
        this.RGain = 1.0;
        //vibrance
        this.vibrance = 0.0;
        //ink
        this.ink = 0.0;
        //pulse radius
        this.radius = 50.0;
        //line radius
        this.lineWidth = 1.0;
        //circle color
        this.circleColor = '#FFFFFF';
        //background color
        this.backColor = '#000000';
    },
    
    //initialize dat.gui
    init: function(){
        
        //setup dat.gui
        var text = new this.controller();
        var gui = new dat.GUI();
        
        //add controllers
        var folder1 = gui.addFolder('Gain');
        this.LGainController = folder1.add(text, 'LGain', 0, 1).step(0.1);
        this.RGainController = folder1.add(text, 'RGain', 0, 1).step(0.1);
        
        var folder2 = gui.addFolder('Visuals');
        this.vibranceController = folder2.add(text, 'vibrance', -1, 1).step(.1);
        this.inkController = folder2.add(text, 'ink', 0, 1).step(.1);
        
        var folder3 = gui.addFolder('Circle Control');
        this.radiusController = folder3.add(text, 'radius', 0, 500).step(10);   
        this.lineWidthController = folder3.add(text, 'lineWidth', .01, 5).step(.01);
        
        var folder4 = gui.addFolder('Colors')
        this.circleColorController = folder4.addColor(text, 'circleColor');
        this.backColorController = folder4.addColor(text, 'backColor');
        
        //call update function
        this.update();
    },

    //constantly check for input to the dat.gui
    update: function(){
        //loop this function
        requestAnimationFrame(this.update.bind(this))
        
        //change the overall gain
        this.LGainController.onChange(function(value){
            
            //change gain
            this.changeLGain(value);
        }.bind(app.audio))
        
        //change the gain between left and right
        this.RGainController.onChange(function(value){
            
            //change right gain
            this.changeRGain(value);
        }.bind(app.audio))
        
        //change the vibrance
        this.vibranceController.onChange(function(value){
            
            //change vibrance
            GLOBAL.VIBRANCEVALUE = value;
        })
        
        //change ink amount
        this.inkController.onChange(function(value){
            
            //change ink value
            GLOBAL.INKVALUE = value;
        })
        
        //change radius of pulse
        this.radiusController.onChange(function(value){
            
            //change pulse radius
            GLOBAL.MAXRADIUS = value;
        }) 
        
        //change line radius
        this.lineWidthController.onChange(function(value){
            
            //change line width
            GLOBAL.LINEWIDTH = value;
        })
        
        
        //change circle color
        this.circleColorController.onChange(function(value){
            GLOBAL.CIRCLECOLOR = value;
        })
        
        //change background color
        this.backColorController.onChange(function(value){
            GLOBAL.BACKCOLOR = value;
        })
    }
}
//------------------------------------------------------
// Function from answer Inertia 
// Define a Inertia object. Set Answer for details.
// Has methods 
// update(input); Called once pre animation frame with input being the value to chase
// set(input); Hard sets the chasing value. Not drag or inertia
// Has properties
// value;  The chasing value bounds checked
function Inertia (min, max, acceleration, drag, reflect) {
    // some may question why the constants, why not use the closure on arguments
    // Reason: Some JS environments will fail to optimise code if the input
    //         arguments change. It may be tempting to extend this Object to 
    //         change the min, max or others. I put this here to highlight the
    //         fact that argument closure variables should not be modified
    //         if performance is important.
    const ac = acceleration;  // set constants
    const dr = drag;
    const minV = min;
    const maxV = max;
    const ref = -Math.abs(reflect); // ensure a negative. Why? because I always forget this is a negative.
    this.value = min;
    this.quiet = true;
    var delta = 0;

    this.update = function (input) {
         delta += (input - this.value) * ac;
         delta *= dr;
         this.value += delta;
         if (this.value < minV) {
             this.value = minV;
             if(delta < 0){
                delta *= ref;
             }
         } else
         if (this.value > maxV) {
             this.value = maxV;
             if(delta > 0){
                 delta *= ref;
             }
         }
         if(Math.abs(delta) < (maxV-minV)*0.001 && Math.abs(this.value-input) < 0.1 ){
             this.quiet = true;
         }else{
             this.quiet = false;
         }
         return this.value;
     };
     // this move the value to the required value without any inertial or drag
     // is bound checked
     this.setValue =  function (input) {
         delta = 0;
         this.quiet = true;
         this.value = Math.min(maxV, Math.max(minV, input));
         return this.value;
     }
 }
// End of answer
//--------------------------------------------------------







// All the following code is not part of the answer.
// I have not formatted, commented, and thoroughly tested it


/** MouseFullDemo.js begin **/
var canvasMouseCallBack = undefined;  // if needed
function createMouse(element){
    var demoMouse = (function(){
        var mouse = {
            x : 0, y : 0, w : 0, alt : false, shift : false, ctrl : false,
            lx:0,ly:0,
            interfaceId : 0, buttonLastRaw : 0,  buttonRaw : 0,
            over : false,  // mouse is over the element
            bm : [1, 2, 4, 6, 5, 3], // masks for setting and clearing button raw bits;
            getInterfaceId : function () { return this.interfaceId++; }, // For UI functions
            startMouse:undefined,
        };
        function mouseMove(e) {
            //console.log(e)
            var t = e.type, m = mouse;
            m.lx = e.offsetX; m.ly = e.offsetY;
            m.x = e.clientX; m.y = e.clientY; 
            m.alt = e.altKey;m.shift = e.shiftKey;m.ctrl = e.ctrlKey;
            if (t === "mousedown") { m.buttonRaw |= m.bm[e.which-1];
            } else if (t === "mouseup") { m.buttonRaw &= m.bm[e.which + 2];
            } else if (t === "mouseout") {m.over = false;
            } else if (t === "mouseover") { m.over = true;
            } else if (t === "mousewheel") { m.w = e.wheelDelta;
            } else if (t === "DOMMouseScroll") { m.w = -e.detail;}
            if (canvasMouseCallBack) { canvasMouseCallBack(m.x, m.y); }
            e.preventDefault();
        }
        function startMouse(element){
            if(element === undefined){
                element = document;
            }
            "mousemove,mousedown,mouseup,mouseout,mouseover,mousewheel,DOMMouseScroll".split(",").forEach(
            function(n){element.addEventListener(n, mouseMove);});
            element.addEventListener("contextmenu", function (e) {e.preventDefault();}, false);
        }
        mouse.mouseStart = startMouse;
        return mouse;
    })();
    demoMouse.mouseStart(element);
    return demoMouse;
}
/** MouseFullDemo.js end **/


var cellSize = 70;
var createImage=function(w,h){
    var i=document.createElement("canvas");
    i.width=w;
    i.height=h;
    i.ctx=i.getContext("2d");
    return i;
}
var drawCircle= function(img,x,y,r,col,colB,col1,width){
    var c = img.ctx;
    var g;
    c.lineWidth = width;
    c.strokeStyle = col1;
    g = c.createRadialGradient(x,y,1,x,y,r);
    g.addColorStop(0,col);
    g.addColorStop(1,colB);
    c.fillStyle = g;
    c.beginPath();
    c.arc(x,y,r-width*3,0,Math.PI*2);
    c.fill();

    c.strokeStyle = col1;
    c.fillStyle = col1;
    c.fillRect(x,y-width,r,width*2)
    c.fillStyle = col;
    c.fillRect(x+width,y-width/2,r,width)
}
var drawCircleO= function(img,x,y,r,col,colB,col1,width){
    var c = img.ctx;
    var g = c.createRadialGradient(x+r*0.21,y+r*0.21,r*0.7,x+r*0.21,y+r*0.21,r);
    g.addColorStop(0,"black");
    g.addColorStop(1,"rgba(0,0,0,0)");
    c.fillStyle = g;
    c.globalAlpha = 0.5;
    c.beginPath();
    c.arc(x+r*0.21,y+r*0.21,r,0,Math.PI*2);
    c.fill();
    c.globalAlpha = 1;
    var g = c.createRadialGradient(x*0.3,y*0.3,r*0.5,x*0.3,y*0.3,r);
    g.addColorStop(0,col);
    g.addColorStop(1,colB);
    c.lineWidth = width;
    c.strokeStyle = col1;
    c.fillStyle = g;
    c.beginPath();
    c.arc(x,y,r-width,0,Math.PI*2);
    c.stroke();
    c.fill();
}
// draws radial marks with miner markes 
// len,col and width are arrays
var drawCircleMarks= function(img,x,y,r,start,end,col,width,length,number,miner){
    var i,vx,vy,count,style,len;
    var c = img.ctx;
    var step = (end-start)/number;
    count = 0;

    end += step/2; // add to end to account for floating point rounding error
    for(i = start; i <= end; i+= step){
        vx = Math.cos(i);
        vy = Math.sin(i);
        if(count % miner === 0){
            style = 0;
        }else{
            style = 1;
        }
        c.strokeStyle = col[style];
        c.lineWidth = width[style];
        len = length[style];
        c.beginPath();
        c.moveTo(vx*r+x,vy*r+y);
        c.lineTo(vx*(r+len)+x,vy*(r+len)+y);
        c.stroke();
        count += 1;

    }
}

var defaultMap = {
    number:function(num,def){
        if( isNaN(num) ){
            return def
        }
        return Number(num);
    },
    colour:function(col,def){
        // no much code for demo so removed
        if(col === undefined || typeof col !== "string"){
            return def;
        }
        return col;
    },
    "ticks":{
        validate:function(val){
            return val===undefined?true:val?true:false;
        },
    },
    "type":{
        validate:function(val){
            switch (val) {
                case "dial":
                case "horizontal-slider":
                    return val;
            }
            return undefined
        }
    },
    "min":{
        validate:function(val){
            return defaultMap.number(val,0);
        }
    },
    "max":{
        validate:function(val){
            return defaultMap.number(val,100);
        }
    },
    "drag":{
        validate:function(val){
            return defaultMap.number(val,0.4);
        }
    },    
    "reflect":{
        validate:function(val){
            return defaultMap.number(val,0.2);
        }
    },
    "accel":{
        validate:function(val){
            return defaultMap.number(val,0.4);
        }
    },
    "value":{
        validate:function(val){
            return defaultMap.number(val,0);
        }
    },
    "tick-color":{
        validate:function(val){
            
        }
    },
    "decimals":{
        validate:function(val){
            return defaultMap.number(val,0);
        }
    },
    "display":{
        validate:function(val){
            if(val === null || val === undefined || typeof val !== "string"){
                return undefined;
            }
            return document.querySelector(val);
        }
    }
}

// validates user defined DOM attribute
function getSafeAttribute(element,name){
    var val,def;
    if(name === undefined){
        return undefined;
    }
    def = defaultMap[name];
    if(def === undefined){ // unknown attribute 
        if(element.attributes["data-"+name]){
            return element.attributes["data-"+name].value;
        }
        return undefined
    }
    if(element.attributes["data-"+name]){
        val = element.attributes["data-"+name].value;
    }
    return def.validate(val);
}
// Custom user control
// Warning this can return a undefined control
function Control(element,owner){
    var dialUpdate,drawFunc,w,h,nob,back,mouse,minSize,canvas,chaser,dragging,dragX,dragY,dragV,realValue,startP,endP,lastVal,reflect,drag,accel;
    var dialUpdate = function(){
        var unitPos = (this.value-this.min)/(this.max-this.min);
        canvas.ctx.setTransform(1,0,0,1,0,0);
        canvas.ctx.clearRect(0,0,w,h);
        canvas.ctx.drawImage(back,0,0);
        canvas.ctx.setTransform(1,0,0,1,back.width/2,back.height/2);
        canvas.ctx.rotate(unitPos *(endP-startP)+startP);
        canvas.ctx.drawImage(nob,-nob.width/2,-nob.height/2);
    }

    if(element === undefined){ // To my UNI mentor with love.. LOL
         return undefined; 
    }
    this.type = getSafeAttribute(element,"type");
    if(this.type === undefined){
        return undefined;     // this is a non standared contrutor return
    }
    
    this.owner = owner; // expose owner
    // exposed properties
    this.min = getSafeAttribute(element,"min");
    this.max = getSafeAttribute(element,"max");
    this.ticks = getSafeAttribute(element,"ticks");
    this.tickColor = getSafeAttribute(element,"tick-color");
    this.value = realValue = getSafeAttribute(element,"value");

    this.display = getSafeAttribute(element,"display");
    if(this.display){
        var decimals  = getSafeAttribute(element,"decimals");
    }
    drag = getSafeAttribute(element,"drag");
    accel = getSafeAttribute(element,"accel");  
    reflect = getSafeAttribute(element,"reflect");;
    chaser = new Inertia(this.min,this.max,accel,drag,reflect);
    
    w = element.offsetWidth;
    h = element.offsetHeight;

    canvas = createImage(w,h);
    minSize = Math.min(w,h);
    mouse = createMouse(element);
    if(this.type === "dial"){
        nob = createImage(minSize*(3/4),minSize*(3/4));
        drawCircle(nob,minSize*(3/4)*(1/2),minSize*(3/4)*(1/2),minSize*(3/4)*(1/2),"white","#CCC","black",3);
        back = createImage(minSize,minSize);
        startP = Math.PI*(3/4);
        endP = Math.PI*(9/4);
        drawCircleMarks(
            back,
            minSize/2,
            minSize/2,
            minSize/3,
            startP,
            endP,
            ["black","#666"],
            [2,1],
            [minSize*(1/4),minSize*(1/9)],
            16,
            4
        );
        drawCircleO(back,minSize*(1/2),minSize*(1/2),minSize*(3/4)*(1/2),"white","#aaa","black",3);        
        drawFunc = dialUpdate.bind(this);
    }
    element.appendChild(canvas);
    this.active = true;
    this.resetChaser = function(min,max,accel1,drag1,reflect1){
        this.min = min===null?this.min:min;
        this.max = max===null?this.max:max;
        drag = drag1===null?drag:drag1;
        accel = accel1===null?accel:accel1;
        reflect = reflect1===null?reflect:reflect1;
        chaser = new Inertia(this.min,this.max,accel,drag,reflect);
        
        chaser.setValue(this.value);
        drawFunc();
    }
    this.update = function(){
        var inVal;
        if(mouse.over){
            element.style.cursor = "drag_ew";
        }
        if((this.owner.mouse.buttonRaw&1) === 1 && !dragging && mouse.over && this.owner.draggingID === -1){
            dragX = this.owner.mouse.x - (mouse.lx-w/2);
            dragY = this.owner.mouse.y - (mouse.ly-h/2);
            dragging = true;
            this.owner.draggingID = this.ID;
        }else
        if(this.owner.draggingID === this.ID && ((this.owner.mouse.buttonRaw&1) === 1 || (this.owner.mouse.buttonRaw&1) === 0) && dragging){
            inVal = (Math.atan2(this.owner.mouse.y-dragY,this.owner.mouse.x-dragX)+Math.PI*2);
            if(inVal > Math.PI*0.5+Math.PI*2){
                 inVal -= Math.PI*2;
            }
            realValue = inVal;
            realValue = ((realValue-startP)/(endP-startP))*(this.max-this.min)+this.min;
            if((this.owner.mouse.buttonRaw&1) === 0){
                dragging = false;  
                this.owner.draggingID = -1;
            }
        }
        realValue = Math.min(this.max,Math.max(this.min,realValue));
        this.value = chaser.update(realValue);
        
        if(!chaser.quiet){
            drawFunc();
            if(this.display){
                this.display.textContent = realValue.toFixed(decimals);
            }
            if(this.onchange !== undefined && typeof this.onchange === "function"){
                this.onchange({value:realValue,target:element,control:this});
            }
        }
    }
    // force chaser to wake up
    chaser.setValue(this.value);
    drawFunc();
    element.control = this;
}

// find and create controllers
function Controllers(name){
    var controls, elems, i, control, e;
    var ID = 0;
    controls = [];
    elems = document.querySelectorAll("."+name);
    for(i = 0; i < elems.length; i++){
        e = elems[i];
        control = new Control(e,this);
        control.ID = ID++;
        if(control !== undefined){
            controls.push(control);
        }
    }
    this.update = function(){
        controls.forEach(function(cont){
            cont.update();
        })
    }
    this.mouse = createMouse(document);
    this.draggingID = -1;
}

// get elements to play with the large control
var c = new Controllers("testControl");
var drag = document.getElementById("dragSetting");
var accel = document.getElementById("accelSetting");
var reflect = document.getElementById("reflectSetting");
var bigDial = document.getElementById("bigDial");
var bigDialt = document.getElementById("bigDialText");
// callback for large controller
function changeBigDial(e){
    bigDial.control.resetChaser(null,null,drag.control.value,accel.control.value,reflect.control.value);
    if(accel.control.value === 0 || drag.control.value === 0){
        var str = "Can no move as Drag and/or Acceleration is Zero";
    }else{
        var str  = "A:"+ accel.control.value.toFixed(3);
        str += "D:"+ drag.control.value.toFixed(3);
        str += "R:-"+ reflect.control.value.toFixed(3);
    }
    bigDialt.textContent = str;
}
// set callbacks
drag.control.onchange = changeBigDial;
accel.control.onchange = changeBigDial;
reflect.control.onchange = changeBigDial;

// Update all controls
function update(){
    c.update();
    requestAnimationFrame(update);
}
update();

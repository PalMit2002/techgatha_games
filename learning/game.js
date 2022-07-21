var myGamePiece;
var n = 1;
var ele = document.getElementById('canvas');
var myObstacles = [];
var myScore;
var myBack;
var crashSound;
var music;
var res=new restart("Play","pl");
res.load();

function startGame() {
    myGamePiece = new component(30, 30, "bird.png", 10, 120,"image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myBack = new component(656,270,"back.jpg",0,0,"back");
    crashSound = new sound("crash.mp3");
    music = new sound("music.mp3");
    music.play();
    crashSound.stop();
    myObstacles=[];
    myGameArea.start();
}
var myGameArea = {
    
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        ele.appendChild(this.canvas)
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        myGameArea.canvas.style.opacity = "1.0";
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener("keydown", function(e){
            myGameArea.keys = e.keyCode;
        })
        window.addEventListener("keyup", function(e){
            myGameArea.keys= false;
            myGamePiece.image.src ="bird.png";
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y,type) {
    this.type = type;
    if(this.type=="image"||this.type=="back"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = myGameArea.context;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if(this.type == "image" || this.type == "back"){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
        else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith= function(otherobj){
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myleft > otherright) || (myright < otherleft)){
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    for (i=0;i<myObstacles.length;i++){
        if(myGamePiece.crashWith(myObstacles[i])){
            crashSound.play();
            music.stop();
            res.load();
            myGameArea.canvas.style.opacity="0.2";  
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myBack.newPos();
    myBack.update();
    var x,gap,height,minht,maxht,mingap,maxgap;
    myGameArea.frameNo += 1;
    n += 0.001;
    if(myGameArea.frameNo<1000){
        if (myGameArea.frameNo == 1 || everyInterval(100)){
            x = myGameArea.canvas.width;
            minht = 20;
            maxht = 200;
            height = Math.floor(Math.random()*(maxht - minht + 1) + minht);
            mingap = 50;
            maxgap = 100;
            gap = Math.floor(Math.random()*(maxgap - mingap + 1) + mingap);
            y = myGameArea.canvas.height - 200;
            myObstacles.push(new component(10,height,"green",x,0));
            myObstacles.push(new component(10,x - height - gap,"green",x,height+gap))
        }
    }
    else{
        if (myGameArea.frameNo == 1 || everyInterval(50)){
            x = myGameArea.canvas.width;
            minht = 20;
            maxht = 200;
            height = Math.floor(Math.random()*(maxht - minht + 1) + minht);
            mingap = 50;
            maxgap = 100;
            gap = Math.floor(Math.random()*(maxgap - mingap + 1) + mingap);
            y = myGameArea.canvas.height - 200;
            myObstacles.push(new component(10,height,"green",x,0));
            myObstacles.push(new component(10,x - height - gap,"green",x,height+gap))
        }
    }
    
    for(i=0;i<myObstacles.length;i++){
        myObstacles[i].x -= 2 + myGameArea.frameNo * 0.001;
        myObstacles[i].update();
    }
    myScore.text = "Score: "+myGameArea.frameNo;
    myScore.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys==38) {
        myGamePiece.speedY = -2 - myGameArea.frameNo * 0.001;
    }
    if (myGameArea.keys && myGameArea.keys==40) {
        myGamePiece.speedY = 2 + myGameArea.frameNo * 0.001; 
    }
    if (myGameArea.keys==39) {
        for(i=0;i<myObstacles.length;i++){
            myObstacles[i].x -= Math.ceil(myObstacles[i].speedX) + 1;
        }
    }
//    if (myGameArea.keys==37) {
//        for(i=0;i<myObstacles.length;i++){
//            myObstacles[i].x += Math.ceil(myObstacles[i].speedX) + 1;
//        } 
//    }
    myGamePiece.newPos();
//    myBack.speedX = -1;
    myGamePiece.update();
    
}

function everyInterval(n){
    if((myGameArea.frameNo/n) % 1 == 0){
        return true;
    }
    return false;
}


function sound(src) {
  this.sound1 = document.createElement("audio");
  this.sound1.src = src;
  this.sound1.setAttribute("preload", "auto");
  this.sound1.setAttribute("controls", "none");
  this.sound1.style.display = "none";
  //this.sound1.muted = "muted";
  document.body.appendChild(this.sound1);
  this.play = function(){
    this.sound1.play();
  }
  this.stop = function(){
    this.sound1.pause();
  }
}

function restart(text,id){
    var b;
    this.load = function(){
        b=document.createElement("button");
        b.innerHTML=text;
        b.setAttribute("id",id);
        ele.appendChild(b);
        b.addEventListener("click",this.click);
    }
    this.remove = function(){
        ele.removeChild(b);
    }
    this.click = function(){
        this.remove();
        startGame();
    }
}
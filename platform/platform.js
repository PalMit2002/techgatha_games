var rect;
var canvas;
var rect2;
var endPlatform;
var stars;
var time=0;
var endTime;
var coinCount = 0;
var endCoin;
var i;
var checkLevel = 0;
var start;
var myGamePiece;
var grav=0.5;
var gravity = grav;
var myPlatform = [];
var myDisPlat = [];
var disPlat = [];
var crash = [];
var colorPiece = "red";
var colorp = "green";
var colorc = "gold";
var colorf = "black";
var colors = "black";
var colori = "black";
var colorb = "#964b00";
var colord = "#2c3765";
var prevPos = function(n){
    return (myPlatform[n-1].x+myPlatform[n-1].width);
}
var disPos = function(n){
    return (myDisPlat[n-1].x + myDisPlat[n-1].width);
}
var myCoin = [];
var collect = [];
var myScore = [];
var button=[];
var btnColor = ["red","blue","orange"];
var end = false;
var myScoreInstr;
var myPieceInstr = [];

var myText = [];
var level =[];
var colorl = "black";
var color = ["blue","red","yellow","#2c3765"];
var mouseX;
var mouseY;

function levelSelect(){
    start = 0;
    myGameArea.start();
    myText[0] = new component("54px","Sans",colorl,355,150,"text");
    myText[0].text = "Select a Level";
    level[0] = new component(100,40,color[0],300,300,"level0");
    level[1] = new component(100,40,color[1],450,level[0].y,"level1");
    level[2] = new component(100,40,color[2],600,level[0].y,"level2");
    level[3] = new component(400,40,color[3],300,400,"level4");
    myText[1] = new component("30px","Sans",colorl,level[0].x + 5,level[0].y + 30,"text");
    myText[1].text = "Level 1";
    myText[2] = new component("30px","Sans",colorl,level[1].x + 5,level[1].y + 30,"text");
    myText[2].text = "Level 2";
    myText[3] = new component("30px","Sans",colorl,level[2].x + 5,level[2].y + 30,"text");
    myText[3].text = "Level 3";
    myText[4] = new component("30px","Sans","#f5a025",435,level[3].y + 30,"text");
    myText[4].text = "ENDLESS";
    
    for(i=0;i<level.length;i++){
        level[i].update();
    }
    for(i=0;i<myText.length;i++){
        myText[i].update();
    }
    canvas = document.getElementById('canvasActual');
    canvas.addEventListener('click', checkClick1);
}

function checkClick1(e){
    mouseX = e.clientX * 10/9 * 1000/window.innerWidth; 
    mouseY = e.clientY * 10/9 * 600/window.innerHeight;
    rect = level[0];
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick1);
        myGameArea.clear();
        myGameArea.stop();
        start = 1;
        startGame();
    }
    rect = level[1]
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick1);
        myGameArea.clear();
        myGameArea.stop();
        start = 1;
        startGame2();
    }
    rect = level[2];
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick1);
        myGameArea.clear();
        myGameArea.stop();
        start = 1;
        startGame3();
    }
    rect = level[3];
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick1);
        myGameArea.clear();
        myGameArea.stop();
        start = 1;
        startGame4();
    }  
    //canvas.removeEventListener('click', checkClick1);
}

function checkClick2(e){
    mouseX = e.clientX * 10/9 * 1000/window.innerWidth; 
    mouseY = e.clientY * 10/9 * 600/window.innerHeight;
    rect = button[0];
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick2);
        myGameArea.clear();
        myGameArea.stop();
        if(checkLevel == 1){
            start = 1;
            startGame();
        }
        else if(checkLevel == 2){
            start = 1;
            startGame2();
        }
        else if(checkLevel == 3){
            start = 1;
            startGame3();
        }
        else if(checkLevel == 4){
            start = 1;
            startGame4();
        }
    }
    rect = button[1];
    if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
        canvas.removeEventListener('click', checkClick2);
        myGameArea.clear();
        myGameArea.stop();
        start = 0;
        levelSelect();
    }
    if(checkLevel != 4){
        rect = button[2];
        if((mouseX >= rect.x) && (mouseX <= (rect.x + rect.width)) && (mouseY >= rect.y) && (mouseY<=(rect.y + rect.height))){
            canvas.removeEventListener('click', checkClick2);
            myGameArea.clear();
            myGameArea.stop();
            if(checkLevel == 1){
                start = 1;
                startGame2();
            }
            else if(checkLevel == 2){
                start = 1;
                startGame3();
            }
            else if(checkLevel == 3){
                start = 1;
                startGame4();
            }
        }
    }
    
}



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas").appendChild(this.canvas);
        this.canvas.setAttribute("id","canvasActual")
        this.frameNo = 0;
        if(start == 1){
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
            window.addEventListener('keyup', function (e) {
                myGameArea.keys[e.keyCode] = (e.type == "keydown");            
            })
            
        }
    },
    clear: function() {
        this.context.clearRect(-10000,-10000,20000,20000);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.gameArea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;     
    this.x = x;
    this.y = y;
    this.type = type;
    this.update = function() {
        var ctx = myGameArea.context;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text,this.x,this.y);
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
    this.crashWith = function(otherobj,n){
        var myLeft = this.x;
        var myRight = this.x + this.width;
        var myTop = this.y;
        var myBottom = this.y + this.height;
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + otherobj.width;
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + otherobj.height;
        if(!(myLeft > otherRight || myRight < otherLeft || myTop > otherBottom || myBottom < otherTop)){
            if(otherobj == endPlatform){
                myGameArea.stop();
                end = true;
                endGame();
            }
            else{
                if(otherobj.type == "platform" || otherobj.type == "brplat" || otherobj.type == "displat"){  
                    myGamePiece.speedX = 0;
                    myGamePiece.speedY = 0;
                    if(myGameArea.keys && myGameArea.keys[37]){
                        if(myGamePiece.x < myGameArea.canvas.width / 2){
                            myGamePiece.speedX = -5;
                        }
                    }
                    if(myGameArea.keys && myGameArea.keys[38]){
                        myGamePiece.speedY = -10;
                    }
                    if(myGameArea.keys && myGameArea.keys[39]){
                        if(myGamePiece.x < myGameArea.canvas.width / 2){
                            myGamePiece.speedX = 5;
                        }
                    }
                    if(myTop < otherTop){
                        this.y = otherTop - this.height;
                        gravity = 0;
                    }
                    else if(myLeft < otherLeft){
                        this.x = otherLeft - this.width;
                    }
                    else if(myBottom > otherBottom){
                        this.y = otherBottom;
                    }
                    else if(myRight > otherRight){
                        this.x = otherRight;
                    }
                    
                    if(otherobj.type == "brplat"){
                        setTimeout(function(){ crash[n]=1; },500);
                    }
                }
                if(otherobj.type=="coin"){
                    if((myTop < otherTop) || (myLeft < otherLeft) || (myBottom > otherBottom) || (myRight > otherRight)){   
                        coinCount += 1;
                        collect[n]=1;
                        if(checkLevel == 4){
                            time += 100;
                        }
                    }
                }
            }
            
        }
    }
    this.lose = function(){
        if((this.y + this.height) > myGameArea.canvas.height) {
            myGameArea.stop();
            endGame();
        }
        else if((this.x + this.width) > myGameArea.canvas.width){
            myGameArea.stop();
            endGame();
        }
    }
}

function updateGameArea(){
    myGameArea.frameNo +=1;
    myGameArea.clear();
    gravity = grav;
    myGamePiece.speedY += gravity;
    myGamePiece.newPos();
    myGamePiece.update();
    myScoreInstr.update();
    if(checkLevel == 4){
        createPlatform(myGameArea.frameNo);
        createCoin(myGameArea.frameNo);
    }
    if(myGameArea.keys && myGameArea.keys[39]){
        if(myGamePiece.x >= myGameArea.canvas.width / 2){
            for(i=0;i<myPlatform.length;i++){
                myPlatform[i].speedX = -5; 
                myPlatform[i].newPos();
            }
            for(i=0;i<myCoin.length;i++){
                if(collect[i] == 0){
                    myCoin[i].speedX = -5;
                    myCoin[i].newPos();
                }
            }
            for(i=0;i<myPieceInstr.length;i++){
                myPieceInstr[i].speedX = -5;
            }
            
            for(i=0;i<myDisPlat.length;i++){
                myDisPlat[i].speedX = -5;
                myDisPlat[i].newPos();
            }
        }
    }
    if(myGameArea.keys && myGameArea.keys[37]){
        if(myGamePiece.x >= myGameArea.canvas.width / 2){
            for(i=0;i<myPlatform.length;i++){
                myPlatform[i].speedX = 5;
                myPlatform[i].newPos();
            }
            for(i=0;i<myCoin.length;i++){
                if(collect[i] == 0){
                    myCoin[i].speedX = 5;
                    myCoin[i].newPos();
                }
            }
            for(i=0;i<myPieceInstr.length;i++){
                myPieceInstr[i].speedX = 5;
            }
            for(i=0;i<myDisPlat.length;i++){
                myDisPlat[i].speedX = 5;
                myDisPlat[i].newPos();
            }
        }
    }
    
    if(checkLevel == 4){
        time -= 1;
        myScore[0].text = "Score: " + time;
        myScore[0].update();
    }
    else{
        time = (myGameArea.frameNo * 0.02).toFixed(2);
        myScore[0].text = "Time: " + time;
        myScore[0].update();
        myScore[1].text = "Coins: " + coinCount;
        myScore[1].update();
    }
    for(var m=0;m<myPieceInstr.length;m++){
        myPieceInstr[m].newPos();
        myPieceInstr[m].update();
        myPieceInstr[m].speedX= 0;
    }
    for(var l=0;l<myCoin.length;l++){
        if(collect[l] == 0){
            myCoin[l].speedX = 0;
            myCoin[l].speedY = 0;
            myCoin[l].newPos();
            myCoin[l].update();
            myGamePiece.crashWith(myCoin[l],l);
        }
    }
    for(i=0;i<myDisPlat.length;i++){
        myDisPlat[i].speedX = 0;
        myDisPlat[i].speedY = 0;
        myDisPlat[i].newPos();
        if(myGameArea.frameNo % 125 == 0){
            disPlat[i] = !disPlat[i];
        }
        if(disPlat[i]){
            myDisPlat[i].update();        
            myGamePiece.crashWith(myDisPlat[i],i);
        }    
    }
    for(i=0;i<myPlatform.length;i++) {
        if(crash[i] == 0){
            myPlatform[i].speedX = 0;
            myPlatform[i].speedY = 0;
            myPlatform[i].newPos();
            myPlatform[i].update();
            myGamePiece.crashWith(myPlatform[i],i);
        }
    }
    myGamePiece.lose();
}

function endGame(){
    button = [];
    myGameArea.clear();
    myScore[0].x = myGameArea.canvas.width/2 - 150;
    myScore[0].y = myGameArea.canvas.height/2 - 150;
    colors = "green";
    myScore[0].width = "70px";
    if(checkLevel==4){
        myScore[0].text = "Score: "+time;
        myScore[1].x = myGameArea.canvas.width/2 - 150;
        myScore[1].y = myGameArea.canvas.height/2 - 70;
        myScore[1].text = "";
        myScore[1].width = "70px";
        myScore[2] = new component("50px","Times",colors,myGameArea.canvas.width/2 -100,myGameArea.canvas.height/2 + 40,"text");
        myScore[2].text = "";
    }
    else{
        myScore[0].text = "Time: "+time+"/"+endTime;
        myScore[1].x = myGameArea.canvas.width/2 - 150;
        myScore[1].y = myGameArea.canvas.height/2 - 70;
        myScore[1].text = "Coins: "+coinCount+"/"+endCoin;
        myScore[1].width = "70px";
        myScore[2] = new component("50px","Times",colors,myGameArea.canvas.width/2 -100,myGameArea.canvas.height/2 + 40,"text");
        if(end == true){
            stars=1;
            if(coinCount == endCoin){
                stars += 1;
            }
            if(time <= endTime){
                stars += 1;
            }
            myScore[2].text = stars + " Stars!";
        }
        else{
            myScore[2].text = "You Lose";
        }
        button[2] = new component(190,50,btnColor[2],myGameArea.canvas.width/2 - 120,myGameArea.canvas.height/2 + 160,"");
        myScore[5] = new component("40px","Sans","black",button[2].x +5,button[2].y + 40,"text");
        myScore[5].text = "Next Level";
    }
    button[0] = new component(135,40,btnColor[0],myGameArea.canvas.width/2-200,myGameArea.canvas.height/2 + 100,"");
    myScore[3] = new component("30px","Sans","black",button[0].x +5,button[0].y + 30,"text");
    button[1] = new component(150,40,btnColor[1],myGameArea.canvas.width/2,myGameArea.canvas.height/2 + 100,"");
    myScore[4] = new component("30px","Sans","black",button[1].x +5,button[1].y + 30,"text");
    myScore[3].text = "Try Again";
    myScore[4].text = "Main Menu";
    for(var j=0;j<button.length;j++){
        button[j].update();
    }
    for(j=0;j<myScore.length;j++){
        myScore[j].update();
    }
    canvas = document.getElementById('canvasActual');
    canvas.addEventListener('click', checkClick2);
}

//level1
function startGame(){
    endTime = 18;
    stars = 0;
    coinCount = 0;
    myCoin =[];
    myScore = [];
    myPlatform = [];
    collect =[];
    myPieceInstr = [];
    myDisPlat = [];
    disPlat =[];
    checkLevel = 1;
    start = 1;
    end = false;
    myGameArea.start();
    myGamePiece = new component(30,30,colorPiece,10,120,"");
    myPlatform[0] = new component(480,20,colorp,0,500,"platform");
    myPlatform[1] = new component(250,20,colorp,prevPos(1) + 50, 420,"platform");
    myPlatform[2] = new component(250,20,colorp,prevPos(2) + 100,400,"platform");
    myPlatform[3] = new component(150,20,colorp,prevPos(3) + 100,450,"platform");
    myPlatform[4] = new component(150,20,colorp,prevPos(4) + 100,390,"platform");
    myPlatform[5] = new component(100,20,colorp,prevPos(5) + 120,300,"platform");
    myPlatform[6] = new component(100,20,colorp,prevPos(6) + 150,450,"platform");
    myPlatform[7] = new component(10000,20,colorf,prevPos(7) + 110,400,"platform");
    endPlatform = myPlatform[7];
    myCoin[0] = new component(10,10,colorc,240,480,"coin");
    myCoin[1] = new component(10,10,colorc,myPlatform[1].x + 125,350,"coin");
    myCoin[2] = new component(10,10,colorc,myPlatform[2].x - 50,300,"coin");
    myCoin[3] = new component(10,10,colorc,myPlatform[3].x - 50,300,"coin");
    myCoin[4] = new component(10,10,colorc,myPlatform[3].x + 150,290,"coin");
    myCoin[5] = new component(10,10,colorc,myPlatform[4].x + 150,200,"coin");
    myCoin[6] = new component(10,10,colorc,myPlatform[6].x - 50,200,"coin");
    myCoin[7] = new component(10,10,colorc,myPlatform[6].x - 50,370,"coin");
    endCoin = 8;
    for(i=0;i<myCoin.length;i++){
        collect[i] = 0;
    }
    
    for(i=0;i<myPlatform.length;i++){
        crash[i] = 0;
    }
    myScore[0] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 50,"text");
    myScore[1] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 100,"text");
    myScoreInstr = new component("30px","Sans",colori,350,50,"text");
    myPieceInstr[0] = new component("20px","Sans",colori,10,400,"text");
    myPieceInstr[1] = new component("20px","Sans",colori,12,420,"text");
    myPieceInstr[2] = new component("20px","Sans",colori,240,440,"text");
    myPieceInstr[3] = new component("20px","Sans",colori,240,460,"text");
    myPieceInstr[4] = new component("20px","Sans",colori,myPlatform[7].x,300,"text");
    myPieceInstr[0].text = "Use arrow keys";
    myPieceInstr[1].text = "to move";
    myPieceInstr[2].text = "Collect coins to";
    myPieceInstr[3].text = "increase score by 1000";
    myPieceInstr[4].text = "Land on " + colorf + " platform to finish";    
    myScoreInstr.text = "Complete in least possible time =>";
}

//level2
function startGame2(){
    coinCount = 0;
    time = 0;
    endTime  = 15;
    stars = 0;
    checkLevel = 2;
    myPlatform = [];
    myScore = [];
    myCoin = [];
    collect=[];
    myPieceInstr=[];
    myDisPlat = [];
    disPlat =[];
    end = false;
    start = 1;
    myGameArea.start();
    myGamePiece = new component(30,30,colorPiece,20,300,"");
    myPlatform[0] = new component(700,20,colorp,0,500,"platform");
    myPlatform[1] = new component(100,20,colorp,prevPos(1) + 80,420,"platform");
    myPlatform[2] = new component(50,20,colorp,myPlatform[1].x - 130,340,"platform");
    myPlatform[3] = new component(300,20,colorp,prevPos(3) + 50,260,"platform");
    myPlatform[4] = new component(100,20,colorp,prevPos(4)+150,400,"platform");
    myPlatform[5] = new component(100,20,colorp,prevPos(5)+100,320,"platform");
    myPlatform[6] = new component(40,20,colorp,myPlatform[4].x + 100,240,"platform");
    myPlatform[7] = new component(10000,20,colorf,prevPos(6) + 100, 480,"platform");
    endPlatform = myPlatform[7];
    
    myCoin[0] = new component(10,10,colorc,myPlatform[2].x,myPlatform[2].y + 30,"coin");
    myCoin[1] = new component(10,10,colorc,100,450,"coin");
    myCoin[2] = new component(10,10,colorc,myPlatform[3].x - 25,myPlatform[3].y,"coin");
    myCoin[3] = new component(10,10,colorc,prevPos(4) + 75,myPlatform[3].y - 100,"coin");
    myCoin[4] = new component(10,10,colorc,myPlatform[6].x - 20,myPlatform[6].y + 10,"coin");
    myCoin[5] = new component(10,10,colorc,myPlatform[6].x + 10,myPlatform[6].y - 100,"coin");
    myCoin[6] = new component(10,10,colorc,myPlatform[7].x +150,myPlatform[7].y - 10,"coin");
    
    endCoin = myCoin.length;
    myScore[0] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 50,"text");
    myScoreInstr = new component("40px","Sans",colori,100,50,"text");
    myScoreInstr.text = "";
    myScore[1] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 100,"text");
    for(i=0;i<myCoin.length;i++){
        collect[i] = 0;
    }
    for(i=0;i<myPlatform.length;i++){
        crash[i] = 0;
    }
}

//level3
function startGame3(){
    crash = [];
    coinCount = 0;
    time = 0;
    endTime  = 25;
    stars = 0;
    checkLevel = 3;
    myPlatform = [];
    myScore = [];
    myCoin = [];
    collect=[];
    myPieceInstr=[];
    myDisPlat = [];
    disPlat =[];
    end = false;
    start = 1;
    myGameArea.start();
    myGamePiece = new component(30,30,colorPiece,20,300,"");
    myPlatform[0] = new component(700,20,colorp,0,500,"platform");
    myPlatform[1] = new component(50,20,colorb,prevPos(1) + 20, 420,"brplat");
    myPlatform[2] = new component(50,20,colorp,prevPos(2) + 200, 550,"platform");
    myPlatform[3] = new component(80,20,colorb,prevPos(3) + 100, 480,"brplat");
    myPlatform[4] = new component(80,20,colorb,prevPos(4) + 100, 400,"brplat");
    myPlatform[5] = new component(80,20,colorb,prevPos(5) + 100, 320,"brplat");
    myPlatform[6] = new component(80,20,colorb,prevPos(6) + 100, 250,"brplat");
    myPlatform[7] = new component(100,20,colorp,prevPos(7) + 280, 500,"platform");
    myPlatform[8] = new component(100,20,colorp,prevPos(8) + 100,420,"platform");
    myDisPlat[0] = new component(50,20,colord,prevPos(9) + 120, 400,"displat");
    myDisPlat[1] = new component(50,20,colord,disPos(1) + 130, 350,"displat");
    myPlatform[9] = new component(100,20,colorp,disPos(2) + 120,500,"platform");
    myDisPlat[2] = new component(100,20,colord,prevPos(10) + 100,420,"displat");
    myPlatform[10] = new component(100,20,colorp,disPos(3) + 100,360,"platform");
    myDisPlat[3] = new component(100,20,colord,prevPos(11) + 100,280,"displat");
    myPlatform[11] = new component(10000,20,colorf,disPos(4) + 200,450,"platform");
    endPlatform = myPlatform[11];
    
    endCoin = myCoin.length;
    myScore[0] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 50,"text");
    myScoreInstr = new component("40px","Sans",colori,100,50,"text");
    myScoreInstr.text = "";
    myScore[1] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 100,"text");
    for(i=0;i<myCoin.length;i++){
        collect[i] = 0;
    }
    for(i=0;i<myPlatform.length;i++){
        crash[i] = 0;
    }
    for(i=0;i<myDisPlat.length;i++){
        disPlat[i] = true;
    }
    myPieceInstr[0] = new component("20px","Sans",colori,myPlatform[1].x - 220,myPlatform[1].y + myPlatform[1].height - 50,"text");
    myPieceInstr[1] = new component("20px","Sans",colori,myPlatform[1].x - 220,myPlatform[1].y + myPlatform[1].height - 20,"text");
    myPieceInstr[2] = new component("20px","Sans",colori,myDisPlat[0].x,myDisPlat[0].y - 50,"text");
    myPieceInstr[3] = new component("20px","Sans",colori,myDisPlat[0].x,myDisPlat[0].y - 20,"text");
    myPieceInstr[0].text = "Careful! Brown Tiles";
    myPieceInstr[1].text = "Dissapear after Stepping";
    myPieceInstr[2].text = "Careful! Blue Tiles";
    myPieceInstr[3].text = "Dissapear and Appear";
}

//endless
function startGame4(){
    crash = [];
    coinCount = 0;
    time = 0;
    endTime  = "";
    stars = 0;
    checkLevel = 4;
    myPlatform = [];
    myScore = [];
    myCoin = [];
    collect=[];
    myPieceInstr=[];
    myDisPlat = [];
    disPlat =[];
    end = false;
    myGameArea.start();
    start = 1;
    myGameArea.frameNo = 0;
    myGamePiece = new component(30,30,colorPiece,20,200,"");
    myPlatform[0] = new component(700,20,colorp,0,300,"platform");
    
    endCoin = myCoin.length;
    myScore[0] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 50,"text");
    myScoreInstr = new component("40px","Sans",colori,100,50,"text");
    myScoreInstr.text = "";
    myScore[1] = new component("30px","Sans","black",myGameArea.canvas.width - 200, 100,"text");
    
    myCoin[0] = new component(10,10,colorc,myPlatform[0].x + (myPlatform[0].width/2) - 5,myPlatform[0].y - 20,"coin");
    
    for(i=0;i<myCoin.length;i++){
        collect[i] = 0;
    }
    for(i=0;i<myPlatform.length;i++){
        crash[i] = 0;
    }
}

function createPlatform(n){ //random creation of platform
    var maxDistancex = 100;
    var minDistancex = 0;
    var maxDistancey = 100;
    var minDistancey = -70;
    var minWidth = 50;
    var maxWidth = 150;
    var distancex = (Math.random() * (maxDistancex - minDistancex)) + minDistancex;
    var distancey = (Math.random() * (maxDistancey - minDistancey)) + minDistancey;
    if(myPlatform[n-1].y + distancey >= myGameArea.canvas.height - 20){
        distancey = minDistancey;
    }
    else if(myPlatform[n-1].y + distancey <= 100){
        distancey = maxDistancey;
    }
    var width = (Math.random() * (maxWidth - minWidth)) + minWidth;
    var type;
    switch(Math.floor(Math.random()*2)){
        case 0:
            type = "platform";
            myPlatform[n] = new component(width,20,colorp,prevPos(n)+distancex,myPlatform[n-1].y + distancey,type);
            break;
        case 1:
            type = "brplat";
            myPlatform[n] = new component(width,20,colorb,prevPos(n)+distancex,myPlatform[n-1].y + distancey,type);
            break;
        default:
            return;
    }
    crash[n] = 0;
}

function createCoin(n){
    myCoin[n] = new component(10,10,colorc,myPlatform[n].x + (myPlatform[n].width/2) - 5,myPlatform[n].y - 20,"coin");
    collect[n] = 0;
}
var s = [["CRICKET","FOOTBALL","BADMINTON","TENNIS","BASKETBALL","SWIMMING","RUGBY","VOLLEYBALL","DODGEBALL","POLO"],["APPLE","NEXUS","PIXEL","ONEPLUS","GIONEE","MICROMAX","SAMSUNG","VIVO","OPPO","NOKIA"],["PUBG","FIFA","FORTNITE","FREEFIRE","MONOPOLY","MINECRAFT","ROBLOX","SUDOKU","COC","COD"],["NIKE","ADIDAS","PUMA","VECTORX","YONEX","LINING","GM","SG","STAG","REEBOK"],["FERRARI","LAMBORGHINI","BMW","MERCEDES","SUZUKI","AUDI","TOYOTA","HYUNDAI","HONDA","TATA"]];

function hint(){
    switch(r1){
        case 0:
            document.getElementById("topic").innerHTML="Hint: Sport";
            break;
        case 1:
            document.getElementById("topic").innerHTML="Hint: Tech Company";
            break;
        case 2:
            document.getElementById("topic").innerHTML="Hint: Game";
            break;
        case 3:
            document.getElementById("topic").innerHTML="Hint: Sport Company";
            break;
        case 4:
            document.getElementById("topic").innerHTML="Hint: Car Company";
            break;
    }
}
function print(){
    document.getElementById("word").innerHTML="Answer: "+s[r1][r2];
} 
var r1;
var r2;
var n;
var text;
var t = [];
var pl;
var pl2=0;
var w1=0;
var l1=0;
var lose;
function play(){
    pl=document.createElement("BUTTON");
    document.getElementById("PA").appendChild(pl);	
    pl.innerHTML="Play Again";
    pl.addEventListener("click",newGame);
    pl.setAttribute("id","pl");
    pl2=1;
}

function newGame(){
    r1 = Math.floor(Math.random() * 5);
    r2 = Math.floor(Math.random() * 10);
    hint();
    n = s[r1][r2].length;
    text="";
    t = [];
    for(var i=0;i<n;i++)
    {
            t[i] = "_ ";
    }
    setText();
    document.getElementById("result").innerHTML = "";
    document.getElementById("word").innerHTML="";
    if(pl2==1){
        document.getElementById("pl").remove();
        for(i=0;i<=25;i++){
            btn[i].disabled=false;
        }
        ctx.beginPath();
        console.log(c.width,c.height)
        ctx.clearRect(0,0,300,150);
        ctx.stroke();
    }
    lose=5;
//    document.getElementById("count").innerHTML = "Wins: " + w1 + "<br>Losses: " + l1;
}
newGame();

function setText(){
    text="";
	for(var i=0;i<n;i++)
	{
        text += t[i];
	}
	document.getElementById("out").innerHTML=text;
}

var btn = [];
function btnCreate(){
	for(i=0;i<=25;i++){
		btn[i]=document.createElement("BUTTON");
		document.getElementById("buttons").appendChild(btn[i]);	
		btn[i].innerHTML=String.fromCharCode(i+65);
		btn[i].setAttribute("id",String.fromCharCode(i+65));
        btn[i].setAttribute("class","buttons");
        btn[i].addEventListener('click',btnClick);
    }
    pl2=1;
}
btnCreate();

function btnClick(){
    var a=0;
    this.disabled=true;
    for(var p=0;p<n;p++){
        if(this.getAttribute('id')==s[r1][r2].charAt(p)){
            t[p] = s[r1][r2].charAt(p);
            setText();
            a+=1;
            win();
        }
    }
    if(a==0){
        lose-=1;
        life1();
    }
    l();
} 
var c;
function win(){
    for(c=0;c<n;c++){
        if(t[c]=="_ "){
            break;
        }
    }
    if(c==n){
        document.getElementById("result").innerHTML="You Win";
        for(i=0;i<=25;i++){
            btn[i].disabled=true;
        }
        play();
    }
    
}
function l(){
    if(lose == 0){
        document.getElementById("result").innerHTML="You Lose";
        for(i=0;i<=25;i++){
            btn[i].disabled=true;
        }
        play();
        print();
    }
}
var c = document.getElementById("hangman");
var ctx = c.getContext("2d");
function life1(){
    switch(lose){
        case 4:
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.moveTo(50,140);
            ctx.lineTo(150,140);
            ctx.moveTo(100,140);
            ctx.lineTo(100,10);
            ctx.lineTo(200,10);
            ctx.lineTo(200,30);
            ctx.stroke();
            pl2=1;
            break;
        case 3:
//            var c3 = document.getElementById("hangman");
//            var ctx3 = c3.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle="black";
            ctx.arc(200,40,10,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
        case 2:
//            var c2 = document.getElementById("hangman");
//            var ctx2 = c2.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.moveTo(200,50);
            ctx.lineTo(200,100);
            ctx.stroke();
            break;
        case 1:
//            var c1 = document.getElementById("hangman");
//            var ctx1 = c1.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.moveTo(200,100);
            ctx.lineTo(180,120);
            ctx.moveTo(200,100);
            ctx.lineTo(220,120);
            ctx.stroke();
            break;
        case 0:
//            var c0 = document.getElementById("hangman");
//            var ctx0= c0.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.moveTo(200,50);
            ctx.lineTo(180,70);
            ctx.moveTo(200,50);
            ctx.lineTo(220,70);
            ctx.stroke();
            break;
    }
    
}


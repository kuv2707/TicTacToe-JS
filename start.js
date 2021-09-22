class verd {
    constructor(state, startX, startY, endX, endY) {
        this.state = state;
        this.x1 = startY;
        this.y1 = startX;
        this.x2 = endY;
        this.y2 = endX;
    }
    isEnded() {
        return this.state;
    }
    get getStartX()
    {
        return 900*this.x1;
    }
    get getStartY()
    {
        return 450*this.y1;
    }
    get getEndX()
    {
        return 900*this.x2;
    }
    get getEndY()
    {
        return 450*this.y2;
    }

}
var boxes = new Array(3);
var turns = 1;
var printArray = function () {
    for (let i = 0; i < 3; i++) {
        let temp = " ";
        for (let j = 0; j < 3; j++) {
            temp += boxes[i][j] + "\t";
        }
        console.log(temp);
    }
}
var invertSymbol = function () {
    if (turns % 2 == 0) {
        symbolicCol = "#2ECC71";
        symbol = "🍔";
    }
    else {
        symbolicCol = "#2E86C1";
        symbol = "🥗";
    }

}
var active = true;
var symbol;
var symbolicCol;
var judgeGame = function (board)
{
    //board is the DDA to be checked


    const n=board.length;

    //vertical check
    for(let i=0;i<n;i++)
    {
        let firstval=board[i][0];
        let bool_dec=!(firstval=="_");
        for(let j=0;j<n;j++)
        {
            bool_dec=bool_dec&&(firstval==board[i][j])
        }
        if(bool_dec)
        {
            return new verd(true,i,0,i,n-1);
        }
    }
    //horizontal check
    for(let i=0;i<n;i++)
    {
        let firstval=board[0][i];
        let bool_dec=!(firstval=="_");
        for(let j=0;j<n;j++)
        {
            bool_dec=bool_dec&&(firstval==board[j][i])
        }
        if(bool_dec)
        {
            return new verd(true,0,i,n-1,i);
        }
    }
    //left diagonal check
    let firstval=board[0][0];
    let bool_dec=!(firstval=="_");
    for(let i=0;i<n;i++)
    {
        
        bool_dec=bool_dec&&(firstval==board[i][i]);
    }
    if(bool_dec)
    return new verd(true,0,0,n-1,n-1);

    //right diagonal check
    firstval=board[n-1][0];
    bool_dec=!(firstval=="_");
    for(let i=0;i<n;i++)
    {
        
        bool_dec=bool_dec&&(firstval==board[n-1-i][i]);
    }
    if(bool_dec)
    return new verd(true,0,n-1,n-1,0);


    
    return new verd(false);


}

var gameEngine = function () {
    if (!active)
        return;
    let a = this.id;
    let i = a.charAt(0);
    let j = a.charAt(1);

    if (i <= 0 || i > 3 || j <= 0 || j > 3) {
        console.log("Invalid input");
        return;
    }
    i--;
    j--;
    let sss = boxes[i][j];
    if (!(sss == "_")) {
        console.log("That box is already filled");
        return;
    }
    boxes[i][j] = symbol;
    //this.style="background: linear-gradient(#c3eaf0,#2874A6);";
    this.style.background = "linear-gradient(#c3eaf0," + symbolicCol + ")";
    let idd = "" + (i + 1) + "" + (j + 1);
    console.log(idd);
    document.getElementById(idd).innerHTML = symbol;
    printArray();

    var verd = judgeGame(boxes);
    if (verd.isEnded() == true) {

        console.log(" " + symbol + " won the game!!");
        document.getElementById("statusBar").innerHTML = symbol + " won!!🎉";
        active = false;
        //greyOut(verd);
        

    }



    turns++;
    if (turns > 9 && active) {
        console.log(" DRAW!");
        document.getElementById("statusBar").style = "color:#FFFFFF";
        document.getElementById("statusBar").innerHTML = "DRAW!!!";
        active = false;
        //greyOut(null);
        
    }
    invertSymbol();
    if (active) {
        document.getElementById("statusBar").innerHTML = symbol + "'s turn";
        document.getElementById("statusBar").style = "color:" + symbolicCol;
    }

}
function greyOut(verdict) {
    var v = document.querySelectorAll(".ofGame");
    v.forEach(e => e.style = "background: linear-gradient(#D0D3D4,#707B7C);");
    if(verdict!=null)
    {
        if(verdict.isEnded()==false)
        {
            //logical error!
        }
        else
        {
            if(true)
            return;//the method is currently faulty
            var lines = document.createElement("canvas");
            
            lines.id = "lines";
            document.querySelector("#panel").appendChild(lines);
            var contxt = lines.getContext("2d");
            contxt.lineWidth = 3;
            //contxt.fillRect(0, 0, 10, 10);
            contxt.beginPath();
            contxt.moveTo(verdict.getStartX,verdict.getStartY);
            contxt.lineTo(verdict.getEndX, verdict.getEndY);
            console.log(verdict.getStartX,verdict.getStartY);
            console.log(verdict.getEndX, verdict.getEndY);
            contxt.stroke();
        }
    }
    
}
//driver code

initializeBox();
function initializeBox() {
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Array(3);
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boxes[i][j] = "_";
        }
        
    }
    invertSymbol();
}
var menter=function () {
    if (!active)
        this.style.boxShadow = "0px 0px 40px" + " rgb(154, 73, 228)";
    else
        this.style.boxShadow = "0px 0px 40px" + " rgb(0,0,0)";
};
var mleave=function () {

    this.style.boxShadow = "0px 0px 0px rgba(54, 173, 228,0)";

};
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let idd = "" + (i + 1) + "" + (j + 1);
        let t = document.getElementById(idd);
        t.addEventListener("click", gameEngine);
        t.addEventListener("mouseenter", menter);
        t.addEventListener("mouseleave", mleave);
        t.addEventListener("touchstart",menter);
        t.addEventListener("touchend",mleave);
    }

}
document.getElementById("reload").addEventListener("click", function () {
    //active=true;
    //var v=document.querySelectorAll(".ofGame");
    console.log("Reload clicked");
    location.reload();//remove it

});

var squares=document.querySelectorAll(".ofGame");
var body=document.querySelector("body");
var x=0;
var animate=function()
{
    
    //console.log(squares);
    x+=0.0005;
    body.style.background="radial-gradient(rgb("+(127+80*Math.sin(x))+",156,"+(137+60*Math.cos(3*x))+"),#4bb0c2)";
    if(!active)
    {
        squares.forEach(k=>
            {
                k.style.background="linear-gradient(rgb("+(127+80*Math.cos(x))+",156,"+(127+60*Math.sin(x))+"),#4bb0c2)";
                
            });
    }
    
};
setInterval(animate,6);
console.log("initialized");


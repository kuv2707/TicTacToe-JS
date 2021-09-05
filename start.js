var boxes=new Array(3);
var turns=1;
var printArray=function()
{
    for(var i=0;i<3;i++)
    {
        let temp=" ";
        for(var j=0;j<3;j++)
        {
            temp+=boxes[i][j]+"\t";
        }
        console.log(temp);
    }
}
var invertSymbol=function()
{
    if(turns%2==0)
    {
        symbolicCol="#117A65";
        symbol="😔";
    }
    else
    {
        symbolicCol="#1F618D";
        symbol="😁";
    }
    
}
var active=true;
var symbol;
var symbolicCol;
var judgeGame=function()
{
    let ld=true,rd=true,v1=true,v2=true,v3=true,h1=true,h2=true,h3=true;
    let s1=boxes[0][0];
    if(s1=="_")
    s1="xxxx";
    //top horizontal
    for(let i=0;i<3;i++)
    {
        if(s1!=boxes[i][0])
        h1=false;
    }
    //left vertical
    for(let i=0;i<3;i++)
    {
        if(s1!=boxes[0][i])
        v1=false;
    }
    //left diagonal
    for(let i=0;i<3;i++)
    {
        if(s1!=boxes[i][i])
        ld=false;
    }
    let s2=boxes[2][0];
    if(s2=="_")
    s2="xxxx";
    //right diagonal
    for(let i=0;i<3;i++)
    {
        if(s2!=boxes[2-i][i])
        rd=false;
    }
    //right vertical
    for(let i=0;i<3;i++)
    {
        if(s2!=boxes[2][i])
        v3=false;
    }
    let s3=boxes[1][1];
    if(s3=="_")
    s3="xxxx";
    //middle vertical
    for(let i=0;i<3;i++)
    {
        if(s3!=boxes[1][i])
        v2=false;
    }
    //middle horizontal
    for(let i=0;i<3;i++)
    {
        if(s3!=boxes[i][1])
        h2=false;
    }
    let s4=boxes[2][2];
    if(s4=="_")
    s4="xxxx";
    //bottom horizontal
    for(let i=0;i<3;i++)
    {
        if(s4!=boxes[i][2])
        h3=false;
    }
    let arrr=[ld,rd,h1,h2,h3,v1,v2,v3];
    
    let rul=arrr[0];
    arrr.forEach(e=> rul=rul||e);
    console.log(arrr);
    console.log("result now: "+rul)
    return rul;
}

var gameEngine=function()
{
    if(!active)
    return;
    let a=this.id;
    let i=a.charAt(0);
    let j=a.charAt(1);

    if(i<=0  ||  i>3  ||  j<=0  ||  j>3)
    {
        console.log("Invalid input");
        return;
    }
    i--;
    j--;
    let sss=boxes[i][j];
    if(!(sss=="_"))
    {
        console.log("That box is already filled");
        return;
    }
    boxes[i][j]=symbol;
    this.style="background: radial-gradient(#c3eaf0,#2874A6)";
    this.style="color:"+symbolicCol+";";
    let idd=""+(i+1)+""+(j+1);
    console.log(idd);
    document.getElementById(idd).innerHTML=symbol;
    printArray();
    
        if(judgeGame()==true)
        {
            
            console.log(symbol+" won the game!!");
            document.getElementById("statusBar").innerHTML=symbol+" won!!🎉";
            active=false;
            var v=document.querySelectorAll(".ofGame");
            v.forEach(e => e.style="background: radial-gradient(#D0D3D4,#707B7C);");
            
        }
    
    
    
    turns++;
    if(turns>9  &&  active)
    {
        console.log("DRAW!");
        document.getElementById("statusBar").innerHTML="DRAW!!!";
        active=false;
    }
    invertSymbol();
    if(active)
    document.getElementById("statusBar").innerHTML=symbol+"'s turn";
    document.getElementById("statusBar").style="color:"+symbolicCol;
}

//ACTUAL CODE STARTS


for(let i=0;i<3;i++)
{
    boxes[i]=new Array(3);
}
for(let i=0;i<3;i++)
{
    for(let j=0;j<3;j++)
    {
        boxes[i][j]="_";
    }
    console.log("initialized");
}
invertSymbol();
for(let i=0;i<3;i++)
{
    for(let j=0;j<3;j++)
    {
        let idd=""+(i+1)+""+(j+1);
        let t=document.getElementById(idd);
        t.onclick=gameEngine;
    }
    
}
document.getElementById("reload").onclick=function()
{
    location.reload();
};
console.log("initialized");


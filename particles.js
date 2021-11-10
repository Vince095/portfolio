"use strict";
let W,H,L,FS;
let bricks=[];
let touched,text;

const{sin,cos,PI,sqrt,random,floor,ceil,round,abs} = Math;

const id =n=>{
    return document.getElementById(n);
}
const vibrate= n=>{
    try{
        navigator.vibrate(n);
    }catch(err){console.log(err.message)}
}

const atan = (x1,y1,x2,y2)=>{
    let dx = x2 - x1;
    let dy = y2 - y1;
    if(dy == 0)
    {
       if(dy >= 0){
           return PI/2;
       }else{
           return (3/2)*PI;
       }
    }else if(dx >0)
    {
        return Math.atan(dy/dx);
    }else{
        return PI+Math.atan(dy/dx)
    }

}

window.onload = function(){
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");

    function init(){
        W = window.innerWidth;
        H = window.innerHeight;
        cnv.width = W;
        cnv.height = H;
        L = W<H?W:H;
        FS = L*(5/36);
        touched = false;
        text = "software engineer"

        setTimeout(()=>{
            touched = true;
        },2000)
    }
    init();

    class Brick {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.color = "#F2F2F2";
            this.dy = -(L / 42) + (L / 21) * random();
            this.dx = -(L / 42) + (L / 21) * random();
            this.vx = this.dx;
            this.vy = this.dy;
            this.fc = 0;
            this.draw = () => {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, FS / 20, FS / 20);
                ctx.fill();

                if (touched) {
                    this.fc++;
                    this.y += this.dy;
                    this.x += this.dx;
                } else if (this.fc) {
                    this.fc--;
                    this.y -= this.dy;
                    this.x -= this.dx;
                }
                if (this.x <= 0 || this.x >= W) {
                    this.dx = -this.dx;
                }
                if (this.y <= 0 || this.y >= H) {
                    this.dy = -this.dy;
                }
                if(this.fc > 300){
                     this.color = `rgb(${abs(255 - this.fc)},0,${this.fc})`;
                }
               
            };
        }
    }
    const write =(()=>{
        touched = false;
        ctx.fillStyle ="block";
        ctx.fillRect(0,0,W,H);

        ctx.fillStyle = "block";
        ctx.fillRect(0,0,W,H);

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font = FS+"px Courier bold";
        ctx.textAlign = "center"
        ctx.textBaseline= "middle";
        ctx.fillText(text,W/2,H/2);

        bricks = [];
        
        for(let i =0;i<=W;i+=FS/20){
            for(let j=(H-FS)/2;j<=(H+FS)/2;j+=FS/20){
                let p = ctx.getImageData(i,j,1,1).data[0];
                if(p){
                    bricks.push(new Brick(i,j));
                }
            }
       }
       ctx.clearRect(0,0,W,H);
    })();
    //id("text").addEventListener("input",()=>{
       // text = this.value;
       // write();
   // });

    window.onresize = ()=>{
        init();
        write();
    }

    function animate(){
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(0,0,W,H);
        for(let b of bricks){
            b.draw();
        }
        window.requestAnimationFrame(animate);
    }

    var killAnimation = true;

    setTimeout(()=>{
        killAnimation = false;
    },10000);
    
    if(killAnimation){
        animate();
       
    }

   // animate();

    cnv.onclick = ()=>{
        setInterval(()=>{
             if(!touched && !bricks[0].fc){
            touched = true;
            vibrate(100);
        }else if(touched){
            touched = false;
            for(let b of bricks){
                if(b.x<=0||b.x>=W){
                    b.dx = -b.dx;
                }
            }
            vibrate(100)
        }
        },5000)
       
    }
}
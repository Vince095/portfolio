const fps = 0.002;
var x, y, x2, y2, a , b, c, d, red, blue, green, iterate;

let params ={
    a : -2.78,
    b: 0.43,
    c: -0.65,
    d: -2.43,
    range: [-3, 3]

};

function randomParams(){
    params.a =random(-3.0 , 3.0)
    params.b =random(-3.0 , 3.0)
    params.c =random(-3.0 , 3.0)
    params.d =random(-3.0 , 3.0)
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    red = color('red');
    blue = color('blue');
    green = color('green');

    canvas.elt.addEventListener('click', e =>{
        e.preventDefault();
        
        if(e.button == 0){
            randomParams();
            init();
        }
    })

    init();
}

function init(){
    x = 0;
    y =0;
    iterate =0;
 }


function draw(){
    background(0);
    rotateY(frameCount* 0.001);
    let size = 10;

    for(let j = 0; j<5; j++){
        push();
        for(let i = 0; i< 80; i++ ){
            translate(
                sin(frameCount * 0.01+ j)*100,
                sin(frameCount* 0.01+ j)*100,
                i*0.1
            );

            let j0 = size;
            deJong(j0);

            rotateZ(frameCount * fps);
            push();
            stars();
    
            normalMaterial();
            //fill(255);
            sphere(4,4)
            //torus(7,2);
            pop();
        }
        pop();
    }
}

   const  stars = () =>{
        stroke(255);
        strokeWeight(3.5);
        point(map(x2, -3,3,50, width - 50),map(y2, -3,3 ,height - 50));
    }

    const deJong = (j) =>{
        x2 = sin(params.a* y ) - cos(params.b * x);
        y2 = sin(params.c * x) - cos(params.d* y);
        
        x = x2;
        y = y2;

        iterate++;
        if(iterate >= this.j){
            randomParams();
            init();
        }
    }
const windowResize =() =>{
    resizeCanvas(windowWidth, widowHeight);
}
    



var ball;
var position;
var database;

function setup(){
    database = firebase.database();         
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //referring to the node in the database (.ref())
    var ballPosition = database.ref('ball/position');

    //.on() - creates a listener which helps you 
    //know changes being made to that node
    ballPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//accessing the information from the database
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

//update the positions in the database
function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
}

function showError(){
    console.log("Cannot read from the database");
}
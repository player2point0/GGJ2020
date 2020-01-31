
let soundGrid = [];
let currentPosition = 0;
let pickedSoundBox = null;

//split our sound into n sounds
//setupSoundBoxes();

function setupSoundBoxes(){
    const words = ["two", "one", "three", "four", "five"];

    const n = 5;
    const spacing = 5;
    
    for(let i = 0;i<n;i++){
    
        let tempSoundBox = new SoundBox(i*spacing, words[i]);
    
        soundGrid.push(tempSoundBox);
    }
}

function moveRight(){
    for(let i = 0; i <soundGrid.length;i++){
        soundGrid[i].moveLeft();
    }

    currentPosition++;

    if(pickedSoundBox != null){
        pickedSoundBox.moveRight();
    }
}

function moveLeft(){
    for(let i = 0; i <soundGrid.length;i++){
        soundGrid[i].moveRight();
    }

    currentPosition--;

    if(pickedSoundBox != null){
        pickedSoundBox.moveLeft();
    }
}

function closestBoxIndex(){
    let closestDis = 1000;
    let closestIndex = 0;

    for(let i = 0;i<soundGrid.length;i++){
        let dis = Math.abs(soundGrid[i].x - currentPosition);

        if(dis < closestDis){
            closestDis = dis;
            closestIndex = i;
        }
    }

    return closestIndex
}

function pickupBox(){
    pickedSoundBox = soundGrid.splice(closestBoxIndex(), 1)[0];
    pickedSoundBox.pickUp();
    console.log(pickedSoundBox);
}

function dropBox(){
    pickedSoundBox.drop();
    pickedSoundBox.x = currentPosition;
    soundGrid.push(pickedSoundBox);
    pickedSoundBox = null;
}

document.onkeydown = function (e) {
    e = e || window.event;

    if(e.keyCode == '37') {
       // left arrow
        console.log("left");

        moveLeft();
    }
    else if(e.keyCode == '39') {
       // right arrow
        console.log("right");

        moveRight();   
    }
    else if(e.keyCode == '32'){
        console.log("space");

        if(pickedSoundBox != null) dropBox();
        else pickupBox();
    }
}
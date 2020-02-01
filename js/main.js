
let soundGrid = [];
let currentPosition = 0;
let pickedSoundBox = null;
const spacing = 5;
    

//split our sound into n sounds
//setupSoundBoxes();

function setupSoundBoxes(){
    const words = ["two", "one", "three", "four", "five"];

    const n = 5;
    
    for(let i = 0;i<n;i++){
        let tempSoundBox = new SoundBox(i*spacing, words[i], spacing);
    
        soundGrid.push(tempSoundBox);
    }
}

function moveRight(){
    for(let i = 0; i <soundGrid.length;i++){
        soundGrid[i].moveLeft();
    }

    if(pickedSoundBox != null){
        pickedSoundBox.moveRight();
    }
}

function moveLeft(){
    for(let i = 0; i <soundGrid.length;i++){
        soundGrid[i].moveRight();
    }

    if(pickedSoundBox != null){
        pickedSoundBox.moveLeft();
    }
}

function currentBoxIndex(){
    for(let i = 0;i<soundGrid.length;i++){
        let dis = Math.abs(soundGrid[i].x - currentPosition);

        if(dis === 0){
            return i;
        }
    }

    return -1;
}

function boxAction(){
    
    let currentBoxIndex = currentBoxIndex();

    if(pickedSoundBox != null) {
        dropBox();

        if(currentBoxIndex === -1){
            //empty space
            dropBox();
        }

        else{
            swapBox();
        }
    }
    
    else {
        pickupBox();
    }
}

function swapBox(){

    let tempBox = soundGrid.splice(closestBoxIndex(), 1)[0];
    tempBox.pickUp();

    pickedSoundBox.drop();
    pickedSoundBox.x = currentPosition;
    soundGrid.push(pickedSoundBox);

    pickedSoundBox = tempBox;
}

function pickupBox(){
    pickedSoundBox = soundGrid.splice(closestBoxIndex(), 1)[0];
    pickedSoundBox.pickUp();
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
        moveLeft();
    }
    else if(e.keyCode == '39') {
        moveRight();   
    }
    else if(e.keyCode == '32'){
        boxAction();
    }
}
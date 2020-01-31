class SoundBox{

    constructor(x, word){
        this.sound = new Howl({
            src: ['../audio/sound2.webm', '../audio/sound2.mp3'],
            sprite: {
                one: [0, 450, true],
                two: [2000, 250, true],
                three: [4000, 350, true],
                four: [6000, 380, true],
                five: [8000, 340, true]
              },
        });

        this.word = word;
        this.x = x;

        this.id = this.sound.play(word);
        this.sound.pos(this.x, 0, 0, this.id);
    }

    moveRight(){
        this.x++;
        this.sound.pos(this.x, 0, 0, this.id);
    }

    moveLeft(){
        this.x--;
        this.sound.pos(this.x, 0, 0, this.id);
    }

    pickUp(){
        this.sound.volume(0);
    }

    
    drop(){
        this.sound.volume(1);
    }
}
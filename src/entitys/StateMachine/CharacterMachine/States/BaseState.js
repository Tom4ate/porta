
export default class State {

    animationName = "";
    animation = null;

    constructor(machine) {
        this.machine = machine;
        // is movement
        // is idle state
        // contais transaction
        // play and stop animations
        // update player state
    }

    // when the state start
    onEnter(){
        if (this.animation) {
            this.animation.play();
        }
    }

    // when the state stop
    onLeave(){
        if (this.animation) {
            this.animation.stop();
        }
    }

    // when the state is in transition
    onTransit(){}

    // aplay the state to entity
    aplay(){}
}

export default class State {

    animationName = "";
    animation = null;
    active = false;

    constructor(machine) {
        this.machine = machine;
        // is movement
        // is idle state
        // contais transaction
        // play and stop animations
        // update player state
    }

    verifyState() {}
    update() {}

    updateState(s,t,data) {
        if(!this.active) {
            this.enter();
        }

        this.update(s,t,data);
    }

    // when the state start
    enter(){
        if (this.animation && !this.active) {
            this.animation.play();
        }

        this.active = true;
    }

    // when the state stop
    leave(){
        if (this.animation && this.active) {
            this.animation.stop();
        }

        this.active = false;
    }

    // when the state is in transition
    onTransit(){}

    // aplay the state to entity
    aplay(){}
}
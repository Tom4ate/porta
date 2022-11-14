
export default class State {

    // states controll
    active = false;

    // animations controll
    animation = null;
    animationName = "";
    animationWeight = 0;
    animationTransit = 0.1;

    constructor(machine) {
        this.machine = machine;
        // is movement
        // is idle state
        // contais transaction
        // play and stop animations
        // update player state
    }

    verifyAnimationName(animationName) {
        return this.animationName === animationName;
    }

    entangleAnimation([animation]) {
        this.animation = animation;
    }

    verifyState() {}
    update() {}

    updateState(s,t,activate,data) {
        if (!this.active && activate) {
            this.enter();
        }

        if (this.active && !activate) {
            this.leave();
        }

        if (this.active && this.animationWeight < 1) {
            this.animationWeight += this.animationTransit;
        }

        if (!this.active && this.animationWeight > 0) {
            this.animationWeight -= this.animationTransit;
        }

        if(this.animation && this.animationWeight) {
            this.animation.setEffectiveWeight(this.animationWeight);
        }

        this.update(s,t,data);
    }

    // when the state start
    enter(){
        console.log("enter");
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
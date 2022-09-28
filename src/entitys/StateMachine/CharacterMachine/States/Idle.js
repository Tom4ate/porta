import State from './BaseState';

export default class IdleState extends State {

    animationName = "Character|idle";

    constructor(machine) {
        super(machine);
        // is movement true
        // update player position
    }

    verifyState(intents) {
        return !(
            intents.foward ||
            intents.backward || 
            intents.right || 
            intents.left || 
            intents.jump
        )
    }
}
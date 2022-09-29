import State from './BaseState';

export default class IdleState extends State {

    animationName = "Character|idle";

    constructor(machine) {
        super(machine);
        // is movement true
        // update player position
    }

    verifyState(intents) {
        let anyPress = (
            intents.foward ||
            intents.backward || 
            intents.right || 
            intents.left || 
            intents.jump
        )
        
        return !anyPress || ( intents.foward && intents.backward && !intents.fast) || ( intents.right && intents.left);
    }
}
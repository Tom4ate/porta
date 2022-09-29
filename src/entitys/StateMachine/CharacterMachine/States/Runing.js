import State from './BaseState';

export default class RuningState extends State {

    animationName = "Character|standard run";

    constructor(machine) {
        super(machine);
        // is movement true
        // update player position

        // if (this._input._keys.shift) {
        //     acc.multiplyScalar(2.0);
        // }
    }

    verifyState(intents) {
        return false;
        // return intents.fast && intents.foward;
    }

}
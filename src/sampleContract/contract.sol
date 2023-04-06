pragma solidity 0.8.11;

contract SampleContract {
    uint timesInteracted;

    constructor() {
        timesInteracted = 0;
    }
    function interact() public {
        timesInteracted++;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 waveCooldown = 15 minutes;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor()  {
        console.log("Wave portal created!");
    }

    function wave(string memory _message) public {

        require(lastWavedAt[msg.sender] + waveCooldown < block.timestamp, "Wait 15m");

        totalWaves += 1;

        waves.push(Wave(msg.sender, _message, block.timestamp));

        lastWavedAt[msg.sender] = block.timestamp;
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    } 

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }

    function canWave(address addr) public view returns (bool) {
        if (lastWavedAt[addr] + waveCooldown < block.timestamp) {
            return true;
        } else {
            return false;
        }
    }
}
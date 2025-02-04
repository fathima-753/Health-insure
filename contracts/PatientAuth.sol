// Updated Solidity Smart Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientAuth {
    struct User {
        bytes32 hashedPassword; 
        bool exists;
    }

    mapping(string => User) private users;

    event UserRegistered(string username);

    function register(string memory _username, string memory _password) public {
        require(!users[_username].exists, "User already exists");
        bytes32 hashedPassword = keccak256(abi.encodePacked(_password));
        users[_username] = User(hashedPassword, true);
        emit UserRegistered(_username);
    }

    function validateUser(string memory _username, string memory _password) public view returns (bool) {
        if (!users[_username].exists) {
            return false;
        }
        bytes32 hashedInputPassword = keccak256(abi.encodePacked(_password));
        return users[_username].hashedPassword == hashedInputPassword;
    }

    function login(string memory _username, string memory _password) public view returns (bool) {
        return validateUser(_username, _password);
    }
}
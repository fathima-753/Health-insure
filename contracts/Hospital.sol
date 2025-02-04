// contracts/HospitalRegistration.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalRegistration {

    struct Hospital {
        string name;
        string phone;
        string username;
        bytes32 passwordHash;
    }
    mapping(address => Hospital) public hospitals;
    mapping(string => bool) public usernameExists;

    event HospitalRegistered(address indexed hospitalAddress, string username);

    // Register a new hospital
    function registerHospital(
        string memory _name,
        string memory _phone,
        string memory _username,
        string memory _password
    ) public {
        require(bytes(_name).length > 0, "Hospital name is required");
        require(bytes(_phone).length > 0, "Phone number is required");
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_password).length > 0, "Password is required");
        require(!usernameExists[_username], "Username already taken");

        // Save the hospital details
        hospitals[msg.sender] = Hospital({
            name: _name,
            phone: _phone,
            username: _username,
            passwordHash: keccak256(abi.encodePacked(_password))
        });

        usernameExists[_username] = true;

        emit HospitalRegistered(msg.sender, _username);
    }

    function login(string memory _username, string memory _password) public view returns (bool) {
        require(usernameExists[_username], "Username does not exist");
        
        Hospital memory hospital = hospitals[msg.sender];
        if (keccak256(abi.encodePacked(_password)) == hospital.passwordHash) {
            return true;
        }
        return false;
    }

    function getHospitalDetails(address _hospitalAddress) public view returns (string memory, string memory, string memory) {
        Hospital memory hospital = hospitals[_hospitalAddress];
        return (hospital.name, hospital.phone, hospital.username);
    }
}

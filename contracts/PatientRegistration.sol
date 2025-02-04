// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract PatientRegistration {
    struct Patient {
        string name;
        uint256 dob;
        string gender;
        string phone;
        string username;
        bytes32 passwordHash; 
    }
    
    // Mappings to store patient details
    mapping(address => Patient) public patients;
    mapping(string => bool) public usernameExists;
    
    // Mappings to retrieve individual patient details
    mapping(address => string) public patientName;
    mapping(address => uint256) public patientDob;
    mapping(address => string) public patientGender;
    mapping(address => string) public patientPhone;
    mapping(address => string) public patientUsername;
    
    // Events
    event PatientRegistered(address indexed patientAddress, string username);
    
    function registerPatient(
        string memory _name,
        uint256 _dob,
        string memory _gender,
        string memory _phone,
        string memory _username,
        string memory _password
    ) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_dob > 0, "Date of birth is required");
        require(bytes(_gender).length > 0, "Gender is required");
        require(bytes(_phone).length > 0, "Phone number is required");
        require(bytes(_username).length > 0, "Username is required");
        require(!usernameExists[_username], "Username already taken");

        bytes32 passwordHash = keccak256(abi.encodePacked(_password));

        // Store details in both the struct and the individual mappings
        patients[msg.sender] = Patient({
            name: _name,
            dob: _dob,
            gender: _gender,
            phone: _phone,
            username: _username,
            passwordHash: passwordHash
        });

        // Update individual mappings for easy access
        patientName[msg.sender] = _name;
        patientDob[msg.sender] = _dob;
        patientGender[msg.sender] = _gender;
        patientPhone[msg.sender] = _phone;
        patientUsername[msg.sender] = _username;
        
        usernameExists[_username] = true;

        emit PatientRegistered(msg.sender, _username);
    }
   
    function login(string memory _username, string memory _password)
        public
        view
        returns (bool)
    {
        Patient memory patient = patients[msg.sender];
        require(
            keccak256(abi.encodePacked(patient.username)) == keccak256(abi.encodePacked(_username)),
            "Username does not match"
        );
        require(
            patient.passwordHash == keccak256(abi.encodePacked(_password)),
            "Incorrect password"
        );

        return true;
    }
    function getPatientDetails(address patientAddress)
        public
        view
        returns (
            string memory name,
            uint256 dob,
            string memory gender,
            string memory phone,
            string memory username
        )
    {
        name = patientName[patientAddress];
        dob = patientDob[patientAddress];
        gender = patientGender[patientAddress];
        phone = patientPhone[patientAddress];
        username = patientUsername[patientAddress];
    }
}

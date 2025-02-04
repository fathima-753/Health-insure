// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyRegistry {
    struct Company {
        string name;
        string phone;
        string username;
        bytes32 passwordHash;
    }

    mapping(address => Company) public companies;
    mapping(string => bool) public usernameExists;

    event CompanyRegistered(address indexed companyAddress, string username);

    modifier onlyUniqueUsername(string memory _username) {
        require(!usernameExists[_username], "Username already exists.");
        _;
    }

    // Function to register a new company
    function registerCompany(
        string memory _name,
        string memory _phone,
        string memory _username,
        string memory _password
    ) public onlyUniqueUsername(_username) {
        // Check that the user has not registered a company before
        require(bytes(companies[msg.sender].name).length == 0, "Company already registered.");

        // Store company details
        companies[msg.sender] = Company({
            name: _name,
            phone: _phone,
            username: _username,
            passwordHash: keccak256(abi.encodePacked(_password)) // Store password hash
        });

        // Mark the username as used
        usernameExists[_username] = true;

        // Emit an event for company registration
        emit CompanyRegistered(msg.sender, _username);
    }

    // Function to get company details
    function getCompanyDetails(address _companyAddress)
        public
        view
        returns (string memory name, string memory phone, string memory username)
    {
        Company storage company = companies[_companyAddress];
        return (company.name, company.phone, company.username);
    }

    // Function to verify username availability
    function usernameAvailable(string memory _username) public view returns (bool) {
        return !usernameExists[_username];
    }

    // Function to login and verify password (simplified; a real-world application should use better security practices)
    function login(string memory _username, string memory _password) public view returns (bool) {
        Company storage company = companies[msg.sender];
        if (keccak256(abi.encodePacked(company.username)) == keccak256(abi.encodePacked(_username))) {
            return company.passwordHash == keccak256(abi.encodePacked(_password));
        }
        return false;
    }
}

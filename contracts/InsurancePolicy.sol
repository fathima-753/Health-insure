// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsurancePolicy {

    struct Policy {
        string name;
        string details;
        address applicant;
        uint timestamp;
    }

    Policy[] public policies;

    event PolicySubmitted(string name, string details, address applicant, uint timestamp);

    function submitPolicy(string memory _name, string memory _details) public {
        Policy memory newPolicy = Policy({
            name: _name,
            details: _details,
            applicant: msg.sender,
            timestamp: block.timestamp
        });

        policies.push(newPolicy);

        emit PolicySubmitted(_name, _details, msg.sender, block.timestamp);
    }

    function getPolicyCount() public view returns (uint) {
        return policies.length;
    }

    function getPolicy(uint index) public view returns (string memory name, string memory details, address applicant, uint timestamp) {
        require(index < policies.length, "Policy not found");
        Policy memory p = policies[index];
        return (p.name, p.details, p.applicant, p.timestamp);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthClaim {
    struct Claim {
        
        uint256 claimAmount;
        string claimForm;
        string medicalCertificate;
        string diagnosisReport;
        string idProof;
        string dischargeCard;
        string prescriptionsAndBills;
    }

    mapping(address => Claim[]) public patientClaims;

    event ClaimSubmitted(address indexed patient, uint256 claimAmount);

    // Function to submit a claim
    function submitClaim(
        
        uint256 _claimAmount,
        string memory _claimForm,
        string memory _medicalCertificate,
        string memory _diagnosisReport,
        string memory _idProof,
        string memory _dischargeCard,
        string memory _prescriptionsAndBills
    ) public {
        Claim memory newClaim = Claim({
            
            claimAmount: _claimAmount,
            claimForm: _claimForm,
            medicalCertificate: _medicalCertificate,
            diagnosisReport: _diagnosisReport,
            idProof: _idProof,
            dischargeCard: _dischargeCard,
            prescriptionsAndBills: _prescriptionsAndBills
        });

        patientClaims[msg.sender].push(newClaim);
        emit ClaimSubmitted(msg.sender, _claimAmount);
    }
}

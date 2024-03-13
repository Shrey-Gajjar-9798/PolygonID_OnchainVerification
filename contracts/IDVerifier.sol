// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {PrimitiveTypeUtils} from '@iden3/contracts/lib/PrimitiveTypeUtils.sol';
import {ICircuitValidator} from '@iden3/contracts/interfaces/ICircuitValidator.sol';
import {ZKPVerifier} from '@iden3/contracts/verifiers/ZKPVerifier.sol';

contract IDVerifier is ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID_SIG_VALIDATOR = 1;
    uint64 public constant TRANSFER_REQUEST_ID_MTP_VALIDATOR = 2;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

   event ValidateUser(string message, address useraddress, uint id);

    function _beforeProofSubmit(
        uint64,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check address of sender
        address addr = PrimitiveTypeUtils.int256ToAddress(inputs[validator.inputIndexOf('challenge')]);
        require(_msgSender() == addr, 'address in proof must be sender address');
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        if (requestId == TRANSFER_REQUEST_ID_SIG_VALIDATOR || requestId == TRANSFER_REQUEST_ID_MTP_VALIDATOR ){
            uint256 id = inputs[1];
            emit ValidateUser("Validated Successfully", idToAddress[id], addressToId[_msgSender()]);
        }
    }

}
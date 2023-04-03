


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

    // Variables
    uint public itemCount; 

    struct Certificate {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        address seller;
        bool isSent;
        string uuid;
    }

    // itemId -> Certificate
    mapping(uint => Certificate) public certificates;

    event certOffered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller
    );

    event certSold(
        uint itemId,
        address nft,
        uint tokenId,
        address indexed seller,
        address indexed buyer,
        string uuid,
        string indexed uuid_indexed
    );

    // function transferItem(uint _itemId, address receiver) external nonReentrant {
    function transferItem(uint _itemId, address receiver, string memory uuid) public {
        Certificate storage certificate = certificates[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        certificate.isSent = true;
        certificate.nft.transferFrom(address(this), receiver, certificate.tokenId);
        emit certSold(
            _itemId,
            address(certificate.nft),
            certificate.tokenId,
            certificate.seller,
            receiver,
            uuid,
            uuid
        );
    }

    function makeCertificate(IERC721 _nft, uint _tokenId, address receiver, string memory uuid) external nonReentrant {
        itemCount ++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        certificates[itemCount] = Certificate (
            itemCount,
            _nft,
            _tokenId,
            payable(msg.sender),
            false,
            uuid
        );
        // emit Offered event
        emit certOffered(
            itemCount,
            address(_nft),
            _tokenId,
            msg.sender
        );
        transferItem(_tokenId, receiver, uuid);
    }
}

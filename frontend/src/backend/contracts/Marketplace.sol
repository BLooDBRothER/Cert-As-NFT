


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    struct Certificate {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        address seller;
        bool isSent;
    }

    // itemId -> Item
    mapping(uint => Item) public items;
    mapping(uint => Certificate) public certificates;

    event certOffered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller
    );

    event certSold(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // function transferItem(uint _itemId, address receiver) external nonReentrant {
    function transferItem(uint _itemId, address receiver) public {
        Certificate storage certificate = certificates[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        certificate.isSent = true;
        certificate.nft.transferFrom(address(this), receiver, certificate.tokenId);
        emit certSold(
            _itemId,
            address(certificate.nft),
            certificate.tokenId,
            certificate.seller,
            receiver
        );
    }

    function makeCertificate(IERC721 _nft, uint _tokenId, address receiver) external nonReentrant {
        itemCount ++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        certificates[itemCount] = Certificate (
            itemCount,
            _nft,
            _tokenId,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit certOffered(
            itemCount,
            address(_nft),
            _tokenId,
            msg.sender
        );
        transferItem(_tokenId, receiver);
    }
}




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

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

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

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
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
        // equire(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
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

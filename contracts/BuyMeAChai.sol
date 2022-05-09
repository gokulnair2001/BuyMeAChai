//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Deployed to Goerli at 0xff82a1379Ea2864a8B632FC96d692316BacFd34d

contract BuyMeAChai {
    // Event to emit when a memo is created    
    event NewMemo(

        address indexed from,
        uint256 timeStamp,
        string name,
        string message

    );


    // Memo Struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from friends
    Memo[] memos;

    // Address of contract deployer
    address payable owner;

    // Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }


    /**
     * @dev buy a chai for contract owner
     * @param _name name of the chai buyer
     * @param _message a nice message from the chai buyer
     */
    function buyChai(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "can't buy chai with 0 ETH");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit a log event when a new memo is created
        emit NewMemo(
             msg.sender,
             block.timestamp,
             _name,
             _message
        );
    }

    /**
     * @dev send the entire balance stored in this contact to the owner
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrrieve all the memos stored on the blockchain
     */
    function getMemos() public view returns(Memo[] memory) { 
        return memos;
    }
}

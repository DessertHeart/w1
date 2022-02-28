pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TutorialToken is ERC20 {

  string public name = "TutorialToken";
  string public symbol = "TT";
  uint8 public decimals = 2;
  // 发行自己代币的总数量
  uint public INITIAL_SUPPLY = 12000;
  // 构造函数
  constructor() public {
    // 调用父类函数,传入合约所有者地址和发币总额
      _mint(msg.sender, INITIAL_SUPPLY);
  }

}

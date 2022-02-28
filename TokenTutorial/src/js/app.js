
// APP就是一个json对象，里面定义所有逻辑和待调用的函数 (nodejs)
App = {
  // 定义两个变量
  web3Provider: null,
  contracts: {},
  // 定义了一个初始化函数
  init: function() {
    return App.initWeb3();
  },
  // 实例化web3对象
  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      console.log('if');
      // 当前有私有链,则返回私有链的信息
      App.web3Provider = web3.currentProvider;
      // 创建了一个web3对象, 才能调用web3 api
      web3 = new Web3(web3.currentProvider);
    } else {
      console.log('else');
      // 来手动指定要连接的私有链地址
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    console.info(web3.version);
    return App.initContract();
  },
  // 初始化智能合约
  initContract: function() {
    // jquery $.getJSON用来获取json格式的文件
    // 当前项目缺少一个TutorialToken.sol的合约文件
    $.getJSON('TutorialToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      // 获取json文件中的合约名词
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);
      // 配置合约关联的私有链
      App.contracts.TutorialToken.setProvider(App.web3Provider);
      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },
  // 绑定前端的事件
  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },
  // 实现转账功能
  handleTransfer: function(event) {
    event.preventDefault();
    // 获取目标账户的地址与转账金额
    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();
    console.log('Transfer ' + amount + ' TT to ' + toAddress);
    // 此变量用来存储实例化的合约
    var tutorialTokenInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      // 拿到测试的第一个账户
      var account = accounts[0];
      // 通过合约名词实例化智能合约， 还可以通过ABI + address进行实例化
      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;
        // TutorialToken 后续需要编写一个transfer
        return tutorialTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
  // 查询余额
  getBalances: function() {
    console.log('Getting balances...');
    // 此变量用来存储实例化的合约
    var tutorialTokenInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;
        // TutorialToken 后续需要编写一个balanceOf 用来实现余额的查询
        return tutorialTokenInstance.balanceOf(account);
      }).then(function(result) {
        console.info(result);
        balance = result.c[0];
        $('#TTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

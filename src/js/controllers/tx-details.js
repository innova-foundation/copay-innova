'use strict';

angular.module('copayApp.controllers').controller('txDetailsController', function($rootScope, $log, $ionicHistory, $scope, $timeout, walletService, lodash, gettextCatalog, profileService, externalLinkService, popupService, ongoingProcess, txFormatService, txConfirmNotification, feeService, configService, $http) {

  var txId;
  var listeners = [];
  var config = configService.getSync();
  var blockexplorerUrl;

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    txId = data.stateParams.txid;
    $scope.title = gettextCatalog.getString('Transaction');
    $scope.wallet = profileService.getWallet(data.stateParams.walletId);
    $scope.color = $scope.wallet.color;
    $scope.copayerId = $scope.wallet.credentials.copayerId;
    $scope.isShared = $scope.wallet.credentials.n > 1;
    $scope.txsUnsubscribedForNotifications = config.confirmedTxsNotifications ? !config.confirmedTxsNotifications.enabled : true;

    if ($scope.wallet.coin == 'bch') {
      if (walletService.useLegacyAddress($scope.wallet)) {
        blockexplorerUrl = 'insight.innovacoin.info';
      } else {
        blockexplorerUrl = 'insight.innovacoin.info';
      }
    } else {
      // blockexplorerUrl = 'insight.bitpay.com';
      blockexplorerUrl = 'insight.innovacoin.info';
    }

    txConfirmNotification.checkIfEnabled(txId, function(res) {
      $scope.txNotification = {
        value: res
      };
    });

    updateTx();

    listeners = [
      $rootScope.$on('bwsEvent', function(e, walletId, type, n) {
        if (type == 'NewBlock' && n && n.data && n.data.network == 'livenet') {
          updateTxDebounced({
            hideLoading: true
          });
        }
      })
    ];
  });

  $scope.$on("$ionicView.leave", function(event, data) {
    lodash.each(listeners, function(x) {
      x();
    });
  });

  $scope.readMore = function() {
    var url = 'https://github.com/innova-foundation/innova/wiki/COPAY---FAQ#amount-too-low-to-spend';
    var optIn = true;
    var title = null;
    var message = gettextCatalog.getString('Read more in our Wiki');
    var okText = gettextCatalog.getString('Open');
    var cancelText = gettextCatalog.getString('Go Back');
    externalLinkService.open(url, optIn, title, message, okText, cancelText);
  };

  function updateMemo() {
    walletService.getTxNote($scope.wallet, $scope.btx.txid, function(err, note) {
      if (err) {
        $log.warn('Could not fetch transaction note: ' + err);
        return;
      }
      if (!note) return;

      $scope.btx.note = note;
      $scope.$apply();
    });
  }

  function initActionList() {
    $scope.actionList = [];
    if ($scope.btx.action != 'sent' || !$scope.isShared) return;

    var actionDescriptions = {
      created: gettextCatalog.getString('Proposal Created'),
      accept: gettextCatalog.getString('Accepted'),
      reject: gettextCatalog.getString('Rejected'),
      broadcasted: gettextCatalog.getString('Broadcasted'),
    };

    $scope.actionList.push({
      type: 'created',
      time: $scope.btx.createdOn,
      description: actionDescriptions['created'],
      by: $scope.btx.creatorName
    });

    lodash.each($scope.btx.actions, function(action) {
      $scope.actionList.push({
        type: action.type,
        time: action.createdOn,
        description: actionDescriptions[action.type],
        by: action.copayerName
      });
    });

    $scope.actionList.push({
      type: 'broadcasted',
      time: $scope.btx.time,
      description: actionDescriptions['broadcasted'],
    });

    $timeout(function() {
      $scope.actionList.reverse();
    }, 10);
  }

  var updateTx = function(opts) {
    opts = opts || {};
    if (!opts.hideLoading) ongoingProcess.set('loadingTxInfo', true);
    walletService.getTx($scope.wallet, txId, function(err, tx) {
      if (!opts.hideLoading) ongoingProcess.set('loadingTxInfo', false);
      if (err) {
        $log.warn('Error getting transaction: ' + err);
        $ionicHistory.goBack();
        return popupService.showAlert(gettextCatalog.getString('Error'), gettextCatalog.getString('Transaction not available at this time'));
      }

      $scope.btx = txFormatService.processTx($scope.wallet.coin, tx,
        walletService.useLegacyAddress($scope.wallet));

      txFormatService.formatAlternativeStr($scope.wallet.coin, tx.fees, function(v) {
        $scope.btx.feeFiatStr = v;
        $scope.btx.feeRateStr = ($scope.btx.fees / ($scope.btx.amount + $scope.btx.fees) * 100).toFixed(2) + '%';
      });

      if ($scope.btx.action != 'invalid') {
        if ($scope.btx.action == 'sent') $scope.title = gettextCatalog.getString('Sent Funds');
        if ($scope.btx.action == 'received') $scope.title = gettextCatalog.getString('Received Funds');
        if ($scope.btx.action == 'moved') $scope.title = gettextCatalog.getString('Moved Funds');
      }

        $scope.btx.amountStr = $scope.btx.amountStr.replace('btc','INN');
        $scope.btx.amountValueStr = $scope.btx.amountStr.split(" ")[0];
        $scope.btx.amountUnitStr = $scope.btx.amountStr.split(" ")[1];
        $scope.btx.feeStr = $scope.btx.feeStr.replace('btc','INN');

      updateMemo();
      initActionList();
      getFiatRate();
      $timeout(function() {
        $scope.$digest();
      });

      feeService.getFeeLevels($scope.wallet.coin, function(err, levels) {
        if (err) return;
        walletService.getLowAmount($scope.wallet, levels, function(err, amount) {
          if (err) return;
          $scope.btx.lowAmount = tx.amount < amount;

          $timeout(function() {
            $scope.$apply();
          });

        });
      });
    });
  };

  var updateTxDebounced = lodash.debounce(updateTx, 5000);

  $scope.showCommentPopup = function() {
    var opts = {};
    if ($scope.btx.message) {
      opts.defaultText = $scope.btx.message;
    }
    if ($scope.btx.note && $scope.btx.note.body) opts.defaultText = $scope.btx.note.body;

    popupService.showPrompt($scope.wallet.name, gettextCatalog.getString('Memo'), opts, function(text) {
      if (typeof text == "undefined") return;

      $scope.btx.note = {
        body: text
      };
      $log.debug('Saving memo');

      var args = {
        txid: $scope.btx.txid,
        body: text
      };

      walletService.editTxNote($scope.wallet, args, function(err, res) {
        if (err) {
          $log.debug('Could not save tx comment ' + err);
        }
      });
    });
  };

  $scope.viewOnBlockchain = function() {
    var btx = $scope.btx;
    var url = 'https://' + ($scope.getShortNetworkName() == 'test' ? 'test-' : '') + blockexplorerUrl + '/tx/' + btx.txid;
    var optIn = true;
    var title = null;
    var message = gettextCatalog.getString('View Transaction on Insight');
    var okText = gettextCatalog.getString('Open Insight');
    var cancelText = gettextCatalog.getString('Go Back');
    externalLinkService.open(url, optIn, title, message, okText, cancelText);
  };

  $scope.getShortNetworkName = function() {
    var n = $scope.wallet.credentials.network;
    return n.substring(0, 4);
  };

  var getFiatRate = function() {
    if($scope.wallet.status) {
      $scope.alternativeIsoCode = $scope.wallet.status.alternativeIsoCode;
    }
    $scope.wallet.getFiatRate({
      code: $scope.alternativeIsoCode,
      ts: $scope.btx.time * 1000
    }, function(err, res) {
      if (err) {
        $log.debug('Could not get historic BTC rate');
        return;
      }
      if (res && res.rate) {
        $scope.rateDate = res.fetchedOn;
        $scope.rate = res.rate;

		$http.get('https://www.southxchange.com/api/prices').then(function (response) {
			var data = response.data;

			for (var i = 0; i < data.length; i++){
			  if (data[i].Market == "INN/BTC"){
				$scope.rateDIN = parseFloat(data[i].Last) * res.rate;
			  }
			}
		}
		,function (err) {
			$log.debug('Could not get historic INN rate');
			conosle.log(err);
		});
	  }
    });
  };

  $scope.txConfirmNotificationChange = function() {
    if ($scope.txNotification.value) {
      txConfirmNotification.subscribe($scope.wallet, {
        txid: txId
      });
    } else {
      txConfirmNotification.unsubscribe($scope.wallet, txId);
    }
  };

});

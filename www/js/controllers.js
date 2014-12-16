angular.module('w3cscript.controllers', [])

.controller('indexCtrl', function($scope,$http,$rootScope) {
        ionic.Platform.isFullScreen = true;
        var url = "http://www.w3cscript.com/e/api/getNewsClass.php";
        $http({
            url:url,
            method:"JSONP",
            params:{jsoncallback:'JSON_CALLBACK'}
        }).success(function(res){
            $scope.bclass = res.result;
        });

})

.controller('ArticleCtrl', function($scope,$stateParams, $http,$rootScope) {
        var classId = $stateParams.classId;
        var url = "http://www.w3cscript.com/e/api/getNewsList.php";
        var _page = 1;
        var _pageSize = 10;
        $scope.posts = [];
        $scope.isMore = true;
        $scope.loadData = function (page,pageSize) {

            $http({
                url:url,
                method:"JSONP",
                params:{jsoncallback:'JSON_CALLBACK',classid:classId,pageIndex:page,pageSize:pageSize}
            }).success(function(res,status,headers){
                if (res.pageIndex == res.pageTotal) {
                    $scope.isMore = false;
                } else {
                    $scope.isMore = true;
                }
                var _res = res.result[0];
                angular.forEach(_res,function(post){
                    $scope.posts.push(post);
                });
            })
            .error(function(){
                $scope.isMore = false;
            })
            .finally(function(res,status,headers){
                _page++;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.refresh = function (){
            $scope.posts = [];
            _page = 1;
            $scope.loadData(_page,_pageSize);
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.loadMoreData = function () {
            $scope.loadData(_page,_pageSize);
        }

})

.controller('ArticleDetailCtrl', function($scope, $stateParams, $http,$ionicModal,$rootScope,$ionicLoading,$ionicNavBarDelegate) {
        $ionicLoading.show({
            template: '拼命加载中...'
        });
        var url = "http://www.w3cscript.com/e/api/getNewsContent.php";
        var classid = $stateParams.classId;
        var id = $stateParams.id;
        $http({
            url:url,
            method:"JSONP",
            params:{jsoncallback:'JSON_CALLBACK',classid:classid,id:id}
        }).success(function(res){
            $scope.news = res.result.content;
            $ionicLoading.hide();
        });
        $ionicModal.fromTemplateUrl('templates/modal.html',
            function(modal) {
                $rootScope.settingsModal = modal;
        });
        $scope.showModal = function() {
            $rootScope.settingsModal.show();
        };
})

.controller('AccountCtrl', function($scope,$ionicLoading,$timeout,$ionicPopup) {
        $scope.updateApp = function () {
            $ionicLoading.show({
                template: '正在检查...'
            });
            $timeout(function(){
                $ionicLoading.show({
                    template: '当前已经是最新版本'
                });
                $timeout(function(){
                    $ionicLoading.hide();
                },1000);
            },3000)

        };
        $scope.doSuggest = function (visitor) {
            console.log(visitor);
            $scope.visitor = visitor;
            $ionicLoading.show({
                template: '提交成功！'
            });
            $timeout(function(){
                $ionicLoading.hide();
                alertDialog(visitor);
            },2000);
        };
        var alertDialog = function (visitor) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: '你的意见我们意见接受到啦！<br>非常感谢你对我们的支持，我们将根据具体情况采纳您的意见！',
                okText: '好'
            });
            alertPopup.then(function(res) {
                angular.forEach($scope.visitor,function(visitor,index){
                    $scope.visitor[index] = "";
                });
            });
        }
        var showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: '你确定要退出吗?',
                cancelText:'算了吧',
                okText:'确定'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };
        $scope.exit = function () {
            showConfirm();
        }
})

.controller('chatboxCtrl',function($scope,$rootScope){
        $scope.closeModal = function() {
            $rootScope.settingsModal.hide();
        };
})
.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

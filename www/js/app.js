// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('w3cscript', ['ionic', 'w3cscript.controllers', 'w3cscript.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            // Each tab has its own nav history stack:

            .state('menu.index', {
                url: '/index',
                views: {
                    'menu-index': {
                        templateUrl: 'templates/menu-index.html',
                        controller: 'indexCtrl'
                    }
                }
            })

            .state('menu.article', {
                url: '/article/:classId',
                views: {
                    'menu-article': {
                        templateUrl: 'templates/menu-article.html',
                        controller: 'ArticleCtrl'
                    }
                }
            })
            .state('menu.article-detail', {
                url: '/detail/:classId/:id',
                views: {
                    'menu-article': {
                        templateUrl: 'templates/article-detail.html',
                        controller: 'ArticleDetailCtrl'
                    }
                }
            })

            .state('menu.account', {
                url: '/account',
                views: {
                    'menu-account': {
                        templateUrl: 'templates/menu-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('menu.account-detail', {
                url: '/account/about',
                views: {
                    'menu-account': {
                        templateUrl: 'templates/about.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('menu.suggestion', {
                url: '/account/suggestion',
                views: {
                    'menu-account': {
                        templateUrl: 'templates/suggestion.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/index');

});


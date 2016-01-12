angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('tabsController.locate', {
      url: '/locate',
      views: {
        'tab1': {
          templateUrl: 'templates/locate.html',
          controller: 'locateCtrl'
        }
      }
    })

    .state('tabsController.comeGetMe', {
      url: '/comeGetMe',
      views: {
        'tab2': {
          templateUrl: 'templates/comeGetMe.html',
          controller: 'comeGetMeCtrl'
        }
      }
    })

    .state('tabsController.settings', {
      url: '/settings',
      views: {
        'tab3': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })

    .state('tabsController', {
      url: '/locate',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })

    .state('page', {
      url: '/page5',
      templateUrl: 'templates/page.html',
      controller: 'pageCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/locate/comeGetMe');

});

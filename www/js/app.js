// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

	var applicationId = 'rmh6s73DYeTgIfgUff5bhL4fkp2DyWlrBYEOONyc';
	var javaScriptKey = 'ptypbAxwh7ZiTkbi77a1xqqR94AB66BGt77gOz6J';

	Parse.initialize(applicationId, javaScriptKey );


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
	
  
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
	 $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
		

      }
    }
  })
  
   .state('app.create_dream', {
      url: "/create_dream",
      views: {
        'menuContent': {
          templateUrl: "templates/create_dream.html",
          
        }
      }
    })
   .state('app.edit_dream', {
    url: "/edit_dream/:dreamId",
    views: {
      'menuContent': {
        templateUrl: "templates/edit_dream.html",
        controller: 'MyDreamDetailCtrl'
      }
    }
  })
  .state('app.editdream', {
    url: "/editdream/:dreamId",
    views: {
      'menuContent': {
        templateUrl: "templates/dream.html",
        controller: 'DreamCtrl'
      }
    }
  })
   .state('app.discover_dreams', {
      url: "/discover",
      views: {
        'menuContent': {
          templateUrl: "templates/discover_dreams.html",
         controller: 'DiscoverlistsCtrl'
        }
      }
    })

  .state('app.discover_dream', {
    url: "/discover/:dreamId",
    views: {
      'menuContent': {
        templateUrl: "templates/discover_dream.html",
        controller: 'DiscoverDetailCtrl'
      }
    }
  })
  
 
    .state('app.my_dreams', {
      url: "/my_dreams",
      views: {
        'menuContent': {
			controller: 'MyDreamlistsCtrl',
          templateUrl: "templates/my_dreams.html"
          
        }
      }
    })



  .state('app.messages', {
    url: "/messages",
    views: {
      'menuContent': {
        templateUrl: "templates/messages.html",
		 controller: 'ChatCtrl'
      }
    }
  })
  
  .state('app.message', {
    url: "/messages/:chatId/:sentUserId",
    views: {
      'menuContent': {
        templateUrl: "templates/chat.html",
		 controller: 'ChatDetailCtrl'
      }
    }
  })
  
   .state('app.register', {
    url: "/register",
    views: {
      'menuContent': {
        templateUrl: "templates/register.html"
      }
    }
  })
  
  .state('app.account', {
    url: "/account",
    views: {
      'menuContent': {
        templateUrl: "templates/account.html",
		controller: 'AccountCtrl'
      }
    }
  });
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/discover');
})
 .run(function($rootScope, $location) {
	
	 if (Parse.User.current()) {
		 $location.path("/app/discover");
	 }else{
		 
		 $location.path("/app/login");
		 
	 }

  });
var app = angular.module('quotesApp', [
    'ui.router',
    'quotesApp.services',
    'quotesApp.routes'
    //'ngCookies'
    ])
    .constant('myConfig', {
        //'baseUrl': 'http://localhost',
        'baseUrl': 'https://fquotes.herokuapp.com',
        //'port': '8080'
    });

app.controller('mainController', function ($cookies, $rootScope) {
    var vm = this;
    if ( $cookies.get('token') === undefined && $cookies.get('email') === undefined  ){
      vm.user = "Login";
    }
    else {
      vm.user = $cookies.get('email');
    }

    $rootScope.$on('userLoggedIn', function () {
      vm.user = $cookies.get('email');
    });
    $rootScope.$on('userLoggedOut', function () {
      vm.user = "Login";
    });


});

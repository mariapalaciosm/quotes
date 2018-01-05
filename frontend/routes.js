angular.module('quotesApp.routes', [])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<quotes-list></quotes-list>'
            })
            .state('addQuote', {
                url: '/addQuote',
                template: '<add-quote></add-quote>'
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })

    }
);

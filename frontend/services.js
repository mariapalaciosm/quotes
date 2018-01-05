angular.module('quotesApp.services', ['ngCookies'])
    .factory('QuotesFactory', ['$http', '$q', 'myConfig', function ($http, $q, myConfig) {
        //var baseUrl = myConfig.baseUrl + ':' + myConfig.port;
        var baseUrl = myConfig.baseUrl;

        function getQuotes() {
            var q = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl + '/quote'
            }).then(function successCallback(response) {
                q.resolve(response.data);
            }, function errorCallback(response) {
                q.reject();
            });
            return q.promise;
        }

        function addQuote(authorName, authorPhoto, quote, token) {
            var q = $q.defer();
            $http({
                method: 'POST',
                url: baseUrl + '/quote',
                headers: {
                  "Authorization": "Bearer " + token
                },
                data: {
                    "author": authorName,
                    "body": quote,
                    "author_photo": authorPhoto
                }
            }).then(function successCallback(response) {
                q.resolve();
            }, function errorCallback(response) {
                q.reject();
            });
            return q.promise;
        }

        return {
            getQuotes: getQuotes,
            addQuote: addQuote
        }
    }])

    .factory('AuthFactory', ['$http', '$q', '$cookies', 'myConfig', function ($http, $q, $cookies, myConfig) {

        var _ = window._;
        var TOKEN_STORAGE_KEY = 'token';
        //var currentUser = getCurrentUser();

        //var baseUrl = myConfig.baseUrl + ':' + myConfig.port;
        var baseUrl = myConfig.baseUrl;


        // function getCurrentUser() {
        //     var token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
        //     var user = {};
        //     if (typeof token !== 'undefined' && !(token === null)) {
        //         var encoded = token.split('.')[1];
        //         user = JSON.parse(window.atob(encoded));
        //     }
        //     return user;
        // }

        // var isAuthenticated = function() {
        //     return !(_.isEmpty(currentUser));
        // };
        //
        // var logout = function() {
        //     window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        //     return;
        // };

        var login = function (email, pass) {
            var q = $q.defer();
            $http({
                method: 'POST',
                url: baseUrl + '/auth',
                data: {
                    "email": email,
                    "password": pass
                }
            }).then(function successCallback(response) {
                $cookies.put('token', response.data.token);
                $cookies.put('email', response.config.data.email);
                q.resolve();
            }, function errorCallback(response) {
                q.reject();
            });

            return q.promise;
        };

        return {
            login: login
        }
    }]);

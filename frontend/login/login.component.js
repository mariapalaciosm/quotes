function LoginController(AuthFactory, $state, $window, $cookies, $rootScope) {
    var vm = this;
    vm.log = false;
    if ( $cookies.get('token') !== undefined  ){
      vm.log = true;

    }

    vm.login = function () {
        AuthFactory.login(vm.email, vm.password).then(function successCallback() {
            $rootScope.$broadcast('userLoggedIn');
            $state.go('home');
        }, function errorCallback() {
          $window.alert('Your email or password is wrong');
        })
    };

    vm.logout = function () {
      if ( $cookies.get('token') !== undefined  ){
        $cookies.remove("token");
      }
      if ( $cookies.get('email') !== undefined  ){
        $cookies.remove("email");
      }
      $cookies.remove("email");
      $rootScope.$broadcast('userLoggedOut');
      $state.go('home');
    };
}

app.component('login', {
    templateUrl: 'login/login.html',
    controller: LoginController,
    controllerAs: 'vm'
});

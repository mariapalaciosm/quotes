function AddQuoteController(QuotesFactory, $cookies, $window, $rootScope, $route) {
    var vm = this;
    vm.token = $cookies.get('token');
    if (vm.token === undefined){
      vm.warning=true;
    }
    else{
      vm.warning=false;
    }

    vm.submitQuote = function () {
        if (vm.token === undefined){
            $window.alert('You need to login before you add a new quote');
        }
        else {
          QuotesFactory.addQuote(vm.author.name, vm.author.photo, vm.quote, vm.token).then(function (quotes) {
            $window.alert('You have added a new quote succesfully');
            vm.author = {};
            vm.quote = undefined;
            $route.reload();

          }, function errorCallback() {
            $window.alert('The quote cannot be added');
          });
      }
    };
}

app.component('addQuote', {
    templateUrl: 'add-quote/add-quote.html',
    controller: AddQuoteController,
    controllerAs: 'vm'
});

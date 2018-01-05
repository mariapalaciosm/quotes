app.component('quotesList', {
    templateUrl: 'quotes-list/quotes-list.html',
    controller: QuotesListController,
    controllerAs: 'vm'
});

function QuotesListController(QuotesFactory,$scope ) {
    var vm = this;

    QuotesFactory.getQuotes().then(function (quotes) {
        vm.quotes = quotes.data;
    })

  vm.changeColor = function (id, bool) {
/*        if(bool){
            //vm.colorQuote = {color: '#'+quote.colour};

        }
        else{
            //vm.colorQuote = {color: 'white'};

        }*/
    };
}


app.filter('searchAuthorAndBody', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(quote){
            if((quote.body.toLowerCase().indexOf(searchString) !== -1) || (quote.author.toLowerCase().indexOf(searchString) !== -1)){
                result.push(quote);
            }
        });
        return result;
    };
});

(function() {
    'use strict';

    angular
        .module('triangular')
        .filter('triTranslate', triTranslateFilter);

    /* @ngInject */
    function triTranslateFilter($injector, $filter) {
        return true;
        //return function(input) {
        //    // if angular translate installed this will return true
        //    // so we can translate
        //    if($injector.has('translateFilter')) {
        //        return $filter('translate')(input);
        //    }
        //    else {
        //        // no translation active so just return the same input
        //        return input;
        //    }
        //};
    }
})();

(function() {
    'use strict';

    angular
        .module('triangular.components')
        .filter('tableEditButton', tableEditButton);

    function tableEditButton($sce) {
        return filterFilter;

        ////////////////

        function filterFilter(value) {
            return $sce.trustAsHtml('<md-button ng-transclude class="md-fab md-accent md-default md-button md-cyan-theme md-ink-ripple" aria-label="fab button" ng-click="' + value + '">\
<md-icon md-font-icon="zmdi zmdi-edit" class="ng-scope md-cyan-theme md-font material-icons zmdi zmdi-edit" aria-hidden="true"></md-icon>\
        </md-button>');
        }
    }

})();
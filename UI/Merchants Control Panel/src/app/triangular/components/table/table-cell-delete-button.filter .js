(function () {
    'use strict';

    angular
        .module('triangular.components')
        .filter('tableDeleteButton', tableDeleteButton);

    function tableDeleteButton($sce) {
        return filterFilter;

        ////////////////

        function filterFilter(value) {
            return $sce.trustAsHtml('<md-button ng-transclude class="md-fab md-warn md-default md-button md-cyan-theme md-ink-ripple" aria-label="fab button" ng-click="' + value + '">\
<md-icon md-font-icon="zmdi zmdi-delete" class="ng-scope md-cyan-theme md-font material-icons zmdi zmdi-delete" aria-hidden="true"></md-icon>\
        </md-button>');
        }
    }

})();
var egm = angular.module('egm', ['ngMaterial']);
egm.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        //return $filter('date')(date, "dd/MM/yyyy");
         return moment(date).format('DD MMM YYYY');
    };
});

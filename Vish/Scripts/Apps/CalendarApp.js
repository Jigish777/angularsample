var calendarApp = angular.module("CalendarApp", ['ngRoute']);
calendarApp.controller("CalendarCtrl", function ($scope, $compile,$rootScope) {
    //$rootScope.currmonth = "1";
    //$rootScope.curryear = "2016";
    $scope.directive = "123";
    $scope.abc = "UnsharedVariable";

});
calendarApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when("/calendar", {
        templateUrl: "../../HTMLTemplates/year.html",
            
    })
    .when("/calendar/month", {
        templateUrl: "../../HTMLTemplates/month.html",
    })
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
calendarApp.directive("calendar", function ($location,$rootScope) {
    return {
        templateUrl: "../../HTMLTemplates/calendar.html",
        scope: {
        },
        link: function (scope, element, attrs) {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var weekday = new Array(7);
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";
            var date = new Date(attrs.year, attrs.month, 1);
            scope.MonthName = monthNames[date.getMonth()];


            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var firstDatePos = firstDay.getDay();
            var lastDate = lastDay.getDate();
            var FullMonth = [];
            var dayNumber = 0;
            for (var i = 0; i <= 41; i++) {

                if (i >= firstDatePos && dayNumber < lastDate) {
                    dayNumber++;
                    FullMonth.push(dayNumber);
                }
                else {
                    FullMonth.push("*");
                }
            }
            scope.Rows = [[], [], [], [], [], [], []];
            var count = 0;
            var al = 0;
            for (var day in FullMonth) {

                count++;
                scope.Rows[al].push(FullMonth[day]);
                if (count % 7 == 0 && al < 5) {
                    al++;
                }
            }

            scope.clicked = function (monthname) {
                $rootScope.currmonth = monthNames.indexOf(monthNames[date.getMonth()]);
                $rootScope.curryear = "2016";
                $location.url("/calendar/month");
            };
        }
    };
});
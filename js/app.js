"use strict";

angular.module("app", ["winjs",'ngRoute','ngMaterial']);
angular.module('app').config(function ($routeProvider) {
            
    
    $routeProvider
        .when('/', {
            controller: 'startcontroller',
            templateUrl: 'views/main.html',
          
        })
    .when('/Details', {
        controller: 'detailscontroller',
        templateUrl: 'views/details.html',
          
    }).when('/Settings', {
        controller: 'settingscontroller',
        templateUrl: 'views/settings.html',

    });
});
angular.module("app").run(function ($rootScope) {
   
});
angular.module("app").factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);
angular.module("app").controller("detailscontroller", function ($scope,$rootScope,$window, $location, FeedService) {
    
    $scope.Height = $window.innerHeight;
   
    if ($rootScope.SelectedFeed != null)
    {
        $scope.Feed = $rootScope.SelectedFeed;
        FeedService.parseFeed($scope.Feed.RSSUrl).then(function (res) {
            $scope.FeedEntries = res.data.responseData.feed.entries;
        });
        $rootScope.SelectedFeed = null;
    }
    $scope.BackToHome = function()
    {
        $location.path("/");
    }
    
});
angular.module("app").controller("settingscontroller", function ($scope, $rootScope, $window, $location, FeedService) {

    $scope.Height = $window.innerHeight;

    $scope.Feeds = $rootScope.Feeds;

});
angular.module("app").controller('startcontroller', function ($scope, $rootScope,$location,FeedService) {
  
    $rootScope.splitViewElement = document.getElementById("splitView");
    $rootScope.goToHome = function()
    {
        $location.path("/");
    }
    $rootScope.goToSettings = function () {
        $location.path("/Settings");
    }
    $scope.goToHome = function () { };
    $scope.goToSettings = function () { };

    $scope.Title = "RSS Feeds";
    $rootScope.Feeds = $scope.Feeds = rssFeeds;
    $scope.ShowFeed = function (Feed)
    {
        $rootScope.SelectedFeed = Feed;
        $location.path("/Details");
    }


});











var rssFeeds = [{
    "Title": "Anadolu Ajansı",
    "City": "Ankara",
    "Country": "Turkey",
    "RSSUrl": "http://www.aa.com.tr/rss/ajansgunceleng.xml",
    "Category": "Business",
    "RSSFormat": "ATOM"
}, {
    "Title": "Agenţia naţională de presă",
    "City": "Bukarest",
    "Country": "Rumänien",
    "RSSUrl": "http://www.agerpres.ro/home.rss",
    "Category": "Business",
    "RSSFormat": "ATOM"
},
{
    "Title": "Austria Presse Agentur",
    "City": "Wien",
    "Country": "Austria",
    "RSSUrl": "https://www.apa.at/Site/RSS.xml",
    "Category": "Business",
    "RSSFormat": "RSS"
},
{
    "Title": "Spiegel",
    "City": "Hamburg",
    "Country": "Germany",
    "RSSUrl": "http://www.spiegel.de/schlagzeilen/tops/index.rss",
    "Category": "Business",
    "RSSFormat": "RSS"
},
{
    "Title": "Reuters",
    "City": "Hamburg",
    "Country": "Germany",
    "RSSUrl": "http://feeds.reuters.com/reuters/businessNews",
    "Category": "Business",
    "RSSFormat": "RSS"
},
{
    "Title": "Der Standard.at",
    "City": "Wien",
    "Country": "Austria",
    "RSSUrl": "http://derStandard.at/?page=rss&ressort=Seite1",
    "Category": "News",
    "RSSFormat": "RSS"
},
{
    "Title": "Der Standard.at",
    "City": "Wien",
    "Country": "Austria",
    "RSSUrl": "http://derstandard.at/?page=rss&ressort=International",
    "Category": "International",
    "RSSFormat": "RSS"
},
{
    "Title": "YNetNews",
    "City": "Jerusalem",
    "Country": "Israel",
    "RSSUrl": "http://www.ynet.co.il/Integration/StoryRss3082.xm",
    "Category": "National",
    "RSSFormat": "RSS"
},
{
    "Title": "BBC News",
    "City": "London",
    "Country": "United Kingdom",
    "RSSUrl": "http://feeds.bbci.co.uk/news/world/rss.xml",
    "Category": "International",
    "RSSFormat": "RSS"
},
{
    "Title": "China Daily",
    "City": "SomeWhere",
    "Country": "China",
    "RSSUrl": "http://www.chinadaily.com.cn/rss/china_rss.xml",
    "Category": "National",
    "RSSFormat": "RSS"
},
{
    "Title": "United Press International",
    "City": "New York",
    "Country": "USA",
    "RSSUrl": "http://rss.upi.com/news/news.rss",
    "Category": "International",
    "RSSFormat": "RSS"
}];
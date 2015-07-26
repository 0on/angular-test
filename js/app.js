angular.module('comments', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        var routeConfig = function () {
            console.log('route config called');
            return {
                controller: 'CommentsCtrl',
                //templateUrl: '*.html',
                resolve: {
                    store: function (localStorage) {
                        console.log('getting storage');
                        return localStorage.then(function (module) {
                            //module.get(); // Fetch the todo records in the background.
                            return module;
                        });
                    }
                }
            }
        };

        $routeProvider
            .when('/', routeConfig)
            .otherwise({
                redirectTo: '/'
            });
    });
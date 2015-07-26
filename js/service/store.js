angular.module('comments')
    .factory('localStorage', function () {
        "use strict";
        var ID = "comments-local-storage";
        var store = {

            save: function (comments) {
                localStorage.setItem(ID, JSON.stringify(comments));
            },

            load: function () {
                return JSON.parse(localStorage.getItem(ID));
            }

        };

        return store;
    });

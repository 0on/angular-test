angular.module('comments', ['comments.service'])
    .controller('CommentsCtrl', ['$scope', 'LocalStorage', '$window', function CommentsCtrl($scope, LocalStorage, $window) {
        "use strict";
        $scope.comments = LocalStorage.load() || [];
        $scope.activeComment = null;

        var commentForAdding,
            commentBackUp;

        $window.addEventListener('beforeunload', function () {
            LocalStorage.save($scope.comments);
        });

        $scope.addComment = function () {
            $scope.cancelEditing();
            $scope.activeComment = new Comment('', '', true);
        };

        $scope.saveComment = function (commentsLevel, comment, index) {
            comment.editable = false;
            comment.date = new Date();
            commentsLevel[index] = comment;
            //$scope.cancelEditing();
        };

        $scope.saveNewComment = function () {
            $scope.saveComment($scope.comments, $scope.activeComment, $scope.comments.length);
            $scope.cancelAdding();
        };

        $scope.reply = function (comment) {
            $scope.cancelAdding();
            $scope.cancelEditing();
            commentForAdding = comment;
            comment.replies[comment.replies.length] = new Comment('@' + comment.author + ' ', '', true);
        };

        $scope.cancelAdding = function () {
            $scope.activeComment = null;
        };

        $scope.cancelEditing = function () {
            if (commentForAdding && commentForAdding.replies.length > 0
                && commentForAdding.replies[commentForAdding.replies.length - 1].editable) {

                commentForAdding.replies.pop();

            }
            restore();
        };

        $scope.deleteComment = function (parent, index) {
            var replies = parent.$parent.comment ? parent.$parent.comment.replies : $scope.comments;
            replies.splice(index, 1);
        };

        $scope.edit = function (comment, parent) {
            commentBackUp = {
                indexes: parseIndexes(parent),
                comment: angular.extend({}, comment) 
            };
            comment.editable = true;
        };

        function restore() {
            var indexes = commentBackUp.indexes,
                replies = $scope.comments[indexes[0]].replies,
                length = indexes.length - 1;
            for (var i = 1; i < length; i++) {
                replies = replies[indexes[i]].replies;
            }
            replies[indexes[length]] = commentBackUp.comment;
        }

        function parseIndexes(parent) {
            var indexes = [];
            while (parent) {
                if (parent.hasOwnProperty('comment')) {
                    indexes.unshift(parent.$index);
                }
                parent = parent.$parent;
            }
            return indexes;
        }

    }]);

var Comment = function (text, author, editable) {
    this.text = text;
    this.author = author;
    this.text = text;
    this.editable = editable;
    this.collapsed = false;
    this.date = null;
    this.replies = [];
};
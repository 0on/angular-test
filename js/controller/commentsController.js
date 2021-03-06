angular.module('comments', ['comments.service'])
    .controller('CommentsCtrl', ['$scope', 'LocalStorage', '$window', function CommentsCtrl($scope, LocalStorage, $window) {
        "use strict";
        $scope.comments = LocalStorage.load() || [];
        $scope.activeComment = null;

        var commentForAdding,
            commentBackUp;

        $window.addEventListener('beforeunload', function () {
            $scope.cancelEditing();
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
            if (confirm('Вы уверены, что хотите удалить комментарий?')) {
                var replies = parent.$parent.comment ? parent.$parent.comment.replies : $scope.comments;
                replies.splice(index, 1);
            }
        };

        $scope.edit = function (comment, parent) {
            $scope.cancelAdding();
            commentBackUp = {
                indexes: parseIndexes(parent),
                comment: angular.extend({}, comment)
            };
            comment.editable = true;
        };

        function restore() {
            if (commentBackUp) {
                var indexes = commentBackUp.indexes,
                    replies = $scope.comments[indexes[0]].replies,
                    length = indexes.length - 1;
                if (length === 0) {
                    $scope.comments[commentBackUp.indexes[0]] = commentBackUp.comment;
                } else {
                    for (var i = 1; i < length; i++) {
                        replies = replies[indexes[i]].replies;
                    }
                    replies[indexes[length]] = commentBackUp.comment;
                }
                commentBackUp = null;
            }
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
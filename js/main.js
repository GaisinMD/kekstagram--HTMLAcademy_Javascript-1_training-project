'use strict';

var photosQuantity = 25;
var photosUlrList = [];
var commentsListAll = [];
var commentsTextList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var commentatorsNameList = [
  'Алина', 'Полина', 'Дарья', 'Коля', 'Максим', 'Вадим'
];
var photosList = [];
var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var shuffleList = function (list) {
  var y;
  var x;
  for (var i = list.length - 1; i > 0; i--) {
    y = Math.floor(Math.random() * (i + 1));
    x = list[i];
    list[i] = list[y];
    list[y] = x;
  }
  return list;
};

var generatePhotosUrlList = function (quantity) {
  var urlList = [];
  for (var i = 1; i <= quantity; i++) {
    urlList.push('photos/' + i + '.jpg');
  }
  return shuffleList(urlList);
};

var generateCommentatorList = function (names) {
  var listCommentators = [];
  var shuffleNames = shuffleList(names);

  for (var i = 0; i < shuffleNames.length; i++) {
    var commentator = {};
    commentator.name = shuffleNames[i];
    commentator.avatar = 'img/avatar-' + (i + 1) + '.svg';
    listCommentators.push(commentator);
  }

  return listCommentators;
};

var generatePhotoComment = function () {
  var comments = [];
  var listCommentators = generateCommentatorList(commentatorsNameList);
  var quantityRandom = Math.round(Math.random() * 3 + 1);
  for (var i = 0; i < quantityRandom; i++) {
    var comment = {};
    comment.message = '';
    var countComments = Math.round(Math.random());
    var countComentator = Math.floor(Math.random() * (listCommentators.length));

    comment.avatar = listCommentators[countComentator].avatar;

    for (var j = 0; j <= countComments; j++) {
      comment.message += commentsTextList[Math.floor(Math.random() * (commentsTextList.length))];
      if (countComments === 1 && j === 0) {
        comment.message += ' ';
      }
    }

    comment.name = listCommentators[countComentator].name;

    comments.push(comment);
  }
  return comments;
};

var generatePhotoCommentsList = function (quantity) {
  var commentsList = [];
  for (var i = 0; i < quantity; i++) {
    commentsList.push(generatePhotoComment());
  }
  return commentsList;
};

var generatePhotos = function (quantity, urls, comments) {
  var photos = [];
  for (var i = 0; i < quantity; i++) {
    var photoObject = {};
    photoObject.url = urls[i];
    photoObject.likes = Math.ceil(Math.random() * 250);
    photoObject.comments = comments[i];
    photos.push(photoObject);
  }
  return photos;
};

var generatePicture = function (template, pictureItem) {
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.picture__img').src = pictureItem.url;
  templateElement.querySelector('.picture__likes').textContent = pictureItem.likes + '';
  templateElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;
  return templateElement;
};

photosUlrList = generatePhotosUrlList(photosQuantity);
commentsListAll = generatePhotoCommentsList(photosQuantity);
photosList = generatePhotos(photosQuantity, photosUlrList, commentsListAll);

console.log(photosList);

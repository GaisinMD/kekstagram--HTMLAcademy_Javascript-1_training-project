'use strict';

var ESC_KEYCODE = 27;
var PHOTO_SIZE_MAX = 100;
var PHOTO_SIZE_MIN = 0;
var PHOTO_SIZE_CHANGE_STEP = 25;
var PHOTO_EFFECT_VOLUME_DEFAULT = 100;

var uploadFile = document.querySelector('#upload-file');
var photoEditForm = document.querySelector('.img-upload__overlay');
var photoEditFormClose = photoEditForm.querySelector('#upload-cancel');

var photoPreview = document.querySelector('.img-upload__preview');
var photoPreviewImage = photoPreview.getElementsByTagName('img')[0];
var photoChangeSize = document.querySelector('.img-upload__scale');
var photoSizeBigger = photoChangeSize.querySelector('.scale__control--bigger');
var photoSizeSmaller = photoChangeSize.querySelector('.scale__control--smaller');
var photoSizeValue = photoChangeSize.querySelector('.scale__control--value');
var photosize;

var imageUploadEffects = document.querySelector('.effects__list');
var imageUploadEffectsLevel = document.querySelector('.img-upload__effect-level');
var imageEffectLevelValue = imageUploadEffectsLevel.querySelector('.effect-level__value');
var imageEffectPin = imageUploadEffectsLevel.querySelector('.effect-level__pin');
var imageEffectDepth = imageUploadEffectsLevel.querySelector('.effect-level__depth');
var effects = {
  chrome: ['grayscale', 0, 1, ''],
  sepia: ['sepia', 0, 1, ''],
  marvin: ['invert', 0, 100, '%'],
  phobos: ['blur', 0, 3, 'px'],
  heat: ['brightness', 1, 3, '']
};
var value = '';

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }
};

var hideElement = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
  }
};

var showPhotoEditForm = function (element) {
  photosize = PHOTO_SIZE_MAX;
  showElement(element);
  document.addEventListener('keydown', PhotoEditFormEscPress);
  applyPicturefilter(imageUploadEffects.children[0].children[0]);
};

var hidePhotoEditForm = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', PhotoEditFormEscPress);
    uploadFile.value = '';
  }
};

var PhotoEditFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hidePhotoEditForm(photoEditForm);
  }
};

var changeSizePhotoPreview = function (change) {
  if (change === 'bigger' && photosize < PHOTO_SIZE_MAX) {
    photosize += PHOTO_SIZE_CHANGE_STEP;
  } else if ((change === 'smaller' && photosize > PHOTO_SIZE_MIN)) {
    photosize -= PHOTO_SIZE_CHANGE_STEP;
  }
  photoSizeValue.value = '' + photosize + '%';
  photoPreviewImage.style = 'transform: scale(' + (photosize / 100) + ')';
};

var applyPicturefilter = function (element) {
  value = element.value;

  photoPreviewImage.classList = '';
  photoPreviewImage.classList.add('effects__preview--' + value);

  if (value === 'none') {
    hideElement(imageUploadEffectsLevel);
    photoPreview.style = '';
  } else {
    showElement(imageUploadEffectsLevel);
    addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
  }
};

var addEffectLevelValue = function (percent, effect) {
  imageEffectPin.style = 'left:' + percent + '%';
  imageEffectDepth.style = 'width:' + percent + '%';
  var valuePercent = (effect[2] - effect[1]) / PHOTO_EFFECT_VOLUME_DEFAULT * percent;
  var valueInput = effect[1] + valuePercent;
  imageEffectLevelValue.textContent = valueInput;
  photoPreview.style = 'filter: ' + effect[0] + '(' + valueInput + effect[3] + ')';
};

var randomEffectValue = function () {
  var randomPercent = Math.round(Math.random() * 100);
  addEffectLevelValue(randomPercent, effects[value]);
};

uploadFile.addEventListener('change', function () {
  showPhotoEditForm(photoEditForm);
});

photoEditFormClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  hidePhotoEditForm(photoEditForm);
});

photoSizeBigger.addEventListener('click', function () {
  changeSizePhotoPreview('bigger');
});

photoSizeSmaller.addEventListener('click', function () {
  changeSizePhotoPreview('smaller');
});

imageUploadEffects.addEventListener('change', function (evt) {
  if (evt.target.tagName === 'INPUT') {
    applyPicturefilter(evt.target);
  }
});

imageEffectPin.addEventListener('mouseup', randomEffectValue);


'use strict';

var ESC_KEY_CODE = 'Escape';
var LEFT_MOUSE_BUTTON = 0;
var buttonOpenPopup = document.querySelector('.header__callback');
var popup = document.querySelector('.popup-callback');
var body = document.querySelector('body');
var buttonClosePopup = document.querySelector('.popup__close');
var overlay = document.querySelector('.popup__overlay');
var buttonSubmit = document.querySelector('.button--submit');
var popupSuccess = document.querySelector('.popup-success');

var showPopup = function () {
  popup.classList.remove('popup--hidden');
  body.classList.add('no-scroll');
};

var closePopup = function () {
  popup.classList.add('popup--hidden');
  body.classList.remove('no-scroll');
};

var showPopupSuccess = function () {
  popupSuccess.classList.remove('popup--hidden');
  body.classList.add('no-scroll');
};

var onOpenPopupClick = function (evt) {
  evt.preventDefault();
  showPopup();
};

var onClosePopupPress = function (evt) {
  if (evt.key === ESC_KEY_CODE) {
    closePopup();
  }
};

var onClosePopupClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    closePopup();
  }
};

var onOpenPopupSuccessClick = function (evt) {
  evt.preventDefault();
  showPopupSuccess();
};

buttonOpenPopup.addEventListener('click', onOpenPopupClick);
document.addEventListener('keydown', onClosePopupPress);
buttonClosePopup.addEventListener('click', onClosePopupClick);
overlay.addEventListener('click', onClosePopupClick);
buttonSubmit.addEventListener('click', onOpenPopupSuccessClick);



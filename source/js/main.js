'use strict';

var buttonCallback = document.querySelector('.header__callback');
var popupCallback = document.querySelector('.popup-callback');

var showPopup = function () {
  popupCallback.classList.remove('popup--hidden');
};

buttonCallback.addEventListener('click', function (e) {
  e.preventDefault();
  showPopup();
});

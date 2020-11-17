'use strict';

var ESC_KEY_CODE = 'Escape';
var LEFT_MOUSE_BUTTON = 0;
var buttonOpenPopup = document.querySelector('.header__callback');
var popupCallback = document.querySelector('.popup-callback');
var body = document.querySelector('body');
var buttonSubmit = document.querySelector('.button--submit');
var popupSuccess = document.querySelector('.popup-success');
var buttonSuccess = popupSuccess.querySelector('.popup-success__button');
var allButtonClosePopups = document.querySelectorAll('.popup__close');
var allOverlayPopups = document.querySelectorAll('.popup__overlay');
var popup = document.querySelector('.popup');
// var allInputsPopup = popup.querySelectorAll('input');
var inputName = popup.querySelector('#name');
var inputPhone = popup.querySelector('#phone');
var checkboxBlock = popup.querySelector('.form__checkbox');
var checkbox = document.querySelector('#checkbox');

var addHandler = function (arrayElements) {
  arrayElements.forEach(function (element) {
    element.addEventListener('click', closePopup);
  });
};

// var checkValidityInputs = function (arrayElements) {
//   var lenghtArray = arrayElements.length;
//   var counterValidInputs = 0;
//   arrayElements.forEach(function (element) {
//     if (element.checkValidity()) {
//       counterValidInputs += 1;
//     }
//     counterValidInputs -= 1;
//   });

//   return counterValidInputs >= lenghtArray ? true : false;
// };

var showPopupCallback = function () {
  popupCallback.classList.remove('popup--hidden');
  body.classList.add('no-scroll');
};

var closePopup = function () {
  var popupOpend = document.querySelector('.popup:not(.popup--hidden)');
  popupOpend.classList.add('popup--hidden');
  body.classList.remove('no-scroll');

};

// var showPopupSuccess = function () {
//   popupSuccess.classList.remove('popup--hidden');
//   body.classList.add('no-scroll');
//   popupCallback.classList.add('popup--hidden');
// };

var addColorErrorChceckbox = function () {
  if (!checkbox.checked) {
    checkboxBlock.classList.add('form__checkbox--error');
  }
};

var removeColorErrorChceckbox = function () {
  checkboxBlock.classList.remove('form__checkbox--error');
};

var onOpenPopupClick = function (evt) {
  evt.preventDefault();
  showPopupCallback();
};

var onClosePopupPress = function (evt) {
  if (evt.key === ESC_KEY_CODE) {
    closePopup();
  }
};

var onClosePopupClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    closePopup();
    document.removeEventListener('keydown', onClosePopupPress);
  }
};

// var onOpenPopupSuccessClick = function (evt) {
//   evt.preventDefault();
//   if (checkValidityInputs(allInputsPopup) === false) {
//     showPopupSuccess();
//   }
// };

inputName.addEventListener('input', function () {
  if (inputName.validity.valueMissing) {
    inputName.setCustomValidity('Обязательное поле');
  } else {
    inputName.setCustomValidity('');
  }
});

inputPhone.addEventListener('input', function () {
  if (inputPhone.validity.valueMissing) {
    inputPhone.setCustomValidity('Обязательное поле');
  } else {
    inputPhone.setCustomValidity('');
  }
});

buttonOpenPopup.addEventListener('click', onOpenPopupClick);
document.addEventListener('keydown', onClosePopupPress);
// buttonSubmit.addEventListener('click', onOpenPopupSuccessClick);
buttonSuccess.addEventListener('click', onClosePopupClick);
addHandler(allButtonClosePopups);
addHandler(allOverlayPopups);
buttonSubmit.addEventListener('click', addColorErrorChceckbox);
checkboxBlock.addEventListener('input', removeColorErrorChceckbox);


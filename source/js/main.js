'use strict';

(function () {

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
  var inputsName = document.querySelectorAll('.form__input-name');
  var checkboxBlock = popup.querySelector('.form__checkbox');
  var checkbox = document.querySelector('#checkbox');
  var tabsProgramsItems = document.querySelectorAll('.tabs__button');
  var tabsFaqItems = document.querySelectorAll('.faq__item');
  var allForm = document.querySelectorAll('.form');
  var inputsPhone = document.querySelectorAll('.form__input-phone');
  var forEach = Array.prototype.forEach;
  var advantagesSlider = document.querySelector('.advantages__cards');
  var breakpoint = window.matchMedia('(min-width:767px)');
  var swiper;

  var switchTabs = function (tabs) {
    forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        var currentTab = document.querySelector('.tabs__button--active');
        var currentPane = document.querySelector('.desc__pane--active');
        currentPane.classList.remove('desc__pane--active');
        var id = tab.getAttribute('data-tab');
        var descTab = document.querySelector('.desc__pane[data-tab="' + id + '"]');
        currentTab.classList.remove('tabs__button--active');
        tab.classList.add('tabs__button--active');
        descTab.classList.add('desc__pane--active');
      });
    });
  };

  var switchTabsAccordion = function (tabs) {
    forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        var currentTab = document.querySelector('.faq__item--active');
        currentTab.classList.remove('faq__item--active');
        tab.classList.add('faq__item--active');
      });
    });
  };

  var addHandler = function (arrayElements) {
    forEach.call(arrayElements, function (element) {
      element.addEventListener('click', closePopup);
    });
  };

  var showPopupCallback = function () {
    popupCallback.classList.remove('popup--hidden');
    body.classList.add('no-scroll');
  };

  var closePopup = function () {
    var popupOpend = document.querySelector('.popup:not(.popup--hidden)');
    popupOpend.classList.add('popup--hidden');
    body.classList.remove('no-scroll');
  };

  var showPopupSuccess = function () {
    popupSuccess.classList.remove('popup--hidden');
    body.classList.add('no-scroll');
    popupCallback.classList.add('popup--hidden');
  };

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
    }
  };

  var addPhoneMask = function () {
    var maskOptions = {
      mask: '+{7} (000) 000 00 00',
    };

    forEach.call(inputsPhone, function (input) {
      var mask = new window.IMask(input, maskOptions);
      return mask;
    });
  };

  var validateNames = function () {
    forEach.call(inputsName, function (name) {
      name.addEventListener('invalid', function () {
        if (name.validity.valid) {
          name.classList.remove('error');
        } else if (!name.validity.valid) {
          name.classList.add('error');
        } else if (name.validity.valueMissing) {
          name.setCustomValidity('Обязательное поле');
        } else {
          name.setCustomValidity('');
        }
      });
    });
  };

  var validatePhones = function () {
    forEach.call(inputsPhone, function (phone) {
      phone.addEventListener('invalid', function () {
        if (!phone.validity.valid) {
          phone.classList.add('error');
        } else if (phone.value.tooShort) {
          phone.setCustomValidity('Слишком короткий телефон');
        } else if (phone.validity.valid) {
          phone.classList.remove('error');
        } else if (phone.validity.valueMissing) {
          phone.setCustomValidity('Обязательное поле');
        } else if (phone.validity.patternMismatch) {
          phone.setCustomValidity('Ведите только цифры');
        } else {
          phone.setCustomValidity('');
        }
      });
    });
  };

  var activateSlider = function () {
    if (breakpoint.matches) {
      if (swiper) {
        swiper.destroy(true, true);
      }
      return;
    } else if (!breakpoint.matches) {
      showSliderAdvantagesSection();
    }
  };

  var showSliderAdvantagesSection = function () {
    if (advantagesSlider) {
      swiper = new window.Swiper(advantagesSlider, {

        loop: true,

        pagination: {
          el: '.buttons-slider',
          clickable: true,
        },

        breakpoints: {
          767: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          }
        }
      });
    }
  };

  breakpoint.addListener(activateSlider);
  activateSlider();

  var feedbacksSlider = document.querySelector('.feedbacks__wrapper');

  if (feedbacksSlider) {
    feedbacksSlider = new window.Swiper(feedbacksSlider, {
      loop: true,

      pagination: {
        el: '.page-counter',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  validateNames();
  validatePhones();
  addPhoneMask();
  buttonOpenPopup.addEventListener('click', onOpenPopupClick);
  document.addEventListener('keydown', onClosePopupPress);
  buttonSuccess.addEventListener('click', onClosePopupClick);
  addHandler(allButtonClosePopups);
  addHandler(allOverlayPopups);
  buttonSubmit.addEventListener('click', addColorErrorChceckbox);
  checkboxBlock.addEventListener('input', removeColorErrorChceckbox);

  forEach.call(allForm, function (form) {
    form.addEventListener('submit', function (evt) {
      validateNames();
      validatePhones();
      evt.preventDefault();
      showPopupSuccess();
      form.reset();
    });
  });

  switchTabs(tabsProgramsItems);
  switchTabsAccordion(tabsFaqItems);

})();

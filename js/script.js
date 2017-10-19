// Ссылка, которая должна открывать модальное окно с формой обратной связи
var feedbackLink = document.querySelector(".button-feedback");

// Модальное окно с формой обратной связи
var feedbackPopup = document.querySelector(".modal-writeus");

// Кнопка закрытия модального окна с формой обратной связи
var feedbackClose = document.querySelector(".modal-writeus .modal-close");

// Поле ввода имени пользователя
var feedbackInputName = feedbackPopup.querySelector("[name=name]");

// Поле с email пользователя
var feedbackInputEmail = feedbackPopup.querySelector("[name=email]");

// Поле с текстом сообщения от пользователя
var feedbackInputComment = feedbackPopup.querySelector("[name=comment]");

// Форма обратной связи
var feedbackForm = feedbackPopup.querySelector("form");

// Значение имени пользователя из localStorage
var storedFeedbackName = localStorage.getItem("name");

// Значение email пользователя из localStorage
var storedFeedbackEmail = localStorage.getItem("email");

// Событие, которое должно происходить при нажатии на ссылку обратной связи
feedbackLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  // Отображение модального окна
  feedbackPopup.classList.add("modal-show");

  // Подстановка значений из localstorage, если они есть
  if (storedFeedbackName || storedFeedbackEmail) {
    feedbackInputName.value = storedFeedbackName;
    feedbackInputEmail.value = storedFeedbackEmail;

    // Фокус на поле ввода текста
    feedbackInputComment.focus();
  } else {
    // Фокус на поле ввода имени
    feedbackInputName.focus();
  }
});

// Событие, которое закрывает модальное окно, после нажатия кнопки закрытия
feedbackClose.addEventListener("click", function (evt) {
    evt.preventDefault();

    // Скрытие модального окна
    feedbackPopup.classList.remove("modal-show");

    // Удаление анимации ошибки
    feedbackPopup.classList.remove("modal-error");
});

// Событие отправки формы обратной связи
feedbackForm.addEventListener("submit", function (evt) {
  if (!feedbackInputName.value || !feedbackInputEmail.value || !feedbackInputComment.value) {
      // Отмена отправки формы, пока нужные поля не заполнены
      evt.preventDefault();

      // Обработка ситуации, когда форма отправляется невалидной несколько раз подряд
      feedbackPopup.classList.remove("modal-error");
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;

      // Добавление анимации для модального окна
      feedbackPopup.classList.add("modal-error");
    } else {
      // Если заполнено верно, то запоминаем значения полей
      localStorage.setItem("name", feedbackInputName.value);
      localStorage.setItem("email", feedbackInputEmail.value);
    }
});

// Обработчик закрытия модального окна обратной связи по клавише ESC
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (feedbackPopup.classList.contains("modal-show")) {
      feedbackPopup.classList.remove("modal-show");

      // Удаление анимации ошибки
      feedbackPopup.classList.remove("modal-error");
    }
  }
});

// Интерактивная карта от Яндекс
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [59.93902323, 30.32142180],
      zoom: 17
  }),
  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker.png',
      iconImageSize: [231, 190],
      iconImageOffset: [105, -120]
  });

  myMap.geoObjects.add(myPlacemark)
});

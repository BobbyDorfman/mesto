import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Переменные для попапов
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

// Кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClosePopupEdit = document.querySelector('.edit-form__close-icon');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseAddPopup = document.querySelector('.adding-cards__close-icon');
const buttonCloseImagePopup = document.querySelector('.image-in-full__close-icon');

// Окно редактирования профиля
const formElementEditProfile = document.querySelector('.popup__form_type_edit');
const formEdit = document.querySelector('.edit-form');
const inputEditName = document.querySelector('.edit-form__name');
const inputEditSubtitle = document.querySelector('.edit-form__subtitle');

// Окно добавления новых карточек
const cardsAdding = document.querySelector('.adding-cards');
const postingCardElement = document.querySelector('.popup__form_type_adding');
const postingTextElement = document.querySelector('.adding-cards__subtitle_name');
const postingLinkElement = document.querySelector('.adding-cards__subtitle_link');

// Профиль
const infoTitleEditProfile = document.querySelector('.profile__title');
const infoSubtitleEditProfile = document.querySelector('.profile__subtitle');

// Тимплейт 
const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// Блок изображения с описанием
const imageForm = document.querySelector('.image-in-full__content');

// Подключение валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Проверка форм
const FormValidatorEdit = new FormValidator(validationConfig, formElementEditProfile);
const FormValidatorAdd = new FormValidator(validationConfig, postingCardElement);

// Открытие попапа с редактированием профиля
buttonEdit.addEventListener('click', () => {
    inputEditName.value = infoTitleEditProfile.textContent;
    inputEditSubtitle.value = infoSubtitleEditProfile.textContent;

    openPopup(popupEdit);
    FormValidatorEdit.enableValidation();
});

function submitPopupEdit (event) {
    event.preventDefault();
    
    infoTitleEditProfile.textContent = inputEditName.value;
    infoSubtitleEditProfile.textContent = inputEditSubtitle.value;

    closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitPopupEdit);
formEdit.addEventListener('click', stopPropagation);
buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
popupEdit.addEventListener('click', () => closePopup(popupEdit));

function stopPropagation (event) {
    event.stopPropagation();
}

// Открытие попапа с добавление новых карточек
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAdd));
popupAdd.addEventListener('click', () => closePopup(popupAdd));

// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscapeKey);
}
  
// Закрытие попапа 
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscapeKey);
}

// Закрытие попапа по клавише Escape
function closeByEscapeKey (event) {
    if (event.key === 'Escape') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
    
        closePopup(popupIsOpened);
    }
}

// Копия класса карточки места
function copyClass(data) {
    const card = new Card (data, cardTemplate);
    const cardElement = card.createCard();
  
    return cardElement;
  }

// Публикация новой карточки
function addCard(section, element) {
    section.prepend(element);
}

// Загрузка начальных карточек
initialCards.forEach(function(item) {
    addCard(cardsElement, copyClass(item));
});

// Ввод данных для новой карточки
function creatingNewCards(name, link) {
  const placeCardNew = {
    name: name.value,
    link: link.value
  };
  return placeCardNew;
}

// Передача информация по новой карточке
function submitFormAdd (evt) {
  evt.preventDefault();

  const cardData = creatingNewCards(postingTextElement, postingLinkElement);
  addCard(cardsElement, copyClass(cardData));
  closePopup(popupAdd);
}

cardsAdding.addEventListener('submit', submitFormAdd);
cardsAdding.addEventListener('click', stopPropagation);


// Добавления карточки
buttonOpenAddPopup.addEventListener('click', () => {
    postingCardElement.reset();
    FormValidatorAdd.enableValidation();
    openPopup(popupAdd);
});

buttonCloseImagePopup.addEventListener('click', () => closePopup(popupImage));
imageForm.addEventListener('click', stopPropagation);
popupImage.addEventListener('click', () => closePopup(popupImage));

export { openPopup, popupImage };
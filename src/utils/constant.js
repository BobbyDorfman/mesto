// Переменные для попапов
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');

// Кнопки
export const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddPopup = document.querySelector('.profile__add-button');

// Окно редактирования профиля
//export const formElementEditProfile = document.querySelector('.popup__form_type_edit');
///
export const formElementEditProfile = document.forms["form_edit"];
export const formElementPostingCard = document.forms["form_add"];
///
export const formEdit = document.querySelector('.edit-form');
export const inputEditName = document.querySelector('.edit-form__name');
export const inputEditSubtitle = document.querySelector('.edit-form__subtitle');

// Наименования инпутов попапа редактирования профиля
export const nameProfileName = formElementEditProfile.elements.name_profile;
export const nameProfileProfession = formElementEditProfile.elements.type_of_profession;

// Окно добавления новых карточек
export const cardsAdding = document.querySelector('.adding-cards');
//export const formElementPostingCard = document.querySelector('.popup__form_type_adding');
export const postingTextElement = document.querySelector('.adding-cards__subtitle_name');
export const postingLinkElement = document.querySelector('.adding-cards__subtitle_link');

// Профиль
export const infoTitleEditProfile = '.profile__title';
export const infoSubtitleEditProfile = '.profile__subtitle';

// Тимплейт 
export const cardsElement = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#card-template').content;

// Блок изображения с описанием
export const imageForm = document.querySelector('.image-in-full__content');
//export const image = document.querySelector('.image-in-full__image');
//export const caption = document.querySelector('.image-in-full__caption');


// Подключение валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
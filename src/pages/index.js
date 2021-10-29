import '../pages/index.css';
import {
    popupEdit,
    popupAdd,
    popupImage,
    buttonOpenEditPopup,
    buttonOpenAddPopup,
    formElementEditProfile,
    formElementPostingCard,
    postingTextElement,
    postingLinkElement,
    infoTitleEditProfile,
    infoSubtitleEditProfile,
    cardsElement,
    cardTemplate,
    validationConfig,
    nameProfileName,
    nameProfileProfession
    } from "../utils/constant.js";

import { initialCards } from '../utils/initialCards.js';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';

// Создание класса профиля
const userInfo = new UserInfo({
    userName: infoTitleEditProfile,
    userInfo: infoSubtitleEditProfile
});

// Создание класса редактирования профиля
const popupEditForm = new PopupWithForm(popupEdit, {
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
    }
});

popupEditForm.setEventListeners()

// Открытие попапа с редактированием профиля
const openPopupEditForm = () => {
    const userData = userInfo.getUserInfo();
    nameProfileName.value = userData.userName;
    nameProfileProfession.value = userData.userInfo;
    formValidatorEdit.resetValidation();
    popupEditForm.open();
}

// Добавление события открытие попапа с редактированием профиля
buttonOpenEditPopup.addEventListener('click', openPopupEditForm);

// Создание класса попапа картинки на весь экран
const imagePopup = new PopupWithImage(popupImage);

imagePopup.setEventListeners();

// Проверка форм
const formValidatorEdit = new FormValidator(validationConfig, formElementEditProfile);
const formValidatorAdd = new FormValidator(validationConfig, formElementPostingCard);

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

// Создание класса карточки места
function createCard(item) {
    const card = new Card ({
        data: item, 
        handleCardClick: () => {
            imagePopup.open(item.link, item.name)
        },
    },
    cardTemplate);
    const cardElement = card.createCard();
  
    return cardElement;
}

// Рендеринг начальных карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item)
        cardList.addItem(cardElement);
    }
},
cardsElement);

cardList.renderItems();
/*
// Создание класса попапа добавления новых карточек (рабочий вариант, но ревьювер попросил передалть)
const popupAddForm = new PopupWithForm(popupAdd, {
    handleFormSubmit: () => {
        const newCard = {
            name: postingTextElement.value,
            link: postingLinkElement.value
        }
        cardList.addItem(createCard(newCard));
    }
})
*/
// Комментарий ревьювера:
// "Данные должны браться не из констант, а функция должна принимать их в виде параметра, 
// подобно тому, как это сделано у вас в обработчике сабмита формы профиля.""


// Создание класса попапа добавления новых карточек (не рабочий вариант, но то как надо чтобы было)
const popupAddForm = new PopupWithForm(popupAdd, {
    handleFormSubmit: (item) => {
        cardList.addItem(createCard(item));
    }
});

popupAddForm.setEventListeners();

// Открытие попапа с добавление новых карточек
const openPopupAddForm = () => {
    formValidatorAdd.resetValidation();
    popupAddForm.open();
}

// Добавление события открытие попапа с добавление новых карточек
buttonOpenAddPopup.addEventListener('click', openPopupAddForm);
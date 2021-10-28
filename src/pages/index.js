import '../pages/index.css';
import {
    popupEdit,
    popupAdd,
    popupImage,
    buttonEdit,
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

import { initialCards } from '../componets/initialCards.js';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';

// Создание класса профиля
const addInformationToProfile = new UserInfo({
    userName: infoTitleEditProfile,
    userInfo: infoSubtitleEditProfile
});

// Создание класса редактирования профиля
const createPopupEditForm = new PopupWithForm(popupEdit, {
    handleFormSubmit: (item) => {
        addInformationToProfile.setUserInfo(item);
    }
});

createPopupEditForm.setEventListeners()

// Открытие попапа с редактированием профиля
const openPopupEditForm = () => {
    const userData = addInformationToProfile.getUserInfo();
    nameProfileName.value = userData.userName;
    nameProfileProfession.value = userData.userInfo;
    formValidatorEdit.resetValidation();
    createPopupEditForm.open();
}

// Добавление события открытие попапа с редактированием профиля
buttonEdit.addEventListener('click', openPopupEditForm);

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

// Публикация новой карточки
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item)
        cardList.addItem(cardElement);
    }
},
cardsElement);

cardList.renderItems();

// Создание класса попапа добавления новых карточек
const createPopupAddForm = new PopupWithForm(popupAdd, {
    handleFormSubmit: () => {
        const newCard = {
            name: postingTextElement.value,
            link: postingLinkElement.value
        }
        const cardElement = createCard(newCard)
        cardList.addItem(cardElement);
    }
})

createPopupAddForm.setEventListeners();

// Открытие попапа с добавление новых карточек
const openPopupAddForm = () => {
    formValidatorAdd.resetValidation();
    createPopupAddForm.open();
}

// Добавление события открытие попапа с добавление новых карточек
buttonOpenAddPopup.addEventListener('click', openPopupAddForm);
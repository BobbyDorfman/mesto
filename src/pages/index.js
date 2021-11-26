import '../pages/index.css';
import {
    popupEditSelector,
    popupAddSelector,
    popupImageSelector,
    popupDeleteSelector,
    popupAvatarSelector,
    buttonOpenEditPopup,
    buttonOpenAddPopup,
    formElementEditProfile,
    formElementPostingCard,
    formElementEditAvatar,
    infoTitleEditProfileSelector,
    infoSubtitleEditProfileSelector,
    avatarEditProfileSelector,
    cardsElementSelector,
    validationConfig,
    nameProfileName,
    nameProfileProfession,
    avatarEditButton
    } from "../utils/constant.js";
import renderLoading from '../utils/renderLoading.js';

import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithConfirm from "../componets/PopupWithConfirm.js";
import Api from "../componets/Api.js";

// Id пользователя
let userId = null;

// Создание класса профиля Api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
      authorization: 'a5452888-af25-48c3-855e-554e70da024c',
      'Content-Type': 'application/json'
    }
})

// Отрисовка карточек
Promise.all([api.getInitialCards(), api.getApiUserInfo()])
    .then(([ cards, userData ]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;

        createCards.renderItems(cards);
    })
    .catch((err) => {
        console.log(`Карточки не отобразились. Произошла ошибка: ${err}`);
    });

// Создание класса профиля
const userInfo = new UserInfo({
    name: infoTitleEditProfileSelector, 
    info: infoSubtitleEditProfileSelector, 
    avatar: avatarEditProfileSelector,
    id: userId
});

// Рендеринг начальных карточек
const createCards = new Section({
    renderer: (item) => {
        createCards.addItem(createCard(item));
    }
}, cardsElementSelector);

// Создание класса попапа удаления карточки
const popupWithConfirmDelete = new PopupWithConfirm(popupDeleteSelector);

// Создание класса карточки места
function createCard(item) {
    const card = new Card(item, '#card-template', userId, {
        handleCardClick: () => {
            imagePopup.open(item.link, item.name);
        },
        handleLikeClick: () => {
            if (card.isLiked) {
                api.deleteLike(card.getIdCard())
                .then((res) => {
                    card.likeOff()
                    card.setLikeCount(res.likes.length)
                })
                .catch((err) => {
                    console.log(`Что-то пошло не так, Like остался на месте. Ошибка: ${err}`)
                });
            } else {
                api.addLike(card.getIdCard())
                .then((res) => {
                    card.likeOn()
                    card.setLikeCount(res.likes.length)
                })
                .catch((err) => {
                    console.log(`Что-то пошло не так, Like не поставился. Ошибка: ${err}`)
                });
            }
        },
        handleDeleteClick: () => {
            popupWithConfirmDelete.setSubmitHandler(() => {
                api.deleteCard(card)
                    .then(() => {
                    card.deleteCard()
                    popupWithConfirmDelete.close()
                })
                .catch((err) => {
                    console.log(`Упс, карточка не удалилась. Ошибка: ${err}`)
                });
            })
            popupWithConfirmDelete.open();
        }
    });
    return card.generateCard();
}


// Создание класса редактирования профиля
const popupEditForm = new PopupWithForm(popupEditSelector, {
    handleFormSubmit: (data) => {
        renderLoading(true, popupEditSelector);
            api.patchUserInfo(data).then((res) => {
                userInfo.setUserInfo(res);
                popupEditForm.close();
            }).catch((err) => {
                popupEditForm.open();
                console.log(`Данные не удалось отправить на сервер. Ошибка: ${err}`);            
            }).finally(() => {
                renderLoading(false, popupEditSelector);
        });
    }
});

// Открытие попапа с редактированием профиля
const openPopupEditForm = () => {
    const data = userInfo.getUserInfo();
    nameProfileName.value = data.name;
    nameProfileProfession.value = data.info;
    formValidatorEdit.resetValidation();
    popupEditForm.open();
}

// Создание класса попапа картинки на весь экран
const imagePopup = new PopupWithImage(popupImageSelector);

// Создание класса попапа добавления новых карточек
const popupAddForm = new PopupWithForm(popupAddSelector, {
    handleFormSubmit: (data) => {
        renderLoading(true, popupAddSelector);
            api.addCard(data).then((res) => {
                createCards.addItemPrepend(createCard(res));
                popupAddForm.close();
            }).catch((err) => {
                console.log(`Карточку не удалось добавить на сервер. Ошибка: ${err}`);
            }).finally(() => {
                renderLoading(false, popupAddSelector);
        })
    }
})

// Открытие попапа с добавление новых карточек
const openPopupAddForm = () => {
    formValidatorAdd.resetValidation();
    popupAddForm.open();
}

// Создание класса редактирования аватара
const popupAvatarForm = new PopupWithForm(popupAvatarSelector, {
    handleFormSubmit: (data) => {
        renderLoading(true, popupAvatarSelector);
            api.changeAvatar(data).then((res) => {
                userInfo.setUserInfo(res);
                popupAvatarForm.close();
            }).catch((err) => {
                console.log(`Не удалось сменить аватар. Ошибка: ${err}`);
            }).finally(()=> {
                renderLoading(false, popupAvatarSelector);
        });
    }
});

// Открытие попапа редактирования аватара
const openUpdateAvatarForm = () => {
    popupAvatarForm.open();
    formValidatorAvatar.resetValidation();
}

// Вызов слушателей классов попапов
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupWithConfirmDelete.setEventListeners();
imagePopup.setEventListeners();

// Добавление слушателей на кнопки
avatarEditButton.addEventListener('click', openUpdateAvatarForm);
buttonOpenEditPopup.addEventListener('click', openPopupEditForm);
buttonOpenAddPopup.addEventListener('click', openPopupAddForm);

// Проверка форм
const formValidatorEdit = new FormValidator(validationConfig, formElementEditProfile);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationConfig, formElementPostingCard);
formValidatorAdd.enableValidation();
const formValidatorAvatar = new FormValidator(validationConfig, formElementEditAvatar);
formValidatorAvatar.enableValidation();
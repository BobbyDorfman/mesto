import { openPopup, popupImage, image, caption } from "./index.js";

export class Card {
    constructor(data, cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
    }

    // Удаление карточки
    _removeCardHandler (event) {
        event.target.closest('.element').remove();
    };

    // Лайки карточек
    _likeCardHandler (event) {
        event.target.classList.toggle('element__button_like-active');
    };

    // Открытие изображений
    _openImage () {
        image.alt = this._name;
        image.src = this._link;
        caption.textContent = this._name;

        openPopup(popupImage);
    }

    // Добавление обработчиков
    _setHandlers () {
        this._cardElement.querySelector('.element__button-delete').addEventListener('click', this._removeCardHandler);
        this._cardElement.querySelector('.element__button').addEventListener('click', this._likeCardHandler);
        this._cardElementImage.addEventListener('click', () => this._openImage());
    }

    // Создание новой карточки
    createCard() {
        this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector('.element__image');
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;

        this._setHandlers();

        return this._cardElement;
    }
}

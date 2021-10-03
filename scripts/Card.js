import { openPopup, popupImage } from "./index.js";

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
    _openingImages () {
        const image = popupImage.querySelector('.image-in-full__image');
        const caption = popupImage.querySelector('.image-in-full__caption');
        image.alt = this._name;
        image.src = this._link;
        caption.textContent = this._name;

        openPopup(popupImage);
    }

    // Создание новой карточки
    createCard() {
        const cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        const cardElementImage = cardElement.querySelector('.element__image');
        cardElementImage.src = this._link;
        cardElementImage.alt = this._name;
        cardElement.querySelector('.element__title').textContent = this._name;
        cardElement.querySelector('.element__button-delete').addEventListener('click', this._removeCardHandler);
        cardElement.querySelector('.element__button').addEventListener('click', this._likeCardHandler);
        cardElementImage.addEventListener('click', () => this._openingImages());

        return cardElement;
    }
}

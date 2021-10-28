export default class Card {
    constructor({ data, handleCardClick }, cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    // Удаление карточки
    _removeCardHandler (event) {
        event.target.closest('.element').remove();
    };

    // Лайки карточек
    _likeCardHandler (event) {
        event.target.classList.toggle('element__button_like-active');
    };

    // Добавление обработчиков
    _setHandlers () {
        this._cardElement.querySelector('.element__button-delete').addEventListener('click', this._removeCardHandler);
        this._cardElement.querySelector('.element__button').addEventListener('click', this._likeCardHandler);
        this._cardElement.querySelector('.element__image').addEventListener(
            'click', () => this._handleCardClick(this._name, this._link));
    }

    // Создание новой карточки
    createCard() {
        this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector('.element__image');

        this._setHandlers();

        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;


        return this._cardElement;
    }
}

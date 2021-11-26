export default class Card {
    constructor( data, cardTemplate, userId, { handleCardClick, handleLikeClick, handleDeleteClick }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._userId = userId;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _getTemplate() {
        // Использование разметки из HTML. Создание клона элемента
        const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);

        // Возвращение в DOM-элемент карточки
        return cardElement;
    }

    // Создание новой карточки
    generateCard() {
        this._element = this._getTemplate();
        this._cardElementImage = this._element.querySelector('.element__image')
        this._setEventListeners();
        this._toggleDeleteButton()
        this._toggleLikeButton()
    
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._likeButton = this._element.querySelector('.element__button');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._likeCounter.textContent = this._likes.length

        return this._element;
    }
    
    // Создание слушателей
    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', this._handleLikeClick);
        this._element.querySelector('.element__button-delete').addEventListener('click', this._handleDeleteClick);
        this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick);
        this.setLikeCount()
        this._likeCheked()
    }
  
    // переключение видимости корзины
    _toggleDeleteButton() {
        if (this._userId !== this._owner._id) {
            this._element.querySelector('.element__button-delete').style.display = 'none'
        }
    }

    // Переключение лайков
    _toggleLikeButton() {
        if (this._checkUserLike()) {
            this.likeOn()
        } else {
            this.likeOff()
        }
    }

    _checkUserLike() {
        return this._likes.some((item) => item._id === this._userId)
    }

    likeOn() {
        this._element.querySelector('.element__button').classList.add('element__button_like-active')
        this.isLiked = true
    }

    likeOff() {
        this._element.querySelector('.element__button').classList.remove('element__button_like-active')
        this.isLiked = false
    }
    
    // Удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getIdCard () {
        return this._id
    }

    // Отображение количества лайков
    setLikeCount(data) {
        this._likeCounter = data
        this._element.querySelector('.element__like-counter').textContent = this._likeCounter
    }

    // Проверка наличия лайка пользователя
    _likeCheked () {
        if (this._likes._id === this._userId) {
            this._likeButton.classList.add('element__button_like-active');
        }
    }
}
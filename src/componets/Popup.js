export default class Popup {
    constructor (popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        // снятие обработчика
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-image')) {
                this.close();
            }
        });
    }

    // Закрытие попапа по кнопке Escape
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}
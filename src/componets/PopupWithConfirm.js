import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
        this._formWithConfirm = this._popupElement.querySelector('.popup__form');
        this._button = this._formWithConfirm.querySelector('.popup__button')
        this._valueButton = this._button.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formWithConfirm.addEventListener('submit', (event) => {
            event.preventDefault();

            this._hanlder();
        });
    }
    
    setSubmitHandler(hanlder) {
        this._hanlder = hanlder;
    }
}
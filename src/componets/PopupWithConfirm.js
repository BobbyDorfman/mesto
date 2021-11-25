import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
    constructor (popupSelector) {
        super(popupSelector);
        this._formWithConfirm = this._popupElement.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formWithConfirm.addEventListener('submit', (event) => {
            event.preventDefault();

            this._data();
        });
    }
    
    setSubmitHandler(data) {
        this._data = data;
    }
}
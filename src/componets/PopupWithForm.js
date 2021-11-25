import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ( popupSelector, { handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._popupFormElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__input')
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((inputElement) => {
            this._formValues[inputElement.name] = inputElement.value;
        });
        return this._formValues;
    }
    
    close() {
        super.close();
        this._popupFormElement.reset();
    }
}

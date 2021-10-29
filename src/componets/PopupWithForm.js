import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ( popupSelector, { handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._popupFormElement = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupSelector.querySelectorAll('.popup__input')
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
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

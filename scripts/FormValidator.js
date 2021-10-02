export class FormValidator {
    constructor(validationConfig, formElement) {
        this._formElement = formElement;
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
    }

    // Включениеи выключение ошибок
    _showInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    // Спрятать Ошибку 
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    // Проверка на валидность 
    _checkInputValidaty = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Поиск ошибки в форме 
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    
    // Проверка на пустые поля
    _hasEmptyValue (inputList) {
        return inputList.some((inputElement) => {
            return inputElement.value.length === 0;
        });
    };

    // Ошибка, если поля не заполнены
    _hasNotInputValues (inputList) {
        return inputList.some((inputElement) => {
            return inputElement.value.length === 0;
        });
    };

    // Включение и выключение кнопки submit
    _disableSubmitButton (buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    };

    _enableSubmitButton (buttonElement) {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    };

    // Проверка состояния кнопки submit
    _toggleButtonState (inputList) {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        if (this._hasInvalidInput(inputList) || this._hasNotInputValues(inputList)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    };

    // Навешивание обработчика событий
    _setEventListeners () {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputList.forEach(inputElement => {
            this._hideInputError(inputElement);

            inputElement.addEventListener('input', () => {
                this._checkInputValidaty(inputElement);
                this._toggleButtonState(inputList);
            });
        });

        this._toggleButtonState(inputList);
    };

    // включение валидации вызовом enableValidation
    // все настройки передаются при вызове
    enableValidation() {
        this._setEventListeners();
    }
}
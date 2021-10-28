export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._formElement = formElement;
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    
    // Проверка на пустые поля
    _hasEmptyValue () {
        return this._inputList.some((inputElement) => {
            return inputElement.value.length === 0;
        });
    };

    // Ошибка, если поля не заполнены
    _hasNotInputValues () {
        return this._inputList.some((inputElement) => {
            return inputElement.value.length === 0;
        });
    };

    // Метод для очистки ошибок и управления кнопкой
    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    // Включение и выключение кнопки submit
    _disableSubmitButton () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    };

    _enableSubmitButton () {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };

    // Проверка состояния кнопки submit
    _toggleButtonState () {
        //const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        if (this._hasInvalidInput(this._inputList) || this._hasNotInputValues(this._inputList)) {
            this._disableSubmitButton(this._buttonElement);
        } else {
            this._enableSubmitButton(this._buttonElement);
        }
    };

    // Навешивание обработчика событий
    _setEventListeners () {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        //const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);

            inputElement.addEventListener('input', () => {
                this._checkInputValidaty(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });

        this._toggleButtonState(this._inputList);
    };

    // включение валидации вызовом enableValidation
    // все настройки передаются при вызове
    enableValidation() {
        this._setEventListeners();
    }
}
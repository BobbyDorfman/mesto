// Включениеи выключение ошибок
const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    //const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

// Спрятать Ошибку 
const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    //const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// Проверка на валидность 
const checkInputValidaty = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    }
};

// Поиск ошибки в форме 
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
  
// Проверка на пустые поля
const hasEmptyValue = (inputList) => {
    return inputList.some((inputElement) => {
        return inputElement.value.length === 0;
    });
}

// Включение и выключение кнопки submit
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
};

// Проверка состояния кнопки submit
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, inactiveButtonClass);
    }
};

// Навешивание обработчика событий
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, 
    errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidaty(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        });
    });
} 

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        setEventListeners (
            formElement, 
            config.inputSelector,
            config.submitButtonSelector, 
            config.inputErrorClass,
            config.errorClass,
            config.inactiveButtonClass);
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('#edit-form');
const closePopupButton = document.querySelector('.edit-form__close-icon');
const title = document.querySelectorAll('.edit-form__subtitle')[0];
const subtitle = document.querySelectorAll('.edit-form__subtitle')[1];
const infoTitle = document.querySelector('.profile__title');
const infoSubtitle = document.querySelector('.profile__subtitle');
const submitButton = document.querySelector('.submit-button');
const formElement = document.querySelector('.edit-form__field');
// Переменные для открытия попапа - добавление карточек
const openAddPopupButton = document.querySelector('.profile__add-button');
const AddPopup = document.querySelector('#adding-cards');
const closeAddPopupButton = document.querySelector('.adding-cards__close-icon');

// Открытие попапа с редактированием профиля
function togglePopup() {
    if (!popup.classList.contains('popup_is-openid')) {
        title.value = infoTitle.textContent;
        subtitle.value = infoSubtitle.textContent;
    }

    popup.classList.toggle('popup_is-openid');
}

openPopupButton.addEventListener('click',togglePopup);
closePopupButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);

document.querySelector('.edit-form').addEventListener('click', function (event) {
        event.stopPropagation();
    }
);

// Отправка формыы в профиль
formElement.addEventListener(
    'submit', 
    function (event) {
        event.preventDefault(); 

        infoTitle.textContent = title.value;
        infoSubtitle.textContent = subtitle.value;
    }
)

formElement.addEventListener('submit', togglePopup);

// Открытие попапа с добавление новых карточек

function toggleAddPopup() {
    if (!AddPopup.classList.contains('popup_is-openid')) {
    }

    AddPopup.classList.toggle('popup_is-openid');
}

openAddPopupButton.addEventListener('click',toggleAddPopup);
closeAddPopupButton.addEventListener('click', toggleAddPopup);
AddPopup.addEventListener('click', toggleAddPopup);

document.querySelector('.adding-cards').addEventListener('click', function (event) {
        event.stopPropagation();
    }
);

// Добавление карточкек

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// Удаление карточки
const removeCardHandler = (event) => {
    event.target.closest('.element').remove();
};

// Лайки карточек
const likeCardHandler = (event) => {
    event.target.classList.toggle('element__button_like-active');
};

const addCard = (card) => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__button-delite').content;
    cardElement.querySelector('.element__image').src = card.link;
    cardElement.querySelector('.element__image').alt = card.name;
    cardElement.querySelector('.element__title').textContent = card.name;
    cardElement.querySelector('.element__button-delite').addEventListener('click', removeCardHandler);
    cardElement.querySelector('.element__button').addEventListener('click', likeCardHandler);
    cardElement.querySelector('.element__image').addEventListener('click', () => openingImages(card));

    cardsElement.prepend(cardElement);
}

initialCards.forEach((card) => {
    addCard(card);
});

// Вариант с добавление через форму секции adding-cards
const postingCardElement = document.querySelector('.adding-cards__field');
const postingTextElement = document.querySelector('.adding-cards__subtitle_name');
const postingLinkElement = document.querySelector('.adding-cards__subtitle_link');

// Добавление новых карточек на страницу
postingCardElement.addEventListener(
    'submit',
    function (event) {
        event.preventDefault();

        addCard({
            name: postingTextElement.value,
            link: postingLinkElement.value,
        }
    );

    postingCardElement.reset();
});

// Event listeners

postingCardElement.addEventListener('submit', toggleAddPopup);

const imagePopup = document.querySelector('#image-in-full');
const closeImagePopupButton = document.querySelector('.image-in-full__close-icon');

function toggleImagePopup() {
    if (!imagePopup.classList.contains('popup_is-openid')) {
    }

    imagePopup.classList.toggle('popup_is-openid');
}

function openingImages(card) {
    imagePopup.querySelector('.image-in-full__image').alt = card.name;
    imagePopup.querySelector('.image-in-full__image').src = card.link;
    imagePopup.querySelector('.image-in-full__caption').textContent = card.name;

    toggleImagePopup();
}

closeImagePopupButton.addEventListener('click', toggleImagePopup);
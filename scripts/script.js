// Переменные для попапов
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

// Кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClosePopupEdit = document.querySelector('.edit-form__close-icon');
const buttonSubmitEdit = document.querySelector('.submit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseAddPopup = document.querySelector('.adding-cards__close-icon');
const buttonCloseImagePopup = document.querySelector('.image-in-full__close-icon');

// Окно редактирования профиля
const formEdit = document.querySelector('.edit-form');
const inputEditName = document.querySelector('.edit-form__name');
const inputEditSubtitle = document.querySelector('.edit-form__subtitle');

// Окно добавления новых карточек
const cardsAdding = document.querySelector('.adding-cards');

// Профиль
const infoTitleEditProfile = document.querySelector('.profile__title');
const infoSubtitleEditProfile = document.querySelector('.profile__subtitle');
const formElementEditProfile = document.querySelector('.edit-form__field');

// Тимплейт 
const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const cardElementButtonDelete = document.querySelector('.element__button-delete');
const cardElementImage = document.querySelector('.element__image');
const cardElemenTtitle = document.querySelector('.element__title');
const cardElementButtonLike = document.querySelector('.element__button');

// Открытие попапа с редактированием профиля

buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    inputEditName.value = infoTitleEditProfile.textContent;
    inputEditSubtitle.value = infoSubtitleEditProfile.textContent;
});

function submitPopupEdit (event) {
    event.preventDefault();
    
    infoTitleEditProfile.textContent = inputEditName.value;
    infoSubtitleEditProfile.textContent = inputEditSubtitle.value;

    closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitPopupEdit);
formEdit.addEventListener('click', stopPropagation);
buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
popupEdit.addEventListener('click', () => closePopup(popupEdit));

function stopPropagation (event) {
    event.stopPropagation();
}

// Открытие попапа с добавление новых карточек

buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAdd));
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAdd));
popupAdd.addEventListener('click', () => closePopup(popupAdd));
cardsAdding.addEventListener('click', stopPropagation);

// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}
  
// Закрытие попапа 
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

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
    cardElement.querySelector('.element__button-delete').content; 
    cardElement.querySelector('.element__image').src = card.link; 
    cardElement.querySelector('.element__image').alt = card.name; 
    cardElement.querySelector('.element__title').textContent = card.name; 
    cardElement.querySelector('.element__button-delete').addEventListener('click', removeCardHandler); 
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
postingCardElement.addEventListener('submit', creatingNewCards)

function creatingNewCards(event) {
    event.preventDefault();

        addCard({
            name: postingTextElement.value,
            link: postingLinkElement.value,
        }
    );

    closePopup(popupAdd);
};

// Открытие изображений
function openingImages(card) {
    popupImage.querySelector('.image-in-full__image').alt = card.name;
    popupImage.querySelector('.image-in-full__image').src = card.link;
    popupImage.querySelector('.image-in-full__caption').textContent = card.name;

    openPopup(popupImage);
}

buttonCloseImagePopup.addEventListener('click', () => closePopup(popupImage));
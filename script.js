let openPopupButton = document.querySelector('.edit-button');
let popup = document.querySelector('.edit-form');
let closePopupButton = document.querySelector('.close-icon');
let title = document.querySelectorAll('.edit-form__subtitle')[0];
let subtitle = document.querySelectorAll('.edit-form__subtitle')[1];
let infoTitle = document.querySelector('.profile__info_title');
let infoSubtitle = document.querySelector('.profile__info_subtitle');
let submitButton = document.querySelector('.submit-button');
let formElement = document.querySelector('.edit-form__field');

function togglePopup() {
    if (!popup.classList.contains('edit-form_is-openid')) {
        title.value = infoTitle.textContent;
        subtitle.value = infoSubtitle.textContent;
    }

    popup.classList.toggle('edit-form_is-openid');
}

openPopupButton.addEventListener('click',togglePopup);
closePopupButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);

document.querySelector('.edit-form__popup').addEventListener('click', function (event) {
        event.stopPropagation();
    }
);

form.addEventListener(
    'submit', 
    function (event) {
        event.preventDefault(); 

        infoTitle.textContent = title.value;
        infoSubtitle.textContent = subtitle.value;
    }
)

formElement.addEventListener('submit', togglePopup);
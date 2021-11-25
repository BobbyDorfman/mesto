//export const popupEditSelector = '.popup_type_edit';

export default function renderLoading(loading, popup) {
    if (loading === true) {
        if (document.querySelector(popup).querySelector('.popup__button').textContent === 'Создать') {
            document.querySelector(popup).querySelector('.popup__button').textContent = 'Создание...'
        } else {
            document.querySelector(popup).querySelector('.popup__button').textContent = 'Сохранение...'
        }
        } else {
        if (document.querySelector(popup).querySelector('.popup__button').textContent === 'Создание...') {
            document.querySelector(popup).querySelector('.popup__button').textContent = 'Создать'
        } else {
            document.querySelector(popup).querySelector('.popup__button').textContent = 'Сохранить'
        }
    }
}
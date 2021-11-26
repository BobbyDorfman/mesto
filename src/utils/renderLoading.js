export default function renderLoading(loading, popup) {
    const button = document.querySelector(popup).querySelector('.popup__button')
    if (loading === true) {
        if (button.textContent === 'Создать') {
            button.textContent = 'Создание...'
                } else {button.textContent = 'Сохранение...'
            }
        } else {
        if (button.textContent === 'Создание...') {
            button.textContent = 'Создать'
                } else {button.textContent = 'Сохранить'
            }
        }
}
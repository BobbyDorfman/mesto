import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.image-in-full__image');
        this._popupText = this._popupElement.querySelector('.image-in-full__caption');
    }

    open( link, text ) {
        this._popupImage.alt = text;
        this._popupImage.src = link;
        this._popupText.textContent = text;

        super.open();
    }
}
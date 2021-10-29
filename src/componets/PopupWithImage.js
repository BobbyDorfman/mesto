import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        const image = document.querySelector('.image-in-full__image');
        const caption = document.querySelector('.image-in-full__caption');
        this._popupImage = image;
        this._popupText = caption;
    }
    
    open( link, name ) {
        this._popupImage.alt = name;
        this._popupImage.src = link;
        this._popupText.textContent = name;

        super.open();
    }
}
import Popup from "./Popup.js";
import { image, caption} from '../utils/constant.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
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
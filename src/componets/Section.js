export default class Section{
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._containerElement.append(element);
    }
    
    addItemPrepend(element) {
        this._containerElement.prepend(element);
    }
    
    clear() {
        this._containerElement.innerHTML = '';
    }

    renderItems(data) {
        this.clear();

        data.forEach((item) => {
            this._renderer(item);
        });
    }
}
export default class Section{
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }

    _clear() {
        this._containerSelector.innerHTML = '';
    }

    renderItems() {
        this._clear();

        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}
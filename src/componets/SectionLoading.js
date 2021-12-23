export default class SectionLoading{
    constructor({ items, rendererLoading }, containerSelector) {
        this._items = items;
        this._rendererLoading = rendererLoading;
        this._containerElement = document.querySelector(containerSelector);
    }

    _clear() {
        this._containerElement.innerHTML = '';
    }

    renderItemsLoading(data) {
        this.clear();

        data.forEach((item) => {
            this._renderer(item);
        });
    }
}
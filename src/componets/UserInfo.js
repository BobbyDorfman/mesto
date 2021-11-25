export default class UserInfo {
    constructor( {name, info, avatar, id} ) {
        this._userName = document.querySelector(name);
        this._userInfo = document.querySelector(info);
        this._userAvatar = document.querySelector(avatar);
        this._userId = document.querySelector(id);
    }
  
    // Получить данные пользователя
    getUserInfo() {
        const data = {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
        return data;
    }

    // Передать данные пользователя в профиль
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._userId = data._id;
    }
}
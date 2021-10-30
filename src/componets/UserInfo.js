export default class UserInfo {
    constructor( {userNameSelector, userInfoSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }
  
    // Получить данные пользователя
    getUserInfo() {
        const userData = {}
        userData.userName = this._userName.textContent;
        userData.userInfo = this._userInfo.textContent;
        return userData;
    }
  
    // Передать данные пользователя в профиль
    setUserInfo(data) {
        this._userName.textContent = data.name_profile;
        this._userInfo.textContent = data.type_of_profession;
    }
}
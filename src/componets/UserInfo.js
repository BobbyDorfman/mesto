export default class UserInfo {
    constructor( {userName, userInfo} ) {
        this._userName = userName;
        this._userInfo = userInfo;
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
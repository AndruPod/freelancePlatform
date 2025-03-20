import {makeAutoObservable} from "mobx"

export class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setUser(user) {
        this._user = user;
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    get user() {
        return this._user;
    }

    get isAuth() {
        return this._isAuth;
    }

}
import * as types from '../../constants/User/ActionType';
import callApi from '../../utils/apiCaller';

export const UserLogin = (user) => {
    return {
        type: types.USER_LOGIN,
        user
    }
}

export const GetUserFromLocal = (user) => {
    return {
        type: types.USER_GET,
        user
    }
}

export const UserLoginRequest = (username, password, history) => {
    return (dispatch) => {
        //console.log('login/' + username + '/' + password);
        return callApi('dangnhap', 'POST', { userName: username, passWord: password }).then(res => {
            let rec = res.data;
            console.log(rec);
            if (rec.status === 0) {
                console.log(rec.data);
                dispatch(UserLogin(rec.data.user));
                localStorage.setItem("user", JSON.stringify(rec.data.user));
                localStorage.setItem("token", JSON.stringify(rec.data.token));
                if (rec.data.role === "ndt") { history.replace("/"); }
                else if (rec.data.role === "admin") {
                    localStorage.setItem("role", JSON.stringify(rec.data.role));
                    history.push("/admin")
                }
            } else {
                alert(rec.message);
            }
        })
    }
}

export const UserLogout = (history) => {
    history.replace("/");
    return {
        type: types.USER_LOGOUT,
        user: null
    }
}
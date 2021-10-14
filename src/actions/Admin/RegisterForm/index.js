import * as types from '../../../constants/Admin/ActionType';
import callApi from '../../../utils/apiCaller';


export const FetchListRegisterFormRequest = () => {
    return (dispatch) => {
        return callApi('DonDangKy', 'GET', null).then(res => {
            dispatch(FetchListRegisterForm(res.data));
            console.log(res.data);
        })
    }
}


export const FetchListRegisterForm = (listRegisterForm) => {
    return {
        type: types.FETCH_LIST_REGISTER_FORM,
        listRegisterForm
    }
}

export const ConfirmRegisterForm = (registerForm) => {
    return {
        type: types.CONFIRM_REGISTER_FORM,
        registerForm
    }
}


export const DeleteRegisterForm = id => {
    return {
        type: types.DELETE_REGISTER_FORM,
        id
    }
}

export const AdminLogout = (history) => {
    history.push("/login");
    return {
        type: types.ADMIN_LOGOUT,
        user: null
    }
}
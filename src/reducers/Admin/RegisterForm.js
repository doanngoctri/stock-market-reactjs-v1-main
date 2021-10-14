import * as types from '../../constants/Admin/ActionType';
const initialState = {};
let findIndex = (list, id) => {
    let result = -1;
    list.forEach((e, index) => {
        if (e.id === id) result = index;
    });
    return result;
}
let RegisterForm = (state = initialState, action) => {
    let index = -1
    let { id, payload, type } = action;
    switch (type) {
        case types.FETCH_LIST_REGISTER_FORM:
            console.log(action)
            return payload;
        case types.ADMIN_LOGOUT:
            console.log(action);
            return null;
        default:
            return state;
    }

}

export default RegisterForm;
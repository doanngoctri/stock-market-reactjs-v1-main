import * as types from '../../constants/Admin/ActionType';
const initialState = false;

let isAdmin = (state = initialState, action) => {
    switch (action.type) {
        case types.IS_ADMIN:
            return true;
        case types.IS_USER:
            return false;
        default:
            return state;
    }
}

export default isAdmin;
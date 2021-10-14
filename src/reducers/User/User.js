import * as types from '../../constants/User/ActionType';
import * as ordertypes from '../../constants/Order/ActionType'
const initialState = null;

let User = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            console.log(action)
            return action.user; 
        case types.USER_LOGOUT:
            return null
        case types.USER_GET:
            return action.user; 
        case ordertypes.MAKE_ORDER:
            return state
        default: 
            return state;
    }

}

export default User;
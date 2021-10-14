import * as types from '../../constants/Report/ActionType';
const initialState = {};
let RegisterForm = (state = initialState, action) => {
    let { payload, type } = action;
    switch (type) {
        case types.STOCK_TODAY:
            return payload;
        default:
            return state;
    }

}

export default RegisterForm;
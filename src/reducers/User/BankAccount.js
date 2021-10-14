import * as types from '../../constants/Common/ActionType.js';
const initialState = [];

let BankAccount = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BANK_ACCOUNT:
            return action.payload;
        default:
            return state;
    }

}

export default BankAccount;
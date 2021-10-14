import * as types from '../../constants/Report/ActionType';
const initialState = {};

let Report = (state = initialState, action) => {
    switch (action.type) {
        case types.HISTORY_PURCHASED:
            return action.payload;
        case types.HISTORY_ORDER:
            return action.payload;
        case types.STOCK_OF_USER:
            return action.payload;
        default:
            return state;
    }

}

export default Report;
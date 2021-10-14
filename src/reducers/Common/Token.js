import * as types from '../../constants/Token/ActionType';
const initialState = false;

let Token = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TOKEN:
            return true;
        case types.REMOVE_TOKEN:
            return false;
        default:
            return state;
    }

}

export default Token;
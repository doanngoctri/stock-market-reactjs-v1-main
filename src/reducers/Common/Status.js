import * as types from '../../constants/Common/ActionType.js';
const initialState = [];

let Status = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_STATUS:
            return action.payload;
        default:
            return state;
    }

}

export default Status;
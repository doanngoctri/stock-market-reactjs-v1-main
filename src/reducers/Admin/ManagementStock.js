import * as types from '../../constants/Admin/ActionType';
const initialState = {};
let ManagementStock = (state = initialState, action) => {
    let { payload, type } = action;
    switch (type) {
        case types.FETCH_LIST_STOCK:
            return payload;
        default:
            return state;
    }

}

export default ManagementStock;
import * as types from '../../constants/Admin/ActionType';
const initialState = {};
let ManagementUser = (state = initialState, action) => {
    let { payload, type } = action;
    switch (type) {
        case types.FETCH_LIST_USER:
            return payload;
        default:
            return state;
    }

}

export default ManagementUser;
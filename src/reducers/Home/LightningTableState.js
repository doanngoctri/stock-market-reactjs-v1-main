import * as types from '../../constants/LightningTableState/ActionType';
const initialState = {
    List: [],
    selected: -1
};

let LightningTableState = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_STATE:
            return action.states;
        case types.CHANGE_STATE:
            return {
                List: [...state.List],
                selected: action.states
            }
        default: return state;
    }

}

export default LightningTableState;
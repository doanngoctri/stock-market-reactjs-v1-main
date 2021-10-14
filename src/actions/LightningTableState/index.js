import * as types from '../../constants/LightningTableState/ActionType';
import callApi from '../../utils/apiCaller';

export const FetchListStates = (states) => {
    return {
        type: types.FETCH_STATE,
        states
    }
}

export const FetchListStatesRequest = (index) => {
    return (dispatch) => {
        return callApi('state', 'GET', null).then(res => {
            console.log(res)
            dispatch(FetchListStates({
                List : res.data,
                selected : index
            }));
        })
    }
}

export const ChangeListStates = (states) => {
    return {
        type: types.CHANGE_STATE,
        states
    }
}
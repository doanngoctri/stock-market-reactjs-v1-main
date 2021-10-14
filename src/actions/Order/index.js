import * as types from '../../constants/Order/ActionType';
import callApi from '../../utils/apiCaller';



export const MakeOrderRequest = (pass, order) => {
    return (dispatch) => {
        console.log('lenhdat/' + pass);
        console.log(order);
        return callApi('lenhdat/' + pass, 'POST', order).then(res => {
            console.log(res);
            let rec = res.data;
            console.log(rec);
            if (rec.result === 0) {
                alert(rec.message + " : " + rec.data.madl);
            } else {
                alert(rec.message);
            }
        })
    }
}
export const MakeOrder = (data)=>{
    return {
        type : types.MAKE_ORDER,
        data
    }
}


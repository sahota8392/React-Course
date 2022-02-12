import * as ActionTypes from './ActionTypes';           //  * imports all from ActionTypes

export const Partners = (state = {
        isLoading: true,
        errMess: null,
        campsites: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, parnters: [] };

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};



// import { PARTNERS } from '../shared/partners';

// export const Partners = (state = PARTNERS, action) => {
//     switch(action.type) {
//         default:
//             return state;
//     }
// };
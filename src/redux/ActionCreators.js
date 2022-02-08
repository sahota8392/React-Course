import * as ActionTypes from './ActionTypes';       // * is a wildcard allowing us to import all named exports from ActionTypes.js at once
import { CAMPSITES } from '../shared/campsites';

export const addComment = (campsiteId, rating, author, text) => ({      //actionCreator function (values need to add comment)
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,     //can pass like this or just as rating, author, text,
        rating: rating,
        author: author,
        text: text
    }
});


//adding actionCreator fetchCampsites       //() => dispatch =>  nested an error function inside another error function
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({            //only 1 arrow, so this is the standard action creator returning action object 
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});
import * as ActionTypes from './ActionTypes';       // * is a wildcard allowing us to import all named exports from ActionTypes.js at once

export const addComment = (campsiteId, rating, author, text) => ({      //actionCreator function (values need to add comment)
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,     //can pass like this or just as rating, author, text,
        rating: rating,
        author: author,
        text: text
    }
});
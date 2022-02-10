import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            // comment.id = state.comments.length;
            // comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};

// import { COMMENTS } from '../shared/comments';
// import * as ActionTypes from './ActionTypes';

// export const Comments = (state = COMMENTS, action) => {
//     switch (action.type) {
//         case ActionTypes.ADD_COMMENT:                           //when actiontype is add_comment
//             const comment = action.payload;                     //putting this into a new variable called comment
//             comment.id = state.length;
//             comment.date = new Date().toISOString();
//             return state.concat(comment);                       //returns the new state (concat will add to end of new array without mutatate (push will change original array))
//         default:
//             return state;
//     }
// };
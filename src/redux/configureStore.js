import {createStore, combineReducers, applyMiddleware} from 'redux';             //createStore() function - requires all the reducers be combined to one single root reducer to be used as argument to createStore()    //middleware added for redux thunk after installing it
import { Campsites } from './campsites';                    
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';                    //first install thunk and logger, import applyMiddleware, thunk and logger
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './form';


//variable is const store with the reducer function and initial state set inside it
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)          //adding the thunk and logger to the applyMiddleware
    );

return store;

};

//after combining and adding the combineReducers, we deleted Reducer.js
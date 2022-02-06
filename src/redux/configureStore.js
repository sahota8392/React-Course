import {createStore, combineReducers} from 'redux';             //createStore() function - requires all the reducers be combined to one single root reducer to be used as argument to createStore()
import { Campsites } from './campsites';                    
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';


//variable is const store with the reducer function and initial state set inside it
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

return store;

};

//after combining and adding the combineReducers, we deleted Reducer.js
import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';


//variable is const store with the reducer function and initial state set inside it
export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

return store;

};